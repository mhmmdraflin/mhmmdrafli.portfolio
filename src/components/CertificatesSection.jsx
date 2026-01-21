import { useRef, useState } from 'react';
import certificatesData from '../data/certificates.json';
import { getAssetPath } from '../utils/assets';

export default function CertificatesSection() {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    // Use the first certificate as the main one
    const certificate = certificatesData.length > 0 ? certificatesData[0] : null;

    if (!certificate) return null;

    const issuerLines = typeof certificate.issuer_lines === 'string'
        ? JSON.parse(certificate.issuer_lines)
        : certificate.issuer_lines;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = ((mouseX - width / 2) / width) * 20;
        const rotateX = ((height / 2 - mouseY) / height) * 20;

        setRotate({ x: rotateX, y: rotateY });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setOpacity(0);
    };

    return (
        <section id="certificates" className="py-20 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">Achievements</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mt-2">
                        Certificates
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        Professional certification in Mobile Development.
                    </p>
                </div>

                {/* 3D Certificate Card */}
                <div className="flex justify-center perspective-1000">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full max-w-2xl bg-white rounded-3xl p-2 shadow-2xl transition-all duration-200 ease-out transform-gpu group cursor-pointer border border-[#007AFF]/10"
                        style={{
                            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                        }}
                    >
                        {/* Glare Effect */}
                        <div
                            className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none z-50 mix-blend-overlay opacity-0 transition-opacity duration-200 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                            style={{ opacity: opacity }}
                        />

                        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[1.414/1]">
                            <img
                                src={getAssetPath(`assets/images/${certificate.image_url}`)}
                                alt={certificate.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Content on Hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-8 text-center backdrop-blur-sm">
                                <span className="material-symbols-outlined text-4xl mb-3 text-[#007AFF]">verified</span>
                                <h3 className="text-2xl font-bold mb-2">{certificate.title}</h3>
                                <p className="text-lg font-medium text-white/90">{certificate.path_name}</p>
                                <p className="text-sm text-white/70 mt-1">{certificate.specialization}</p>
                                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                    {issuerLines && issuerLines.map((line) => (
                                        <span key={line} className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium border border-white/30">{line}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
