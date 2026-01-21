import './QuickStats.css';

const stats = [
    { value: '5+', label: 'Projects' },
    { value: '3', label: 'Certificates' },
    { value: '10+', label: 'Tech Tools' },
];

export default function QuickStats() {
    return (
        <section className="quick-stats animate-fade-in-up">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`stat-card stagger-${index + 1}`}
                    >
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
