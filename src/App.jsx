import { useState } from 'react';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import AmbientBackground from './components/AmbientBackground';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JourneySection from './components/JourneySection';
import EcosystemSection from './components/EcosystemSection';
import CertificatesSection from './components/CertificatesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';

import CVModal from './components/CVModal';

function App() {
  const [showDetail, setShowDetail] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewCaseStudy = (project) => {
    setSelectedProject(project);
    setShowDetail(true);
    window.scrollTo(0, 0);
  };

  const handleBackToMain = () => {
    setShowDetail(false);
    setSelectedProject(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView();
    }, 100);
  };

  if (showDetail) {
    return (
      <LanguageProvider>
        <ProjectDetail onBack={handleBackToMain} project={selectedProject} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="bg-[#F5F5F7] dark:bg-[#0B1121] text-[#1D1D1F] dark:text-[#F5F5F7] font-display min-h-screen relative overflow-x-hidden transition-colors duration-300">
        <AmbientBackground />
        <Header />

        {/* Screen 1: Home */}
        <HomePage onOpenCV={() => setShowCV(true)} />

        {/* Screen 2: Journey */}
        <JourneySection />

        {/* Screen 3: Ecosystem & Tools */}
        <EcosystemSection />

        {/* Screen 4: Certificates */}
        <CertificatesSection />

        {/* Screen 5: Projects */}
        <ProjectsSection onViewCaseStudy={handleViewCaseStudy} />

        {/* Contact */}
        <ContactSection />



        <CVModal
          isOpen={showCV}
          onClose={() => setShowCV(false)}
        />

        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
