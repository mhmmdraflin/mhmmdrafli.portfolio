import { useEffect } from 'react';
import cvFile from '../assets/images/Muhammad Rafli Nurfathan - Resume.pdf';

export default function CVModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Use a placeholder if the actual CV file is not available yet
    const cvUrl = cvFile || '#';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[90vh] md:h-[85vh] flex flex-col shadow-2xl animate-fade-in-up mx-2 md:mx-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Curriculum Vitae</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                {/* Body (PDF Preview) */}
                <div className="flex-1 bg-gray-50 overflow-hidden relative">
                    <iframe
                        src={cvUrl}
                        className="w-full h-full border-none"
                        title="CV Preview"
                    >
                        <p className="text-center p-10 text-gray-500">
                            Your browser does not support PDF previews.
                            <a href={cvUrl} className="text-blue-500 hover:underline">Download the PDF</a> to view it.
                        </p>
                    </iframe>
                </div>

                {/* Footer (Actions) */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        Close
                    </button>
                    <a
                        href={cvUrl}
                        download="Muhammad_Rafli_Nurfathan_CV.pdf"
                        className="px-6 py-2.5 text-sm font-bold text-white bg-[#007AFF] hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    );
}
