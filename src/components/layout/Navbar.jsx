import './Navbar.css';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <a href="#" className="navbar-logo">
                    <span className="logo-text">MRN</span>
                </a>

                <ul className="navbar-links">
                    <li>
                        <button onClick={() => scrollToSection('home')} className="nav-link">
                            Home
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('projects')} className="nav-link">
                            Projects
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('skills')} className="nav-link">
                            Skills
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('journey')} className="nav-link">
                            Journey
                        </button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('contact')} className="nav-link">
                            Contact
                        </button>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <a href="#contact" className="btn btn-primary btn-pill nav-cta">
                        Download CV
                    </a>
                </div>
            </div>
        </nav>
    );
}
