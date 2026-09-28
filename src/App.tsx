import { useState } from 'react';
import { MENU_ITEMS } from './data/menuData';
import { Navbar } from './components/Navbar';
import { KineticShowcase } from './components/KineticShowcase';
import { EventServices } from './components/EventServices';
import { StoreLocator } from './components/StoreLocator';
import { FranchiseAutopilot } from './components/FranchiseAutopilot';
import { Footer } from './components/Footer';

export function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFF9ED] text-[#35462B]">
      <Navbar />
      <main>
        <KineticShowcase items={MENU_ITEMS} currentIndex={currentIndex} onSelectIndex={setCurrentIndex} />
        <EventServices />
        <StoreLocator />
        <FranchiseAutopilot />
      </main>
      <Footer />
    </div>
  );
}

export default App;
