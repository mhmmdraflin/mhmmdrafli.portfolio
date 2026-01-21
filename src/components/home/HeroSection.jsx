import profileImage from '../../assets/images/profile.jpg';
import './HeroSection.css';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-avatar-wrapper animate-scale-in">
                    <div className="avatar-ring">
                        <img
                            src={profileImage}
                            alt="Muhammad Rafli Nurfathan"
                            className="hero-avatar"
                        />
                    </div>
                </div>

                <div className="hero-content animate-fade-in-up">
                    <h1 className="hero-name">Muhammad Rafli Nurfathan</h1>
                    <p className="hero-role">Mobile Developer Enthusiast</p>
                    <p className="hero-tagline">
                        Building fluid experiences with Android & Flutter
                    </p>
                </div>
            </div>
        </section>
    );
}
