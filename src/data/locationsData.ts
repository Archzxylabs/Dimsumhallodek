import locations from '../../data/locations.json';

export interface OutletLocation {
  name: string;
  address: string | null;
  mapsUrl: string | null;
  aliases: string[];
  previousNames: string[];
}

export interface RegionGroup {
  region: string;
  count: number;
  outlets: OutletLocation[];
}

interface SourceOutlet {
  name: string;
  address: string | null;
  maps_url: string | null;
  aliases?: string[];
  previous_names?: string[];
}

export const REGIONS_DATA: RegionGroup[] = Object.entries(locations).map(([region, rows]) => ({
  region,
  count: rows.length,
  outlets: (rows as SourceOutlet[]).map((outlet) => ({
    name: outlet.name,
    address: outlet.address,
    mapsUrl: outlet.maps_url,
    aliases: outlet.aliases ?? [],
    previousNames: outlet.previous_names ?? [],
  })),
}));
