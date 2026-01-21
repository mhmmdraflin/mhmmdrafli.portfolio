import './JourneySection.css';

const journeyData = {
    education: [
        {
            year: '2020 - 2024',
            title: 'S1 Teknik Informatika',
            organization: 'Universitas XYZ',
            description: 'Fokus pada Mobile Development dan Software Engineering.',
        },
    ],
    experience: [
        {
            year: '2023',
            title: 'Mobile Developer Intern',
            organization: 'PT Tech Company',
            description: 'Mengembangkan fitur mobile app menggunakan Flutter dan Kotlin.',
            highlight: true,
        },
        {
            year: '2022 - 2023',
            title: 'Lead Developer',
            organization: 'Project "Sehatin"',
            description: 'Memimpin tim 4 developer untuk membangun aplikasi kesehatan.',
        },
    ],
    organization: [
        {
            year: '2021 - 2022',
            title: 'Staff IT',
            organization: 'Himpunan Mahasiswa TI',
            description: 'Mengelola website dan sistem informasi himpunan.',
        },
    ],
};

const TimelineItem = ({ item, delay }) => (
    <div className={`timeline-item stagger-${delay}`}>
        <div className="timeline-dot"></div>
        <div className="timeline-content">
            <span className="timeline-year">{item.year}</span>
            <h4 className="timeline-title">{item.title}</h4>
            <p className="timeline-org">{item.organization}</p>
            {item.description && (
                <p className="timeline-desc">{item.description}</p>
            )}
        </div>
    </div>
);

export default function JourneySection() {
    return (
        <section id="journey" className="journey-section section">
            <div className="container">
                <h2 className="section-title">My Journey</h2>
                <p className="section-subtitle">Education, experience, and involvement</p>

                <div className="journey-grid">
                    {/* Education */}
                    <div className="journey-category">
                        <div className="category-label">
                            <span className="category-emoji">🎓</span>
                            <span>Education</span>
                        </div>
                        <div className="timeline">
                            {journeyData.education.map((item, index) => (
                                <TimelineItem key={index} item={item} delay={index + 1} />
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="journey-category">
                        <div className="category-label">
                            <span className="category-emoji">💼</span>
                            <span>Experience</span>
                        </div>
                        <div className="timeline">
                            {journeyData.experience.map((item, index) => (
                                <TimelineItem key={index} item={item} delay={index + 1} />
                            ))}
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="journey-category">
                        <div className="category-label">
                            <span className="category-emoji">🏛️</span>
                            <span>Organization</span>
                        </div>
                        <div className="timeline">
                            {journeyData.organization.map((item, index) => (
                                <TimelineItem key={index} item={item} delay={index + 1} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
