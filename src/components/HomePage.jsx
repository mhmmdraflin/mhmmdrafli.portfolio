import profileData from '../data/profile.json';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import LanyardBadge from './home/LanyardBadge';
import { motion, useMotionValue, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
function TypewriterText({ text, delay = 60 }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        let isTyping = true;
        let timeout;

        const loop = () => {
            if (isTyping) {
                if (currentIndex <= text.length) {
                    setDisplayed(text.slice(0, currentIndex));
                    currentIndex++;
                    timeout = setTimeout(loop, delay + Math.random() * 20);
                } else {
                    isTyping = false;
                    timeout = setTimeout(loop, 4000); // Hold the full text longer
                }
            } else {
                if (currentIndex === 0) {
                    isTyping = true;
                    timeout = setTimeout(loop, 500); // Brief pause before retyping
                } else {
                    setDisplayed(text.slice(0, currentIndex));
                    currentIndex--;
                    timeout = setTimeout(loop, 25); // Fast delete speed
                }
            }
        };

        timeout = setTimeout(loop, 100);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <>{displayed}</>;
}

function HeroProfileCard() {
    const profile = profileData;
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring values for 3D tilt
    const rotateX = useSpring(5, { stiffness: 100, damping: 20 });
    const rotateY = useSpring(-15, { stiffness: 100, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        mouseX.set(x);
        mouseY.set(y);

        // Normalize coordinates from -0.5 to 0.5
        const normalizedX = (x / width) - 0.5;
        const normalizedY = (y / height) - 0.5;

        // Apply tilt (reverse Y so mouse up tilts card up)
        rotateX.set(normalizedY * -20);
        rotateY.set(normalizedX * 20);
    }

    function handleMouseLeave() {
        setIsHovered(false);
        // Reset to initial isometric-like view
        rotateX.set(5);
        rotateY.set(-15);
    }
    
    return (
        <div className="w-full flex justify-center lg:justify-end mx-auto lg:ml-auto lg:mr-0 perspective-1000" style={{ perspective: 1200 }}>
            <motion.div 
                className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[54/85.6] rounded-2xl overflow-hidden shadow-[20px_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/10 group"
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {/* Cursor Glare Overlay */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: useMotionTemplate`radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.4),
                            transparent 80%
                        )`
                    }}
                />

                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${getAssetPath(`assets/images/${profile.avatar_url}`)})` }}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/80 via-transparent to-[#1D1D1F]/90 dark:from-black/80 dark:to-black/90 z-10" />

                {/* Top Content: Name & Role */}
                <div className="absolute top-0 left-0 w-full p-6 md:p-8 text-left z-20">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                        {profile.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 font-medium mt-1">
                        {profile.role}
                    </p>
                </div>

                {/* Bottom Content: Status & Contact */}
                <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 flex flex-col gap-3 bg-[#1D1D1F] dark:bg-black/60 border border-white/10 p-3.5 md:p-4 rounded-xl shadow-lg z-20">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <div className="text-left flex-1">
                            <p className="text-white text-xs md:text-sm font-bold leading-none mb-1">@mhmmdraflin</p>
                            <p className="text-green-400 text-[9px] md:text-[10px] uppercase font-bold tracking-wider leading-none">Online</p>
                        </div>
                    </div>
                    <a href="#contact" className="w-full py-2 text-center bg-white text-[#1D1D1F] text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors border border-transparent cursor-pointer">
                        Contact Me
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

export default function HomePage({ onOpenCV }) {
    const profile = profileData;
    const { lang } = useLang();
    const t = translations[lang];

    // Lanyard physics state
    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);
    const lanyardRotate = useTransform(dragX, [-200, 200], [-25, 25]);

    // Fallback if profile data is missing
    if (!profile) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-500 gap-4">
            <p className="text-xl font-bold">Failed to load profile data.</p>
        </div>
    );

    return (
        <main className="w-full">
            <section id="home" className="min-h-screen flex flex-col justify-center items-center relative z-10 pt-32 pb-16 px-6">
            

            


            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10 relative">
                {/* Left Column: Text & Profile */}
                <div className="flex flex-col items-start justify-center w-full order-2 lg:order-1">


                    {/* Name & Role */}
                    <div className="mb-5 relative z-10 w-full text-left">
                        <div className="mb-2 relative z-20">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white leading-tight">
                                <TypewriterText text={`${t.home.greeting}${profile.name}`} />
                                <motion.span 
                                    className="text-[#007AFF] ml-1 inline-block"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    _
                                </motion.span>
                            </h1>
                        </div>
                        
                        <motion.p 
                            className="text-lg md:text-xl lg:text-2xl font-semibold text-[#007AFF] mb-3 text-left"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            {profile.role}
                        </motion.p>
                        <p className="text-sm md:text-base text-[#86868B] flex items-center justify-start gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px] md:text-[18px] text-red-500">location_on</span> Kutai Kartanegara, Kalimantan Timur, Indonesia
                        </p>
                    </div>

                    {/* Tagline */}
                    <div className="max-w-xl mb-10 text-left relative z-30">
                        <p className="text-base md:text-lg text-[#333333] dark:text-[#E5E5EA] font-medium leading-relaxed">
                            {t.home.aboutText}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-start gap-4 w-full">
                        <a
                            href="#projects"
                            className="px-6 py-3.5 bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] rounded-md font-bold text-sm tracking-wide border border-transparent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#007AFF]"
                        >
                            {t.home.viewProjects}
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
                        <button
                            onClick={onOpenCV}
                            className="px-6 py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#1D1D1F] dark:text-white rounded-md border border-gray-200 dark:border-white/10 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#007AFF]"
                        >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                            {t.home.viewCV}
                        </button>
                    </div>
                </div>

                {/* Right Column: Hero Graphic / Mockups */}
                <div className="w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0 relative order-1 lg:order-2 mb-12 lg:mb-0">
                    <HeroProfileCard />
                </div>
            </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="w-full max-w-7xl mx-auto py-12 md:py-24 px-6 relative z-10">
            <div className="relative rounded-xl bg-white dark:bg-[#0B1121] border border-gray-200 dark:border-white/10 overflow-hidden">
                {/* Inner Card */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-14">
                    
                    {/* Left Col (Text & Stats) */}
                    <div className="flex-1 flex flex-col justify-center space-y-8 z-20 order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] dark:text-white tracking-tight">{t.home.aboutMeHeading}</h2>
                        <div className="text-[#333333] dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-4 font-medium max-w-2xl">
                            <p>
                                {t.home.aboutMeBody}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200 dark:border-white/10">
                            <div>
                                <div className="text-4xl font-black text-[#007AFF]">5+</div>
                                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">{t.home.statsProjects}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-[#5856D6]">15+</div>
                                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">{t.home.statsTools}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-[#34C759]">12+</div>
                                <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">{t.home.statsCerts}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col (Lanyard) */}
                    <div className="w-full md:w-[300px] h-[350px] md:h-auto relative flex items-start justify-center order-1 md:order-2">
                        <motion.div
                            style={{ 
                                x: dragX, 
                                y: dragY, 
                                rotate: lanyardRotate,
                                transformOrigin: "top center",
                                cursor: "grab"
                            }}
                            drag
                            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                            dragElastic={0.6}
                            whileTap={{ cursor: "grabbing" }}
                            className="absolute top-0 origin-top z-10"
                        >
                            <div className="scale-[0.6] md:scale-90 origin-top pointer-events-none">
                                <LanyardBadge profile={profile} />
                            </div>
                        </motion.div>
                    </div>
                    
                </div>
            </div>
        </section>
        </main>
    );
}
