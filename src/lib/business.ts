export function whatsappUrl(message: string, partnership = false) {
  return `https://wa.me/${partnership ? "6285802854744" : "6285863646267"}?text=${encodeURIComponent(message)}`;
}

export const sitePages = [
  {
    path: "/",
    label: "Menu Dimsum",
    title: "Menu Favorit",
    description:
      "Kenalan dengan Mix Mentai Tartar, Carbonara, dan Hot Lava Mentai dari Dimsum Hallo Dek.",
  },
  {
    path: "/produk",
    label: "Hadiah & Frozen",
    title: "Cake, Bouquet & Frozen",
    description:
      "Dimsum untuk hadiah, perayaan, dan stok di rumah. Temukan Dimsum Cake, Bouquet, dan Frozen.",
  },
  {
    path: "/event",
    label: "Event",
    title: "Dimsum untuk Event",
    description:
      "Ceritakan kebutuhan wedding, acara sekolah, kantor, khitanan, atau lamaran ke tim Dimsum Hallo Dek.",
  },
  {
    path: "/kemitraan",
    label: "Kemitraan",
    title: "Kemitraan",
    description:
      "Kenali pilihan kemitraan Flexible, Collaborative, dan Full Managed Dimsum Hallo Dek.",
  },
  {
    path: "/gerai",
    label: "Cari Gerai",
    title: "Cari Gerai",
    description:
      "Cari alamat dan petunjuk arah gerai Dimsum Hallo Dek di Bogor, Bekasi, dan Sukabumi.",
  },
];
