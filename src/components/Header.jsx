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

    const scrollToSection = (id) => {
        setActiveNav(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-[20px] border-b border-black/[0.06] shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
                {/* Empty Left Side */}
                <div></div>

                {/* Navigation */}
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

                <div className="flex items-center justify-end gap-4">
                </div>
            </div>
        </header>
    );
}
