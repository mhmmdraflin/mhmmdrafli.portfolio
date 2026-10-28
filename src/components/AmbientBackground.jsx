import { useEffect, useState } from 'react';

/**
 * AmbientBackground - Cybersecurity / Computer Science Dot Grid Matrix
 * 
 * Purpose (R-07 & Anti-Slop):
 * Reflects technical Computer Science / Cybersecurity foundations with an ultra-clean,
 * restrained micro-dot matrix. A smooth radial mask fades the edges to keep the focus
 * on content, maintaining full contrast (WCAG AA R-25) and a refined, professional
 * aesthetic suitable for HR and recruiters.
 */
export default function AmbientBackground() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Respect reduced motion accessibility
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        // Only track fine pointer devices (desktops)
        const finePointer = window.matchMedia('(pointer: fine)');
        if (!finePointer.matches) return;

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            if (!isHovering) setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isHovering]);

    return (
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
            aria-hidden="true"
        >
            {/* Cybersecurity Dot Grid Layer with Smooth Radial Vignette Mask */}
            <div className="absolute inset-0 cyber-dot-grid cyber-dot-mask transition-opacity duration-700" />

            {/* Subtle Interactive Radar / Proximity Spotlight on Desktop */}
            {isHovering && (
                <div
                    className="absolute inset-0 transition-opacity duration-300 hidden md:block"
                    style={{
                        background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
                    }}
                />
            )}

            {/* Restrained Ambient Depth (Single focal accent, R-13 dose cap compliant) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] max-w-[95vw] h-[360px] bg-gradient-to-b from-[#007AFF]/[0.05] dark:from-cyan-500/[0.04] to-transparent rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
}
