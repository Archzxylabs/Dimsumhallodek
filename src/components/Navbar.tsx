import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { sitePages } from "../lib/business";
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PageProgress } from './MotionElements';
import { motionSprings, motionTokens } from '../lib/motionTokens';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const previousPage = useRef(`${location.pathname}${location.hash}`);
  useEffect(() => {
    const page = `${location.pathname}${location.hash}`;
    if (previousPage.current !== page) setOpen(false);
    previousPage.current = page;
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links =
          navigationRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        const first = toggleRef.current;
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    const frame = requestAnimationFrame(() =>
      navigationRef.current?.querySelector("a")?.focus(),
    );
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previous;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          to="/"
          className="brand-lockup"
          aria-label="Dimsum Hallo Dek — beranda"
        >
          <img
            src="/assets/optimized/logo-192.webp"
            alt=""
            width="46"
            height="46"
          />
          <span>
            Dimsum
            <br />
            Hallo Dek<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {sitePages.map((page) => (
            <NavLink key={page.path} to={page.path} end={page.path === "/"}>
              {({ isActive }) => <>{page.label}{isActive && <motion.span className="nav-active-line" layoutId="nav-active-line" transition={motionSprings.navigation} />}</>}
            </NavLink>
          ))}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <PageProgress key={location.pathname} />
      <AnimatePresence>
      {open && (
        <motion.nav
          key="mobile-menu"
          ref={navigationRef}
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Navigasi mobile"
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={{ duration: reduced ? motionTokens.duration.fast : motionTokens.duration.normal, ease: motionTokens.ease }}
        >
          <p className="eyebrow">Pilih jalan happy kamu</p>
          {sitePages.map((page, i) => (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === "/"}
              onClick={() => setOpen(false)}
              style={{ '--nav-delay': `${i * motionTokens.stagger}s` } as CSSProperties}
            >
              <span className="nav-index">0{i + 1}</span>
              {page.label}
              <ArrowUpRight />
            </NavLink>
          ))}
          <p className="mobile-nav-note">Enak & Gurih Bikin Nagih</p>
        </motion.nav>
      )}
      </AnimatePresence>
    </header>
  );
}
