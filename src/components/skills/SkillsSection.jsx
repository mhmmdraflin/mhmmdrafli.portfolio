import './SkillsSection.css';

const skillCategories = [
    {
        title: 'Primary Focus',
        subtitle: 'Mobile Development',
        icon: '🎯',
        skills: [
            { name: 'Flutter', level: 90, label: 'Advanced' },
            { name: 'Kotlin', level: 70, label: 'Intermediate' },
            { name: 'Swift', level: 60, label: 'Learning' },
            { name: 'SwiftUI', level: 55, label: 'Learning' },
        ],
    },
    {
        title: 'Secondary',
        subtitle: 'Backend & Web',
        icon: '🔧',
        skills: [
            { name: 'PHP', icon: '🐘' },
            { name: 'Laravel', icon: '🔴' },
            { name: 'MySQL', icon: '🗄️' },
            { name: 'HTML/CSS', icon: '🌐' },
        ],
    },
    {
        title: 'Tools',
        subtitle: 'Development',
        icon: '🎨',
        skills: [
            { name: 'Figma', icon: '🎨' },
            { name: 'Git', icon: '📦' },
            { name: 'Xcode', icon: '🔨' },
            { name: 'Android Studio', icon: '🤖' },
        ],
    },
];

export default function SkillsSection() {
    return (
        <section id="skills" className="skills-section section">
            <div className="container">
                <h2 className="section-title">Tech Stack</h2>
                <p className="section-subtitle">Technologies I work with</p>

                <div className="skills-grid">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="skill-category">
                            <div className="category-header">
                                <span className="category-icon">{category.icon}</span>
                                <div>
                                    <h3 className="category-title">{category.title}</h3>
                                    <p className="category-subtitle">{category.subtitle}</p>
                                </div>
                            </div>

                            {category.skills[0].level !== undefined ? (
                                <div className="skill-bars">
                                    {category.skills.map((skill, index) => (
                                        <div
                                            key={skill.name}
                                            className={`skill-bar-item stagger-${index + 1}`}
                                        >
                                            <div className="skill-info">
                                                <span className="skill-name">{skill.name}</span>
                                                <span className="skill-label">{skill.label}</span>
                                            </div>
                                            <div className="skill-bar-track">
                                                <div
                                                    className="skill-bar-fill"
                                                    style={{ '--fill-width': `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="skill-icons-grid">
                                    {category.skills.map((skill, index) => (
                                        <div
                                            key={skill.name}
                                            className={`skill-icon-card stagger-${index + 1}`}
                                        >
                                            <span className="skill-icon">{skill.icon}</span>
                                            <span className="skill-icon-name">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
