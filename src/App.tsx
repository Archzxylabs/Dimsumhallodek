import { useEffect, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigationType } from "react-router";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { EventServices } from "./components/EventServices";
import { StoreLocator } from "./components/StoreLocator";
import { FranchiseAutopilot } from "./components/FranchiseAutopilot";
import { Footer } from "./components/Footer";
import { SignatureProducts } from "./components/SignatureProducts";
import { WhatsAppFloating } from "./components/WhatsAppFloating";
import { HomePage } from "./pages/HomePage";
import { MembershipPage } from "./pages/MembershipPage";
import { sitePages } from "./lib/business";

function PageNavigation() {
  const { pathname, search, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const entry = `${key}:${pathname}${search}${hash}`;
  const currentEntry = useRef(entry);
  const previousPath = useRef(pathname);
  const positions = useRef<Record<string, number>>({});
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem('dhd:scroll:v1') || '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) positions.current = saved as Record<string, number>;
    } catch { positions.current = {}; }
    const save = () => {
      try { sessionStorage.setItem('dhd:scroll:v1', JSON.stringify(positions.current)); } catch { /* Storage is optional. */ }
    };
    const record = () => { positions.current[currentEntry.current] = window.scrollY; };
    window.addEventListener('scroll', record, { passive: true });
    window.addEventListener('pagehide', save);
    return () => { save(); history.scrollRestoration = previous; window.removeEventListener('scroll', record); window.removeEventListener('pagehide', save); };
  }, []);
  useLayoutEffect(() => {
    currentEntry.current = entry;
    const frame = requestAnimationFrame(() => {
      const saved = positions.current[entry];
      if (navigationType === 'POP' && typeof saved === 'number' && Number.isFinite(saved)) window.scrollTo({ top: saved, behavior: 'instant' });
      else if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      if (previousPath.current !== pathname) document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    });
    return () => cancelAnimationFrame(frame);
  }, [entry, navigationType, pathname, hash]);
  useEffect(() => {
    const page = sitePages.find((page) => page.path === pathname);
    document.title = `${page?.title ?? "Halaman tidak ditemukan"} — Dimsum Hallo Dek`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        page?.description ?? "Temukan Dimsum Hallo Dek.",
      );
  }, [pathname]);
  return null;
}

export function App() {
  // Apply navigation promptly while the voice room sends frequent updates.
  return (
    <BrowserRouter useTransitions={false}>
      <MotionConfig reducedMotion="user">
        <div id="top" className="min-h-screen bg-[#FFF9ED] text-[#35462B]">
          <PageNavigation />
          <a href="#main-content" className="skip-link">
            Langsung ke konten
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produk" element={<SignatureProducts />} />
              <Route path="/event" element={<EventServices />} />
              <Route path="/kemitraan" element={<FranchiseAutopilot />} />
              <Route path="/gerai" element={<StoreLocator />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route
                path="*"
                element={
                  <section className="page-width not-found">
                    <p className="eyebrow">404 / Nyasar sedikit</p>
                    <h1 className="editorial-heading">
                      Dimsumnya
                      <br />
                      di sebelah sini.
                    </h1>
                    <Link to="/" className="button button-orange">
                      Balik ke Menu Favorit ↗
                    </Link>
                  </section>
                }
              />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloating />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
