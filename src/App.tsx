import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { EventServices } from "./components/EventServices";
import { StoreLocator } from "./components/StoreLocator";
import { FranchiseAutopilot } from "./components/FranchiseAutopilot";
import { Footer } from "./components/Footer";
import { SignatureProducts } from "./components/SignatureProducts";
import { ArchavaConcierge } from "./components/ArchavaConcierge";
import { HomePage } from "./pages/HomePage";
import { sitePages } from "./lib/business";

function PageNavigation() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const page = sitePages.find((page) => page.path === pathname);
    document.title = `${page?.title ?? "Halaman tidak ditemukan"} — Dimsum Hallo Dek`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        page?.description ?? "Temukan Dimsum Hallo Dek.",
      );
    const frame = requestAnimationFrame(() => {
      if (hash)
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
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
          <ArchavaConcierge />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
