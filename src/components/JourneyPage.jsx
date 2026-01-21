const timelineData = {
    education: [
        {
            id: 'edu-1',
            title: 'Informatics',
            organization: 'UBHINUS dh.STIKI',
            icon: 'school',
            period: '2022 — 2026',
            isCurrent: true,
            description: 'Currently pursuing Bachelor degree in Informatics, focusing on Mobile Application Development with Kotlin and Java.',
            dotColor: 'border-[#007AFF]',
            periodStyle: 'bg-[#007AFF]/5 border-[#007AFF]/20 text-[#007AFF]',
        },
    ],
    experience: [
        {
            id: 'exp-3',
            title: 'Laboratory Teaching Assistant Advanced Database',
            organization: 'STIKI Malang',
            icon: 'school',
            period: 'Aug 2025 — Jan 2026',
            isCurrent: false,
            description: 'Laboratory Teaching Assistant for Advanced Database course.',
            dotColor: 'border-[#007AFF]',
            periodStyle: 'bg-[#007AFF]/5 border-[#007AFF]/20 text-[#007AFF]',
            tags: ['Database', 'Teaching', 'Part-time'],
        },
        {
            id: 'exp-4',
            title: 'Laboratory Teaching Assistant Advanced Web Programming',
            organization: 'STIKI Malang',
            icon: 'school',
            period: 'Mar 2025 — Jul 2025',
            isCurrent: false,
            description: 'Assisted in teaching Advanced Web Programming, a course focused on mastering Laravel and Livewire to build transactional web applications. Provided technical guidance from installation and configuration to developing interactive components without JavaScript, while also supporting students in backend integration, performance optimization, and building scalable, component-based web systems.',
            dotColor: 'border-gray-400',
            periodStyle: 'bg-white border-gray-200/80 text-[#86868B]',
            tags: ['Laravel', 'Livewire', 'Web Development'],
        },
        {
            id: 'exp-5',
            title: 'Laboratory Teaching Assistant Web Programming',
            organization: 'STIKI Malang',
            icon: 'school',
            period: 'Sep 2024 — Feb 2025',
            isCurrent: false,
            description: 'Assisted in teaching Web Programming I, a course covering the fundamentals of web development including HTML, CSS, and PHP. Supported students during lectures and lab sessions by troubleshooting coding issues, guiding them in understanding core concepts, and helping improve their problem-solving skills in web development.',
            dotColor: 'border-gray-400',
            periodStyle: 'bg-white border-gray-200/80 text-[#86868B]',
            tags: ['HTML', 'CSS', 'PHP', 'Teaching'],
        },
        {
            id: 'exp-1',
            title: 'Lead Developer',
            organization: 'Sehatin',
            icon: 'apartment',
            period: '2023 — Pres',
            isCurrent: true,
            description: 'Leading a team of 5 developers to build a comprehensive telemedicine platform. Architected the mobile app using Flutter and implemented clean architecture principles. Improved app performance by 40%.',
            dotColor: 'border-[#007AFF]',
            periodStyle: 'bg-[#007AFF]/5 border-[#007AFF]/20 text-[#007AFF]',
            tags: ['Flutter', 'Firebase', 'Team Lead'],
        },
        {
            id: 'exp-2',
            title: 'Mobile Developer Intern',
            organization: 'Tech Company',
            icon: 'business_center',
            period: '2022 — 2023',
            isCurrent: false,
            description: 'Collaborated with senior engineers to maintain and update legacy iOS applications. Migrated 30% of the codebase from UIKit to SwiftUI.',
            dotColor: 'border-gray-400',
            periodStyle: 'bg-white border-gray-200/80 text-[#86868B]',
        },
    ],
    organization: [
        {
            id: 'org-1',
            title: 'IT Staff',
            organization: 'Himpunan Mahasiswa TI',
            icon: 'groups',
            period: '2021 — 2022',
            isCurrent: false,
            description: 'Managed the student association\'s website and organized workshops on basic programming for over 200 fresh students.',
            dotColor: 'border-gray-400',
            periodStyle: 'bg-white border-gray-200/80 text-[#86868B]',
        },
    ],
};

function TimelineItem({ item }) {
    return (
        <div className="group timeline-item relative flex flex-col md:flex-row gap-6 md:gap-10 mb-8 pl-16 md:pl-0">
            {/* Timeline Dot */}


            {/* Period */}
            <div className="md:w-32 md:text-right pt-5 flex-shrink-0">
                <span className={`inline-block py-1 px-3 rounded-full border shadow-sm text-xs font-semibold font-mono tracking-tight ${item.periodStyle}`}>
                    {item.period}
                </span>
            </div>

            {/* Card */}
            <div className="flex-1 timeline-card rounded-2xl p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 group-hover:text-[#007AFF] transition-colors">
                        {item.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-[#86868B]">
                    <span className="material-symbols-outlined text-[18px] text-[#1D1D1F]">{item.icon}</span>
                    <span className="text-[#1D1D1F]/80">{item.organization}</span>
                    {item.highlight && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-[#007AFF] font-semibold">{item.highlight}</span>
                        </>
                    )}
                    {item.isCurrent && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-[#007AFF] text-[10px] uppercase font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Current</span>
                        </>
                    )}
                </div>

                <p className="text-sm leading-relaxed text-[#86868B] max-w-xl">
                    {item.description}
                </p>

                {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-5">
                        {item.tags.map((tag) => (
                            <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-[#1D1D1F]/70 border border-gray-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TimelineSection({ title, items }) {
    return (
        <div className="mb-12 relative">
            <div className="sticky top-0 bg-[#F5F5F7]/95 backdrop-blur-xl z-20 py-2 mb-6 border-b border-gray-200/60 inline-block pr-6 rounded-r-lg shadow-sm">
                <span className="text-xs font-bold tracking-[0.15em] text-[#86868B] uppercase pl-12 md:pl-16">
                    {title}
                </span>
            </div>
            {items.map((item) => (
                <TimelineItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default function JourneyPage({ onBack }) {
    return (
        <div className="bg-[#F5F5F7] font-display text-[#1D1D1F] overflow-hidden h-screen flex flex-col relative">
            {/* Ambient Blobs */}
            <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none opacity-60 z-0 mix-blend-multiply"></div>
            <div className="fixed bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0 mix-blend-multiply"></div>

            {/* Header */}
            <header className="glass-nav z-50 sticky top-0 w-full px-8 py-4 flex items-center justify-between bg-white/70 backdrop-blur-[20px] border-b border-black/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-blue-600 flex items-center justify-center text-xs font-bold shadow-md text-white ring-2 ring-white">
                        MR
                    </div>
                    <h1 className="text-sm font-bold tracking-tight text-[#1D1D1F]">Muhammad Rafli</h1>
                </div>

                <nav className="hidden md:flex items-center gap-1 p-1 bg-gray-100/50 rounded-full border border-gray-200/50 backdrop-blur-md">
                    <button onClick={onBack} className="px-5 py-1.5 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors rounded-full hover:bg-white/60">Home</button>
                    <span className="px-5 py-1.5 text-xs font-bold text-white bg-[#1D1D1F] shadow-sm rounded-full">Journey</span>
                    <button onClick={onBack} className="px-5 py-1.5 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors rounded-full hover:bg-white/60">Projects</button>
                    <button className="px-5 py-1.5 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors rounded-full hover:bg-white/60">Contact</button>
                </nav>

                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">dark_mode</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 z-10 flex flex-col items-center justify-center h-full overflow-hidden">
                <div className="glass-panel w-full h-full max-h-[85vh] rounded-3xl flex flex-col relative overflow-hidden bg-white/65 backdrop-blur-[40px] border border-white/80 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)]">

                    {/* Header */}
                    <div className="flex-none pt-10 px-8 md:px-12 pb-6 border-b border-gray-200/60 bg-white/30">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">My Professional Path</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
                                The Journey
                            </h2>
                            <p className="text-[#86868B] text-sm max-w-lg mt-1 font-medium leading-relaxed">
                                A chronological timeline of my education, professional experience, and organizational leadership.
                            </p>
                        </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-8 scroll-smooth bg-transparent">
                        <div className="max-w-4xl mx-auto relative pl-4 md:pl-0">
                            {/* Timeline Line */}
                            <div className="absolute left-[19px] md:left-[23px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-black/5 via-[#1D1D1F]/20 to-black/5 rounded-full hidden md:block"></div>
                            <div className="absolute left-[19px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-black/5 via-[#1D1D1F]/20 to-black/5 rounded-full md:hidden"></div>

                            <TimelineSection title="Education" items={timelineData.education} />
                            <TimelineSection title="Experience" items={timelineData.experience} />
                            <TimelineSection title="Organization" items={timelineData.organization} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-none p-4 border-t border-gray-200/60 bg-gray-50/50 backdrop-blur-sm flex justify-center">
                        <p className="text-[11px] text-[#86868B] font-medium">© 2024 Muhammad Rafli Nurfathan. Designed with passion.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
