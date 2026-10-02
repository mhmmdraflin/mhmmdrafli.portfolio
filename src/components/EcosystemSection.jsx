import toolsData from '../data/skills.json';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import { motion } from 'framer-motion';

export default function EcosystemSection() {
    const tools = toolsData;
    const { lang } = useLang();
    const t = translations[lang];

    if (tools.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>Skills data not available.</p>
        </div>
    );

    return (
        <section id="ecosystem" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">{t.ecosystem.tagline}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white mt-2 transition-colors duration-300">
                        {t.ecosystem.heading}
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        {t.ecosystem.subtitle}
                    </p>
                </div>

                {/* Tools Marquee */}
                <div className="glass-card dark:!bg-white/10 dark:!border-white/20 rounded-3xl py-8 md:py-10 overflow-hidden relative transition-colors duration-300">
                    {/* Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white/90 dark:from-[#0B1121]/90 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white/90 dark:from-[#0B1121]/90 to-transparent z-10 pointer-events-none"></div>

                    <div className="flex w-max">
                        <motion.div 
                            className="flex gap-4 pr-4"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                        >
                            {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
                                <div
                                    key={`${tool.name}-${index}`}
                                    title={tool.name}
                                    className={`flex flex-col items-center justify-center p-5 rounded-2xl ${tool.color_class} dark:!bg-white/20 border border-white/80 dark:!border-white/30 hover:scale-105 hover:shadow-lg active:scale-95 active:border-[#007AFF]/50 transition-all duration-300 cursor-pointer group min-w-[120px]`}
                                >
                                    <img
                                        src={getAssetPath(tool.icon_url?.startsWith('http') ? tool.icon_url : `assets/images/${tool.icon_url}`)}
                                        alt={tool.name}
                                        className={`w-12 h-12 mb-3 group-hover:scale-110 transition-transform ${tool.img_class || ''} ${['OpenAI', 'Claude', 'Gemini', 'GitHub'].includes(tool.name) ? 'dark:invert dark:brightness-200' : ''}`}
                                    />
                                    <span className="text-sm font-semibold text-[#1D1D1F] dark:text-white">{tool.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
