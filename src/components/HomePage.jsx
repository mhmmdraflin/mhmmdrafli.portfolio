import { useState, useEffect } from 'react';
// import profileImage from '../assets/images/profile.jpg'; // Deprecated in favor of API

export default function HomePage({ onOpenCV }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5001/api/profile')
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[#007AFF]">Loading Profile...</div>;

    // Fallback if API fails or returns empty
    if (!profile) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-500 gap-4">
            <p className="text-xl font-bold">Failed to load profile data.</p>
            <p className="text-sm text-gray-500">Please ensure the backend server is running on port 5001 and database is imported.</p>
        </div>
    );

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center relative z-10 pt-24 pb-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Avatar */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] p-1 shadow-xl shadow-primary/30">
                            <div
                                className="w-full h-full rounded-full bg-cover bg-center border-4 border-white"
                                style={{
                                    backgroundImage: `url(/assets/images/${profile.avatar_url})`
                                }}
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                </div>

                {/* Name & Role */}
                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1D1D1F] mb-3">
                        {profile.name}
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-[#007AFF]">
                        {profile.role}
                    </p>
                </div>

                {/* Tagline */}
                <p className="text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto mb-10 font-normal leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {profile.about_text}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[120px]">
                        <div className="text-3xl font-bold text-[#007AFF]">{profile.total_projects}</div>
                        <div className="text-sm text-[#86868B] font-medium">Projects</div>
                    </div>
                    <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[120px]">
                        <div className="text-3xl font-bold text-[#5856D6]">{profile.certificates_count}</div>
                        <div className="text-sm text-[#86868B] font-medium">Certificate</div>
                    </div>
                    <div className="glass-card px-6 py-4 rounded-2xl text-center min-w-[120px]">
                        <div className="text-3xl font-bold text-[#34C759]">{profile.tech_tools_count}</div>
                        <div className="text-sm text-[#86868B] font-medium">Tech Tools</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-[#007AFF] hover:bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-[#007AFF]/30 hover:shadow-[#007AFF]/40 transition-all flex items-center justify-center gap-2 group"
                    >
                        View My Projects
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <button
                        onClick={onOpenCV}
                        className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-[#1D1D1F] rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        View CV
                    </button>
                </div>


            </div>
        </section>
    );
}
