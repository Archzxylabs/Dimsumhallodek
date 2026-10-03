import { useMemo } from "react";
import { ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { REGIONS_DATA } from "../data/locationsData";
import { Dumpling, Reveal, Spark } from "./DesignElements";
import { isStringRecord, useSessionState } from '../lib/useSessionState';
import { whatsappUrl } from '../lib/business';

const allOutlets = REGIONS_DATA.flatMap((group) =>
  group.outlets.map((outlet) => ({ ...outlet, region: group.region })),
);

export function StoreLocator() {
  const [draft, setDraft] = useSessionState('locator', { region: 'All', query: '' }, (v): v is { region: string; query: string } => isStringRecord(v, ['region', 'query']) && (v.region === 'All' || REGIONS_DATA.some((r) => r.region === v.region)));
  const { region, query } = draft;
  const setRegion = (value: string) => setDraft((previous) => ({ ...previous, region: value }));
  const setQuery = (value: string) => setDraft((previous) => ({ ...previous, query: value }));
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
            <p className="eyebrow">04 / Alamat & petunjuk gerai</p>
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
            <a className="button button-green locator-jump" href="#locations">Cari alamat gerai <ArrowUpRight size={18} /></a>
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
              <MapPin size={15} /> Cari gerai kamu
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
            Daftar ini dapat dicari berdasarkan nama dan wilayah; jarak belum dihitung dari lokasimu. Jam buka dan status gerai dikonfirmasi ke tim sebelum berkunjung.
          </p>
        </aside>
        <div className="outlet-results">
          <div className="results-heading">
            <span aria-live="polite">{filtered.length} gerai {region === 'All' ? 'di semua wilayah' : `di ${region}`}{query.trim() && ` untuk “${query.trim()}”`}</span>
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
                <div className="outlet-visit-info"><span>Jam buka: konfirmasi tim</span><a href={whatsappUrl(`Halo Minsum, saya ingin berkunjung ke gerai ${outlet.name} (${outlet.region}). Mohon konfirmasi apakah gerai masih aktif, jam buka, dan ketersediaan menu.`)} target="_blank" rel="noopener noreferrer">Tanya tim tentang {outlet.name} <ArrowUpRight size={14} /></a></div>
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
              <p>{region === 'All' ? 'Coba nama gerai atau daerah lain.' : `Pencarian sedang dibatasi ke ${region}. Coba cari di semua wilayah.`}</p>
              {region !== 'All' && <button type="button" onClick={() => setRegion('All')} className="button button-orange">Cari di semua wilayah <Search size={18} /></button>}
              <button
                type="button"
                onClick={() => {
                  setDraft({ query: '', region: 'All' });
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
