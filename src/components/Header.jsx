import { useState } from 'react';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'journey', label: 'Journey' },
    { id: 'ecosystem', label: 'Ecosystem & Tools' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Header() {
    const [activeNav, setActiveNav] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        setActiveNav(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-[20px] border-b border-black/[0.06] shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3">
                {/* Logo / Left Side */}
                {/* Logo / Left Side */}
                <div className="flex items-center gap-3 md:hidden pl-2">
                    {/* Apple Logo */}
                    <svg viewBox="0 0 384 512" className="w-5 h-5 fill-[#1D1D1F]">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.1-35.2-17.6-57.5-52.4-57.7-91.8zm-4.7-218.1c-22.3-24.3-52.4-33-72.2-30.8 7.3 22.8 15.3 48.7 32.7 70.8 23.3 28.1 53.6 30 71 27.2-1.2-22.7-8-47.9-31.5-67.2z" />
                    </svg>
                    {/* Windows Logo */}
                    <svg viewBox="0 0 448 512" className="w-5 h-5 fill-[#1D1D1F]">
                        <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
                    </svg>
                </div>
                <div className="hidden md:block"></div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center justify-center gap-1 p-1 rounded-full bg-gray-100/50 border border-gray-200/50 backdrop-blur-md w-fit justify-self-center">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`px-5 py-1.5 text-xs font-medium rounded-full transition-all ${activeNav === item.id
                                ? 'text-white bg-[#1D1D1F] shadow-sm'
                                : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-white/60'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right Side / Mobile Toggle */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 -mr-2 text-gray-600 md:hidden"
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
                        {navItems.map((item) => (
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
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
