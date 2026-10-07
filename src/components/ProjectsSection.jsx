import React, { useState } from 'react';
import projectsData from '../data/projects.json';
import webProjectsData from '../data/webProjects.json';
import PhoneMockup from './PhoneMockup';
import LaptopMockup from './LaptopMockup';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

// Helper to get dynamic classes for mobile animation + desktop hover
const getLeftPhoneClasses = () => {
    const base = "absolute z-10 transform -translate-x-16 md:-translate-x-32 translate-y-8 -rotate-y-[25deg] rotate-z-[-5deg] transition-all duration-700 ease-out hover:!z-20";
    const desktopHover = "md:group-hover/phones:-translate-x-40 md:group-hover/phones:rotate-y-[-15deg] md:group-hover/phones:scale-90";
    return `${base} ${desktopHover}`;
};

const getRightPhoneClasses = () => {
    const base = "absolute z-10 transform translate-x-16 md:translate-x-32 translate-y-8 rotate-y-[25deg] rotate-z-[5deg] transition-all duration-700 ease-out hover:!z-20";
    const desktopHover = "md:group-hover/phones:translate-x-40 md:group-hover/phones:rotate-y-[15deg] md:group-hover/phones:scale-90";
    return `${base} ${desktopHover}`;
};

const ProjectItem = ({ project, index, t, lang, onViewCaseStudy }) => {
    const isEven = index % 2 === 0;

    // Swipe refs
    const touchStartX = React.useRef(null);
    const touchEndX = React.useRef(null);

    // State for the "rotation" of the phone slots.
    const [rotationOffset, setRotationOffset] = useState(0);

    // Helpers
    const getProjectImages = (project) => {
        if (!project.images) return null;
        const prependPath = (img) => {
            if (!img) return null;
            if (img.startsWith('http')) return img;
            const cleanImg = img.replace(/^(\/?assets\/images\/)/, '');
            return getAssetPath(`assets/images/${cleanImg}`);
        };
        return Array.isArray(project.images) ? project.images.map(prependPath) : prependPath(project.images);
    };

    const projectImages = getProjectImages(project) || [];
    const isMulti = Array.isArray(projectImages);
    const imagesList = isMulti ? projectImages : [projectImages];

    // Determine which image goes to which slot based on rotationOffset
    const normalizedImages = isMulti && imagesList.length === 2 ? [...imagesList, imagesList[0]] : imagesList;
    const workingImages = isMulti ? normalizedImages : [imagesList[0]];

    const getSlotClass = (imageIndex) => {
        const count = workingImages.length;
        const effectivePos = (imageIndex - rotationOffset) % count;
        const normalizedPos = effectivePos < 0 ? effectivePos + count : effectivePos;

        if (normalizedPos === 0) {
            return "absolute z-30 transition-all duration-500 scale-100 opacity-100 translate-x-0"; // Center
        } else if (normalizedPos === 1) {
            return getRightPhoneClasses(); // Right
        } else {
            return getLeftPhoneClasses(); // Left
        }
    };

    // Swipe Logic
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setRotationOffset((prev) => prev + 1);
        }
        if (isRightSwipe) {
            setRotationOffset((prev) => prev - 1);
        }
    };

    return (
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 group`}>
            {/* Phone Mockup Side */}
            <div className="flex-1 w-full max-w-md md:max-w-none flex justify-center perspective-[2000px]">

                {/* Unified 3D Responsive View */}
                <div
                    className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[1200px] group/phones transform md:scale-100 scale-[0.75] transition-transform duration-500 mb-8 md:mb-0"
                    onTouchStart={isMulti ? onTouchStart : undefined}
                    onTouchMove={isMulti ? onTouchMove : undefined}
                    onTouchEnd={isMulti ? onTouchEnd : undefined}
                >
                    {isMulti ? (
                        <>
                            {/* Render permanent phones for each image, animate their positions */}
                            {workingImages.slice(0, 3).map((img, idx) => (
                                <div key={idx} className={`${getSlotClass(idx)} transition-all duration-500 ease-in-out`}>
                                    <PhoneMockup project={{ ...project, image: img }} />
                                </div>
                            ))}

                            {/* Mobile Instruction Hint */}
                            <div className="absolute -bottom-8 md:hidden text-gray-400 text-xs tracking-widest uppercase animate-pulse flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">swipe</span>
                                {t.projects.swipeToRotate}
                            </div>
                        </>
                    ) : (
                        <div className="group-hover:scale-105 transition-transform duration-700 ease-out">
                            <PhoneMockup project={{ ...project, image: imagesList[0] }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 text-center md:text-left px-4 md:px-0">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    {project.icon && project.icon.includes('.') ? (
                        <img
                            src={getAssetPath(`assets/images/${project.icon}`)}
                            alt={lang === 'id' ? (project.title_id || project.title) : (project.title_en || project.title)}
                            className="w-8 h-8 object-contain"
                        />
                    ) : (
                        <span className="material-symbols-outlined text-[#007AFF] text-3xl">{project.icon}</span>
                    )}
                    <span className="text-xs font-bold tracking-widest text-[#86868B] uppercase border border-gray-200 px-2 py-1 rounded bg-white">
                        {project.year}
                    </span>
                    {project.status === 'In Progress' ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-md">
                            <span className="material-symbols-outlined text-[10px] text-white font-bold animate-spin">sync</span>
                            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                                {project.status}
                            </span>
                        </div>
                    ) : project.status && (
                        <span className="text-xs font-bold tracking-widest text-amber-500 uppercase border border-amber-200 px-2 py-1 rounded bg-amber-50/50">
                            {project.status}
                        </span>
                    )}
                </div>

                {(project.association_id || project.association_en) && (
                    <h4 className="mt-1 text-[#86868B] text-[10px] font-bold uppercase tracking-wide max-w-xs mx-auto md:mx-0">
                        {lang === 'id' ? (project.association_id || project.association) : (project.association_en || project.association)}
                    </h4>
                )}

                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] dark:text-white transition-colors duration-300">
                        {lang === 'id' ? (project.title_id || project.title) : (project.title_en || project.title)}
                    </h3>
                </div>
                <p className="text-[#007AFF] font-semibold text-lg mb-4">{lang === 'id' ? project.subtitle_id : project.subtitle_en}</p>
                <p className="text-[#86868B] text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                    {lang === 'id' ? project.description_id : project.description_en}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                    {project.techStack && project.techStack.map((tech) => {
                        const dotColor = tech.color ? tech.color.replace('text-', 'bg-') : 'bg-gray-400';
                        return (
                            <span
                                key={tech.name}
                                className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-full shadow-sm"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                                {tech.name}
                            </span>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                    {onViewCaseStudy && (
                        <button
                            onClick={() => onViewCaseStudy(project)}
                            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
                        >
                            {lang === 'id' ? 'Detail Proyek' : 'Project Details'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const WebProjectItem = ({ project, index, t, lang, onViewCaseStudy }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 group`}>
            {/* Laptop Mockup Side */}
            <div className="flex-1 w-full max-w-xl md:max-w-none flex justify-center perspective-[2000px] mb-8 md:mb-0">
                <LaptopMockup project={{ ...project, image: project.image ? getAssetPath(`assets/images/${project.image}`) : null }} />
            </div>

            {/* Content Side */}
            <div className="flex-1 text-center md:text-left px-4 md:px-0">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="material-symbols-outlined text-[#007AFF] text-3xl">{project.icon}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-widest text-[#86868B] dark:text-gray-400 uppercase border border-gray-200 dark:border-white/10 px-2.5 py-1 rounded-md bg-white dark:bg-[#1A2133] shadow-sm">
                            {project.year}
                        </span>
                        {project.status && (
                            <span className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm border ${
                                project.status.toLowerCase() === 'beta' 
                                    ? 'bg-orange-50 text-orange-600 border-orange-200' 
                                    : 'bg-blue-50 text-blue-600 border-blue-200'
                            }`}>
                                {project.status}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F] dark:text-white transition-colors duration-300">
                        {lang === 'id' ? (project.title_id || project.title) : (project.title_en || project.title)}
                    </h3>
                </div>
                <p className="text-[#007AFF] font-semibold text-lg mb-4">{lang === 'id' ? project.subtitle_id : project.subtitle_en}</p>
                <p className="text-[#86868B] text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                    {lang === 'id' ? project.description_id : project.description_en}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                    {project.techStack && project.techStack.map((tech) => {
                        const dotColor = tech.color ? tech.color.replace('text-', 'bg-') : 'bg-gray-400';
                        return (
                            <span
                                key={tech.name}
                                className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-full shadow-sm"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                                {tech.name}
                            </span>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                    {onViewCaseStudy && (
                        <button
                            onClick={() => onViewCaseStudy(project)}
                            className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
                        >
                            {lang === 'id' ? 'Detail Proyek' : 'Project Details'}
                        </button>
                    )}
                    {project.liveDemo && (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#007AFF] text-white rounded-full font-semibold text-sm hover:scale-105 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30"
                        >
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ProjectsSection({ onViewCaseStudy }) {
    const projects = projectsData;
    const { lang } = useLang();
    const t = translations[lang];

    const [activeTab, setActiveTab] = useState(() => {
        if (typeof sessionStorage !== 'undefined') {
            return sessionStorage.getItem('projectsActiveTab') || 'phone';
        }
        return 'phone';
    });

    const changeTab = (tab) => {
        setActiveTab(tab);
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('projectsActiveTab', tab);
        }
    };

    if (projects.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>No projects found.</p>
        </div>
    );

    return (
        <section id="projects" className="py-12 md:py-20 px-6 relative z-10" >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">{t.projects.tagline}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white mt-2 transition-colors duration-300">
                        {t.projects.heading}
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        {t.projects.subtitle}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center items-center gap-3 mb-12 md:mb-20">
                    <button 
                        onClick={() => changeTab('phone')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-sm transition-all duration-300 ${activeTab === 'phone' ? 'bg-[#007AFF] text-white' : 'bg-gray-100 dark:bg-white/5 text-[#86868B] hover:bg-gray-200 dark:hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-lg">smartphone</span>
                        Mobile
                    </button>
                    <button 
                        onClick={() => changeTab('laptop')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-sm transition-all duration-300 ${activeTab === 'laptop' ? 'bg-[#007AFF] text-white' : 'bg-gray-100 dark:bg-white/5 text-[#86868B] hover:bg-gray-200 dark:hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-lg">laptop_mac</span>
                        Web
                    </button>
                </div>

                {/* Projects Content */}
                {activeTab === 'phone' ? (
                    <div className="space-y-16 md:space-y-32">
                        {projects.map((project, index) => (
                            <ProjectItem key={project.id} project={project} index={index} t={t} lang={lang} onViewCaseStudy={onViewCaseStudy} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-16 md:space-y-32">
                        {webProjectsData.length > 0 ? (
                            webProjectsData.map((project, index) => (
                                <WebProjectItem key={project.id} project={project} index={index} t={t} lang={lang} onViewCaseStudy={onViewCaseStudy} />
                            ))
                        ) : (
                            <div className="py-20 text-center animate-fade-in">
                                <div className="w-24 h-24 mx-auto mb-6 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-[#007AFF]">construction</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-white mb-3">
                                    {lang === 'id' ? 'Pengembangan Web Sedang Disiapkan' : 'Web Development Projects Coming Soon'}
                                </h3>
                                <p className="text-[#86868B] max-w-lg mx-auto">
                                    {lang === 'id' 
                                        ? 'Saat ini, portofolio pengembangan web sedang dalam tahap penyempurnaan untuk menampilkan karya terbaik saya secara profesional. Silakan kembali lagi nanti untuk melihat pembaruannya.' 
                                        : 'My web development portfolio is currently being refined to showcase my best work professionally. Please check back later for updates.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
