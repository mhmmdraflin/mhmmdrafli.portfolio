import { useState } from 'react';

const screenshots = [
    {
        id: 1,
        alt: 'Mobile app dashboard',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=1200&fit=crop'
    },
    {
        id: 2,
        alt: 'Mobile app schedule view',
        url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=1200&fit=crop'
    },
    {
        id: 3,
        alt: 'Mobile app profile settings',
        url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=1200&fit=crop'
    },
    {
        id: 4,
        alt: 'Mobile app analytics screen',
        url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=1200&fit=crop'
    },
];

const techStack = [
    { name: 'Flutter', icon: 'smartphone', color: 'text-sky-500' },
    { name: 'Laravel', icon: 'php', color: 'text-red-500' },
    { name: 'MySQL', icon: 'database', color: 'text-orange-500' },
    { name: 'REST API', icon: 'cloud_sync', color: 'text-emerald-500' },
];

const responsibilities = [
    { icon: 'terminal', text: 'Designed efficient database schemas in MySQL' },
    { icon: 'api', text: 'Developed 20+ REST API endpoints using Laravel' },
    { icon: 'lock', text: 'Implemented JWT authentication for secure sessions' },
];

export default function ProjectDetail({ onBack }) {
    return (
        <div className="bg-[#F2F2F7] text-[#1D1D1F] font-display antialiased min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-[20px] border-b border-black/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm font-medium text-[#86868B] hover:text-[#007AFF] transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back_ios_new</span>
                        <span>Portfolio</span>
                    </button>
                    <span className="text-sm font-bold tracking-wide text-[#1D1D1F] opacity-0 md:opacity-100 transition-opacity">Sehatin</span>
                    <div className="w-[85px]"></div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative min-h-screen pt-28 pb-20 px-6">
                <div className="max-w-5xl mx-auto flex flex-col gap-12">

                    {/* Header */}
                    <header className="flex flex-col gap-4 animate-fade-in-up">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-blue-100 text-[#007AFF] text-xs font-bold tracking-wider uppercase border border-blue-200">
                                    Mobile App
                                </span>
                                <span className="px-3 py-1 rounded-full bg-gray-200/60 text-[#86868B] text-xs font-bold tracking-wider uppercase border border-gray-200">
                                    2023
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F]">Sehatin</h1>
                            <p className="text-xl md:text-2xl text-[#86868B] max-w-2xl font-light leading-relaxed">
                                A comprehensive student health tracking application designed to simplify wellness management amidst busy academic schedules.
                            </p>
                        </div>
                    </header>

                    {/* Screenshot Gallery */}
                    <section className="relative -mx-6 px-6 md:mx-0 md:px-0">
                        <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
                            {screenshots.map((screenshot) => (
                                <div
                                    key={screenshot.id}
                                    className="snap-center shrink-0 w-[280px] md:w-[320px] aspect-[9/19.5] rounded-[2.5rem] bg-black border-[8px] border-black shadow-xl overflow-hidden relative group ring-1 ring-black/10"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${screenshot.url}')` }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Problem */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-full bg-red-100 text-red-500">
                                    <span className="material-symbols-outlined text-2xl">error_outline</span>
                                </div>
                                <h3 className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">The Problem</h3>
                            </div>
                            <p className="text-lg text-[#1D1D1F] leading-relaxed font-normal">
                                Students often neglect their health due to rigorous academic demands. Existing solutions are either too complex or lack specific features tailored to a student's lifestyle, leading to inconsistent health monitoring and missed medical appointments.
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-full bg-blue-100 text-[#007AFF]">
                                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                                </div>
                                <h3 className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">The Solution</h3>
                            </div>
                            <p className="text-lg text-[#1D1D1F] leading-relaxed font-normal">
                                Sehatin bridges this gap by providing an intuitive, student-centric interface. Key features include smart reminders synced with class schedules, a simplified symptom tracker, and quick access to campus health resources.
                            </p>
                        </div>
                    </div>

                    {/* Role & Tech Stack */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* My Role */}
                        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-full bg-purple-100 text-purple-500">
                                        <span className="material-symbols-outlined text-2xl">person</span>
                                    </div>
                                    <h3 className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">My Role</h3>
                                </div>
                                <h4 className="text-2xl font-bold text-[#1D1D1F] mb-4">Backend & API Development</h4>
                                <p className="text-[#1D1D1F]/80 leading-relaxed font-normal mb-6">
                                    I architected the backend infrastructure, ensuring secure data handling for sensitive health information. My responsibilities included designing the database schema, building RESTful APIs for the mobile client, and implementing authentication protocols.
                                </p>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {responsibilities.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm text-[#86868B]">
                                        <span className="material-symbols-outlined text-[#007AFF] text-lg">{item.icon}</span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm h-full">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-500">
                                        <span className="material-symbols-outlined text-2xl">code</span>
                                    </div>
                                    <h3 className="text-xs font-bold tracking-[0.2em] text-[#86868B] uppercase">Tech Stack</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {techStack.map((tech) => (
                                        <div
                                            key={tech.name}
                                            className="flex flex-col items-center justify-center p-6 bg-[#F9FAFB] rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group shadow-sm hover:shadow-md"
                                        >
                                            <span className={`material-symbols-outlined text-4xl mb-3 ${tech.color} group-hover:scale-110 transition-transform`}>
                                                {tech.icon}
                                            </span>
                                            <span className="font-semibold text-[#1D1D1F]">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-end">
                        <a
                            href="#"
                            className="w-full md:w-auto px-8 py-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-[#1D1D1F] font-semibold flex items-center justify-center gap-3 transition-all group shadow-sm"
                        >
                            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-[#86868B]">code</span>
                            View Source Code
                        </a>
                        <a
                            href="#"
                            className="w-full md:w-auto px-10 py-4 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] transition-all transform hover:-translate-y-1"
                        >
                            Try Demo
                            <span className="material-symbols-outlined">arrow_outward</span>
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
}
