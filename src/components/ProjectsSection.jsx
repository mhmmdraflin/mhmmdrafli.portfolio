import projectsData from '../data/projects.json';
import PhoneMockup from './PhoneMockup';
import { getAssetPath } from '../utils/assets';

export default function ProjectsSection({ onViewCaseStudy }) {
    const projects = projectsData;

    // Helper to process project image paths
    const getProjectImages = (project) => {
        if (!project.images) return null;

        const prependPath = (img) => {
            if (!img) return null;
            if (img.startsWith('http')) return img;
            // Remove potential leading path if present in JSON (though we know it's just filename)
            const cleanImg = img.replace(/^(\/?assets\/images\/)/, '');
            return getAssetPath(`assets/images/${cleanImg}`);
        };

        if (Array.isArray(project.images)) {
            return project.images.map(prependPath);
        } else {
            return prependPath(project.images);
        }
    };

    if (projects.length === 0) return (
        <div className="py-20 text-center text-red-400">
            <p>No projects found.</p>
        </div>
    );

    return (
        <section id="projects" className="py-20 px-6 relative z-10" >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">Featured Work</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mt-2">
                        My Projects
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        A selection of mobile applications I've designed and developed.
                    </p>
                </div>

                {/* Projects Stack */}
                <div className="space-y-32">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        const projectImages = getProjectImages(project);
                        const isMulti = Array.isArray(projectImages);

                        return (
                            <div
                                key={project.id}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 group`}
                            >
                                {/* Phone Mockup Side */}
                                <div className="flex-1 w-full max-w-md md:max-w-none flex justify-center perspective-[2000px]">
                                    {isMulti ? (
                                        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px] group/phones transform scale-[0.65] md:scale-100 transition-transform duration-500">
                                            {/* Left Phone */}
                                            <div className="absolute z-10 transform -translate-x-16 md:-translate-x-32 translate-y-8 -rotate-y-[25deg] rotate-z-[-5deg] transition-all duration-700 ease-out group-hover/phones:-translate-x-24 md:group-hover/phones:-translate-x-40 group-hover/phones:rotate-y-[-15deg] group-hover/phones:scale-90 hover:!z-20">
                                                <PhoneMockup project={{ ...project, image: projectImages[1] }} />
                                            </div>
                                            {/* Right Phone */}
                                            <div className="absolute z-10 transform translate-x-16 md:translate-x-32 translate-y-8 rotate-y-[25deg] rotate-z-[5deg] transition-all duration-700 ease-out group-hover/phones:translate-x-24 md:group-hover/phones:translate-x-40 group-hover/phones:rotate-y-[15deg] group-hover/phones:scale-90 hover:!z-20">
                                                <PhoneMockup project={{ ...project, image: projectImages[2] }} />
                                            </div>
                                            {/* Center Phone */}
                                            <div className="absolute z-30 transition-all duration-500 shadow-2xl drop-shadow-2xl">
                                                <div className="animate-float">
                                                    <PhoneMockup project={{ ...project, image: projectImages[0] }} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="group-hover:scale-105 transition-transform duration-700 ease-out transform scale-[0.8] md:scale-100">
                                            <div className="animate-float">
                                                <PhoneMockup project={{ ...project, image: projectImages }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                        {project.icon && project.icon.includes('.') ? (
                                            <img
                                                src={getAssetPath(`assets/images/${project.icon}`)}
                                                alt={project.title}
                                                className="w-8 h-8 object-contain"
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined text-[#007AFF] text-3xl">{project.icon}</span>
                                        )}
                                        <span className="text-xs font-bold tracking-widest text-[#86868B] uppercase border border-gray-200 px-2 py-1 rounded bg-white">
                                            {project.year}
                                        </span>
                                        {project.status && (
                                            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase border border-amber-200 px-2 py-1 rounded bg-amber-50/50">
                                                {project.status}
                                            </span>
                                        )}
                                    </div>

                                    {project.association && (
                                        <h4 className="mt-1 text-[#86868B] text-[10px] font-bold uppercase tracking-wide max-w-xs mx-auto md:mx-0">
                                            {project.association}
                                        </h4>
                                    )}

                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <h3 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F]">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="text-[#007AFF] font-semibold text-lg mb-4">{project.subtitle}</p>
                                    <p className="text-[#86868B] text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                                        {project.techStack && project.techStack.map((tech) => (
                                            <span
                                                key={tech.name}
                                                className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm ${tech.color}`}
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
