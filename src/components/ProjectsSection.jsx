import React, { useState } from 'react';
import projectsData from '../data/projects.json';
import PhoneMockup from './PhoneMockup';
import { getAssetPath } from '../utils/assets';

// Helper to get dynamic classes for mobile animation + desktop hover
const getLeftPhoneClasses = (isMobileExpanded) => {
    const base = "absolute z-10 transform -translate-x-16 md:-translate-x-32 translate-y-8 -rotate-y-[25deg] rotate-z-[-5deg] transition-all duration-700 ease-out hover:!z-20";
    const desktopHover = "md:group-hover/phones:-translate-x-40 md:group-hover/phones:rotate-y-[-15deg] md:group-hover/phones:scale-90";
    return `${base} ${desktopHover}`;
};

const getRightPhoneClasses = (isMobileExpanded) => {
    const base = "absolute z-10 transform translate-x-16 md:translate-x-32 translate-y-8 rotate-y-[25deg] rotate-z-[5deg] transition-all duration-700 ease-out hover:!z-20";
    const desktopHover = "md:group-hover/phones:translate-x-40 md:group-hover/phones:rotate-y-[15deg] md:group-hover/phones:scale-90";
    return `${base} ${desktopHover}`;
};

const ProjectItem = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

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
            return "absolute z-30 transition-all duration-500 shadow-2xl drop-shadow-2xl animate-float scale-100 opacity-100 translate-x-0"; // Center
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
                    className="relative w-full h-[550px] md:h-[600px] flex items-center justify-center perspective-[1200px] group/phones transform md:scale-100 scale-[0.85] transition-transform duration-500 mb-12 md:mb-0"
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
                                Swipe to Rotate
                            </div>
                        </>
                    ) : (
                        <div className="group-hover:scale-105 transition-transform duration-700 ease-out animate-float">
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
                            alt={project.title}
                            className="w-8 h-8 object-contain"
                        />
                    ) : (
                        <span className="material-symbols-outlined text-[#007AFF] text-3xl">{project.icon}</span>
                    )}
                    <span className="text-xs font-bold tracking-widest text-[#86868B] uppercase border border-gray-200 px-2 py-1 rounded bg-white">
                        {project.year}
                    </span>
                    {project.status && (
                        <span className="text-xs font-bold tracking-widest text-amber-500 uppercase border border-amber-200 px-2 py-1 rounded bg-amber-50/50">
                            {project.status}
                        </span>
                    )}
                </div>

                {project.association && (
                    <h4 className="mt-1 text-[#86868B] text-[10px] font-bold uppercase tracking-wide max-w-xs mx-auto md:mx-0">
                        {project.association}
                    </h4>
                )}

                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F]">
                        {project.title}
                    </h3>
                </div>
                <p className="text-[#007AFF] font-semibold text-lg mb-4">{project.subtitle}</p>
                <p className="text-[#86868B] text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                    {project.techStack && project.techStack.map((tech) => (
                        <span
                            key={tech.name}
                            className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm ${tech.color}`}
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function ProjectsSection({ onViewCaseStudy }) {
    const projects = projectsData;

    if (projects.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>No projects found.</p>
        </div>
    );

    return (
        <section id="projects" className="py-12 md:py-20 px-6 relative z-10" >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">Featured Work</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mt-2">
                        My Projects
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        A selection of mobile applications I've designed and developed.
                    </p>
                </div>

                {/* Projects Stack */}
                <div className="space-y-16 md:space-y-32">
                    {projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
