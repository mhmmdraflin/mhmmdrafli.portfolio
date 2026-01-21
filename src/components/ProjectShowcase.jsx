import { useState } from 'react';
import PhoneMockup from './PhoneMockup';

const projects = [
    {
        id: 1,
        title: 'Sehatin',
        subtitle: 'Featured App',
        year: '2023',
        icon: 'monitor_heart',
        description: 'A comprehensive health tracking application designed to monitor daily wellness activities with precision. Featuring real-time heart rate analysis and personalized fitness plans.',
        techStack: [
            { name: 'Flutter', color: 'bg-blue-500' },
            { name: 'Laravel', color: 'bg-red-500' },
            { name: 'MySQL', color: 'bg-orange-500' },
        ],
    },
    {
        id: 2,
        title: 'Wisata Bandung',
        subtitle: 'Featured App',
        year: '2023',
        icon: 'travel_explore',
        description: 'A tourism guide application for exploring Bandung with integrated maps, local recommendations, and user reviews for an immersive travel experience.',
        techStack: [
            { name: 'Kotlin', color: 'bg-purple-500' },
            { name: 'Firebase', color: 'bg-yellow-500' },
        ],
    },
    {
        id: 3,
        title: 'E-Commerce App',
        subtitle: 'Featured App',
        year: '2024',
        icon: 'shopping_bag',
        description: 'A full-featured marketplace application with payment gateway integration, real-time order tracking, and seamless shopping experience.',
        techStack: [
            { name: 'Flutter', color: 'bg-blue-500' },
            { name: 'PHP', color: 'bg-indigo-500' },
            { name: 'MySQL', color: 'bg-orange-500' },
        ],
    },
];

export default function ProjectShowcase({ onViewCaseStudy }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProject = projects[currentIndex];

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <main className="flex-grow flex flex-col justify-center items-center relative z-10 pt-28 pb-12 px-6">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-slate-900">
                    Selected Work
                </h2>
                <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
                    A curated collection of mobile and web applications tailored for performance and aesthetic precision.
                </p>
            </div>

            {/* Project Card */}
            <div className="w-full max-w-[1100px] h-auto min-h-[500px] glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group transition-all duration-300">
                {/* Background blur */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2/3 h-full bg-blue-100/40 blur-3xl rounded-full pointer-events-none mix-blend-multiply"></div>

                {/* Content */}
                <div className="flex flex-col flex-1 items-start gap-6 z-10 order-2 md:order-1 w-full">
                    {/* Icon & Label */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="size-14 rounded-xl bg-gradient-to-br from-[#298fa3] to-[#1a5f6e] shadow-lg shadow-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-3xl">{currentProject.icon}</span>
                        </div>
                        <div>
                            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-1 block">
                                {currentProject.subtitle}
                            </span>
                            <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                <span>{currentProject.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                            {currentProject.title}
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-normal">
                            {currentProject.description}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 my-2">
                        {currentProject.techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-slate-700 text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-default"
                            >
                                <span className={`w-2 h-2 rounded-full ${tech.color}`}></span>
                                {tech.name}
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                        <button
                            onClick={onViewCaseStudy}
                            className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-[#237a8b] text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            View Case Study
                            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">code</span>
                            Source Code
                        </button>
                    </div>
                </div>

                {/* Phone Mockup */}
                <div className="flex-1 w-full flex items-center justify-center md:justify-end relative z-10 order-1 md:order-2">
                    <PhoneMockup project={currentProject} />
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center gap-8">
                <button
                    onClick={prevProject}
                    className="group p-3 rounded-full hover:bg-slate-200 border border-transparent transition-all"
                >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-800 transition-colors">arrow_back</span>
                </button>

                <div className="flex items-center gap-3">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`rounded-full transition-all cursor-pointer ${currentIndex === index
                                ? 'h-2 w-8 bg-primary shadow-sm'
                                : 'h-2 w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextProject}
                    className="group p-3 rounded-full hover:bg-slate-200 border border-transparent transition-all"
                >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-800 transition-colors">arrow_forward</span>
                </button>
            </div>
        </main>
    );
}
