export interface MenuItem {
  id: string;
  index: string;
  name: string;
  watermark: string;
  description: string;
  image: string;
  bgGradient: { from: string; via: string; to: string };
  accentColor: string;
}

// Names and descriptions follow the official site's Menu Unggulan section.
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dimsum-mix-mentai-tartar',
    index: '01',
    name: 'Dimsum Mix Mentai Tartar',
    watermark: 'MENTAI.',
    description: 'Dimsum full daging ayam disajikan dengan saus mentai dan saus tartar yang gurih, creamy, lembut, dan segar. Ditorch ringan hingga harum.',
    image: '/assets/optimized/mentai-800.webp',
    // Gradasi memakai palet resmi: Energetic Orange → Olive Fresh → Dek Green.
    bgGradient: { from: '#f4991a', via: '#84994f', to: '#344f1f' },
    accentColor: '#f7b610',
  },
  {
    id: 'dimsum-carbonara',
    index: '02',
    name: 'Dimsum Carbonara',
    watermark: 'CHEESY.',
    description: 'Dimsum full daging ayam disajikan dengan saus carbonara yang cheesy, gurih, dan creamy lembut, ditambah taburan nori dan aroma smoky.',
    image: '/assets/optimized/carbonara-800.webp',
    bgGradient: { from: '#f7b610', via: '#84994f', to: '#344f1f' },
    accentColor: '#f4991a',
  },
  {
    id: 'dimsum-hot-lava-mentai',
    index: '03',
    name: 'Dimsum Hot Lava Mentai',
    watermark: 'PEDAS.',
    description: 'Dimsum full daging ayam dengan saus hot lava pedas, saus mentai yang creamy dan gurih, serta taburan nori.',
    image: '/assets/optimized/hot-lava-800.webp',
    bgGradient: { from: '#f4991a', via: '#84994f', to: '#344f1f' },
    accentColor: '#f7b610',
  },
  {
    id: 'dimsum-big-melt',
    index: '04',
    name: 'Dimsum Big Melt',
    watermark: 'LUMER.',
    description: 'Dimsum full daging ayam dengan isian mozarella lumer, cheesy dan kaya rasa umami. Ukurannya lebih besar, lebih juicy dan lebih yummy! Disajikan dengan free topping saus pilihan, mentai, tartar, carbonara, atau hot lava, serta taburan nori bubuk.',
    image: '/assets/optimized/bigmelt-800.webp',
    bgGradient: { from: '#f7b610', via: '#84994f', to: '#344f1f' },
    accentColor: '#f4991a',
  },
];
