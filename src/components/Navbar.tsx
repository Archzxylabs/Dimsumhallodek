import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import { sitePages, whatsappUrl } from "../lib/business";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
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
    const desktop = window.matchMedia("(min-width: 768px)");
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
            src="/assets/images/cropped-cropped-Desain-tanpa-judul-2.png"
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
              {page.label}
            </NavLink>
          ))}
        </nav>
        <a
          className="header-order"
          href={whatsappUrl("Halo Minsum, aku mau tanya dan pesan dimsum.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lagi pengin dimsum?
          <ArrowUpRight size={18} />
        </a>
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
      {open && (
        <nav
          ref={navigationRef}
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Navigasi mobile"
        >
          <p className="eyebrow">Pilih jalan happy kamu</p>
          {sitePages.map((page, i) => (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === "/"}
              onClick={() => setOpen(false)}
            >
              <span className="nav-index">0{i + 1}</span>
              {page.label}
              <ArrowUpRight />
            </NavLink>
          ))}
          <a
            className="button button-orange"
            href={whatsappUrl("Halo Minsum, aku mau pesan dimsum.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan via WhatsApp
            <ArrowUpRight size={20} />
          </a>
          <p className="mobile-nav-note">#AutoHappy Setiap Hari</p>
        </nav>
      )}
    </header>
  );
}
