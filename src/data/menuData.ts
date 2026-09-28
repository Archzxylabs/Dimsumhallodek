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
    name: 'Mix Mentai Tartar',
    watermark: 'MENTAI.',
    tagline: 'Gurih creamy saus mentai ditorch harum berpadu tartar segar.',
    badge: 'Paling banyak dipesan',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum full daging ayam lembut diselimuti kombinasi saus mentai gurih-creamy dan saus tartar segar, ditorch ringan menghasilkan sensasi smoky khas.',
    image: '/assets/processed_dishes/mentai_tartar.png',
    bgGradient: {
      from: '#52683c',
      via: '#35462b',
      to: '#283920',
    },
    accentColor: '#e96b2b',
    secondaryColor: '#f6c94b',
    flavorNotes: ['Mentai gurih', 'Tartar segar', 'Panggang harum', 'Full ayam'],
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
    name: 'Dimsum Carbonara',
    watermark: 'CHEESY.',
    tagline: 'Perpaduan gurih cheesy ala western fusion dengan taburan nori.',
    badge: 'Favorit pencinta keju',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum ayam juicy berlumur saus carbonara creamy pekat, gurih keju lumer yang meleleh di mulut, disempurnakan serpihan nori premium.',
    image: '/assets/processed_dishes/carbonara.png',
    bgGradient: {
      from: '#586d40',
      via: '#3d502e',
      to: '#293a22',
    },
    accentColor: '#f6c94b',
    secondaryColor: '#fff0a7',
    flavorNotes: ['Keju lumer', 'Saus creamy', 'Taburan nori', 'Harum panggang'],
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
    name: 'Hot Lava Mentai',
    watermark: 'PEDAS.',
    tagline: 'Sensasi pedas membakar selera seimbang dengan saus mentai gurih.',
    badge: 'Buat pencinta pedas',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    description: 'Dimsum full daging ayam disiram saus Hot Lava pedas nampol dipadukan kelembutan saus mentai gurih manis dan taburan nori.',
    image: '/assets/processed_dishes/hot_lava.png',
    bgGradient: {
      from: '#53683c',
      via: '#35462b',
      to: '#283920',
    },
    accentColor: '#e96b2b',
    secondaryColor: '#f6c94b',
    flavorNotes: ['Pedas nampol', 'Mentai creamy', 'Gurih nagih', 'Taburan nori'],
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
    name: 'Dimsum Cake Tower',
    watermark: 'PARTY.',
    tagline: 'Alternatif kue ulang tahun bertingkat dengan topping saus pesta.',
    badge: 'Serunya buat perayaan',
    price: 125000,
    priceFormatted: 'Rp 125.000',
    description: 'Kreasi tower kue perayaan unik dari susunan puluhan dimsum hangat bertingkat, dihias saus mentai torched melimpah, lilin, dan kartu ucapan spesial.',
    image: '/assets/processed_dishes/cake_tower.png',
    bgGradient: {
      from: '#617145',
      via: '#435531',
      to: '#293a22',
    },
    accentColor: '#f6c94b',
    secondaryColor: '#fff0a7',
    flavorNotes: ['Porsi rame-rame', 'Aneka saus', 'Hiasan spesial', 'Sudah dengan lilin'],
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
    name: 'Platter 16 Mentai',
    watermark: 'SHARING.',
    tagline: 'Satu box besar buat kumpul rame-rame bareng teman dan keluarga.',
    badge: 'Enak buat berbagi',
    price: 68000,
    priceFormatted: 'Rp 68.000',
    description: 'Paket baki besar isi 16 pcs dimsum kukus dengan baluran full saus mentai torched dan nori. Paling pas buat arisan, nobar, atau traktiran kantor.',
    image: '/assets/processed_dishes/platter_16.png',
    bgGradient: {
      from: '#52683c',
      via: '#35462b',
      to: '#283920',
    },
    accentColor: '#e96b2b',
    secondaryColor: '#f6c94b',
    flavorNotes: ['Isi 16 pcs', 'Mentai melimpah', 'Buat berbagi', 'Lebih hemat'],
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
