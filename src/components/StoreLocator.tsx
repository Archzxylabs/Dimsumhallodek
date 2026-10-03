import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { REGIONS_DATA } from "../data/locationsData";
import { Dumpling, Reveal, Spark } from "./DesignElements";

const allOutlets = REGIONS_DATA.flatMap((group) =>
  group.outlets.map((outlet) => ({ ...outlet, region: group.region })),
);

export function StoreLocator() {
  const [region, setRegion] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      allOutlets.filter(
        (outlet) =>
          (region === "All" || outlet.region === region) &&
          `${outlet.name} ${outlet.address} ${outlet.region}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [region, query],
  );
  return (
    <>
      <section className="location-hero page-hero">
        <div className="page-width location-hero-grid">
          <Reveal>
            <p className="eyebrow">04 / Your neighborhood, our dimsum</p>
            <h1 className="hero-title">
              HALLO,
              <br />
              <span className="text-orange">TETANGGA.</span>
            </h1>
            <p className="hero-description">
              Mampir, bawa pulang, atau nikmati bareng.
              <br />
              Cari alamat gerai di sekitar kamu.
            </p>
          </Reveal>
          <Reveal className="location-hero-art">
            <span className="location-count">
              {allOutlets.length}
              <Spark />
            </span>
            <span className="eyebrow">Gerai dalam daftar</span>
            <Dumpling />
            <p>Bogor · Bekasi · Sukabumi</p>
          </Reveal>
        </div>
      </section>
      <section
        id="locations"
        className="page-width section-space locator-layout"
      >
        <aside className="locator-sidebar">
          <p className="eyebrow">
            <MapPin size={15} /> Find your happy place
          </p>
          <h2>
            Di mana
            <br />
            kamu sekarang?
          </h2>
          <div className="locator-search">
            <Search size={19} />
            <input
              aria-label="Cari gerai"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nama gerai atau daerah..."
            />
            {query && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setQuery("")}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <div className="region-filters" aria-label="Filter wilayah">
            <button
              type="button"
              aria-pressed={region === "All"}
              onClick={() => setRegion("All")}
            >
              Semua wilayah<span>{allOutlets.length}</span>
            </button>
            {REGIONS_DATA.map((group) => (
              <button
                type="button"
                key={group.region}
                aria-pressed={region === group.region}
                onClick={() => setRegion(group.region)}
              >
                {group.region}
                <span>{group.outlets.length}</span>
              </button>
            ))}
          </div>
          <p className="locator-note">
            Alamat mengikuti daftar gerai. Pastikan jam buka dan ketersediaan
            langsung sebelum berkunjung.
          </p>
        </aside>
        <div className="outlet-results">
          <div className="results-heading">
            <span aria-live="polite">{filtered.length} gerai ditemukan</span>
            <span>ALAMAT / ARAH</span>
          </div>
          {filtered.map((outlet, index) => (
            <article className="outlet-row" key={outlet.name}>
              <span className="outlet-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="outlet-region">{outlet.region}</span>
                <h3>{outlet.name}</h3>
                <p>{outlet.address}</p>
              </div>
              <a
                href={outlet.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka petunjuk arah ke ${outlet.name} di Google Maps`}
              >
                <ArrowUpRight />
                <span>Google Maps</span>
              </a>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="locator-empty">
              <Dumpling />
              <h3>Belum ketemu yang cocok.</h3>
              <p>Coba nama daerah lain atau lihat semua gerai.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setRegion("All");
                }}
                className="button button-green"
              >
                Lihat semua gerai
                <ArrowUpRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
