import './CTAButtons.css';

export default function CTAButtons() {
    return (
        <section className="cta-buttons animate-fade-in-up">
            <div className="cta-container">
                <a href="#projects" className="btn btn-primary btn-lg">
                    <span>View My Projects</span>
                    <span className="btn-arrow">→</span>
                </a>

            </div>
        </section>
    );
}
