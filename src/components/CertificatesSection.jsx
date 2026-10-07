import { useRef, useState, useEffect } from 'react';
import certificatesData from '../data/certificates.json';
import dicodingCertificates from '../data/dicoding_certificates.json';
import { getAssetPath } from '../utils/assets';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

function CertificateCard({ certificate, onSelect, lang }) {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const issuerLines = typeof certificate.issuer_lines === 'string'
        ? JSON.parse(certificate.issuer_lines)
        : certificate.issuer_lines;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        setIsHovering(true);

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = ((mouseX - width / 2) / width) * 16;
        const rotateX = ((height / 2 - mouseY) / height) * 16;

        setRotate({ x: rotateX, y: rotateY });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setOpacity(0);
        setIsHovering(false);
    };

    const handleTouchMove = (e) => {
        if (!cardRef.current) return;
        setIsHovering(true);

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        const rotateY = ((touchX - width / 2) / width) * 16;
        const rotateX = ((height / 2 - touchY) / height) * 16;

        setRotate({ x: rotateX, y: rotateY });
        setOpacity(1);
    };

    const handleTouchEnd = () => {
        setRotate({ x: 0, y: 0 });
        setOpacity(0);
    };

    return (
        <button 
            type="button"
            onClick={() => onSelect(certificate)}
            className="flex justify-center perspective-1000 w-full h-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/50 rounded-md"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => setIsHovering(true)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative w-full bg-white dark:!bg-white/10 rounded-md p-3 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform-gpu group border border-[#007AFF]/10 dark:!border-white/20 active:scale-[0.98] flex flex-col justify-between"
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                }}
            >
                {/* Glare Effect */}
                <div
                    className="absolute inset-0 w-full h-full rounded-md pointer-events-none z-30 mix-blend-overlay transition-opacity duration-200 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                    style={{ opacity }}
                />

                {/* Certificate Image Frame */}
                <div className="relative overflow-hidden rounded-md bg-[#0F172A]/[0.03] dark:bg-[#000000]/20 aspect-[1.38/1] flex items-center justify-center p-2 border border-gray-100 dark:border-white/10">
                    <img
                        src={getAssetPath(`assets/images/${certificate.image_url}`)}
                        alt={lang === 'id' ? certificate.title_id : certificate.title_en}
                        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Overlay Content: Visible on Hover state */}
                    <div
                        className={`absolute inset-0 bg-black/90 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-5 text-center ${
                            isHovering ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <span className="material-symbols-outlined text-3xl mb-1 text-[#007AFF]">verified</span>
                        <h3 className="text-base md:text-lg font-bold mb-1 line-clamp-2">{lang === 'id' ? certificate.title_id : certificate.title_en}</h3>
                        <p className="text-xs md:text-sm font-medium text-white/90">{lang === 'id' ? certificate.path_name_id : certificate.path_name_en}</p>
                        <p className="text-[11px] md:text-xs text-white/70 mt-1 line-clamp-2">{lang === 'id' ? certificate.specialization_id : certificate.specialization_en}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                            {issuerLines &&
                                issuerLines.map((line) => (
                                    <span
                                        key={line}
                                        className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] md:text-[11px] font-medium border border-white/30"
                                    >
                                        {line}
                                    </span>
                                ))}
                        </div>
                        <div className="mt-3 text-[11px] text-white/80 flex items-center gap-1 font-medium bg-white/10 px-3 py-1 rounded-full border border-white/20">
                            <span className="material-symbols-outlined text-sm">fullscreen</span>
                            Lihat Sertifikat
                        </div>
                    </div>
                </div>

                {/* Bottom Card Summary */}
                <div className="px-2 pt-3 pb-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white truncate" title={lang === 'id' ? certificate.title_id : certificate.title_en}>
                            {lang === 'id' ? certificate.title_id : certificate.title_en}
                        </h4>
                        <span className="text-[10px] text-[#007AFF] dark:text-[#47A1FF] font-semibold shrink-0 bg-[#007AFF]/10 dark:bg-[#007AFF]/20 px-2 py-0.5 rounded-full">
                            Verified
                        </span>
                    </div>
                    <p className="text-xs text-[#86868B] dark:text-white truncate font-medium">
                        {lang === 'id' ? certificate.path_name_id : certificate.path_name_en}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function CertificatesSection() {
    const [selectedCert, setSelectedCert] = useState(null);
    const { lang } = useLang();
    const t = translations[lang];

    const handleNext = () => {
        if (!selectedCert) return;
        const currentIndex = certificatesData.findIndex((c) => c.id === selectedCert.id);
        const nextIndex = (currentIndex + 1) % certificatesData.length;
        setSelectedCert(certificatesData[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedCert) return;
        const currentIndex = certificatesData.findIndex((c) => c.id === selectedCert.id);
        const prevIndex = (currentIndex - 1 + certificatesData.length) % certificatesData.length;
        setSelectedCert(certificatesData[prevIndex]);
    };

    useEffect(() => {
        if (!selectedCert) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCert]);

    if (!certificatesData || certificatesData.length === 0) return null;

    return (
        <section id="certificates" className="py-20 px-6 relative z-10 w-full overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#007AFF] text-xs font-bold tracking-[0.2em] uppercase">{t.certificates.tagline}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white mt-2 transition-colors duration-300">
                        {t.certificates.heading}
                    </h2>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mt-3 font-medium">
                        {t.certificates.subtitle}
                    </p>
                </div>

                {/* 3D Certificate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {certificatesData.map((cert) => (
                        <CertificateCard
                            key={cert.id}
                            certificate={cert}
                            onSelect={setSelectedCert}
                            lang={lang}
                        />
                    ))}
                </div>

                {/* Smaller Competency Certificates Section */}
                <div className="mt-24 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-2">
                        {t.certificates.competencyHeading}
                    </h3>
                    <p className="text-[#86868B] text-sm max-w-lg mx-auto mb-10 font-medium">
                        {t.certificates.competencySubtitle}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                        {dicodingCertificates.map((cert) => (
                            <a 
                                key={cert.id} 
                                href={cert.credential_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#0F172A]/[0.03] dark:bg-black/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[#007AFF] text-2xl">workspace_premium</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#1D1D1F] dark:text-white line-clamp-2 mb-1" title={lang === 'id' ? cert.title_id : cert.title_en}>
                                    {lang === 'id' ? cert.title_id : cert.title_en}
                                </h4>
                                <p className="text-xs text-[#86868B] font-medium">{cert.issuer}</p>
                                <p className="text-[10px] text-[#007AFF] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Verifikasi ↗</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 animate-fade-in"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-white dark:bg-[#0B1121] dark:border dark:border-white/20 rounded-md p-4 md:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1F] dark:text-white">
                                    {lang === 'id' ? selectedCert.title_id : selectedCert.title_en}
                                </h3>
                                <p className="text-xs md:text-sm text-[#007AFF] dark:text-[#47A1FF] font-medium">
                                    {lang === 'id' ? selectedCert.path_name_id : selectedCert.path_name_en} — {lang === 'id' ? selectedCert.specialization_id : selectedCert.specialization_en}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Close"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        {/* Certificate Image View */}
                        <div className="relative flex-1 min-h-[300px] max-h-[68vh] overflow-auto flex items-center justify-center py-4 bg-gray-50/70 dark:bg-white/5 rounded-2xl my-4">
                            <img
                                src={getAssetPath(`assets/images/${selectedCert.image_url}`)}
                                alt={lang === 'id' ? selectedCert.title_id : selectedCert.title_en}
                                className="max-w-full max-h-[64vh] object-contain rounded-lg shadow-md"
                            />

                            {/* Nav Buttons */}
                            {certificatesData.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/40 shadow-lg text-gray-800 dark:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                                        aria-label="Previous"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-white/20 hover:bg-white dark:hover:bg-white/40 shadow-lg text-gray-800 dark:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                                        aria-label="Next"
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Footer Modal */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {(typeof selectedCert.issuer_lines === 'string'
                                    ? JSON.parse(selectedCert.issuer_lines)
                                    : selectedCert.issuer_lines
                                ).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full bg-[#007AFF]/10 dark:bg-[#007AFF]/20 text-[#007AFF] dark:text-[#47A1FF] text-xs font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={getAssetPath(`assets/images/${selectedCert.image_url}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#007AFF] dark:text-[#47A1FF] hover:underline font-semibold flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                {t.certificates.openOriginal}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
