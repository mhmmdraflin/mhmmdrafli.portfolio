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
                <div className="flex items-center gap-3 md:hidden pl-2">
                    {/* Apple Logo */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1D1D1F]">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-.83.91-1.99.76-3.15-1.07.09-2.28.78-2.92 1.66-.58.78-.99 2.01-.74 3.02 1.15.09 2.3-.63 2.9-1.53z" />
                    </svg>
                    {/* Windows Logo */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1D1D1F]">
                        <path d="M0 3.449L9.75 2.1v9.451H0v-8.102zm10.949-1.651L24 0v10.97H10.949V1.798zm-10.949 11.23h9.75v8.324l-9.75-1.35V13.028zm10.949 0H24V24l-13.051-1.832v-9.14z" />
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
