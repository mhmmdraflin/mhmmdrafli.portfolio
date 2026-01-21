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
                <div className="text-xl font-bold tracking-tight text-[#1D1D1F] md:hidden">
                    Rafli.dev
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
