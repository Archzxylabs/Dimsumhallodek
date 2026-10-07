import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Search, X } from "lucide-react";
import { REGIONS_DATA } from "../data/locationsData";
import { Dumpling, Reveal, Spark } from "./DesignElements";
import { isStringRecord, useSessionState } from '../lib/useSessionState';
import { whatsappUrl } from '../lib/business';

const allOutlets = REGIONS_DATA.flatMap((group) =>
  group.outlets.map((outlet) => ({ ...outlet, region: group.region })),
);

function outletWhatsappUrl(outlet: (typeof allOutlets)[number]) {
  const area = outlet.region === 'Wilayah perlu konfirmasi' ? '' : ` (${outlet.region})`;
  return whatsappUrl(`Halo Bang Mus, saya ingin berkunjung ke gerai ${outlet.name}${area}. Mohon konfirmasi ${outlet.address ? 'apakah gerai masih aktif, jam buka, dan ketersediaan menu' : 'alamat lengkap, pin Google Maps terbaru, jam buka, dan ketersediaan menu'}.`);
}

type LocatorDraft = { region: string; query: string; page?: number };
function viewportPageSize() {
  return window.innerWidth >= 1024 && window.innerHeight >= 640 ? (window.innerHeight >= 840 ? 4 : 3) : 4;
}

export function StoreLocator() {
  const [draft, setDraft] = useSessionState<LocatorDraft>('locator', { region: 'All', query: '', page: 1 }, (v): v is LocatorDraft => isStringRecord(v, ['region', 'query']) && (v.region === 'All' || v.region === 'Kota Bogor' || REGIONS_DATA.some((r) => r.region === v.region)) && (v.page === undefined || (typeof v.page === 'number' && Number.isInteger(v.page) && v.page > 0)));
  const [pageSize, setPageSize] = useState(viewportPageSize);
  useEffect(() => {
    const resize = () => setPageSize(viewportPageSize());
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const { query } = draft;
  const region = draft.region === 'Kota Bogor' ? 'Bogor & sekitarnya' : draft.region;
  const setRegion = (value: string) => setDraft((previous) => ({ ...previous, region: value, page: 1 }));
  const setQuery = (value: string) => setDraft((previous) => ({ ...previous, query: value, page: 1 }));
  const filtered = useMemo(
    () =>
      allOutlets.filter(
        (outlet) =>
          (region === "All" || outlet.region === region) &&
          [outlet.name, outlet.address ?? '', outlet.region, ...outlet.aliases, ...outlet.previousNames].join(' ')
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [region, query],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(draft.page ?? 1, pageCount);
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const changePage = (next: number) => {
    setDraft((previous) => ({ ...previous, page: next }));
    requestAnimationFrame(() => document.getElementById('locations')?.scrollIntoView({ block: 'start', behavior: 'instant' }));
  };
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
            <p>Bogor · Bekasi · Sukabumi · Bandung</p>
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
            Daftar diperbarui 7 Oktober 2026. Cari nama gerai atau wilayahnya; jarak belum dihitung dari lokasimu. Alamat yang belum lengkap, jam buka, dan status harian dikonfirmasi ke tim sebelum berkunjung.
          </p>
        </aside>
        <div className="outlet-results">
          <div className="results-heading">
            <span aria-live="polite">{filtered.length > 0 ? `${start + 1}–${start + visible.length} dari ` : ''}{filtered.length} gerai {region === 'All' ? 'di semua wilayah' : `di ${region}`}{query.trim() && ` untuk “${query.trim()}”`}</span>
            <span>ALAMAT / ARAH</span>
          </div>
          {visible.map((outlet, index) => (
            <article className="outlet-row" key={outlet.name}>
              <span className="outlet-index">
                {String(start + index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="outlet-region">{outlet.region}</span>
                <h3>{outlet.name}</h3>
                <p className={outlet.address ? undefined : 'outlet-address-pending'}>{outlet.address ?? 'Alamat lengkap perlu dikonfirmasi ke tim.'}</p>
                {outlet.previousNames.length > 0 && <p className="outlet-relocation">Pindahan dari {outlet.previousNames[0]}.</p>}
                <div className="outlet-visit-info"><span>Jam buka: konfirmasi tim</span><a href={outletWhatsappUrl(outlet)} target="_blank" rel="noopener noreferrer">Tanya tim tentang {outlet.name} <ArrowUpRight size={14} /></a></div>
              </div>
              <a
                href={outlet.mapsUrl ?? outletWhatsappUrl(outlet)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={outlet.mapsUrl ? `Buka petunjuk arah ke ${outlet.name} di Google Maps` : `Tanya lokasi gerai ${outlet.name} via WhatsApp`}
              >
                {outlet.mapsUrl ? <ArrowUpRight /> : <MapPin />}
                <span>{outlet.mapsUrl ? 'Google Maps' : 'Konfirmasi lokasi'}</span>
              </a>
            </article>
          ))}
          {pageCount > 1 && <nav className="outlet-pagination" aria-label="Halaman daftar gerai">
            <button type="button" disabled={page === 1} onClick={() => changePage(page - 1)} aria-label="Halaman gerai sebelumnya"><ArrowLeft size={18} /><span>Sebelumnya</span></button>
            <span aria-live="polite">{page} / {pageCount}</span>
            <button type="button" disabled={page === pageCount} onClick={() => changePage(page + 1)} aria-label="Halaman gerai berikutnya"><span>Berikutnya</span><ArrowRight size={18} /></button>
          </nav>}
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
