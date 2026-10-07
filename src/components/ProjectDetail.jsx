import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import { LanguageSwitcher, ThemeToggle } from './Header';

export default function ProjectDetail({ onBack, project }) {
    const { lang } = useLang();
    const t = translations[lang];

    // Fallbacks to default text if project data doesn't provide it
    const title = lang === 'id' ? (project?.title_id || project?.title || "Sehatin") : (project?.title_en || project?.title || "Sehatin");
    const description = project ? (lang === 'id' ? project.description_id : project.description_en) : t.projectDetail.description;
    
    // Check if it's a web project (using display_mode)
    const isWeb = project?.display_mode === 'single';
    const projectType = isWeb ? (lang === 'id' ? 'Aplikasi Web' : 'Web Application') : t.projectDetail.mobileApp;

    // Use project specific data, or fallback to default
    const problem = (lang === 'id' ? project?.problem_id : project?.problem_en) || t.projectDetail.problemText;
    const solution = (lang === 'id' ? project?.solution_id : project?.solution_en) || t.projectDetail.solutionText;
    const roleTitle = (lang === 'id' ? project?.roleTitle_id : project?.roleTitle_en) || t.projectDetail.roleTitle;
    const roleText = (lang === 'id' ? project?.roleText_id : project?.roleText_en) || t.projectDetail.roleText;
    
    const responsibilities = (lang === 'id' ? project?.responsibilities_id : project?.responsibilities_en) || [
        { icon: 'terminal', text: t.projectDetail.resp1 },
        { icon: 'api', text: t.projectDetail.resp2 },
        { icon: 'lock', text: t.projectDetail.resp3 },
    ];

    const techStack = project?.techStack || [
        { name: 'Flutter', icon: 'smartphone', color: 'text-sky-500' },
        { name: 'Laravel', icon: 'php', color: 'text-red-500' },
        { name: 'MySQL', icon: 'database', color: 'text-orange-500' },
        { name: 'REST API', icon: 'cloud_sync', color: 'text-emerald-500' },
    ];

    const screenshots = project?.screenshots || project?.images?.map((img, i) => ({
        id: i + 1,
        alt: `${title} screenshot ${i + 1}`,
        url: img.startsWith('http') ? img : `/assets/images/${img.replace(/^(\/?assets\/images\/)/, '')}`
    })) || [
        { id: 1, alt: 'Mobile app dashboard', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=1200&fit=crop' },
        { id: 2, alt: 'Mobile app schedule view', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=1200&fit=crop' },
        { id: 3, alt: 'Mobile app profile settings', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=1200&fit=crop' },
        { id: 4, alt: 'Mobile app analytics screen', url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=1200&fit=crop' },
    ];

    const features = project?.features || null;
    const team = project?.team || null;

    return (
        <div className="bg-[#FAFAFC] dark:bg-[#0B1121] text-[#1D1D1F] dark:text-[#F5F5F7] font-display antialiased min-h-screen selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] dark:text-gray-200 hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1.5 transition-transform ease-out duration-300">arrow_back_ios_new</span>
                        <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
                    </button>
                    <span className="text-sm font-bold tracking-wide text-[#1D1D1F] dark:text-white opacity-0 md:opacity-100 transition-opacity hidden sm:block">{title}</span>
                    <div className="flex items-center justify-end gap-2 md:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative min-h-screen pt-32 pb-24 px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-16 lg:gap-24">

                    {/* Header */}
                    <header className="flex flex-col items-center text-center gap-6 animate-fade-in-up">
                        <div className="flex flex-col gap-4 items-center max-w-3xl">
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <div className="inline-flex items-center rounded-full border border-blue-100/50 shadow-sm overflow-hidden bg-blue-50 transition-transform hover:scale-105 duration-300">
                                    <span className="px-4 py-1.5 text-[#007AFF] text-xs font-bold tracking-wider uppercase">
                                        {projectType}
                                    </span>
                                    {project?.status && (
                                        <span className={`px-3 py-1.5 text-white text-xs font-bold tracking-wider uppercase border-l border-white/20 ${
                                            project.status.toLowerCase() === 'beta' ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-[#007AFF] to-blue-600'
                                        }`}>
                                            {project.status}
                                        </span>
                                    )}
                                </div>
                                <span className="px-4 py-1.5 rounded-full bg-white dark:bg-[#1A2133] text-[#86868B] dark:text-gray-400 text-xs font-bold tracking-wider uppercase border border-gray-200 dark:border-white/10 shadow-sm transition-transform hover:scale-105 duration-300">
                                    {project?.year || "2025"}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#1D1D1F] to-[#434345] dark:from-white dark:to-gray-400 pb-2">
                                {title}
                            </h1>
                            <p className="text-xl md:text-2xl text-[#86868B] font-light leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </header>

                    {/* Interfaces / Screenshots */}
                    {project?.interfaces ? (
                        <div className="flex flex-col gap-16 lg:gap-24">
                            {project.interfaces.map((ui, idx) => (
                                <section key={idx} className="relative">
                                    <div className="max-w-4xl mx-auto px-6 lg:px-0 mb-8 text-center flex flex-col items-center">
                                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100/50">
                                            <span className="material-symbols-outlined text-blue-500 text-sm">view_quilt</span>
                                            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">{lang === 'id' ? 'Antarmuka' : 'Interface'}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-4">
                                            {lang === 'id' ? ui.title_id : ui.title_en}
                                        </h3>
                                        <p className="text-[#86868B] dark:text-gray-400 text-lg leading-relaxed font-medium">
                                            {lang === 'id' ? ui.description_id : ui.description_en}
                                        </p>
                                    </div>
                                    
                                    <div className="-mx-6 px-6 lg:mx-0 lg:px-0">
                                        <div className="flex gap-8 overflow-x-auto custom-scrollbar snap-x snap-mandatory pb-12 pt-4 items-center">
                                            {ui.screenshots.map((screenshot) => {
                                                if (isWeb) {
                                                    return (
                                                        <div
                                                            key={screenshot.id}
                                                            className="snap-center shrink-0 w-[85vw] md:w-[75vw] max-w-[900px] aspect-[16/10] md:aspect-video rounded-xl md:rounded-2xl bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden relative group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,118,255,0.25)] flex flex-col"
                                                        >
                                                            {/* Browser Header */}
                                                            <div className="h-6 md:h-8 bg-gray-100 dark:bg-[#21262d] flex items-center px-3 md:px-4 gap-1.5 md:gap-2 border-b border-gray-200 dark:border-gray-700/80 shrink-0">
                                                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                                                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                                                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                                                            </div>
                                                            {/* Browser Content */}
                                                            <div className="relative flex-1 bg-white overflow-hidden">
                                                                <img
                                                                    src={screenshot.url}
                                                                    alt={screenshot.alt}
                                                                    className="w-full h-full object-cover object-top transition-all duration-[4000ms] ease-in-out group-hover:object-bottom"
                                                                />
                                                                {/* Glare effect & Overlay */}
                                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                                
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 md:pb-10">
                                                                    <span className="text-white font-semibold px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-sm md:text-base opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0 shadow-xl">
                                                                        {screenshot.alt}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={screenshot.id}
                                                        className="snap-center shrink-0 w-[280px] md:w-[320px] aspect-[9/19.5] rounded-xl md:rounded-[2rem] bg-[#F5F5F7] border-[4px] md:border-[8px] border-[#1D1D1F] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] overflow-hidden relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                                                    >
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                                            style={{ backgroundImage: `url('${screenshot.url}')` }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 md:pb-10">
                                                            <span className="text-white font-semibold px-5 py-2.5 bg-black/50 backdrop-blur-md rounded-full text-sm md:text-base opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0 shadow-lg">
                                                                {screenshot.alt}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <section className="relative flex flex-col gap-8">
                            <div className="max-w-4xl mx-auto px-6 lg:px-0 text-center flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100/50">
                                    <span className="material-symbols-outlined text-blue-500 text-sm">smartphone</span>
                                    <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">{lang === 'id' ? 'Antarmuka Aplikasi' : 'App Interface'}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-4">
                                    {lang === 'id' ? 'Tampilan Aplikasi Mobile' : 'Mobile App Views'}
                                </h3>
                                <p className="text-[#86868B] dark:text-gray-400 text-lg leading-relaxed font-medium">
                                    {lang === 'id' ? 'Beberapa tangkapan layar dari antarmuka aplikasi' : 'A few screenshots of the application interface'}
                                </p>
                            </div>
                            <div className="relative -mx-6 px-6 lg:mx-0 lg:px-0">
                            <div className="flex gap-8 overflow-x-auto custom-scrollbar snap-x snap-mandatory pb-12 pt-4 items-center">
                                {screenshots.map((screenshot, index) => (
                                    <div
                                        key={screenshot.id}
                                        className={`snap-center shrink-0 ${isWeb ? 'w-[85vw] md:w-[75vw] max-w-[900px] aspect-video' : 'w-[280px] md:w-[320px] aspect-[9/19.5]'} rounded-xl md:rounded-[2rem] bg-black border-[4px] md:border-[8px] border-[#1D1D1F] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] overflow-hidden relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                            style={{ backgroundImage: `url('${screenshot.url}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Problem & Solution */}
                    {(problem || solution) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {/* Problem */}
                            {problem && (
                                <div className="bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_48px_-12px_rgba(255,255,255,0.02)] transition-shadow duration-300 flex flex-col gap-5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 dark:bg-red-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 ease-out"></div>
                                    <div className="flex items-center gap-4 mb-2 relative z-10">
                                        <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 shadow-inner">
                                            <span className="material-symbols-outlined text-2xl">error_outline</span>
                                        </div>
                                        <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase">{t.projectDetail.theProblem}</h3>
                                    </div>
                                    <p className="text-lg text-[#1D1D1F]/90 dark:text-gray-300 leading-relaxed font-medium relative z-10">
                                        {problem}
                                    </p>
                                </div>
                            )}

                            {/* Solution */}
                            {solution && (
                                <div className="bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_48px_-12px_rgba(255,255,255,0.02)] transition-shadow duration-300 flex flex-col gap-5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 ease-out"></div>
                                    <div className="flex items-center gap-4 mb-2 relative z-10">
                                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 shadow-inner">
                                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                                        </div>
                                        <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase">{t.projectDetail.theSolution}</h3>
                                    </div>
                                    <p className="text-lg text-[#1D1D1F]/90 dark:text-gray-300 leading-relaxed font-medium relative z-10">
                                        {solution}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Features (if available) */}
                    {features && (
                        <div className="bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-col items-center text-center mb-10">
                                <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase mb-3">Core Features</h3>
                                <h4 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">What makes it smart</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {features.map((feature, i) => {
                                    const currentName = lang === 'id' ? feature.name_id : feature.name_en;
                                    const isRoadmap = feature.status === 'roadmap';

                                    return (
                                        <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAFAFC] dark:bg-[#111827] border border-gray-100 dark:border-white/5 hover:border-blue-100 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-colors group relative">
                                            {isRoadmap && (
                                                <span className="absolute top-3 right-3 px-2 py-0.5 bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                    Roadmap
                                                </span>
                                            )}
                                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1A2133] shadow-sm flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300 border border-transparent dark:border-white/5">
                                                <span className="material-symbols-outlined text-[#007AFF] text-2xl">{feature.icon}</span>
                                            </div>
                                            <span className="font-semibold text-[#1D1D1F] dark:text-white text-sm">
                                                {currentName}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Role & Tech Stack */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* My Role */}
                        {roleTitle && (
                            <div className="lg:col-span-7 bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] flex flex-col justify-start group">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-2xl">person</span>
                                        </div>
                                        <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase">{t.projectDetail.myRole}</h3>
                                    </div>
                                    <h4 className="text-3xl font-bold text-[#1D1D1F] dark:text-white mb-5">{roleTitle}</h4>
                                    <p className="text-[#1D1D1F]/80 dark:text-gray-300 leading-relaxed font-medium mb-8 text-lg">
                                        {roleText}
                                    </p>
                                </div>
                                {responsibilities && responsibilities.length > 0 && (
                                    <ul className="flex flex-col gap-4">
                                        {responsibilities.map((item, index) => (
                                            <li key={index} className="flex items-start gap-4 text-base font-medium text-[#1D1D1F]/80 dark:text-gray-300">
                                                <span className="material-symbols-outlined text-[#007AFF] text-xl mt-0.5">{item.icon}</span>
                                                <span className="flex-1">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div className={`flex flex-col ${roleTitle ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
                            <div className="bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] h-full">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 shadow-inner">
                                        <span className="material-symbols-outlined text-2xl">integration_instructions</span>
                                    </div>
                                    <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase">{t.projectDetail.techStack}</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 lg:gap-5">
                                    {techStack.map((tech) => {
                                        const iconName = tech.icon || (() => {
                                            const n = tech.name.toLowerCase();
                                            if (n.includes('kotlin') || n.includes('android')) return 'android';
                                            if (n.includes('flutter') || n.includes('dart')) return 'devices';
                                            if (n.includes('sqlite') || n.includes('database') || n.includes('sql') || n.includes('datastore')) return 'database';
                                            if (n.includes('api') || n.includes('retrofit')) return 'api';
                                            if (n.includes('ui') || n.includes('design')) return 'design_services';
                                            if (n.includes('gamification')) return 'sports_esports';
                                            if (n.includes('view') || n.includes('data') || n.includes('mvvm')) return 'account_tree';
                                            if (n.includes('dicoding') || n.includes('bangkit')) return 'school';
                                            return 'code';
                                        })();
                                        
                                        const textColor = tech.color ? tech.color.replace('bg-', 'text-') : 'text-blue-500';

                                        return (
                                        <div
                                            key={tech.name}
                                            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#111827] rounded-[1.5rem] border border-gray-100 dark:border-white/5 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/10 transition-all duration-300 group shadow-sm hover:shadow-md"
                                        >
                                            <span className={`material-symbols-outlined text-4xl mb-3 ${textColor} group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300`}>
                                                {iconName}
                                            </span>
                                            <span className="font-semibold text-sm text-center text-[#1D1D1F] dark:text-white leading-tight">{tech.name}</span>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Team */}
                    {team && (
                        <div className="bg-white dark:bg-[#1A2133] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
                             <div className="flex items-center gap-4 mb-10 justify-center">
                                <h3 className="text-sm font-extrabold tracking-widest text-[#86868B] uppercase">Meet Our Team</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {team.map((member, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAFAFC] dark:bg-[#111827] border border-gray-100 dark:border-white/5">
                                        {member.image ? (
                                            <div className="w-24 h-24 rounded-full mb-5 border-[4px] border-white dark:border-[#1A2133] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.15)] overflow-hidden bg-white dark:bg-[#1A2133] group-hover:scale-105 transition-transform duration-300">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-100 dark:from-blue-500/20 to-purple-100 dark:to-purple-500/20 flex items-center justify-center mb-5 border-[4px] border-white dark:border-[#1A2133] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-gray-700 dark:text-gray-300 text-3xl">sentiment_satisfied</span>
                                            </div>
                                        )}
                                        <h5 className="font-bold text-[#1D1D1F] dark:text-white text-lg mb-1">{member.name}</h5>
                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full tracking-wider mb-5">{member.role}</span>
                                        
                                        <div className="flex items-center gap-3 mt-auto">
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#1A2133] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-colors shadow-sm hover:shadow-md">
                                                    <span className="material-symbols-outlined text-[20px]">code</span>
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#1A2133] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-[#0077B5] hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors shadow-sm hover:shadow-md">
                                                    <span className="material-symbols-outlined text-[20px]">link</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="mt-6 pt-10 border-t border-gray-200/50 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-end">
                        <a
                            href={project?.github || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#1A2133] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#2A3143] hover:border-gray-300 dark:hover:border-white/20 text-[#1D1D1F] dark:text-white font-bold flex items-center justify-center gap-3 transition-all group shadow-sm"
                        >
                            <span className="material-symbols-outlined group-hover:rotate-12 group-hover:text-black dark:group-hover:text-white transition-transform duration-300 text-[#86868B] dark:text-gray-400">code</span>
                            {t.projectDetail.viewSourceCode}
                        </a>
                        {project?.liveDemo && project.liveDemo !== "#" && (
                            <a
                                href={project.liveDemo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto px-10 py-4 rounded-2xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-[0_8px_20px_-6px_rgba(0,118,255,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(0,118,255,0.6)] transition-all transform hover:-translate-y-1 duration-300"
                            >
                                {t.projectDetail.tryDemo}
                                <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">arrow_outward</span>
                            </a>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
