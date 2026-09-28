export interface OutletLocation {
  name: string;
  address: string;
  mapsUrl: string;
  landmark?: string;
}

export interface RegionGroup {
  region: string;
  count: number;
  outlets: OutletLocation[];
}

export const REGIONS_DATA: RegionGroup[] = [
  {
    region: 'Cileungsi & Kab. Bogor',
    count: 14,
    outlets: [
      {
        name: 'Permata Cibubur (Pusat / HQ)',
        address: 'Ruko Permata Cibubur, Blok G5 no 03, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjInNnLo_eUAxUAAAAAHQAAAAAQBg..i&rlz=1C1CHWL_enID1196ID1196&pvq=Cg0vZy8xMXZ4N2ZwODQyIhYKEERpbXN1bSBIYWxsbyBkZWsQAhgD&lqi=ChBEaW1zdW0gSGFsbG8gZGVrSILB6vbwuoCACFosEAAQARACGAAYARgCIhBkaW1zdW0gaGFsbG8gZGVrKggIAhAAEAEQAjICaWSSARVqYXBhbmVzZV9kZWxpY2F0ZXNzZW4&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=id&sa=X&ftid=0x2e699766ce593a65:0x94afe9022ba2a523',
        landmark: 'Kitchen Pusat & Head Office DHD'
      },
      {
        name: 'Duta Mekar Asri',
        address: 'Jl. Duta Mekar Asri, Cileungsi Kidul, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/iPpwG5SfAYhx6t4u7',
        landmark: 'Kawasan Perumahan Duta Mekar Asri'
      },
      {
        name: 'Puri Harmoni 1',
        address: 'Jl. Puri Harmoni 1 Raya, Dayeuh, Kec. Cileungsi, Kab. Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/8EGq1eSDRQDN8SKw6',
        landmark: 'Dekat Gerbang Utama Puri Harmoni 1'
      },
      {
        name: 'Metland Transyogi',
        address: 'Jl. Metland Transyogi (Sebrang Alfamidi), Kec. Cileungsi, Kab. Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/odhCGv7mifxKTWUK6',
        landmark: 'Persis seberang Alfamidi Metland'
      },
      {
        name: 'Grand Kahuripan',
        address: 'Jl. Raya Klapanunggal No.15, Kec. Klapanunggal, Kab. Bogor, Jawa Barat 16710',
        mapsUrl: 'https://maps.app.goo.gl/qGzVDSrFCQQUS1qh6',
        landmark: 'Jalur Utama Grand Kahuripan'
      },
      {
        name: 'Kota Wisata',
        address: 'Jl. Boulevard Kota Wisata, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16968',
        mapsUrl: 'https://maps.app.goo.gl/MryWTyk2rrtXLe518',
        landmark: 'Kawasan Boulevard Kota Wisata'
      },
      {
        name: 'Ciangsana',
        address: 'Ruko Orange, Jl. Raya Ciangsana (Depan Alfamart), Kab. Bogor, Jawa Barat 16968',
        mapsUrl: 'https://maps.app.goo.gl/iT3hXKoySrFGi5rS9',
        landmark: 'Ruko Orange depan Alfamart Ciangsana'
      },
      {
        name: 'Gandoang',
        address: 'Jl. Raya KH Umar Rw. Ilat, Kec. Cileungsi, Kab. Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/xcxXMKi4S5jmQdLw6',
        landmark: 'Jl. Raya KH Umar Rawa Ilat'
      },
      {
        name: 'Babakan Dayeuh',
        address: 'Jl. Pamugaran, Dayeuh, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/ZrBGW7tuVhzKN6rr5',
        landmark: 'Area Pamugaran Dayeuh'
      },
      {
        name: 'Bojong Klapanunggal',
        address: 'Jl. Raya Bojong, Kec. Klapanunggal, Kabupaten Bogor, Jawa Barat 16710',
        mapsUrl: 'https://maps.app.goo.gl/NcrzTFYcD8bbR6Ja9',
        landmark: 'Jl. Raya Bojong'
      },
      {
        name: 'Griya Alam Sentosa',
        address: 'Jl. Griya Alam Sentosa, Pasir Angin, Cileungsi, Kab. Bogor, Jawa Barat 16820',
        mapsUrl: 'https://maps.app.goo.gl/7PXNJwAqPnCCMaAd7',
        landmark: 'Komplek Griya Alam Sentosa'
      },
      {
        name: 'Wanaherang',
        address: 'Alfamidi, Jl. Raya Cikuda Wanaherang, Gn. Putri, Kab. Bogor, Jawa Barat 16965',
        mapsUrl: 'https://maps.app.goo.gl/VYpdYv29Wei2jd2TA',
        landmark: 'Pelataran Alfamidi Cikuda'
      },
      {
        name: 'Griya Bukit Jaya',
        address: 'Jl. Tlajung Udik, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16962',
        mapsUrl: 'https://maps.app.goo.gl/7sU2HdcpjH2ikDdt5',
        landmark: 'Akses Utama Griya Bukit Jaya'
      },
      {
        name: 'Jonggol',
        address: 'Alfamidi, Jl. Raya Jonggol, Sukamaju, Kabupaten Bogor, Jawa Barat 16830',
        mapsUrl: 'https://maps.app.goo.gl/2bYXnStZpmHPhB7e9',
        landmark: 'Pelataran Alfamidi Raya Jonggol'
      }
    ]
  },
  {
    region: 'Kota & Kab. Bekasi',
    count: 2,
    outlets: [
      {
        name: 'Kranggan',
        address: 'Jl. Wijaya Kusuma, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17433',
        mapsUrl: 'https://maps.app.goo.gl/pwkQnkDrBZKqtCcc9',
        landmark: 'Jatisampurna Kranggan'
      },
      {
        name: 'Setu Bekasi',
        address: 'Alfamidi Setu, Jl. MT. Haryono, Taman Rahayu, Kab. Bekasi, Jawa Barat 17320',
        mapsUrl: 'https://maps.app.goo.gl/7F1bsvaTs58SFoBF9',
        landmark: 'Pelataran Alfamidi MT Haryono Setu'
      }
    ]
  },
  {
    region: 'Kota Bogor',
    count: 4,
    outlets: [
      {
        name: 'Pasirkuda',
        address: 'Jl. Aria Surialaga, Pasirkuda, Bogor Barat, Kota Bogor, Jawa Barat 16119',
        mapsUrl: 'https://maps.app.goo.gl/P5CsjaHpRzWsp8g36',
        landmark: 'Bogor Barat Pasirkuda'
      },
      {
        name: 'Cimanggu',
        address: 'Dan+Dan Jl. Tentara Pelajar, Tanah Sareal, Kota Bogor, Jawa Barat 16161',
        mapsUrl: 'https://maps.app.goo.gl/brdMoRKw1VwEFkg39',
        landmark: 'Depan Dan+Dan Tentara Pelajar'
      },
      {
        name: 'Ciomas',
        address: 'Pertigaan Ciomas Permai, Pagelaran, Kab. Bogor, Jawa Barat 16610',
        mapsUrl: 'https://maps.app.goo.gl/d7uVwQM5NGS9epMK9',
        landmark: 'Pertigaan Ciomas Permai'
      },
      {
        name: 'Pandu Raya',
        address: 'Jl. Achmad Adnawijaya, Tegal Gundil, Kota Bogor, Jawa Barat 16152',
        mapsUrl: 'https://maps.app.goo.gl/dDb19eghXUiKHMSf8',
        landmark: 'Kawasan Kuliner Pandu Raya'
      }
    ]
  },
  {
    region: 'Kota & Kab. Sukabumi',
    count: 7,
    outlets: [
      {
        name: 'Cisaat',
        address: 'Jl. Raya Cisaat, Kec. Cisaat, Kabupaten Sukabumi, Jawa Barat 43152',
        mapsUrl: 'https://maps.app.goo.gl/aU63h8G6ub1TTrj1A',
        landmark: 'Pusat Keramaian Cisaat'
      },
      {
        name: 'Lembursitu',
        address: 'Jl. Pelabuhan II, Kecamatan Lembursitu, Kota Sukabumi, Jawa Barat 43169',
        mapsUrl: 'https://maps.app.goo.gl/JtqBWcNfCnwBgtzA6',
        landmark: 'Jalur Pelabuhan II Lembursitu'
      },
      {
        name: 'Nyomplong',
        address: 'Jl. Nyomplong, Kecamatan Warudoyong, Kota Sukabumi, Jawa Barat 43131',
        mapsUrl: 'https://maps.app.goo.gl/3mbFg6tUjYoxdD7w5',
        landmark: 'Warudoyong Nyomplong'
      },
      {
        name: 'Karamat',
        address: 'Jl. Karamat, Kecamatan Gunungpuyuh, Kota Sukabumi, Jawa Barat 43122',
        mapsUrl: 'https://maps.app.goo.gl/SwiFtptRYLdCgpeA8',
        landmark: 'Gunungpuyuh Karamat'
      },
      {
        name: 'Sukaraja',
        address: 'Jl. R.A. Kosasih, Kecamatan Sukaraja, Kab. Sukabumi, Jawa Barat 43142',
        mapsUrl: 'https://maps.app.goo.gl/DQGKf8M7A5EoiyQEA',
        landmark: 'Jl. RA Kosasih Sukaraja'
      },
      {
        name: 'Dayeuh Luhur (Cabang ke-29)',
        address: 'Yomart Jl. Pelabuhan II, Dayeuhluhur, Kota Sukabumi, Jawa Barat 43134',
        mapsUrl: 'https://maps.app.goo.gl/Aj5DDEnszfAaWFJc7',
        landmark: 'Pelataran Yomart Dayeuhluhur'
      },
      {
        name: 'Gedong Panjang',
        address: 'Jl. RH. Didi Sukardi, Kec. Citamiang, Kota Sukabumi, Jawa Barat 43143',
        mapsUrl: 'https://maps.app.goo.gl/ZqFbLqY6TNv3fLfY7',
        landmark: 'Citamiang Gedong Panjang'
      }
    ]
  }
];
