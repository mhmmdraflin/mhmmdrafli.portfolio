import './ProjectsSection.css';

const projects = [
    {
        id: 1,
        title: 'Sehatin',
        subtitle: 'Health & Wellness App',
        description: 'Aplikasi tracking kesehatan harian dengan reminder dan analytics.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=1200&fit=crop',
        techStack: ['Flutter', 'Laravel', 'MySQL'],
        role: 'Backend Developer',
    },
    {
        id: 2,
        title: 'Wisata Bandung',
        subtitle: 'Tourism Guide App',
        description: 'Panduan wisata Bandung dengan maps integration dan review system.',
        image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&h=1200&fit=crop',
        techStack: ['Kotlin', 'Firebase'],
        role: 'Mobile Developer',
    },
    {
        id: 3,
        title: 'E-Commerce App',
        subtitle: 'Online Shopping Platform',
        description: 'Marketplace dengan payment gateway integration.',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=1200&fit=crop',
        techStack: ['Flutter', 'PHP', 'MySQL'],
        role: 'Fullstack Developer',
    },
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="projects-section section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Apps I've built and contributed to</p>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className={`project-card stagger-${index + 1}`}
                        >
                            <div className="device-mockup">
                                <div className="device-frame">
                                    <div className="device-notch"></div>
                                    <div className="device-screen">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-screenshot"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-subtitle">{project.subtitle}</p>

                                <div className="tech-badges">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="tech-badge">{tech}</span>
                                    ))}
                                </div>

                                <p className="project-role">
                                    <span className="role-icon">👤</span>
                                    {project.role}
                                </p>

                                <button className="btn btn-primary btn-sm project-btn">
                                    View Case Study →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
