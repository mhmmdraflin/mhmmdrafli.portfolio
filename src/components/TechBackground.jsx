import { useEffect, useRef } from 'react';

/**
 * TechBackground - High Performance Interactive Canvas Background
 * 
 * Features:
 * 1. Dot Grid: Clean, technical matrix covering the viewport.
 * 2. Twinkle: Gentle individual dot opacity oscillation.
 * 3. Wave Pulse: Soft sweeping wave of light every 7-10s across the grid.
 * 4. Cursor Interaction: Mouse proximity brightening & constellation network lines (desktop only).
 * 5. Hero Radial Glow: Subtle depth behind hero area.
 * 6. Smooth Theme Cross-fade: 350ms interpolation between light/dark mode without reload.
 * 7. Accessibility & Performance: Respects prefers-reduced-motion, pauses when tab is hidden,
 *    handles retina displays (DPR capped at 2), mobile battery optimizations.
 */
export default function TechBackground({
    density = 1,
    speed = 1,
    accentColor = '#007AFF',
    className = ''
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // --- Theme State & Color Definitions ---
        // 0.0 = Light Mode, 1.0 = Dark Mode
        let currentThemeProgress = document.documentElement.classList.contains('dark') ? 1 : 0;
        let targetThemeProgress = currentThemeProgress;

        // Parse hex color into RGB object
        const hexToRgb = (hex) => {
            let clean = hex.replace('#', '');
            if (clean.length === 3) {
                clean = clean.split('').map((c) => c + c).join('');
            }
            const num = parseInt(clean, 16);
            return {
                r: (num >> 16) & 255,
                g: (num >> 8) & 255,
                b: num & 255
            };
        };

        const parsedAccent = hexToRgb(accentColor);

        // Palette definitions
        const colors = {
            // Dots base color
            dotLight: { r: 120, g: 135, b: 155 },
            dotDark: { r: 75, g: 95, b: 125 },
            // Active / Highlighted dots
            activeLight: parsedAccent,
            activeDark: { r: 56, g: 189, b: 248 }, // Cyan / Sky blue
            // Network lines
            lineLight: parsedAccent,
            lineDark: { r: 56, g: 189, b: 248 },
            // Wave pulse
            waveLight: parsedAccent,
            waveDark: { r: 56, g: 189, b: 248 },
            // Hero ambient glow
            heroGlowLight: { r: parsedAccent.r, g: parsedAccent.g, b: parsedAccent.b, a: 0.045 },
            heroGlowDark: { r: 0, g: 122, b: 255, a: 0.08 }
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        // --- MutationObserver for Dark Mode Class on <html> ---
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            targetThemeProgress = isDark ? 1 : 0;
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // --- Accessibility: prefers-reduced-motion ---
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let isReducedMotion = motionQuery.matches;

        const handleMotionChange = (e) => {
            isReducedMotion = e.matches;
            if (isReducedMotion) {
                drawStatic();
            } else {
                startLoop();
            }
        };

        motionQuery.addEventListener('change', handleMotionChange);

        // --- Pointer capability check ---
        const finePointerQuery = window.matchMedia('(pointer: fine)');
        let isFinePointer = finePointerQuery.matches;

        const handlePointerChange = (e) => {
            isFinePointer = e.matches;
        };

        finePointerQuery.addEventListener('change', handlePointerChange);

        // --- Grid & Canvas Dimensions ---
        let width = 0;
        let height = 0;
        let dpr = 1;
        let dots = [];
        let cols = 0;
        let rows = 0;
        let spacing = 32;

        const initGrid = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            // Responsive grid spacing (wider on mobile to conserve resources)
            const isMobile = width < 768;
            spacing = Math.round((isMobile ? 38 : 30) / Math.max(0.5, density));

            cols = Math.ceil(width / spacing) + 1;
            rows = Math.ceil(height / spacing) + 1;

            const offsetX = (width - (cols - 1) * spacing) / 2;
            const offsetY = (height - (rows - 1) * spacing) / 2;

            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = offsetX + c * spacing;
                    const y = offsetY + r * spacing;

                    // Edge vignette distance factor (0 at borders, 1 in interior)
                    const margin = 70;
                    const edgeDistX = Math.min(x, width - x) / margin;
                    const edgeDistY = Math.min(y, height - y) / margin;
                    const edgeFactor = Math.min(1, Math.max(0, Math.min(edgeDistX, edgeDistY)));

                    dots.push({
                        c,
                        r,
                        x,
                        y,
                        edgeFactor,
                        // Unique twinkle properties
                        twinklePhase: Math.random() * Math.PI * 2,
                        twinkleSpeed: 0.6 + Math.random() * 0.9,
                        baseOpacity: 0.18 + Math.random() * 0.12
                    });
                }
            }
        };

        initGrid();

        // --- Resize handling with debounce ---
        let resizeTimer = null;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initGrid();
                if (isReducedMotion) drawStatic();
            }, 120);
        };

        window.addEventListener('resize', handleResize);

        // --- Mouse / Cursor State ---
        const mouse = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
            active: false,
            radius: 125
        };

        const handleMouseMove = (e) => {
            if (!isFinePointer) return;
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // --- Wave Pulse State ---
        const wave = {
            active: false,
            x: 0,
            y: 0,
            radius: 0,
            maxRadius: 0,
            speed: 240 * speed, // pixels per sec
            width: 140, // wave band thickness
            nextTriggerTime: performance.now() + 3000 // first pulse after 3s
        };

        const triggerWave = (now) => {
            // Pick a random edge/corner origin to create natural directional sweeping
            const side = Math.floor(Math.random() * 4);
            let ox = 0;
            let oy = 0;
            if (side === 0) {
                // Top edge
                ox = Math.random() * width;
                oy = -50;
            } else if (side === 1) {
                // Left edge
                ox = -50;
                oy = Math.random() * height;
            } else if (side === 2) {
                // Right edge
                ox = width + 50;
                oy = Math.random() * height;
            } else {
                // Center-bottom
                ox = width * (0.2 + Math.random() * 0.6);
                oy = height + 50;
            }

            wave.x = ox;
            wave.y = oy;
            wave.radius = 0;
            wave.maxRadius = Math.hypot(Math.max(ox, width - ox), Math.max(oy, height - oy)) + wave.width;
            wave.active = true;
            // Schedule next wave pulse in 7 to 10 seconds
            wave.nextTriggerTime = now + 7000 + Math.random() * 3000;
        };

        // --- Static Draw (Used for prefers-reduced-motion) ---
        const drawStatic = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Hero Ambient Glow
            const isDark = targetThemeProgress > 0.5;
            const glowColor = isDark ? colors.heroGlowDark : colors.heroGlowLight;
            const glow = ctx.createRadialGradient(
                width * 0.5,
                Math.min(height * 0.35, 300),
                20,
                width * 0.5,
                Math.min(height * 0.35, 300),
                Math.max(width * 0.5, 450)
            );
            glow.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${glowColor.a})`);
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

            // Draw calm static grid dots
            const dotColor = isDark ? colors.dotDark : colors.dotLight;
            ctx.fillStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, 0.25)`;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                if (dot.edgeFactor <= 0) continue;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 1.25, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // --- Animation Loop ---
        let animationFrameId = null;
        let lastTime = performance.now();
        let isTabActive = !document.hidden;

        const animate = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            // 1. Smooth Theme Interpolation (350ms duration)
            if (Math.abs(targetThemeProgress - currentThemeProgress) > 0.001) {
                currentThemeProgress += (targetThemeProgress - currentThemeProgress) * 0.08;
            } else {
                currentThemeProgress = targetThemeProgress;
            }
            const tp = currentThemeProgress;

            // Interpolate active colors for this frame
            const dotR = Math.round(lerp(colors.dotLight.r, colors.dotDark.r, tp));
            const dotG = Math.round(lerp(colors.dotLight.g, colors.dotDark.g, tp));
            const dotB = Math.round(lerp(colors.dotLight.b, colors.dotDark.b, tp));

            const actR = Math.round(lerp(colors.activeLight.r, colors.activeDark.r, tp));
            const actG = Math.round(lerp(colors.activeLight.g, colors.activeDark.g, tp));
            const actB = Math.round(lerp(colors.activeLight.b, colors.activeDark.b, tp));

            const lineR = Math.round(lerp(colors.lineLight.r, colors.lineDark.r, tp));
            const lineG = Math.round(lerp(colors.lineLight.g, colors.lineDark.g, tp));
            const lineB = Math.round(lerp(colors.lineLight.b, colors.lineDark.b, tp));

            // Smooth cursor follow
            if (mouse.active) {
                mouse.x += (mouse.targetX - mouse.x) * 0.15;
                mouse.y += (mouse.targetY - mouse.y) * 0.15;
            } else {
                mouse.x = -1000;
                mouse.y = -1000;
            }

            // Update Wave Pulse
            if (!wave.active && now >= wave.nextTriggerTime) {
                triggerWave(now);
            }
            if (wave.active) {
                wave.radius += wave.speed * dt;
                if (wave.radius > wave.maxRadius) {
                    wave.active = false;
                }
            }

            // Clear Canvas
            ctx.clearRect(0, 0, width, height);

            // 2. Draw Hero Radial Glow (Depth Layer)
            const heroGlowAlpha = lerp(colors.heroGlowLight.a, colors.heroGlowDark.a, tp);
            const glow = ctx.createRadialGradient(
                width * 0.5,
                Math.min(height * 0.35, 320),
                30,
                width * 0.5,
                Math.min(height * 0.35, 320),
                Math.max(width * 0.5, 480)
            );
            glow.addColorStop(0, `rgba(${actR}, ${actG}, ${actB}, ${heroGlowAlpha})`);
            glow.addColorStop(0.6, `rgba(${actR}, ${actG}, ${actB}, ${heroGlowAlpha * 0.25})`);
            glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

            // 3. Constellation Lines around Cursor (Desktop & fine pointer only)
            const isDesktop = width >= 768 && isFinePointer;
            if (isDesktop && mouse.active) {
                const maxLineDist = spacing * 1.5;
                const minCol = Math.max(0, Math.floor((mouse.x - mouse.radius) / spacing) - 1);
                const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + mouse.radius) / spacing) + 1);
                const minRow = Math.max(0, Math.floor((mouse.y - mouse.radius) / spacing) - 1);
                const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + mouse.radius) / spacing) + 1);

                ctx.lineWidth = 0.8;

                // Loop only over dots in the mouse vicinity
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const idx = r * cols + c;
                        const dotA = dots[idx];
                        if (!dotA) continue;

                        const distMouseA = Math.hypot(dotA.x - mouse.x, dotA.y - mouse.y);
                        if (distMouseA > mouse.radius) continue;

                        // Check right neighbor
                        if (c + 1 <= maxCol) {
                            const dotB = dots[r * cols + (c + 1)];
                            if (dotB) {
                                const distMouseB = Math.hypot(dotB.x - mouse.x, dotB.y - mouse.y);
                                if (distMouseB <= mouse.radius) {
                                    const lineAlpha = (1 - Math.max(distMouseA, distMouseB) / mouse.radius) * 0.22 * dotA.edgeFactor * dotB.edgeFactor;
                                    if (lineAlpha > 0.01) {
                                        ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${lineAlpha})`;
                                        ctx.beginPath();
                                        ctx.moveTo(dotA.x, dotA.y);
                                        ctx.lineTo(dotB.x, dotB.y);
                                        ctx.stroke();
                                    }
                                }
                            }
                        }

                        // Check bottom neighbor
                        if (r + 1 <= maxRow) {
                            const dotB = dots[(r + 1) * cols + c];
                            if (dotB) {
                                const distMouseB = Math.hypot(dotB.x - mouse.x, dotB.y - mouse.y);
                                if (distMouseB <= mouse.radius) {
                                    const lineAlpha = (1 - Math.max(distMouseA, distMouseB) / mouse.radius) * 0.22 * dotA.edgeFactor * dotB.edgeFactor;
                                    if (lineAlpha > 0.01) {
                                        ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${lineAlpha})`;
                                        ctx.beginPath();
                                        ctx.moveTo(dotA.x, dotA.y);
                                        ctx.lineTo(dotB.x, dotB.y);
                                        ctx.stroke();
                                    }
                                }
                            }
                        }

                        // Connect directly to cursor if very close
                        if (distMouseA < mouse.radius * 0.65) {
                            const cursorLineAlpha = (1 - distMouseA / (mouse.radius * 0.65)) * 0.16 * dotA.edgeFactor;
                            if (cursorLineAlpha > 0.01) {
                                ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${cursorLineAlpha})`;
                                ctx.beginPath();
                                ctx.moveTo(dotA.x, dotA.y);
                                ctx.lineTo(mouse.x, mouse.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            // 4. Draw Dot Matrix (Grid with Twinkle, Wave & Cursor Boost)
            const timeSec = now * 0.001 * speed;
            const baseDotRadius = width < 768 ? 1.15 : 1.35;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                if (dot.edgeFactor <= 0) continue;

                // Subtle twinkle oscillation
                const twinkle = Math.sin(timeSec * dot.twinkleSpeed + dot.twinklePhase) * 0.08;
                let opacity = dot.baseOpacity + twinkle;
                let radius = baseDotRadius;
                let rVal = dotR;
                let gVal = dotG;
                let bVal = dotB;

                // Mouse Proximity Boost
                if (isDesktop && mouse.active) {
                    const distMouse = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
                    if (distMouse < mouse.radius) {
                        const mouseFactor = 1 - distMouse / mouse.radius;
                        // Smooth cubic easing
                        const ease = mouseFactor * mouseFactor * (3 - 2 * mouseFactor);
                        // Softer boost in light mode
                        opacity += ease * 0.55;
                        radius += ease * 1.1;

                        // Blend toward active accent color
                        rVal = Math.round(lerp(rVal, actR, ease));
                        gVal = Math.round(lerp(gVal, actG, ease));
                        bVal = Math.round(lerp(bVal, actB, ease));
                    }
                }

                // Wave Pulse Boost
                if (wave.active) {
                    const distWave = Math.hypot(dot.x - wave.x, dot.y - wave.y);
                    const diff = Math.abs(distWave - wave.radius);
                    if (diff < wave.width) {
                        const waveFactor = Math.cos((diff / wave.width) * (Math.PI / 2));
                        // Softer wave boost in light mode
                        const boost = waveFactor * 0.45;
                        opacity += boost;
                        radius += waveFactor * 0.5;

                        // Shift color toward wave accent
                        rVal = Math.round(lerp(rVal, actR, waveFactor * 0.7));
                        gVal = Math.round(lerp(gVal, actG, waveFactor * 0.7));
                        bVal = Math.round(lerp(bVal, actB, waveFactor * 0.7));
                    }
                }

                // Apply vignette edge fading & clamp opacity to prevent harsh contrast
                const finalOpacity = Math.max(0, Math.min(0.68, opacity * dot.edgeFactor));
                if (finalOpacity <= 0.01) continue;

                ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${finalOpacity})`;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const startLoop = () => {
            if (isReducedMotion) {
                drawStatic();
                return;
            }
            if (!animationFrameId) {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        const stopLoop = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        // Visibility Change (Pause when user switches tabs)
        const handleVisibilityChange = () => {
            isTabActive = !document.hidden;
            if (isTabActive) {
                startLoop();
            } else {
                stopLoop();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start
        startLoop();

        // --- Cleanup on Unmount ---
        return () => {
            stopLoop();
            clearTimeout(resizeTimer);
            observer.disconnect();
            motionQuery.removeEventListener('change', handleMotionChange);
            finePointerQuery.removeEventListener('change', handlePointerChange);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [density, speed, accentColor]);

    return (
        <div
            className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
            aria-hidden="true"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}

