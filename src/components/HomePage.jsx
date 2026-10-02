import profileData from '../data/profile.json';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import LanyardBadge from './home/LanyardBadge';
import { motion } from 'framer-motion';

export default function HomePage({ onOpenCV }) {
    const profile = profileData;
    const { lang } = useLang();
    const t = translations[lang];

    // Fallback if profile data is missing
    if (!profile) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-500 gap-4">
            <p className="text-xl font-bold">Failed to load profile data.</p>
        </div>
    );

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative z-10 pt-24 pb-16 px-6 overflow-hidden">
            
            {/* Abstract Graphic for Visual Balance on Right Side */}
            <div className="absolute right-[-5%] top-[25%] opacity-[0.03] dark:opacity-50 pointer-events-none hidden xl:block select-none z-0 transition-opacity duration-500">
                <span className="font-mono font-black text-[#1D1D1F] dark:text-transparent dark:[-webkit-text-stroke:4px_#007AFF] dark:[text-shadow:0_0_20px_#007AFF,0_0_50px_#007AFF] transition-all duration-500" style={{ fontSize: '40rem', lineHeight: 1 }}>{'}'}</span>
            </div>
            
            {/* Lanyard Badge placed exactly under the navbar logos */}
            <div className="absolute top-[100px] md:top-[180px] left-0 w-full pointer-events-none z-0">
                <div className="max-w-7xl mx-auto px-6 relative h-0">
                    <motion.div 
                        className="absolute top-0 left-0 pointer-events-auto ml-[10px] md:-ml-[118px]"
                        whileInView="visible"
                        initial="hidden"
                        viewport={{ once: false }}
                    >
                        <motion.div
                            variants={{
                                hidden: { y: -1000, rotate: -5 },
                                visible: { 
                                    y: 0, 
                                    rotate: 0, 
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 80, 
                                        damping: 12,
                                        mass: 1.2,
                                        delay: 0.2
                                    } 
                                }
                            }}
                        >
                            <div className="scale-[0.45] md:scale-100 origin-top-left md:origin-center">
                                <LanyardBadge profile={profile} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
                {/* Avatar */}
                <div className="mb-8 animate-fade-in-up relative flex justify-center items-center">
                    <div className="relative inline-block z-10">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] p-1.5 shadow-xl shadow-primary/30">
                            <div
                                className="w-full h-full rounded-full bg-cover bg-center border-4 border-white"
                                style={{
                                    backgroundImage: `url(${getAssetPath(`assets/images/${profile.avatar_url}`)})`
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-[4px] border-white shadow-lg"></div>
                    </div>
                </div>

                {/* Name & Role */}
                <div className="mb-6 relative z-10">
                    <div className="mb-3 relative z-20 pt-2 pb-1 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white leading-tight transition-colors duration-300 inline">
                            {profile.name}
                        </h1>
                        <motion.span 
                            className="text-4xl md:text-6xl font-extrabold text-[#007AFF] ml-1 inline-block translate-y-[2px]"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            _
                        </motion.span>
                    </div>
                    
                    <motion.p 
                        className="text-xl md:text-2xl font-medium text-[#007AFF]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                        {profile.role}
                    </motion.p>
                    <p className="text-md md:text-lg text-[#86868B] mt-2 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[18px] text-red-500">location_on</span> Kutai Kartanegara, Kalimantan Timur, Indonesia
                    </p>
                </div>

                {/* Tagline */}
                <div className="max-w-xl mx-auto mb-10 text-left md:text-center animate-fade-in-up relative z-30 pointer-events-none mix-blend-difference dark:mix-blend-normal" style={{ animationDelay: '0.2s' }}>
                    <p className="text-lg md:text-xl text-[#797974] dark:text-[#A1A1A6] font-normal leading-relaxed transition-colors duration-300">
                        {t.home.aboutText}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glass-card dark:!bg-white/10 dark:!border-white/20 px-6 py-4 rounded-2xl text-center min-w-[120px] transition-colors duration-300">
                        <div className="text-3xl font-bold text-[#007AFF] dark:text-[#47A1FF]">{profile.total_projects}</div>
                        <div className="text-sm text-[#86868B] dark:text-white font-medium">{t.home.projects}</div>
                    </div>
                    <div className="glass-card dark:!bg-white/10 dark:!border-white/20 px-6 py-4 rounded-2xl text-center min-w-[120px] transition-colors duration-300">
                        <div className="text-3xl font-bold text-[#5856D6] dark:text-[#7b78ff]">{profile.certificates_count}</div>
                        <div className="text-sm text-[#86868B] dark:text-white font-medium">{t.home.certificate}</div>
                    </div>
                    <div className="glass-card dark:!bg-white/10 dark:!border-white/20 px-6 py-4 rounded-2xl text-center min-w-[120px] transition-colors duration-300">
                        <div className="text-3xl font-bold text-[#34C759] dark:text-[#4ADE80]">{profile.tech_tools_count}</div>
                        <div className="text-sm text-[#86868B] dark:text-white font-medium">{t.home.techTools}</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-[#007AFF] hover:bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-[#007AFF]/30 hover:shadow-[#007AFF]/40 transition-all flex items-center justify-center gap-2 group"
                    >
                        {t.home.viewProjects}
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <button
                        onClick={onOpenCV}
                        className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-[#1D1D1F] rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        {t.home.viewCV}
                    </button>
                </div>


            </div>
        </section>
    );
}
