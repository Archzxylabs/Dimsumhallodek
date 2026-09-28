import React, { useState } from 'react';
import { Search, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { REGIONS_DATA, OutletLocation } from '../data/locationsData';

export const StoreLocator: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect all outlets
  const allOutlets: (OutletLocation & { region: string })[] = REGIONS_DATA.flatMap((group) =>
    group.outlets.map((o) => ({ ...o, region: group.region }))
  );

  // Filter outlets by region and search query
  const filteredOutlets = allOutlets.filter((outlet) => {
    const matchRegion = selectedRegion === 'All' || outlet.region === selectedRegion;
    const matchSearch =
      searchQuery.trim() === '' ||
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (outlet.landmark && outlet.landmark.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchRegion && matchSearch;
  });

  return (
    <section id="locations" className="py-24 bg-[#F5EBCD] border-t border-[#35462B]/10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F6C94B] text-[#35462B]">
            <MapPin className="w-3.5 h-3.5" />
            Dimsum dekat kamu
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#35462B] tracking-tight">
            Cari gerai, yuk!
          </h2>
          <p className="text-[#35462B]/70 text-sm sm:text-base">
            Temukan gerai Dimsum Hallo Dek terdekat di kotamu. Klik untuk langsung membuka petunjuk arah di Google Maps.
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#35462B]/50" />
            <input
              type="text"
              placeholder="Cari kota, kecamatan, atau nama gerai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#35462B]/15 text-[#35462B] placeholder-[#35462B]/45 text-sm focus:outline-none focus:border-[#E96B2B] transition-colors shadow-sm"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedRegion('All')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all whitespace-nowrap ${
                selectedRegion === 'All'
                  ? 'bg-[#35462B] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FFF9ED] text-[#35462B] border border-[#35462B]/15'
              }`}
            >
              Semua Gerai ({allOutlets.length})
            </button>
            {REGIONS_DATA.map((group) => (
              <button
                key={group.region}
                onClick={() => setSelectedRegion(group.region)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all whitespace-nowrap ${
                  selectedRegion === group.region
                    ? 'bg-[#35462B] text-white shadow-sm'
                    : 'bg-white hover:bg-[#FFF9ED] text-[#35462B] border border-[#35462B]/15'
                }`}
              >
                {group.region} ({group.count})
              </button>
            ))}
          </div>

        </div>

        {/* Outlet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredOutlets.map((outlet, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white hover:bg-[#FFFDF6] border border-[#35462B]/12 hover:border-[#E96B2B]/50 transition-all flex flex-col justify-between group shadow-[0_8px_28px_rgba(40,57,32,0.06)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#C45120]">
                    {outlet.region}
                  </span>
                  <span className="text-[11px] text-[#35462B]/40">#{idx + 1}</span>
                </div>
                <h4 className="font-display font-semibold text-[#35462B] text-lg group-hover:text-[#C45120] transition-colors">
                  {outlet.name}
                </h4>
                <p className="text-[#35462B]/70 text-xs leading-relaxed line-clamp-2">
                  {outlet.address}
                </p>
                {outlet.landmark && (
                  <p className="text-[11px] text-[#35462B]/55 italic">
                    📍 Landmark: {outlet.landmark}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-[#35462B]/10">
                <a
                  href={outlet.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-full bg-[#FFF1D5] hover:bg-[#E96B2B] hover:text-white text-[#35462B] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Buka di Google Maps
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredOutlets.length === 0 && (
          <div className="text-center py-12 text-[#35462B]/60 text-sm">
            Tidak ada gerai yang cocok dengan kata kunci pencarian. Coba ketik nama daerah lain.
          </div>
        )}

      </div>
    </section>
  );
};
