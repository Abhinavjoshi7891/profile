import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsTicker } from './components/SkillsTicker';
import { SelectedWork } from './components/SelectedWork';
import { AutonomyLab } from './components/AutonomyLab';
import { AboutSection } from './components/AboutSection';
import { ResumeSection } from './components/ResumeSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ToolkitSection } from './components/ToolkitSection';
import { TrainingStation } from './components/TrainingStation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PixelPets } from './components/PixelPets';
import { PalletTechnicalBrief } from './components/PalletTechnicalBrief';
import { WholeBodyArchitecture } from './components/WholeBodyArchitecture';
import { VLAReportPage } from './components/VLAReportPage';
import { RLDockingBrief } from './components/RLDockingBrief';
import { SAM3DMocapReport } from './components/SAM3DMocapReport';
import { DynamoidNavReport } from './components/DynamoidNavReport';
import { JourneyCarousel } from './components/JourneyCarousel';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'pallet-brief' | 'whole-body-arch' | 'vla-report' | 'rl-docking-brief' | 'sam3d-report' | 'dynamoid-report'>(() => {
    if (window.location.hash === '#dynamoid-report' || window.location.hash === '#model-6999' || window.location.hash === '#social-nav-report') return 'dynamoid-report';
    if (window.location.hash === '#sam3d-mocap-report' || window.location.hash === '#sam3d-mocap') return 'sam3d-report';
    if (window.location.hash === '#rl-docking-brief' || window.location.hash === '#rl-docking') return 'rl-docking-brief';
    if (window.location.hash === '#vla-report' || window.location.hash === '#vla-dock') return 'vla-report';
    if (window.location.hash === '#pallet-brief') return 'pallet-brief';
    if (window.location.hash === '#whole-body-arch' || window.location.hash === '#architecture') return 'whole-body-arch';
    return 'home';
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dynamoid-report' || window.location.hash === '#model-6999' || window.location.hash === '#social-nav-report') {
        setCurrentPage('dynamoid-report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#sam3d-mocap-report' || window.location.hash === '#sam3d-mocap') {
        setCurrentPage('sam3d-report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#rl-docking-brief' || window.location.hash === '#rl-docking') {
        setCurrentPage('rl-docking-brief');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#vla-report' || window.location.hash === '#vla-dock') {
        setCurrentPage('vla-report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#pallet-brief') {
        setCurrentPage('pallet-brief');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#whole-body-arch' || window.location.hash === '#architecture') {
        setCurrentPage('whole-body-arch');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout((window as unknown as { _toastTimer?: number })._toastTimer);
    (window as unknown as { _toastTimer?: number })._toastTimer = window.setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  if (currentPage === 'dynamoid-report') {
    return (
      <>
        <DynamoidNavReport
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  if (currentPage === 'sam3d-report') {
    return (
      <>
        <SAM3DMocapReport
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  if (currentPage === 'rl-docking-brief') {
    return (
      <>
        <RLDockingBrief
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  if (currentPage === 'vla-report') {
    return (
      <>
        <VLAReportPage
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  if (currentPage === 'pallet-brief') {
    return (
      <>
        <PalletTechnicalBrief
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  if (currentPage === 'whole-body-arch') {
    return (
      <>
        <WholeBodyArchitecture
          onBack={() => {
            window.location.hash = '#work';
            setCurrentPage('home');
          }}
        />
        <PixelPets onShowToast={showToast} />
        <div
          className={`pet-toast ${toast ? 'is-visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main id="main">
        {/* Hero Section with ABHINAV_OS Console */}
        <Hero />

        {/* Continuous Skills Ticker Marquee */}
        <SkillsTicker />

        {/* 01 / Selected Work */}
        <SelectedWork
          onOpenBrief={() => setCurrentPage('pallet-brief')}
          onOpenArchitecture={() => setCurrentPage('whole-body-arch')}
          onOpenVlaReport={() => setCurrentPage('vla-report')}
          onOpenRlBrief={() => setCurrentPage('rl-docking-brief')}
          onOpenSam3dReport={() => setCurrentPage('sam3d-report')}
          onOpenDynamoidReport={() => setCurrentPage('dynamoid-report')}
          onShowToast={showToast}
        />

        {/* 02 / Autonomy Lab — Elexis-W Learned Social Navigation Simulator */}
        <AutonomyLab />

        {/* 03 / About Section & Key Metrics */}
        <AboutSection />

        {/* 04 / Field Log (Résumé, Impact Strip & Career History) */}
        <ResumeSection onShowToast={showToast} />

        {/* 05 / Research & Publications */}
        <PublicationsSection />

        {/* 06 / Technical Toolkit */}
        <ToolkitSection />

        {/* Easter Egg: Isaac Lab Training Station (PID 0826) */}
        <TrainingStation onShowToast={showToast} />

        {/* 07 / Contact & Connections */}
        <ContactSection />

        {/* 08 / My Journey Carousel */}
        <JourneyCarousel onShowToast={showToast} />
      </main>

      <Footer />

      {/* Autonomous Robotics Pixel Pets roaming along margins */}
      <PixelPets onShowToast={showToast} />

      {/* Toast Notification HUD */}
      <div
        className={`pet-toast ${toast ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
};

export default App;
