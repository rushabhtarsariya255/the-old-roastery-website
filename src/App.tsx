import React from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BestSellers } from './components/BestSellers';
import { Menu } from './components/Menu';
import { Experiences } from './components/Experiences';
import { Gallery } from './components/Gallery';
import { WhyVisit } from './components/WhyVisit';
import { LocationContact } from './components/LocationContact';
import { PreFooterCTA } from './components/PreFooterCTA';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-espresso-950 font-sans selection:bg-antiqueGold-300 selection:text-espresso-950">
      {/* Top Concept Disclaimer */}
      <DisclaimerBanner />

      {/* Header & Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <BestSellers />
        <Menu />
        <Experiences />
        <Gallery />
        <WhyVisit />
        <LocationContact />
        <PreFooterCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & Directions Actions */}
      <FloatingActions />
    </div>
  );
};

export default App;
