import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

const navKeys = [
    { id: 'home', key: 'home' },
    { id: 'journey', key: 'journey' },
    { id: 'ecosystem', key: 'ecosystem' },
    { id: 'certificates', key: 'certificates' },
    { id: 'projects', key: 'projects' },
    { id: 'contact', key: 'contact' },
];

function LanguageSwitcher() {
    const { lang, setLang } = useLang();
    return (
        <div className="flex items-center p-1 bg-gray-100/80 border border-gray-200/60 rounded-full relative gap-0.5">
            <button
                onClick={() => setLang('en')}
                aria-label="Switch to English language"
                title="English"
                className={`relative z-10 flex items-center justify-center w-8 h-7 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer uppercase ${
                    lang === 'en'
                        ? 'text-[#1D1D1F] bg-white shadow-sm border border-gray-200/50'
                        : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
            >
                en
            </button>
            <button
                onClick={() => setLang('id')}
                aria-label="Switch to Indonesian language"
                title="Indonesian"
                className={`relative z-10 flex items-center justify-center w-8 h-7 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer uppercase ${
                    lang === 'id'
                        ? 'text-[#1D1D1F] bg-white shadow-sm border border-gray-200/50'
                        : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
            >
                id
            </button>
        </div>
    );
}

function ThemeToggle() {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="flex items-center p-1 bg-gray-100/80 border border-gray-200/60 rounded-full relative gap-0.5">
            <button
                onClick={() => toggleTheme('light')}
                aria-label="Switch to light mode"
                title="Light Mode"
                className={`relative z-10 flex items-center justify-center w-8 h-7 rounded-full transition-all duration-200 cursor-pointer ${
                    theme === 'light'
                        ? 'text-[#1D1D1F] bg-white shadow-sm border border-gray-200/50'
                        : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
            >
                <span className="material-symbols-outlined text-[16px]">light_mode</span>
            </button>
            <button
                onClick={() => toggleTheme('dark')}
                aria-label="Switch to dark mode"
                title="Dark Mode"
                className={`relative z-10 flex items-center justify-center w-8 h-7 rounded-full transition-all duration-200 cursor-pointer ${
                    theme === 'dark'
                        ? 'text-[#1D1D1F] bg-white shadow-sm border border-gray-200/50'
                        : 'text-[#86868B] hover:text-[#1D1D1F]'
                }`}
            >
                <span className="material-symbols-outlined text-[16px]">dark_mode</span>
            </button>
        </div>
    );
}

export default function Header() {
    const [activeNav, setActiveNav] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { lang } = useLang();
    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = navKeys.length - 1; i >= 0; i--) {
                const section = document.getElementById(navKeys[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveNav(navKeys[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setActiveNav(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-[20px] border-b border-black/[0.06] dark:border-white/[0.06] shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3">
                {/* Logo / Left Side */}
                <div className="flex items-center md:hidden pl-2">
                    <span className="font-extrabold text-2xl tracking-tighter text-[#1D1D1F] dark:text-white hover:text-[#007AFF] transition-colors cursor-pointer select-none" onClick={() => scrollToSection('home')}>
                        MRN.
                    </span>
                </div>
                <div className="hidden md:flex items-center pl-0">
                    <span className="font-extrabold text-2xl tracking-tighter text-[#1D1D1F] dark:text-white hover:text-[#007AFF] transition-colors cursor-pointer select-none" onClick={() => scrollToSection('home')}>
                        MRN.
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center justify-center gap-1 p-1 rounded-full bg-gray-100/50 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 backdrop-blur-md w-fit justify-self-center transition-colors duration-300">
                    {navKeys.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-5 py-1.5 text-xs font-medium rounded-full transition-all ${activeNav === item.id
                                ? 'text-white bg-[#1D1D1F] dark:bg-white dark:text-[#1D1D1F] shadow-sm'
                                : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                                }`}
                        >
                            {t.nav[item.key]}
                        </button>
                    ))}
                </nav>

                {/* Right Side: Theme Toggle + Language Switcher + Mobile Toggle */}
                <div className="flex items-center justify-end gap-2 md:gap-3">
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 -mr-2 text-gray-600 dark:text-gray-300 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl md:hidden animate-fade-in-up">
                    <nav className="flex flex-col p-4 space-y-2">
                        {navKeys.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-all ${activeNav === item.id
                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                    : 'text-[#1D1D1F] hover:bg-gray-50'
                                    }`}
                            >
                                {t.nav[item.key]}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

