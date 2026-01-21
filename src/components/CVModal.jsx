import { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import cvFile from '../assets/images/Muhammad Rafli Nurfathan - Resume.pdf';

// Configure PDF.js worker
// Use the CDN worker to avoid build/bundling issues with Vite for now
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Optional: Import default styles for react-pdf text layer/annotation layer if needed (or disable them)
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export default function CVModal({ isOpen, onClose }) {
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);
    const containerRef = useRef(null);

    // Lock body scroll when modal is open
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

    // Measure container width for responsive PDF rendering
    useEffect(() => {
        if (!isOpen) return;

        const updateWidth = () => {
            if (containerRef.current) {
                // Subtract padding to be safe (e.g. 32px or just use clientWidth)
                setContainerWidth(containerRef.current.clientWidth - (window.innerWidth < 768 ? 0 : 40));
            }
        };

        // Initial measurement
        // Small timeout to allow transition/rendering to settle
        const timer = setTimeout(updateWidth, 100);
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
            clearTimeout(timer);
        };
    }, [isOpen]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    if (!isOpen) return null;

    const cvUrl = cvFile || '#';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white md:rounded-2xl w-full max-w-4xl h-full md:h-[90vh] flex flex-col shadow-2xl animate-fade-in-up">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0 bg-white md:rounded-t-2xl z-10">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Curriculum Vitae</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                {/* Body (PDF Render) */}
                <div
                    ref={containerRef}
                    className="flex-1 bg-gray-100 overflow-y-auto overscroll-y-contain relative -webkit-overflow-scrolling-touch p-0 md:p-8 flex flex-col items-center"
                >
                    <Document
                        file={cvUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col gap-4 shadow-xl"
                        loading={
                            <div className="flex items-center justify-center h-40">
                                <span className="animate-spin material-symbols-outlined text-gray-400 text-3xl">progress_activity</span>
                            </div>
                        }
                        error={
                            <div className="text-center p-10 text-red-500">
                                <p>Failed to load PDF.</p>
                                <a href={cvUrl} className="text-blue-500 underline mt-2 inline-block">Download instead</a>
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                width={containerWidth || 300} // Fallback width
                                className="bg-white shadow-sm"
                            />
                        ))}
                    </Document>
                </div>

                {/* Footer (Actions) */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white md:rounded-b-2xl shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
