import './ContactSection.css';

const contactInfo = [
    { icon: '📧', label: 'Email', value: 'rafli@example.com', href: 'mailto:rafli@example.com' },
    { icon: '📱', label: 'Phone', value: '+62 812 XXXX XXXX', href: 'tel:+6281200000000' },
    { icon: '📍', label: 'Location', value: 'Bandung, Indonesia', href: null },
];

export default function ContactSection() {
    return (
        <section id="contact" className="contact-section section">
            <div className="container">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-subtitle">Let's work together</p>

                <div className="contact-content">
                    <div className="contact-info-grid">
                        {contactInfo.map((info) => (
                            <div key={info.label} className="contact-info-item">
                                <span className="contact-icon">{info.icon}</span>
                                <div className="contact-details">
                                    <span className="contact-label">{info.label}</span>
                                    {info.href ? (
                                        <a href={info.href} className="contact-value">
                                            {info.value}
                                        </a>
                                    ) : (
                                        <span className="contact-value">{info.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="contact-cta">

                        <a
                            href="mailto:rafli@example.com"
                            className="btn btn-secondary btn-lg contact-btn"
                        >
                            <span>✉️</span>
                            <span>Send Message</span>
                        </a>
                    </div>
                </div>

                <footer className="footer">
                    <p className="footer-text">
                        © 2024 Muhammad Rafli Nurfathan. Built with React & ❤️
                    </p>
                </footer>
            </div>
        </section>
    );
}
