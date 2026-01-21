import { getAssetPath } from '../utils/assets';

export default function PhoneMockup({ project }) {
    return (
        <div className="relative w-[280px] h-[580px] bg-black rounded-[45px] border-[8px] border-gray-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transform md:rotate-y-[-12deg] md:rotate-x-[5deg] md:group-hover:rotate-y-[-5deg] md:group-hover:rotate-x-[2deg] transition-all duration-700 ease-out overflow-hidden ring-4 ring-gray-800/50">
            {/* Buttons */}
            <div className="absolute top-[100px] -left-[10px] w-[3px] h-[26px] bg-gray-700 rounded-l-md"></div>
            <div className="absolute top-[140px] -left-[10px] w-[3px] h-[46px] bg-gray-700 rounded-l-md"></div>
            <div className="absolute top-[190px] -left-[10px] w-[3px] h-[46px] bg-gray-700 rounded-l-md"></div>
            <div className="absolute top-[140px] -right-[10px] w-[3px] h-[70px] bg-gray-700 rounded-r-md"></div>

            {/* Dynamic Island Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-[28px] w-[90px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/80"></div>
            </div>

            {/* Glass Reflection */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-30 rounded-[35px]"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-[#1e2126] overflow-hidden relative">
                {/* Header */}
                <div className="pt-10 px-6 pb-6 bg-gradient-to-b from-primary/20 to-transparent">
                    <div className="flex justify-between items-center mb-6">
                        <span className="material-symbols-outlined text-white/80">menu</span>
                        <div
                            className="size-8 rounded-full bg-gray-600 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${getAssetPath('assets/images/profile.jpg')})`
                            }}
                        />
                    </div>
                    <h4 className="text-white text-2xl font-bold">Hello, Rafli!</h4>
                    <p className="text-white/60 text-sm">Your daily goals look great.</p>
                </div>

                {/* Project Image Override */}
                {project?.image && (
                    <div className="absolute inset-0 bg-[#1e2126] z-10 flex flex-col">
                        <div className="pt-10 px-6 pb-4 bg-white/5 backdrop-blur-md border-b border-white/5 flex justify-between items-center z-20">
                            <span className="material-symbols-outlined text-white/80">arrow_back</span>
                            <span className="text-white font-bold text-lg">{project.title}</span>
                            <span className="material-symbols-outlined text-white/80">more_vert</span>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {!project?.image && (
                    <div className="px-4 space-y-4">
                        {/* Heart Rate */}
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                                    <span className="material-symbols-outlined text-sm">favorite</span>
                                </div>
                                <span className="text-xs text-white/40">Today</span>
                            </div>
                            <div className="text-2xl font-bold text-white">72 <span className="text-sm font-normal text-white/60">bpm</span></div>
                            <div className="text-xs text-white/50">Avg Heart Rate</div>
                        </div>

                        {/* Water & Calories */}
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                                <div className="mb-2 p-2 bg-blue-500/20 w-fit rounded-lg text-blue-400">
                                    <span className="material-symbols-outlined text-sm">water_drop</span>
                                </div>
                                <div className="text-xl font-bold text-white">1.2L</div>
                            </div>
                            <div className="flex-1 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                                <div className="mb-2 p-2 bg-orange-500/20 w-fit rounded-lg text-orange-400">
                                    <span className="material-symbols-outlined text-sm">local_fire_department</span>
                                </div>
                                <div className="text-xl font-bold text-white">420</div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-white/5 p-4 rounded-2xl h-32 flex items-end justify-between gap-2 border border-white/5">
                            <div className="w-full bg-primary/20 rounded-t-sm h-[40%]"></div>
                            <div className="w-full bg-primary/40 rounded-t-sm h-[60%]"></div>
                            <div className="w-full bg-primary rounded-t-sm h-[80%] shadow-[0_0_10px_rgba(41,143,163,0.5)]"></div>
                            <div className="w-full bg-primary/40 rounded-t-sm h-[50%]"></div>
                            <div className="w-full bg-primary/20 rounded-t-sm h-[30%]"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
