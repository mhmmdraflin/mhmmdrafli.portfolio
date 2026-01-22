import journeyData from '../data/journey.json';
import { getAssetPath } from '../utils/assets';

function TimelineItem({ item }) {
    // Helper to resolve logo URL
    const logoSrc = item.logo_url ? getAssetPath(`assets/images/${item.logo_url}`) : null;

    return (
        <div className="group timeline-item relative flex flex-col md:flex-row gap-3 md:gap-8 mb-8 md:mb-6 pl-8 md:pl-0">

            <div className="md:w-28 md:text-right pt-2 md:pt-4 flex-shrink-0">
                <span className={`inline-block py-1 px-3 rounded-full border shadow-sm text-[10px] md:text-xs font-semibold font-mono ${item.periodStyle || 'bg-white border-gray-200/80 text-[#86868B] group-hover:bg-[#007AFF]/5 group-hover:border-[#007AFF]/20 group-hover:text-[#007AFF] transition-all duration-300'}`}>
                    {item.period}
                </span>
            </div>

            <div className="flex-1 timeline-card rounded-2xl p-4 md:p-5 hover:shadow-md active:scale-[0.98] active:bg-blue-50/30 transition-all duration-200 cursor-pointer border border-gray-100/50 bg-white/50 md:bg-transparent md:border-transparent">
                <div className="flex items-start gap-3 md:gap-4">
                    {/* Logo */}
                    {logoSrc && (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img src={logoSrc} alt={item.organization} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-[#1D1D1F] mb-0.5 group-hover:text-[#007AFF] transition-colors truncate">
                            {item.organization}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs md:text-sm font-medium text-[#86868B]">
                            <span className="text-[#1D1D1F]/80">{item.title}</span>
                            {item.is_current ? (
                                <span className="text-[#007AFF] text-[9px] uppercase font-bold bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100 flex-shrink-0">Current</span>
                            ) : null}
                        </div>

                        {item.association && (
                            <h4 className="text-[10px] md:text-xs font-semibold text-[#86868B] mb-2 uppercase tracking-wide">
                                {item.association}
                            </h4>
                        )}

                        <p className="text-xs md:text-sm leading-relaxed text-[#86868B] text-left">{item.description}</p>

                        {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {(typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags).map((tag) => (
                                    <span key={tag} className="text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-[#1D1D1F]/70 border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineSection({ title, items }) {
    return (
        <div className="mb-8 relative">
            <div className="mb-4 pl-10 md:pl-14">
                <span className="text-xs font-bold tracking-[0.15em] text-[#86868B] uppercase">
                    {title}
                </span>
            </div>
            {items.map((item) => (
                <TimelineItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default function JourneySection() {
    const { education, experience } = journeyData;

    if (education.length === 0 && experience.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>Journey data not available.</p>
        </div>
    );

    return (
        <section id="journey" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">My Professional Path</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mt-2">
                        The Journey
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        A chronological timeline of my education and experience.
                    </p>
                </div>

                {/* Timeline */}
                <div className="glass-card rounded-3xl p-6 md:p-10 relative">
                    <div className="absolute left-[23px] md:left-[27px] top-16 bottom-16 w-[2px] bg-gradient-to-b from-black/5 via-[#1D1D1F]/20 to-black/5 rounded-full"></div>

                    <TimelineSection title="Education" items={education} />
                    <TimelineSection title="Experience" items={experience} />
                </div>
            </div>
        </section>
    );
}
