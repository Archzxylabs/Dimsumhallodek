export interface MenuItem {
  id: string;
  index: string;
  name: string;
  watermark: string;
  tagline: string;
  badge: string;
  price: number;
  priceFormatted: string;
  description: string;
  image: string;
  bgGradient: {
    from: string;
    via: string;
    to: string;
  };
  accentColor: string;
  secondaryColor: string;
  flavorNotes: string[];
  specs: {
    portion: string;
    torched: boolean;
    spiciness: number; // 0 to 3
    meatRatio: string;
  };
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dimsum-mix-mentai-tartar',
    index: '01',
    name: 'MIX MENTAI TARTAR.',
    watermark: 'MENTAI.',
    tagline: 'Gurih creamy saus mentai ditorch harum berpadu tartar segar.',
    badge: 'SIGNATURE BEST SELLER',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum full daging ayam lembut diselimuti kombinasi saus mentai gurih-creamy dan saus tartar segar, ditorch ringan menghasilkan sensasi smoky khas.',
    image: '/assets/processed_dishes/mentai_tartar.png',
    bgGradient: {
      from: '#7c2d12', // orange-900
      via: '#431407', // orange-950
      to: '#1c0a00',
    },
    accentColor: '#f97316', // orange-500
    secondaryColor: '#fdba74',
    flavorNotes: ['Creamy Mentai', 'Fresh Tartar', 'Light Torched', '100% Ayam'],
    specs: {
      portion: '4 Pcs / Tray',
      torched: true,
      spiciness: 1,
      meatRatio: 'Full Daging 90%'
    }
  },
  {
    id: 'dimsum-carbonara',
    index: '02',
    name: 'DIMSUM CARBONARA.',
    watermark: 'CHEESY.',
    tagline: 'Perpaduan gurih cheesy ala western fusion dengan taburan nori.',
    badge: 'CHEESY & CREAMY',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum ayam juicy berlumur saus carbonara creamy pekat, gurih keju lumer yang meleleh di mulut, disempurnakan serpihan nori premium.',
    image: '/assets/processed_dishes/carbonara.png',
    bgGradient: {
      from: '#713f12', // yellow-900
      via: '#3f2003', // warm ochre
      to: '#180d02',
    },
    accentColor: '#eab308', // yellow-500
    secondaryColor: '#fef08a',
    flavorNotes: ['Cheesy Melt', 'Rich Carbonara', 'Nori Flakes', 'Smoky Aroma'],
    specs: {
      portion: '4 Pcs / Tray',
      torched: true,
      spiciness: 0,
      meatRatio: 'Full Daging 90%'
    }
  },
  {
    id: 'dimsum-hot-lava-mentai',
    index: '03',
    name: 'HOT LAVA MENTAI.',
    watermark: 'PEDAS.',
    tagline: 'Sensasi pedas membakar selera seimbang dengan saus mentai gurih.',
    badge: 'EXTRA HOT LAVA',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum full daging ayam disiram saus Hot Lava pedas nampol dipadukan kelembutan saus mentai gurih manis dan taburan nori.',
    image: '/assets/processed_dishes/hot_lava.png',
    bgGradient: {
      from: '#881337', // rose-900
      via: '#4c0519', // rose-950
      to: '#190007',
    },
    accentColor: '#f43f5e', // rose-500
    secondaryColor: '#fda4af',
    flavorNotes: ['Hot Lava Pedas', 'Creamy Mentai', 'Gurih Nagih', 'Nori Flakes'],
    specs: {
      portion: '4 Pcs / Tray',
      torched: true,
      spiciness: 3,
      meatRatio: 'Full Daging 90%'
    }
  },
  {
    id: 'dimsum-cake-tower',
    index: '04',
    name: 'DIMSUM CAKE TOWER.',
    watermark: 'PARTY.',
    tagline: 'Alternatif kue ulang tahun bertingkat dengan topping saus pesta.',
    badge: 'CELEBRATION TOWER',
    price: 125000,
    priceFormatted: 'Rp 125.000',
    description: 'Kreasi tower kue perayaan unik dari susunan puluhan dimsum hangat bertingkat, dihias saus mentai torched melimpah, lilin, dan kartu ucapan spesial.',
    image: '/assets/processed_dishes/cake_tower.png',
    bgGradient: {
      from: '#581c87', // purple-900
      via: '#2e1065', // purple-950
      to: '#110326',
    },
    accentColor: '#c084fc', // purple-400
    secondaryColor: '#f3e8ff',
    flavorNotes: ['Party Size', 'Multi-Sauce', 'Custom Topper', 'Lilin Included'],
    specs: {
      portion: '25-30 Pcs Tower',
      torched: true,
      spiciness: 1,
      meatRatio: 'Full Daging 90%'
    }
  },
  {
    id: 'dimsum-platter-16',
    index: '05',
    name: 'PLATTER 16 MENTAI.',
    watermark: 'SHARING.',
    tagline: 'Satu box besar buat kumpul rame-rame bareng teman dan keluarga.',
    badge: 'SHARING PLATTER',
    price: 68000,
    priceFormatted: 'Rp 68.000',
    description: 'Paket baki besar isi 16 pcs dimsum kukus dengan baluran full saus mentai torched dan nori. Paling pas buat arisan, nobar, atau traktiran kantor.',
    image: '/assets/processed_dishes/platter_16.png',
    bgGradient: {
      from: '#1e293b', // slate-800
      via: '#0f172a', // slate-900
      to: '#020617',
    },
    accentColor: '#38bdf8', // sky-400
    secondaryColor: '#bae6fd',
    flavorNotes: ['16 Pcs Full Box', 'Full Mentai Torched', 'Sharing Platter', 'Hemat Berdua-Tiga'],
    specs: {
      portion: '16 Pcs Big Box',
      torched: true,
      spiciness: 1,
      meatRatio: 'Full Daging 90%'
    }
  }
];

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  category: 'base' | 'sauce' | 'topping';
  icon: string;
}

export const CUSTOMIZER_OPTIONS: {
  bases: { id: string; name: string; pieces: number; price: number; desc: string }[];
  sauces: { id: string; name: string; price: number; color: string }[];
  toppings: { id: string; name: string; price: number; desc: string }[];
} = {
  bases: [
    { id: 'base-4', name: 'Personal Pack', pieces: 4, price: 15000, desc: '4 pcs dimsum ayam padat' },
    { id: 'base-6', name: 'Puas Pack', pieces: 6, price: 22000, desc: '6 pcs dimsum ayam nikmat' },
    { id: 'base-16', name: 'Platter Rame-Rame', pieces: 16, price: 55000, desc: '16 pcs box sharing party' },
    { id: 'base-tower', name: 'Dimsum Cake Tower', pieces: 28, price: 120000, desc: 'Tower bertingkat ulang tahun' }
  ],
  sauces: [
    { id: 'sauce-mentai', name: 'Saus Mentai Torched', price: 3000, color: '#f97316' },
    { id: 'sauce-carbonara', name: 'Saus Carbonara Smoky', price: 3000, color: '#eab308' },
    { id: 'sauce-lava', name: 'Saus Hot Lava Pedas', price: 3000, color: '#ef4444' },
    { id: 'sauce-bangkok', name: 'Chili Oil + Saus Bangkok', price: 0, color: '#b91c1c' }
  ],
  toppings: [
    { id: 'top-mozza', name: 'Mozzarella Torched Lumer', price: 4000, desc: 'Keju leleh aroma panggang' },
    { id: 'top-nori', name: 'Roasted Nori Flakes', price: 2000, desc: 'Taburan rumput laut krispi' },
    { id: 'top-garlic', name: 'Crunchy Fried Garlic', price: 2000, desc: 'Bawang goreng gurih renyah' },
    { id: 'top-tobiko', name: 'Ekstra Tobiko Mentai', price: 3000, desc: 'Butiran telur ikan renyah' }
  ]
};
