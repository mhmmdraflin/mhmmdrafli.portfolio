import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function LanyardBadge({ profile }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth the motion values for the 3D rotation and stretch
    const springConfig = { damping: 12, stiffness: 150, mass: 1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    
    // Rotate based on dragging X and Y to create a 3D tilt effect
    const rotateY = useTransform(springX, [-150, 150], [-35, 35]);
    const rotateX = useTransform(springY, [-150, 150], [20, -20]);

    // Base strap height when resting. We make it very long so it reaches the top of the browser.
    const baseStrapHeight = 800; 
    
    // The strap height grows perfectly with Y drag, so it never detaches from the clip
    const strapHeight = useTransform(y, (latestY) => baseStrapHeight + Math.max(0, latestY));

    // To keep the top of the strap visually fixed at X=0 while the bottom moves to X=x
    // we calculate the rotation angle. angle = atan(x / height)
    const strapRotate = useTransform([springX, strapHeight], ([latestX, latestHeight]) => {
        return (Math.atan2(latestX, latestHeight) * 180) / Math.PI;
    });

    // Dynamic light reflection gloss based on movement
    const glossOpacity = useTransform(y, [-50, 150], [0, 0.4]);

    const AndroidIcon = () => (
        <svg className="w-6 h-6 opacity-90" viewBox="0 0 24 24" fill="#3DDC84">
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592c.1158-.2018.0468-.4583-.1554-.5745-.203-.1165-.4583-.0464-.5745.1554l-2.0299 3.5152c-1.4283-.6557-3.0374-1.0205-4.7335-1.0205s-3.3052.3648-4.7335 1.0205l-2.0299-3.5152c-.1161-.2022-.3715-.2716-.5745-.1554-.2026.1158-.2716.3723-.1554.5745l1.9973 3.4592c-2.909 1.5898-4.8876 4.5445-5.2646 8.0435h21.521c-.3771-3.499-2.3556-6.4537-5.2645-8.0435z"/>
        </svg>
    );

    return (
        <div style={{ perspective: 1200 }} className="flex flex-col items-center group pointer-events-none drop-shadow-2xl relative w-72">
            
            {/* The draggable badge container */}
            <motion.div
                className="flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing relative"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: -20, right: 20 }}
                dragElastic={{ top: 0.1, bottom: 0.8, left: 0.3, right: 0.3 }}
                style={{
                    x,
                    y,
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{ rotateZ: [-2.5, 2.5, -2.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* The Absolute Strap that perfectly tracks the badge */}
                <motion.div 
                    className="w-12 bg-[#0a0a0a] flex flex-col items-center justify-end overflow-hidden shadow-xl absolute pointer-events-none"
                    style={{ 
                        bottom: '100%', 
                        marginBottom: -12, // overlap slightly to ensure no gap with the clip
                        height: strapHeight,
                        originY: 1, // rotate from the bottom where it connects to the clip
                        rotateZ: strapRotate,
                    }}
                >
                    {/* Icons spaced out inside the strap */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-12 opacity-80">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <AndroidIcon key={i} />
                        ))}
                    </div>
                </motion.div>

                {/* Clip Mechanism */}
                <div className="flex flex-col items-center relative z-20" style={{ transform: 'translateZ(15px)' }}>
                    <div className="w-12 h-3 bg-[#0a0a0a] rounded-b-md shadow-[0_4px_6px_rgba(0,0,0,0.6)] border border-white/5"></div>
                    <div className="w-6 h-8 border-[3px] border-zinc-400 rounded-[6px] -mt-0.5 z-10 shadow-[0_4px_8px_rgba(0,0,0,0.4)]"></div>
                    <div className="w-2 h-4 bg-zinc-400 rounded-b-sm -mt-0.5 z-0 shadow-inner"></div>
                </div>

                {/* The ID Badge (Enlarged per request) */}
                <div 
                    className="w-64 h-[340px] bg-[#0a0a0a] rounded-[18px] p-7 flex flex-col justify-between text-left text-white relative border border-white/10 mt-1 overflow-hidden"
                    style={{ 
                        transform: 'translateZ(30px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(255,255,255,0.02)' 
                    }}
                >
                    {/* Glossy reflection overlay for 3D effect */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 pointer-events-none"
                        style={{ opacity: glossOpacity }}
                    />

                    {/* Hole punch in the card */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-2 bg-[#f5f5f7] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.6)] z-10"></div>
                    
                    <div className="mt-8 relative z-10">
                        <div className="font-mono text-2xl font-bold tracking-widest text-white drop-shadow-md">DEV.</div>
                        <div className="text-[12px] text-gray-400 mt-2.5 leading-relaxed font-medium font-mono uppercase tracking-widest">
                            {profile.role}
                        </div>
                    </div>
                    
                    <div className="text-[12px] font-mono tracking-widest text-white/95 uppercase mt-auto break-words leading-relaxed relative z-10">
                        {profile.name}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
