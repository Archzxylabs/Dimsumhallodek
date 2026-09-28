import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from './data/menuData';
import { Navbar } from './components/Navbar';
import { KineticShowcase } from './components/KineticShowcase';
import { DimsumCustomizer, CustomRacikan } from './components/DimsumCustomizer';
import { DigitalReceiptModal } from './components/DigitalReceiptModal';
import { StoreLocator } from './components/StoreLocator';
import { FranchiseAutopilot } from './components/FranchiseAutopilot';
import { Footer } from './components/Footer';

export function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);
  const [currentRacikan, setCurrentRacikan] = useState<CustomRacikan | null>(null);

  const activeItem = MENU_ITEMS[currentIndex];

  const handleOpenCustomizer = (_item?: MenuItem) => {
    const el = document.getElementById('customizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerateReceipt = (racikan: CustomRacikan) => {
    setCurrentRacikan(racikan);
    setIsReceiptOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#35462B]">
      <Navbar
        onOpenCustomizer={() => handleOpenCustomizer()}
      />

      {/* Main Kinetic Showcase (The Core "Warmindo-style" Experience) */}
      <main>
        <KineticShowcase
          items={MENU_ITEMS}
          currentIndex={currentIndex}
          onSelectIndex={setCurrentIndex}
          onOpenCustomizer={handleOpenCustomizer}
        />

        {/* Interactive Customizer Workbench ("Racik Dimsum Dek") */}
        <DimsumCustomizer
          initialMenuItem={activeItem}
          onGenerateReceipt={handleGenerateReceipt}
        />

        {/* Smart Store Locator (27+ Cabang with Google Maps) */}
        <StoreLocator />

        {/* B2B Franchise Autopilot (ROI Calculator & Proposal Download) */}
        <FranchiseAutopilot />
      </main>

      {/* Footer */}
      <Footer />

      {/* Digital Receipt Modal ("Nota Dimsum Dek" PNG generator) */}
      <DigitalReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        racikan={currentRacikan}
      />
    </div>
  );
}

export default App;
