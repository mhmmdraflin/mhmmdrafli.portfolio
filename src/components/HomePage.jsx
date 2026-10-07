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
    const rotateX = useSpring(0, { stiffness: 100, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 20 });

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
        // Reset to flat view
        rotateX.set(0);
        rotateY.set(0);
    }
    
    return (
        <div className="w-full flex justify-center lg:justify-end mx-auto lg:ml-auto lg:mr-0 perspective-1000" style={{ perspective: 1200 }}>
            <motion.div 
                className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[54/85.6] rounded-[2rem] overflow-hidden shadow-[16px_24px_50px_rgba(0,0,0,0.2)] dark:shadow-[16px_24px_50px_rgba(0,0,0,0.6)] border-[3px] border-[#1D1D1F] dark:border-white group"
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
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.5),
                            transparent 80%
                        )`
                    }}
                />

                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 brightness-[1.02] contrast-[1.05]"
                    style={{ backgroundImage: `url(${getAssetPath(`assets/images/${profile.avatar_url}`)})` }}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/40 to-transparent dark:from-black dark:via-black/50 dark:to-transparent z-10" />

                {/* Inner Shadow for Depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 dark:ring-white/20 rounded-[2rem] pointer-events-none z-30" />

                {/* Bottom Content Container */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 flex flex-col z-20">
                    {/* Status & Contact Card */}
                    <div className="flex flex-col gap-2.5 bg-white/20 dark:bg-black/50 backdrop-blur-xl border-t border-l border-white/40 dark:border-white/20 p-3.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] ring-1 ring-black/5 dark:ring-white/10">
                        <div className="flex items-start gap-2.5">
                            <div className="relative flex h-2 w-2 mt-1 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                            <div className="text-left flex-1 flex flex-col">
                                <h3 className="text-white text-[13px] md:text-[14px] font-bold tracking-tight leading-tight mb-0.5 text-balance">
                                    {profile.name}
                                </h3>
                                <p className="text-gray-300/90 text-[10px] md:text-[11px] font-medium mb-2">
                                    {profile.role}
                                </p>
                                <p className="text-green-400 text-[8.5px] uppercase font-extrabold tracking-[0.15em] leading-none mt-auto">
                                    Online
                                </p>
                            </div>
                        </div>
                        <a href="#contact" className="w-full py-2 mt-0.5 text-center bg-white/95 hover:bg-white text-[#1D1D1F] text-[11px] font-extrabold rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5">
                            Contact Me
                        </a>
                    </div>
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
                        <div className="mb-3 relative z-20">
                            <h1 className="text-[38px] sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#1D1D1F] dark:text-white leading-[1.15] md:leading-[1.1] text-balance max-w-2xl">
                                <TypewriterText text={`${t.home.greeting}${profile.name}`} />
                                <motion.span 
                                    className="text-[#007AFF] inline-block ml-1"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
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
                    <div className="flex flex-col sm:flex-row justify-start gap-3 w-full">
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-7 py-4 bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] rounded-xl font-extrabold text-[15px] tracking-wide border border-transparent hover:-translate-y-0.5 transition-all shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.12)] flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#007AFF] active:scale-[0.98]"
                        >
                            {t.home.viewProjects}
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
                        <button
                            onClick={onOpenCV}
                            className="w-full sm:w-auto px-7 py-4 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-[#1D1D1F] dark:text-white rounded-xl border border-gray-200 dark:border-white/10 font-extrabold text-[15px] tracking-wide transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#007AFF] active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                            {t.home.viewCV}
                        </button>
                    </div>
                </div>

                {/* Right Column: Hero Graphic / Mockups */}
                <div className="w-full flex items-center justify-center lg:justify-end mt-10 md:mt-14 lg:mt-0 relative order-1 lg:order-2 mb-10 md:mb-14 lg:mb-0">
                    <HeroProfileCard />
                </div>
            </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="w-full max-w-7xl mx-auto py-12 md:py-24 px-6 relative z-10">
            {/* The outer card has overflow-hidden so the lanyard looks like it's attached to the top edge of this card */}
            <div className="relative rounded-3xl bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden">
                {/* Inner Card */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-12 p-8 md:p-14">
                    
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
                    {/* Compact container to prevent huge gaps. Desktop height adapts to the left column. */}
                    <div className="w-full md:w-[320px] h-[310px] md:h-auto relative flex items-start md:items-center justify-center order-1 md:order-2 mt-2 md:mt-0 mb-4 md:mb-0">
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
                            className="absolute top-10 md:-top-4 lg:top-0 origin-top z-10"
                        >
                            <div className="scale-[0.6] md:scale-[0.8] lg:scale-[0.85] origin-top pointer-events-none">
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
