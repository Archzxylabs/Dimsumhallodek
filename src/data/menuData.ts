export interface MenuItem {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  bgGradient: { from: string; via: string; to: string };
  accentColor: string;
  torched: boolean;
}

// Names and descriptions follow the official site's Menu Unggulan section.
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dimsum-mix-mentai-tartar',
    index: '01',
    name: 'Dimsum Mix Mentai Tartar',
    description: 'Dimsum full daging ayam disajikan dengan saus mentai dan saus tartar yang gurih, creamy, lembut, dan segar. Ditorch ringan hingga harum.',
    image: '/assets/images/WhatsApp-Image-2026-01-20-at-23.14.04-1.jpeg',
    bgGradient: { from: '#52683c', via: '#35462b', to: '#283920' },
    accentColor: '#e96b2b',
    torched: true,
  },
  {
    id: 'dimsum-carbonara',
    index: '02',
    name: 'Dimsum Carbonara',
    description: 'Dimsum full daging ayam disajikan dengan saus carbonara yang cheesy, gurih, dan creamy lembut, ditambah taburan nori dan aroma smoky.',
    image: '/assets/images/WhatsApp-Image-2026-01-20-at-23.14.03.jpeg',
    bgGradient: { from: '#586d40', via: '#3d502e', to: '#293a22' },
    accentColor: '#f6c94b',
    torched: false,
  },
  {
    id: 'dimsum-hot-lava-mentai',
    index: '03',
    name: 'Dimsum Hot Lava Mentai',
    description: 'Dimsum full daging ayam dengan saus hot lava pedas, saus mentai yang creamy dan gurih, serta taburan nori.',
    image: '/assets/images/WhatsApp-Image-2026-01-20-at-23.14.04-1-1.jpeg',
    bgGradient: { from: '#53683c', via: '#35462b', to: '#283920' },
    accentColor: '#e96b2b',
    torched: false,
  },
];
