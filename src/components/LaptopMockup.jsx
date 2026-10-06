import React from 'react';
import { getAssetPath } from '../utils/assets';

export default function LaptopMockup({ project }) {
    return (
        <div className="group relative w-[320px] md:w-[600px] aspect-[16/10] bg-[#1a1c23] rounded-t-2xl border-x-[4px] md:border-x-[6px] border-t-[4px] md:border-t-[6px] border-[#2A2A2A] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,118,255,0.25)]">
            {/* Screen Content */}
            <div className="absolute top-1 left-1 right-1 bottom-0 bg-[#0d1117] rounded-t-xl overflow-hidden border border-gray-700/50">
                {/* Browser bar */}
                <div className="h-5 md:h-6 bg-[#21262d] flex items-center px-3 gap-1.5 md:gap-2 border-b border-gray-700/80">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F56] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27C93F] shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>
                </div>
                {/* Website view */}
                <div className="w-full h-[calc(100%-1.25rem)] md:h-[calc(100%-1.5rem)] relative overflow-hidden bg-white">
                    {project?.image ? (
                        <>
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover object-top transition-all duration-[4000ms] ease-in-out group-hover:object-bottom" 
                            />
                            {/* Inner Screen Shadow/Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <span className="text-gray-400 font-medium tracking-wide">No Image Available</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Base of laptop */}
            <div className="absolute -bottom-4 -left-4 -right-4 md:-bottom-5 md:-left-6 md:-right-6 h-4 md:h-5 bg-gradient-to-b from-[#b5b5b5] to-[#8a8a8a] dark:from-[#3a3a3a] dark:to-[#1a1a1a] rounded-b-xl md:rounded-b-2xl border-b-[2px] border-[#5a5a5a] dark:border-black shadow-xl flex justify-center z-10">
                <div className="w-20 md:w-32 h-1 md:h-1.5 bg-[#d0d0d0] dark:bg-[#4a4a4a] rounded-b-md mt-0 shadow-inner"></div>
            </div>
        </div>
    );
}
