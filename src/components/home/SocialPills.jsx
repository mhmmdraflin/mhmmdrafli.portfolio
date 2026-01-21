import './SocialPills.css';

const socials = [
    {
        id: 'instagram',
        icon: '📷',
        label: 'Instagram',
        url: 'https://instagram.com/yourhandle',
        color: '#E4405F'
    },
    {
        id: 'linkedin',
        icon: '💼',
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/yourprofile',
        color: '#0A66C2'
    },
    {
        id: 'github',
        icon: '💻',
        label: 'GitHub',
        url: 'https://github.com/yourusername',
        color: '#333333'
    },
    {
        id: 'email',
        icon: '✉️',
        label: 'Email',
        url: 'mailto:your@email.com',
        color: '#007AFF'
    },
];

export default function SocialPills() {
    return (
        <section className="social-pills animate-fade-in-up">
            <div className="pills-container">
                {socials.map((social, index) => (
                    <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pill stagger-${index + 1}`}
                        aria-label={social.label}
                    >
                        <span className="pill-icon">{social.icon}</span>
                        <span className="pill-label">{social.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
