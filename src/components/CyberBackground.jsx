import { useEffect, useRef } from 'react';

/**
 * CyberBackground — Cybersecurity / SOC-themed canvas background
 *
 * Layers (bottom → top):
 *  0. CSS gradient base (handled in wrapper div via Tailwind/inline style)
 *  1. Mesh blobs  — slow-moving radial gradients for depth
 *  2. Grid lines  — 1px lines at node spacing, low opacity
 *  3. Node matrix — dots at intersections; some are "major" nodes (larger, pulsing)
 *  4. Network edges — static connections between select node pairs
 *  5. Packet travel — small glowing dot moving along each edge
 *  6. Scan line    — single horizontal sweep every 8-12 s
 *  7. Data stream  — floating 0/1 / hex / protocol labels on left & right margins
 *  8. HUD accents  — corner brackets + crosshair (very low opacity)
 *  9. Spotlight    — radial gradient following cursor (desktop only)
 *
 * Props (all optional):
 *   intensity     {number}  0.5–1.5  overall brightness multiplier  (default 1)
 *   density       {number}  0.5–2.0  node count multiplier           (default 1)
 *   showDataStream {bool}   show floating data labels                (default true)
 *   showHud       {bool}    show corner brackets & crosshair         (default true)
 */
export default function CyberBackground({
    intensity = 1,
    density = 1,
    showDataStream = true,
    showHud = true,
    accentColor = '#2563eb',
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // ─── Helpers ──────────────────────────────────────────────────────────
        const lerp = (a, b, t) => a + (b - a) * t;
        const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
        const hexToRgb = (hex) => {
            const c = hex.replace('#', '');
            const n = parseInt(c.length === 3 ? c.split('').map(x => x + x).join('') : c, 16);
            return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
        };
        const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${clamp(a, 0, 1)})`;

        // ─── Theme ────────────────────────────────────────────────────────────
        // tp: 0 = light, 1 = dark
        let tp = document.documentElement.classList.contains('dark') ? 1 : 0;
        let targetTp = tp;

        const themeObserver = new MutationObserver(() => {
            targetTp = document.documentElement.classList.contains('dark') ? 1 : 0;
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // ─── Palette ──────────────────────────────────────────────────────────
        const P = {
            // Light mode
            L: {
                nodePrimary: hexToRgb('#2563eb'),   // electric blue
                nodeCyan:    hexToRgb('#06b6d4'),   // cyan
                nodeBase:    hexToRgb('#93c5fd'),   // muted blue
                grid:        { r: 37, g: 99, b: 235 },  // same as nodePrimary
                packet:      hexToRgb('#0ea5e9'),
                scan:        hexToRgb('#2563eb'),
                blob1:       hexToRgb('#06b6d4'),   // cyan blob
                blob2:       hexToRgb('#2563eb'),   // blue blob
                blob3:       hexToRgb('#7c3aed'),   // violet blob
                hud:         { r: 37, g: 99, b: 235 },
                stream:      hexToRgb('#1d4ed8'),
            },
            // Dark mode
            D: {
                nodePrimary: hexToRgb('#22d3ee'),   // neon cyan
                nodeCyan:    hexToRgb('#3b82f6'),   // blue
                nodeBase:    hexToRgb('#1e3a5f'),   // deep blue
                grid:        { r: 34, g: 211, b: 238 },
                packet:      hexToRgb('#67e8f9'),
                scan:        hexToRgb('#22d3ee'),
                blob1:       hexToRgb('#22d3ee'),
                blob2:       hexToRgb('#3b82f6'),
                blob3:       hexToRgb('#a78bfa'),
                hud:         { r: 34, g: 211, b: 238 },
                stream:      hexToRgb('#22d3ee'),
            },
        };

        // Per-frame interpolated palette
        let pal = {};
        const updatePal = () => {
            const t = tp;
            const il = (key) => ({
                r: Math.round(lerp(P.L[key].r, P.D[key].r, t)),
                g: Math.round(lerp(P.L[key].g, P.D[key].g, t)),
                b: Math.round(lerp(P.L[key].b, P.D[key].b, t)),
            });
            pal = {
                nodePrimary: il('nodePrimary'),
                nodeCyan:    il('nodeCyan'),
                nodeBase:    il('nodeBase'),
                grid:        il('grid'),
                packet:      il('packet'),
                scan:        il('scan'),
                blob1:       il('blob1'),
                blob2:       il('blob2'),
                blob3:       il('blob3'),
                hud:         il('hud'),
                stream:      il('stream'),
            };
        };

        // ─── Accessibility ────────────────────────────────────────────────────
        const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
        let reducedMotion = motionMQ.matches;
        const onMotion = (e) => { reducedMotion = e.matches; };
        motionMQ.addEventListener('change', onMotion);

        const pointerMQ = window.matchMedia('(pointer: fine)');
        let finePointer = pointerMQ.matches;
        const onPointer = (e) => { finePointer = e.matches; };
        pointerMQ.addEventListener('change', onPointer);

        // ─── Dimensions ───────────────────────────────────────────────────────
        let W = 0, H = 0, dpr = 1;
        let isMobile = false;

        // ─── Offscreen canvas for static layers (grid lines + base dots) ──────
        const offscreen = document.createElement('canvas');
        const offCtx = offscreen.getContext('2d');
        let offDirty = true; // must re-render static layer when theme/size changes

        // ─── Grid & Nodes ─────────────────────────────────────────────────────
        let spacing = 52;
        let nodes = [];          // all grid intersections
        let majorNodes = [];     // special larger pulsing nodes
        let edges = [];          // node-pair connections
        let packets = [];        // travelling data packets

        // Data stream characters
        const streamTokens = ['0', '1', '0x4F', '443', 'SSH', 'AES', '0xAC', 'TLS', '0xFF', '1', '0', 'UDP', 'RSA'];

        // Active data stream drops
        let streamDrops = [];

        // ─── Scan line ────────────────────────────────────────────────────────
        const scan = {
            active: false,
            y: -40,
            speed: 80,          // px/s
            nextAt: performance.now() + 3000,
            tailLen: 80,
        };

        // ─── Mouse ────────────────────────────────────────────────────────────
        const mouse = { x: -2000, y: -2000, tx: -2000, ty: -2000, on: false };

        // ─── Blob state (slow-moving mesh gradients) ──────────────────────────
        const blobs = [
            { nx: 0.82, ny: 0.08, vx: 0.000035, vy: 0.000022 },   // top-right (cyan)
            { nx: 0.12, ny: 0.85, vx: -0.000028, vy: -0.000018 },  // bottom-left (blue)
            { nx: 0.92, ny: 0.60, vx: -0.000020, vy: 0.000030 },   // right-mid (violet)
        ];

        // ─── Build grid ───────────────────────────────────────────────────────
        const buildGrid = () => {
            isMobile = W < 768;
            const densityFactor = isMobile ? 0.6 * density : density;
            spacing = Math.round(clamp(52 / densityFactor, 36, 80));

            const cols = Math.ceil(W / spacing) + 1;
            const rows = Math.ceil(H / spacing) + 1;
            const ox = (W - (cols - 1) * spacing) / 2;
            const oy = (H - (rows - 1) * spacing) / 2;

            nodes = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = ox + c * spacing;
                    const y = oy + r * spacing;

                    // Vignette: 0 at edges, 1 interior
                    const margin = 80;
                    const ex = clamp(Math.min(x, W - x) / margin, 0, 1);
                    const ey = clamp(Math.min(y, H - y) / margin, 0, 1);
                    const edge = Math.min(ex, ey);

                    // "Major" nodes: ~8% of all, prefer interior, not near hero text area
                    const isTextZone = (y < H * 0.65 && x > W * 0.15 && x < W * 0.85);
                    const isMajor = edge > 0.4 && !isTextZone && Math.random() < (isMobile ? 0.05 : 0.08);

                    nodes.push({
                        c, r, x, y, edge,
                        isMajor,
                        // Twinkle
                        phase:  Math.random() * Math.PI * 2,
                        speed:  0.5 + Math.random() * 1.0,
                        // Major node pulse
                        pulsePhase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.4 + Math.random() * 0.5,
                        // Color variant: 0 = primary blue, 1 = cyan
                        variant: Math.random() < 0.4 ? 1 : 0,
                    });
                }
            }

            majorNodes = nodes.filter(n => n.isMajor);

            // Build edges: connect nearby major nodes
            edges = [];
            packets = [];
            const edgeDist = spacing * 3.5;
            for (let i = 0; i < majorNodes.length; i++) {
                for (let j = i + 1; j < majorNodes.length; j++) {
                    const a = majorNodes[i];
                    const b = majorNodes[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < edgeDist && edges.length < (isMobile ? 8 : 22)) {
                        edges.push({ a, b, d });
                        // Each edge gets 0-1 packets
                        if (Math.random() < 0.7) {
                            packets.push({ edgeIdx: edges.length - 1, t: Math.random(), speed: 0.04 + Math.random() * 0.06, dir: Math.random() < 0.5 ? 1 : -1 });
                        }
                    }
                }
            }

            // Spawn data stream drops along left/right margins
            streamDrops = [];
            if (showDataStream && !isMobile) {
                const count = Math.floor(8 * density);
                for (let i = 0; i < count; i++) {
                    spawnDrop();
                }
            }

            offDirty = true;
        };

        const spawnDrop = () => {
            const side = Math.random() < 0.5 ? 'left' : 'right';
            const xRange = W * 0.10; // only first/last 10% of width
            const x = side === 'left'
                ? 10 + Math.random() * xRange
                : W - 10 - Math.random() * xRange;
            streamDrops.push({
                x,
                y: Math.random() * H,
                vy: 12 + Math.random() * 16,      // px/s, slow drift upward... actually downward
                text: streamTokens[Math.floor(Math.random() * streamTokens.length)],
                alpha: 0.04 + Math.random() * 0.06,
                size: 9 + Math.random() * 3,
            });
        };

        // ─── Offscreen: grid lines + base node dots ───────────────────────────
        const renderOffscreen = () => {
            offscreen.width  = Math.floor(W * dpr);
            offscreen.height = Math.floor(H * dpr);
            offCtx.setTransform(1, 0, 0, 1, 0, 0);
            offCtx.scale(dpr, dpr);
            offCtx.clearRect(0, 0, W, H);

            const { grid } = pal;
            // Grid opacity: lighter in light mode so we don't overwhelm
            const gridAlpha = lerp(0.055, 0.08, tp) * intensity;

            // Grid lines — horizontal
            offCtx.lineWidth = 1;
            for (const n of nodes) {
                if (n.c === 0) {
                    // horizontal line at this row
                    const alpha = gridAlpha * clamp(n.edge + 0.3, 0, 1);
                    offCtx.strokeStyle = rgba(grid.r, grid.g, grid.b, alpha);
                    offCtx.beginPath();
                    offCtx.moveTo(0, n.y);
                    offCtx.lineTo(W, n.y);
                    offCtx.stroke();
                }
                if (n.r === 0) {
                    // vertical line at this col
                    const alpha = gridAlpha * clamp(n.edge + 0.3, 0, 1);
                    offCtx.strokeStyle = rgba(grid.r, grid.g, grid.b, alpha);
                    offCtx.beginPath();
                    offCtx.moveTo(n.x, 0);
                    offCtx.lineTo(n.x, H);
                    offCtx.stroke();
                }
            }
            offDirty = false;
        };

        // ─── Resize ───────────────────────────────────────────────────────────
        let resizeTimer = null;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                dpr = Math.min(window.devicePixelRatio || 1, 2);
                W = window.innerWidth;
                H = window.innerHeight;
                canvas.width  = Math.floor(W * dpr);
                canvas.height = Math.floor(H * dpr);
                canvas.style.width  = `${W}px`;
                canvas.style.height = `${H}px`;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
                buildGrid();
            }, 120);
        };

        // Initial size
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = Math.floor(W * dpr);
        canvas.height = Math.floor(H * dpr);
        canvas.style.width  = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        buildGrid();
        window.addEventListener('resize', handleResize);

        // ─── Mouse ────────────────────────────────────────────────────────────
        const onMouseMove = (e) => {
            if (!finePointer) return;
            mouse.tx = e.clientX;
            mouse.ty = e.clientY;
            mouse.on = true;
        };
        const onMouseLeave = () => { mouse.on = false; };
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', onMouseLeave);

        // ─── Animation loop ───────────────────────────────────────────────────
        let rafId = null;
        let lastT = performance.now();

        const drawFrame = (now) => {
            const dt = clamp((now - lastT) / 1000, 0, 0.1);
            lastT = now;
            const sec = now * 0.001;

            // Smooth theme transition
            if (Math.abs(targetTp - tp) > 0.001) {
                tp += (targetTp - tp) * 0.08;
            } else {
                tp = targetTp;
            }

            // Rebuild offscreen when theme drifts significantly
            if (offDirty) {
                updatePal();
                renderOffscreen();
            } else {
                updatePal();
            }

            // Smooth cursor
            mouse.x += (mouse.tx - mouse.x) * 0.14;
            mouse.y += (mouse.ty - mouse.y) * 0.14;

            // Move blobs
            if (!reducedMotion) {
                for (const b of blobs) {
                    b.nx += b.vx;
                    b.ny += b.vy;
                    if (b.nx < 0.05 || b.nx > 0.95) b.vx *= -1;
                    if (b.ny < 0.05 || b.ny > 0.95) b.vy *= -1;
                }
            }

            // Advance scan line
            if (!reducedMotion) {
                if (!scan.active && now >= scan.nextAt) {
                    scan.active = true;
                    scan.y = -scan.tailLen;
                }
                if (scan.active) {
                    scan.y += scan.speed * dt;
                    if (scan.y > H + scan.tailLen) {
                        scan.active = false;
                        scan.nextAt = now + 8000 + Math.random() * 4000;
                    }
                }
            }

            // Advance packets
            if (!reducedMotion) {
                for (const pk of packets) {
                    pk.t += pk.speed * dt * pk.dir;
                    if (pk.t > 1) { pk.t = 1; pk.dir = -1; }
                    if (pk.t < 0) { pk.t = 0; pk.dir = 1; }
                }
            }

            // Advance data stream
            if (showDataStream && !isMobile && !reducedMotion) {
                for (const d of streamDrops) {
                    d.y += d.vy * dt;
                    if (d.y > H + 20) {
                        // respawn at top
                        d.y = -20;
                        d.text = streamTokens[Math.floor(Math.random() * streamTokens.length)];
                    }
                }
            }

            // ── Clear
            ctx.clearRect(0, 0, W, H);

            // ── Layer 1: Mesh blobs (depth) ─────────────────────────────────
            drawBlobs();

            // ── Layer 2: Offscreen static grid lines ────────────────────────
            ctx.drawImage(offscreen, 0, 0, W, H);

            // ── Layer 3 & 4: Edges + nodes ──────────────────────────────────
            drawEdges(sec);
            drawNodes(sec);

            // ── Layer 5: Data packets on edges ──────────────────────────────
            if (!reducedMotion) drawPackets();

            // ── Layer 6: Scan line ───────────────────────────────────────────
            if (!reducedMotion && scan.active) drawScanLine();

            // ── Layer 7: Data stream characters ─────────────────────────────
            if (showDataStream && !isMobile && !reducedMotion) drawDataStream();

            // ── Layer 8: HUD accents ─────────────────────────────────────────
            if (showHud) drawHud();

            // ── Layer 9: Spotlight cursor ────────────────────────────────────
            if (!isMobile && finePointer && mouse.on) drawSpotlight();

            rafId = requestAnimationFrame(drawFrame);
        };

        // ─── Layer drawers ────────────────────────────────────────────────────

        const drawBlobs = () => {
            // 3 blobs: cyan (top-right), blue (bottom-left), violet (right-mid)
            const blobDefs = [
                { col: pal.blob1, aL: 0.13, aD: 0.07, r: Math.max(W, H) * 0.45 },
                { col: pal.blob2, aL: 0.11, aD: 0.06, r: Math.max(W, H) * 0.40 },
                { col: pal.blob3, aL: 0.09, aD: 0.05, r: Math.max(W, H) * 0.38 },
            ];
            for (let i = 0; i < blobs.length; i++) {
                const b = blobs[i];
                const d = blobDefs[i];
                const x = b.nx * W;
                const y = b.ny * H;
                const alpha = lerp(d.aL, d.aD, tp) * intensity;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, d.r);
                grad.addColorStop(0, rgba(d.col.r, d.col.g, d.col.b, alpha));
                grad.addColorStop(1, rgba(d.col.r, d.col.g, d.col.b, 0));
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, W, H);
            }
        };

        const drawEdges = (sec) => {
            // Static network connections between major nodes
            const { nodePrimary } = pal;
            const edgeAlpha = lerp(0.10, 0.14, tp) * intensity;
            ctx.lineWidth = 0.8;
            for (const edge of edges) {
                const { a, b } = edge;
                const ea = Math.min(a.edge, b.edge);
                ctx.strokeStyle = rgba(nodePrimary.r, nodePrimary.g, nodePrimary.b, edgeAlpha * ea);
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        };

        const drawNodes = (sec) => {
            const { nodePrimary, nodeCyan, nodeBase } = pal;
            for (const n of nodes) {
                if (n.edge <= 0) continue;

                const twinkle = Math.sin(sec * n.speed + n.phase) * 0.5 + 0.5; // 0–1

                // Spotlight proximity boost
                let spotBoost = 0;
                let spotR = 0, spotG = 0, spotB = 0;
                if (!isMobile && finePointer && mouse.on) {
                    const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
                    if (d < 160) {
                        const f = 1 - d / 160;
                        const ease = f * f * (3 - 2 * f);
                        spotBoost = ease;
                        spotR = nodePrimary.r;
                        spotG = nodePrimary.g;
                        spotB = nodePrimary.b;
                    }
                }

                if (n.isMajor) {
                    // Pulsing major node
                    const pulse = Math.sin(sec * n.pulseSpeed + n.pulsePhase) * 0.5 + 0.5;
                    const col = n.variant === 0 ? nodePrimary : nodeCyan;
                    const r = lerp(col.r, spotR || col.r, spotBoost);
                    const g = lerp(col.g, spotG || col.g, spotBoost);
                    const b = lerp(col.b, spotB || col.b, spotBoost);

                    // Halo glow
                    const haloR = 4 + pulse * 6 + spotBoost * 4;
                    const haloAlpha = lerp(0.08, 0.18, tp) * (0.5 + pulse * 0.5) * intensity * n.edge;
                    const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
                    halo.addColorStop(0, rgba(r, g, b, haloAlpha));
                    halo.addColorStop(1, rgba(r, g, b, 0));
                    ctx.fillStyle = halo;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
                    ctx.fill();

                    // Core dot
                    const coreR = 2.2 + pulse * 1.2 + spotBoost * 1.5;
                    const coreAlpha = lerp(0.55, 0.85, tp) * (0.7 + pulse * 0.3) * intensity * n.edge;
                    ctx.fillStyle = rgba(r, g, b, coreAlpha);
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Regular small node
                    const col = n.variant === 0 ? nodeBase : nodePrimary;
                    const r = lerp(col.r, spotR || col.r, spotBoost * 0.5);
                    const g = lerp(col.g, spotG || col.g, spotBoost * 0.5);
                    const b = lerp(col.b, spotB || col.b, spotBoost * 0.5);
                    const alpha = lerp(0.15, 0.30, tp)
                        * (0.6 + twinkle * 0.4)
                        * (1 + spotBoost * 0.8)
                        * intensity
                        * n.edge;
                    const dotR = 1.0 + spotBoost * 0.8;
                    ctx.fillStyle = rgba(r, g, b, alpha);
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, dotR, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const drawPackets = () => {
            const { packet } = pal;
            for (const pk of packets) {
                const edge = edges[pk.edgeIdx];
                if (!edge) continue;
                const { a, b } = edge;
                const x = lerp(a.x, b.x, pk.t);
                const y = lerp(a.y, b.y, pk.t);
                const alpha = lerp(0.50, 0.85, tp) * intensity;

                // Glow
                const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
                glow.addColorStop(0, rgba(packet.r, packet.g, packet.b, alpha * 0.6));
                glow.addColorStop(1, rgba(packet.r, packet.g, packet.b, 0));
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, 7, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = rgba(packet.r, packet.g, packet.b, alpha);
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawScanLine = () => {
            const { scan: sc } = pal;
            const alpha = lerp(0.18, 0.28, tp) * intensity;
            // Leading edge
            ctx.strokeStyle = rgba(sc.r, sc.g, sc.b, alpha);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, scan.y);
            ctx.lineTo(W, scan.y);
            ctx.stroke();

            // Trailing gradient
            const grad = ctx.createLinearGradient(0, scan.y - scan.tailLen, 0, scan.y);
            grad.addColorStop(0, rgba(sc.r, sc.g, sc.b, 0));
            grad.addColorStop(1, rgba(sc.r, sc.g, sc.b, alpha * 0.4));
            ctx.fillStyle = grad;
            ctx.fillRect(0, scan.y - scan.tailLen, W, scan.tailLen);
        };

        const drawDataStream = () => {
            const { stream } = pal;
            const alpha = lerp(0.055, 0.08, tp) * intensity;
            ctx.font = '9px "Courier New", monospace';
            ctx.textAlign = 'left';
            for (const d of streamDrops) {
                ctx.fillStyle = rgba(stream.r, stream.g, stream.b, d.alpha * (alpha / 0.065));
                ctx.fillText(d.text, d.x, d.y);
            }
        };

        const drawHud = () => {
            const { hud } = pal;
            const alpha = lerp(0.08, 0.13, tp) * intensity;
            const len = 18;
            const pad = 14;
            ctx.strokeStyle = rgba(hud.r, hud.g, hud.b, alpha);
            ctx.lineWidth = 1.2;

            // Four corner brackets
            const corners = [
                { x: pad,     y: pad,     sx: 1,  sy: 1  },
                { x: W - pad, y: pad,     sx: -1, sy: 1  },
                { x: pad,     y: H - pad, sx: 1,  sy: -1 },
                { x: W - pad, y: H - pad, sx: -1, sy: -1 },
            ];
            for (const { x, y, sx, sy } of corners) {
                ctx.beginPath();
                ctx.moveTo(x + sx * len, y);
                ctx.lineTo(x, y);
                ctx.lineTo(x, y + sy * len);
                ctx.stroke();
            }

            // Crosshair: small, very center
            const cx = W * 0.5, cy = H * 0.5;
            const ch = 8;
            ctx.strokeStyle = rgba(hud.r, hud.g, hud.b, alpha * 0.6);
            ctx.beginPath();
            ctx.moveTo(cx - ch, cy); ctx.lineTo(cx + ch, cy);
            ctx.moveTo(cx, cy - ch); ctx.lineTo(cx, cy + ch);
            ctx.stroke();

            // Crosshair circle
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.stroke();
        };

        const drawSpotlight = () => {
            const { nodePrimary } = pal;
            const spotAlpha = lerp(0.06, 0.10, tp) * intensity;
            const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
            grad.addColorStop(0, rgba(nodePrimary.r, nodePrimary.g, nodePrimary.b, spotAlpha));
            grad.addColorStop(1, rgba(nodePrimary.r, nodePrimary.g, nodePrimary.b, 0));
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
        };

        // ─── Static frame (reduced motion) ───────────────────────────────────
        const drawStatic = () => {
            updatePal();
            renderOffscreen();
            ctx.clearRect(0, 0, W, H);
            drawBlobs();
            ctx.drawImage(offscreen, 0, 0, W, H);
            drawEdges(0);
            drawNodes(0);
            if (showHud) drawHud();
        };

        // ─── Start / stop ─────────────────────────────────────────────────────
        const start = () => {
            if (reducedMotion) { drawStatic(); return; }
            if (!rafId) {
                lastT = performance.now();
                rafId = requestAnimationFrame(drawFrame);
            }
        };
        const stop = () => {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        };

        const onVisibility = () => {
            if (!document.hidden) start(); else stop();
        };
        document.addEventListener('visibilitychange', onVisibility);

        start();

        // ─── Cleanup ──────────────────────────────────────────────────────────
        return () => {
            stop();
            clearTimeout(resizeTimer);
            themeObserver.disconnect();
            motionMQ.removeEventListener('change', onMotion);
            pointerMQ.removeEventListener('change', onPointer);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [intensity, density, showDataStream, showHud, accentColor]);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* CSS gradient base — bg-[F5F9FF] → #E8F0FF in light, #000000 → #02040a in dark */}
            <div
                className="absolute inset-0 transition-colors duration-300"
                style={{
                    background: 'var(--cyber-bg, linear-gradient(135deg, #f5f9ff 0%, #e8f0ff 100%))',
                }}
            />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        </div>
    );
}

