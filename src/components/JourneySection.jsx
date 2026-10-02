import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import journeyData from '../data/journey.json';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function JourneyModal({ item, isOpen, onClose, t, lang }) {
    const [isVisible, setIsVisible] = useState(false);



    useEffect(() => {
        let timeout;
        if (isOpen) {
            timeout = setTimeout(() => setIsVisible(true), 10);
            // LOCK DISABLED TEMPORARILY: To prevent "stuck" and "jump to home" issues on mobile.
            // document.body.style.overflow = 'hidden';
        } else {
            timeout = setTimeout(() => setIsVisible(false), 10);
            // document.body.style.overflow = '';
        }

        return () => {
            clearTimeout(timeout);
            // document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        // Delay calling onClose to allow animation to finish
        // The parent will then likely set isOpen false, or we call onClose which sets isOpen false
        setTimeout(onClose, 300);
    };

    if (!item && !isOpen) return null;

    const logoSrc = item.logo_url ? getAssetPath(`assets/images/${item.logo_url}`) : null;

    return createPortal(
        <div className={`fixed inset-0 z-[999] flex items-end md:items-center justify-center pointer-events-none`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 touch-none ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={handleClose}
                onTouchMove={(e) => e.preventDefault()}
            ></div>

            {/* Modal Content - Apple Style Sheet */}
            <div
                className={`w-full md:w-[600px] md:rounded-[2rem] rounded-t-[2rem] bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] max-h-[90vh] flex flex-col ${isVisible ? 'translate-y-0 scale-100 pointer-events-auto' : 'translate-y-full md:translate-y-10 md:scale-95 md:opacity-0 pointer-events-none'}`}
                // Stop propagation to prevent clicks/touches bubbling to backdrop or body logic if any
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag Handle (Mobile) */}
                <div className="w-full flex justify-center pt-3 pb-1 md:hidden" onClick={handleClose}>
                    <div className="w-12 h-1.5 rounded-full bg-gray-300/80"></div>
                </div>

                {/* Header with Logo */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center border-b border-gray-100/50">
                    {logoSrc && (
                        <div className="min-w-20 max-w-[200px] h-20 px-3 rounded-[1.5rem] bg-white shadow-lg shadow-black/5 flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                            <img src={logoSrc} alt={item.organization} className="max-h-14 max-w-full object-contain" />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{item.organization}</h2>
                    <p className="text-[#86868B] font-medium text-sm mt-1">{lang === 'id' ? item.title_id : item.title_en}</p>
                    {(item.association_id || item.association_en) && (
                        <p className="text-[#86868B] text-xs font-semibold uppercase tracking-wider mt-1.5">{lang === 'id' ? (item.association_id || item.association) : (item.association_en || item.association)}</p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                        <span className={`inline-block py-1.5 px-4 rounded-full text-xs font-semibold font-mono bg-gray-100 text-[#1D1D1F]/70 border border-gray-200/50`}>
                            {lang === 'id' ? item.period_id : item.period_en}
                        </span>
                        {item.is_current && (
                            <span className="text-[#007AFF] text-[10px] uppercase font-bold bg-blue-50 px-2 py-1 rounded-full border border-blue-100">{t.journey.current}</span>
                        )}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 md:p-8 overflow-y-auto overscroll-contain">
                    <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-wider mb-3">{t.journey.description}</h3>
                    <p className="text-[#1D1D1F] leading-relaxed text-[15px] font-normal mb-8 text-left">
                        {lang === 'id' ? item.description_id : item.description_en}
                    </p>

                    {item.tags && (
                        <>
                            <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-wider mb-3">{t.journey.skillsAndTech}</h3>
                            <div className="flex flex-wrap gap-2">
                                {(typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags).map((tag) => (
                                    <span key={tag} className="text-[13px] font-medium px-3 py-1.5 rounded-lg bg-gray-100/80 text-[#1D1D1F] border border-gray-200/50 shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer/Close (Mainly for desktop accessibility or clarity) */}
                <div className="p-4 border-t border-gray-100/50 flex justify-center md:hidden">
                    <button
                        onClick={handleClose}
                        className="w-full bg-[#007AFF] text-white font-bold py-3.5 rounded-2xl active:scale-95 transition-transform shadow-lg shadow-blue-500/30"
                    >
                        {t.journey.close}
                    </button>
                </div>
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100/50 hover:bg-gray-200/50 text-[#1D1D1F] transition-colors hidden md:flex"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
        </div>,
        document.body
    );
}

function TimelineItem({ item, onClick, t, lang }) {
    // Helper to resolve logo URL
    const logoSrc = item.logo_url ? getAssetPath(`assets/images/${item.logo_url}`) : null;

    return (
        <div onClick={() => onClick(item)} className="group timeline-item relative flex flex-col md:flex-row gap-3 md:gap-8 mb-8 md:mb-6 pl-8 md:pl-0">

            <div className="md:w-28 md:text-right pt-2 md:pt-4 flex-shrink-0">
                <span className={`inline-block py-1 px-3 rounded-full border shadow-sm text-[10px] md:text-xs font-semibold font-mono ${item.periodStyle || 'bg-white dark:bg-[#1A1A24] border-gray-200/80 dark:border-white/10 text-[#86868B] dark:text-white group-hover:bg-[#007AFF]/5 dark:group-hover:bg-[#007AFF]/20 group-hover:border-[#007AFF]/20 group-hover:text-[#007AFF] dark:group-hover:text-white transition-all duration-300'}`}>
                    {lang === 'id' ? item.period_id : item.period_en}
                </span>
            </div>

            <div className="flex-1 timeline-card rounded-2xl p-4 md:p-5 hover:shadow-md active:scale-[0.98] active:bg-blue-50/30 dark:active:bg-blue-900/30 transition-all duration-200 cursor-pointer border border-gray-100/50 dark:border-white/10 bg-white/50 dark:bg-white/5 md:bg-transparent md:dark:bg-transparent md:border-transparent md:dark:border-transparent">
                <div className="flex items-start gap-3 md:gap-4">
                    {/* Logo */}
                    {logoSrc && (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                            <img src={logoSrc} alt={item.organization} className="w-full h-full object-contain" />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-[#1D1D1F] dark:text-white mb-0.5 group-hover:text-[#007AFF] dark:group-hover:text-[#47A1FF] transition-colors truncate">
                            {lang === 'id' ? item.title_id : item.title_en}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs md:text-sm font-medium text-[#86868B] dark:text-white">
                            <span className="text-[#1D1D1F]/80 dark:text-white">{item.organization}</span>
                            {item.is_current ? (
                                <span className="text-[#007AFF] text-[9px] uppercase font-bold bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100 flex-shrink-0">{t.journey.current}</span>
                            ) : null}
                        </div>

                        {(item.association_id || item.association_en) && (
                            <h4 className="text-[10px] md:text-xs font-semibold text-[#86868B] mb-2 uppercase tracking-wide">
                                {lang === 'id' ? (item.association_id || item.association) : (item.association_en || item.association)}
                            </h4>
                        )}

                        <p className="text-xs md:text-sm leading-relaxed text-[#86868B] dark:text-white text-left line-clamp-3">{lang === 'id' ? item.description_id : item.description_en}</p>
                        <div className="md:hidden mt-2 flex items-center gap-1 text-[#007AFF] dark:text-[#47A1FF] text-xs font-medium">
                            <span>{t.journey.viewDetails}</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </div>

                        {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {(typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags).slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[#1D1D1F]/70 dark:text-white border border-gray-200 dark:border-white/10">
                                        {tag}
                                    </span>
                                ))}
                                {(typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags).length > 3 && (
                                    <span className="text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 text-[#86868B] dark:text-white border border-gray-100 dark:border-white/5">
                                        +{(typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags).length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineSection({ title, items, onItemClick, t, lang }) {
    return (
        <div className="mb-8 relative">
            <div className="mb-4 pl-10 md:pl-14">
                <span className="text-xs font-bold tracking-[0.15em] text-[#86868B] dark:text-white uppercase">
                    {title}
                </span>
            </div>
            {items.map((item) => (
                <TimelineItem key={item.id} item={item} onClick={onItemClick} t={t} lang={lang} />
            ))}
        </div>
    );
}

export default function JourneySection() {
    const { education, experience, achievements = [] } = journeyData;
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lang } = useLang();
    const t = translations[lang];

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Optional: Clear item after animation?
        // Actually keeping it is better for "kedip" prevention during exit.
        // But we can clear it when opening new one? No need.
    };

    if (education.length === 0 && experience.length === 0 && achievements.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>Journey data not available.</p>
        </div>
    );

    return (
        <section id="journey" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">{t.journey.tagline}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white mt-2 transition-colors duration-300">
                        {t.journey.heading}
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        {t.journey.subtitle}
                    </p>
                </div>

                {/* Timeline */}
                <div className="glass-card rounded-3xl p-6 md:p-10 relative bg-white/50 dark:bg-[#0B1121]/30 transition-colors duration-300 border-white/50 dark:border-white/10">
                    <div className="absolute left-[23px] md:left-[27px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-black/5 dark:from-white/5 via-[#1D1D1F]/20 dark:via-white/20 to-black/5 dark:to-white/5 rounded-full"></div>

                    <TimelineSection title={t.journey.education} items={education} onItemClick={handleItemClick} t={t} lang={lang} />
                    <TimelineSection title={t.journey.experience} items={experience} onItemClick={handleItemClick} t={t} lang={lang} />
                    {achievements.length > 0 && (
                        <TimelineSection title={t.journey.achievements} items={achievements} onItemClick={handleItemClick} t={t} lang={lang} />
                    )}
                </div>
            </div>

            {/* Detail Modal - Always mounted, controlled by isOpen */}
            <JourneyModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                t={t}
                lang={lang}
            />
        </section>
    );
}
