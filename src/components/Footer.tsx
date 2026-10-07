import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Spark } from "./DesignElements";
import { sitePages, whatsappUrl } from "../lib/business";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <p className="eyebrow">Perut happy. Hari ikut happy.</p>
          <a
            href={whatsappUrl("Halo Bang Mus, aku mau pesan dimsum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta"
          >
            Yuk, ngobrol
            <ArrowUpRight />
          </a>
        </div>
        <Link
          to="/"
          className="footer-wordmark"
          aria-label="Dimsum Hallo Dek — beranda"
        >
          HALLO DEK
          <span>
            <Spark />
          </span>
        </Link>
        <div className="footer-grid">
          <div>
            <p className="footer-label">Dimsum Hallo Dek</p>
            <p>
              Gurihnya buat kamu.
              <br />
              Happynya buat semua.
            </p>
            <p className="footer-company">PT Merza Perintis Sukses</p>
          </div>
          <nav aria-label="Navigasi footer">
            <p className="footer-label">Jelajahi</p>
            {sitePages.map((page) => (
              <Link key={page.path} to={page.path}>
                {page.label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="footer-label">Ada yang mau ditanyain?</p>
            <a
              href={whatsappUrl(
                "Halo, saya mau tanya produk atau event Dimsum Hallo Dek.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Produk & event
              <ArrowUpRight size={16} />
            </a>
            <a
              href={whatsappUrl(
                "Halo, saya tertarik kemitraan Dimsum Hallo Dek.",
                true,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Kemitraan
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div>
            <p className="footer-label">Mampir ke kantor</p>
            <p>
              Jl. Raya Permata Cibubur No. 3 Blok B4,
              <br />
              Cileungsi, Kab. Bogor, Jawa Barat.
            </p>
            <p className="footer-company">Senin–Sabtu · 08.00–16.00 WIB</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dimsum Hallo Dek</span>
          <span>#AutoHappy Setiap Hari</span>
          <a href="#top">Balik ke atas ↑</a>
        </div>
      </div>
    </footer>
  );
}
