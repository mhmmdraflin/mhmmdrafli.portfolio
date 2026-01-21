import toolsData from '../data/skills.json';

export default function EcosystemSection() {
    const tools = toolsData;

    // Helper to resolve icon source
    const getIconSrc = (iconUrl) => {
        if (!iconUrl) return null;
        if (iconUrl.startsWith('http')) return iconUrl;
        return `/assets/images/${iconUrl}`;
    };


    return (
        <section id="ecosystem" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">What I Work With</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mt-2">
                        Ecosystem & Tools
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        Technologies and tools I use to build amazing mobile and web applications.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="glass-card rounded-3xl p-8 md:p-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {tools.map((tool) => (
                            <div
                                key={tool.name}
                                className={`flex flex-col items-center justify-center p-5 rounded-2xl ${tool.color_class} border border-white/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group`}
                            >
                                <img
                                    src={getIconSrc(tool.icon_url)}
                                    alt={tool.name}
                                    className={`w-12 h-12 mb-3 group-hover:scale-110 transition-transform ${tool.img_class || ''}`}
                                />
                                <span className="text-sm font-semibold text-[#1D1D1F]">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
