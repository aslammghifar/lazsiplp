export type KategoriProgram = "umum" | "pendidikan";
export type NewsCategory = "umum" | "sarsip";
export type TipeBantuan =
  | "pendidikan"
  | "kesehatan"
  | "kebutuhan_pokok"
  | "lainnya";

export type NewsStatus = "published" | "draft";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  readTimeMinutes: number;
  isPinned: boolean;
  imageUrl: string;
  kategori: NewsCategory;
  status: NewsStatus;
};

export type CampaignStatus = "aktif" | "selesai" | "nonaktif";

export type Campaign = {
  id: string;
  slug: string;
  kodeUnik: string;
  title: string;
  description: string;
  content: string[];
  target: number | null;
  collected: number;
  isPinned: boolean;
  kategoriLabel: string;
  lokasi: string;
  donaturCount: number;
  hariTersisa: number | null;
  status: CampaignStatus;
  imageUrl: string;
};

type ProgramBase = {
  id: string;
  slug: string;
  title: string;
  description: string;
  kategori: KategoriProgram;
  isPinned: boolean;
  imageUrl: string;
};

// Tidak semua program punya alur pendaftaran — sebagian sifatnya layanan/kegiatan berjalan yang
// cukup diinformasikan (mis. perpustakaan keliling), bukan diikuti lewat formulir daftar.
export type ProgramPendaftaran = ProgramBase & {
  tipeKonten: "pendaftaran";
  syarat: string[];
  pendaftaranDibuka: boolean;
  // Link Google Form eksternal — publik daftar lewat sini, bukan isi form langsung di web.
  formUrl: string;
};

export type ProgramBerita = ProgramBase & {
  tipeKonten: "berita";
  content: string[];
};

export type Program = ProgramPendaftaran | ProgramBerita;

export type Activity = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  tanggal: string;
  lokasi: string;
  isPinned: boolean;
  imageUrl: string;
};

// Hanya kolom yang boleh diakses publik — lihat CLAUDE.md § Privasi data beneficiaries.
export type PublicBeneficiary = {
  id: string;
  nama: string;
  umur: number;
  jenisKelamin: "L" | "P";
  masalahYangDihadapi: string;
  kebutuhan: string;
  tahuInfoDari: string;
  namaVerifikator: string;
  daerahCakupanVerifikator: string;
  tipeBantuan: TipeBantuan;
  nominalDiterima: number;
  imageUrl: string;
};

// Foto dummy dari LoremFlickr (bebas dipakai, tanpa API key) — `lock` bikin hasilnya
// deterministik per item (tidak ganti-ganti tiap reload) sampai nanti diganti foto asli.
function dummyImage(keywords: string, lock: number): string {
  return `https://loremflickr.com/800/600/${keywords}?lock=${lock}`;
}

export const newsList: NewsItem[] = [
  {
    id: "n1",
    slug: "penyaluran-zakat-fitrah-1447h",
    title: "LAZSIP Salurkan Zakat Fitrah untuk 1.200 Keluarga di Ramadan 1447H",
    excerpt:
      "Penyaluran serentak dilakukan di lima wilayah dampingan bekerja sama dengan tokoh masyarakat setempat.",
    content: [
      "LAZSIP kembali menyalurkan zakat fitrah menjelang Hari Raya Idul Fitri 1447H kepada 1.200 keluarga dhuafa yang tersebar di lima wilayah dampingan. Penyaluran dilakukan secara serentak dalam satu pekan terakhir bulan Ramadan agar bantuan dapat dimanfaatkan tepat waktu.",
      "Proses distribusi melibatkan tokoh masyarakat dan RT/RW setempat untuk memastikan data penerima manfaat valid dan tidak terjadi duplikasi. Setiap keluarga menerima paket zakat fitrah setara 2,5 kg beras per jiwa sesuai ketentuan syariat.",
      "\"Kami berkomitmen agar zakat fitrah yang dititipkan muzakki benar-benar sampai ke tangan yang berhak menerimanya, tanpa potongan biaya apa pun,\" ujar salah satu amil LAZSIP yang memimpin penyaluran di wilayah Cibinong.",
      "Ke depan, LAZSIP akan terus memperluas jangkauan penyaluran zakat fitrah ke wilayah dampingan baru seiring bertambahnya jumlah muzakki yang menitipkan amanahnya.",
    ],
    publishedAt: "2026-08-20",
    readTimeMinutes: 4,
    isPinned: true,
    imageUrl: dummyImage("food,donation", 1),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n2",
    slug: "laporan-audit-keuangan-2025",
    title: "Laporan Audit Keuangan LAZSIP Tahun 2025 Telah Terbit",
    excerpt:
      "Sebagai bentuk akuntabilitas, laporan audit independen kini dapat diakses oleh publik dan donatur.",
    content: [
      "LAZSIP menerbitkan laporan audit keuangan tahun buku 2025 yang telah diperiksa oleh kantor akuntan publik independen. Laporan ini mencakup rincian penghimpunan dan penyaluran dana zakat, infak, sedekah, serta dana kemanusiaan lainnya sepanjang tahun 2025.",
      "Publikasi laporan audit merupakan bagian dari komitmen LAZSIP terhadap prinsip transparansi dan akuntabilitas pengelolaan dana umat, sesuai dengan standar yang ditetapkan BAZNAS dan Kementerian Agama RI.",
      "Donatur dan muzakki dapat mengajukan permintaan salinan ringkasan laporan audit melalui kantor sekretariat LAZSIP atau menghubungi layanan CS resmi untuk informasi lebih lanjut.",
    ],
    publishedAt: "2026-08-05",
    readTimeMinutes: 6,
    isPinned: true,
    imageUrl: dummyImage("finance,meeting", 2),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n3",
    slug: "kemitraan-baznas-2026",
    title: "Perpanjangan Kemitraan Strategis dengan BAZNAS",
    excerpt:
      "Kolaborasi ini memperluas jangkauan program pemberdayaan ekonomi umat di tahun 2026.",
    content: [
      "LAZSIP dan BAZNAS resmi memperpanjang kemitraan strategis untuk periode 2026-2028. Kolaborasi ini difokuskan pada perluasan program pemberdayaan ekonomi umat, khususnya bantuan modal usaha mikro dan pendampingan UMKM binaan.",
      "Melalui kemitraan ini, LAZSIP mendapat dukungan teknis dalam hal standarisasi pelaporan, pelatihan amil, serta akses ke jaringan mitra penyaluran BAZNAS di wilayah yang lebih luas.",
      "Kedua lembaga sepakat untuk melakukan evaluasi program secara berkala setiap enam bulan guna memastikan dampak pemberdayaan yang terukur bagi mustahik.",
    ],
    publishedAt: "2026-07-18",
    readTimeMinutes: 3,
    isPinned: true,
    imageUrl: dummyImage("handshake,meeting", 3),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n4",
    slug: "buka-posko-siaga-banjir",
    title: "LAZSIP Buka Posko Siaga Bencana Banjir",
    excerpt:
      "Tim tanggap darurat disiagakan di tiga titik rawan bersama relawan lokal.",
    content: [
      "Menyikapi peningkatan curah hujan dan potensi banjir di beberapa wilayah dampingan, SARSIP LAZSIP membuka posko siaga bencana di tiga titik rawan. Posko ini disiagakan selama 24 jam dengan tim relawan yang bergiliran.",
      "Selain personel, posko dilengkapi dengan perahu karet, perlengkapan evakuasi dasar, dan stok logistik makanan siap saji untuk kebutuhan darurat warga terdampak.",
      "Warga di wilayah rawan diimbau untuk menghubungi posko terdekat atau layanan CS LAZSIP apabila membutuhkan bantuan evakuasi maupun logistik darurat.",
    ],
    publishedAt: "2026-06-30",
    readTimeMinutes: 2,
    isPinned: false,
    imageUrl: dummyImage("flood,rescue", 4),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n5",
    slug: "beasiswa-santri-berprestasi",
    title: "150 Santri Penerima Beasiswa Berprestasi Diumumkan",
    excerpt:
      "Program beasiswa tahunan ini menyasar santri dari keluarga kurang mampu di seluruh wilayah dampingan.",
    content: [
      "Divisi Pendidikan LAZSIP mengumumkan 150 penerima Beasiswa Santri Berprestasi tahun ajaran 2026/2027. Seleksi dilakukan berdasarkan nilai akademik, hafalan Al-Qur'an, serta kondisi ekonomi keluarga calon penerima.",
      "Beasiswa mencakup biaya SPP tahunan, seragam, buku pelajaran, serta uang saku bulanan selama satu tahun ajaran penuh. Penerima juga mendapat pendampingan belajar dari relawan pendidikan LAZSIP.",
      "Program ini merupakan bagian dari komitmen jangka panjang LAZSIP untuk memutus rantai kemiskinan melalui akses pendidikan yang layak bagi anak-anak dari keluarga dhuafa.",
    ],
    publishedAt: "2026-06-10",
    readTimeMinutes: 5,
    isPinned: false,
    imageUrl: dummyImage("muslim,student", 5),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n6",
    slug: "ekspansi-wilayah-dampingan",
    title: "LAZSIP Perluas Wilayah Dampingan ke Tiga Kecamatan Baru",
    excerpt:
      "Ekspansi ini menyasar wilayah dengan tingkat kemiskinan tinggi yang belum terjangkau program sebelumnya.",
    content: [
      "LAZSIP resmi memperluas cakupan wilayah dampingan ke tiga kecamatan baru yang sebelumnya belum terjangkau program penyaluran zakat, infak, dan sedekah. Perluasan ini didasarkan pada hasil pemetaan tingkat kemiskinan bersama pemerintah daerah setempat.",
      "Tim lapangan LAZSIP telah melakukan survei dan verifikasi data calon mustahik di wilayah baru sebelum penyaluran bantuan pertama dilakukan pada kuartal berikutnya.",
      "Ekspansi wilayah ini menjadi bagian dari rencana strategis LAZSIP untuk menjangkau lebih banyak mustahik di luar wilayah operasional yang sudah ada.",
    ],
    publishedAt: "2026-05-22",
    readTimeMinutes: 4,
    isPinned: true,
    imageUrl: dummyImage("village,indonesia", 6),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n7",
    slug: "peluncuran-aplikasi-donasi",
    title: "Peluncuran Kanal Donasi Digital Terbaru",
    excerpt:
      "Memudahkan muzakki dan donatur menunaikan zakat serta donasi kapan saja secara online.",
    content: [
      "LAZSIP resmi meluncurkan kanal donasi digital terbaru yang memungkinkan muzakki dan donatur menunaikan zakat, infak, serta donasi campaign kapan saja secara online tanpa perlu datang ke kantor.",
      "Kanal ini dilengkapi kalkulator zakat otomatis, pilihan metode pembayaran yang beragam, serta laporan transparansi real-time atas dana yang telah terkumpul dan tersalurkan.",
      "Seluruh transaksi diverifikasi langsung melalui sistem payment gateway resmi untuk menjamin keamanan dana donatur sejak awal hingga dana diteruskan ke penerima manfaat.",
    ],
    publishedAt: "2026-05-02",
    readTimeMinutes: 3,
    isPinned: true,
    imageUrl: dummyImage("smartphone,payment", 7),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n8",
    slug: "kunjungan-mitra-luar-negeri",
    title: "Kunjungan Kerja Mitra Filantropi dari Luar Negeri",
    excerpt:
      "Kunjungan ini membahas peluang kolaborasi program pemberdayaan ekonomi umat.",
    content: [
      "LAZSIP menerima kunjungan kerja dari mitra filantropi luar negeri yang tertarik menjajaki kolaborasi dalam program pemberdayaan ekonomi umat di Indonesia.",
      "Dalam pertemuan tersebut, kedua pihak membahas peluang dukungan pendanaan dan pertukaran pengetahuan dalam pengelolaan program pemberdayaan berbasis zakat produktif.",
      "LAZSIP berharap kolaborasi ini dapat memperluas dampak program pemberdayaan ekonomi bagi mustahik binaan di berbagai wilayah dampingan.",
    ],
    publishedAt: "2026-04-14",
    readTimeMinutes: 3,
    isPinned: false,
    imageUrl: dummyImage("meeting,business", 8),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n9",
    slug: "pelatihan-amil-zakat",
    title: "Pelatihan Peningkatan Kapasitas Amil Zakat",
    excerpt:
      "Seluruh amil LAZSIP mengikuti pelatihan standar pengelolaan ZIS bersertifikasi.",
    content: [
      "Sebagai upaya menjaga standar profesionalisme, seluruh amil LAZSIP mengikuti Pelatihan Peningkatan Kapasitas Amil Zakat bersertifikasi yang diselenggarakan bekerja sama dengan lembaga pelatihan amil nasional.",
      "Materi pelatihan mencakup fikih zakat kontemporer, tata kelola keuangan syariah, hingga teknik verifikasi dan pendampingan mustahik di lapangan.",
      "Sertifikasi ini menjadi salah satu syarat standar mutu LAZSIP dalam menjaga kepercayaan muzakki terhadap profesionalisme pengelolaan dana zakat, infak, dan sedekah.",
    ],
    publishedAt: "2026-03-28",
    readTimeMinutes: 4,
    isPinned: false,
    imageUrl: dummyImage("training,workshop", 9),
    kategori: "umum",
    status: "published",
  },
  {
    id: "n10",
    slug: "sarsip-tanggap-bencana",
    title: "SARSIP Tanggap Bencana: Unit Siaga Cepat LAZSIP",
    excerpt:
      "Unit relawan siaga bencana LAZSIP bergerak cepat menangani evakuasi dan distribusi logistik darurat di wilayah terdampak.",
    content: [
      "SARSIP (Siaga & Relawan LAZSIP) merupakan unit tanggap bencana yang disiagakan untuk merespons kejadian darurat di wilayah dampingan, mulai dari banjir, longsor, hingga kebakaran, dalam waktu kurang dari 24 jam sejak laporan diterima.",
      "Tim SARSIP terdiri dari relawan terlatih yang dibekali kemampuan evakuasi korban, pertolongan pertama, dan koordinasi logistik darurat, bekerja sama dengan aparat setempat dan BPBD wilayah terkait.",
      "Sepanjang tahun ini, unit ini telah diterjunkan ke lebih dari selusin lokasi bencana, memastikan kebutuhan dasar warga terdampak — mulai dari evakuasi, tempat tinggal sementara, hingga logistik makanan — dapat terpenuhi secepat mungkin.",
    ],
    publishedAt: "2026-08-28",
    readTimeMinutes: 3,
    isPinned: true,
    imageUrl: dummyImage("rescue,disaster", 1),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n11",
    slug: "sarsip-evakuasi-medis-darurat",
    title: "SARSIP Hadirkan Evakuasi Medis Darurat ke Wilayah Sulit Akses",
    excerpt:
      "Tim evakuasi cepat SARSIP menjangkau pasien gawat darurat di wilayah yang sulit diakses kendaraan medis biasa.",
    content: [
      "Di sejumlah wilayah dampingan yang aksesnya sulit dijangkau ambulans konvensional, SARSIP menghadirkan tim evakuasi medis darurat yang siaga 24 jam bergiliran untuk menjemput dan mengantarkan pasien gawat darurat ke fasilitas kesehatan terdekat.",
      "Personel tim dibekali sertifikasi pelatihan medis dasar dan peralatan evakuasi ringan yang memungkinkan mereka menjangkau lokasi-lokasi terpencil, termasuk daerah pegunungan dan bantaran sungai yang minim akses jalan.",
      "Layanan ini menjadi salah satu upaya LAZSIP memastikan tidak ada mustahik yang terlambat mendapat pertolongan medis hanya karena kendala akses wilayah.",
    ],
    publishedAt: "2026-08-21",
    readTimeMinutes: 3,
    isPinned: true,
    imageUrl: dummyImage("ambulance,emergency", 2),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n12",
    slug: "sarsip-dapur-umum-bencana",
    title: "Dapur Umum SARSIP Siaga di Titik Pengungsian Bencana",
    excerpt:
      "Dapur umum SARSIP menyediakan logistik makanan siap saji bagi korban bencana dan pengungsi di posko-posko darurat.",
    content: [
      "Saat bencana terjadi, kebutuhan logistik makanan menjadi salah satu prioritas utama. SARSIP menghadirkan unit dapur umum yang dapat didirikan secara cepat di lokasi pengungsian untuk menyediakan makanan siap saji bagi korban bencana.",
      "Dapur umum ini dikelola oleh relawan yang terlatih mengelola dapur lapangan dalam kondisi darurat, dengan kapasitas produksi ratusan porsi makanan per hari selama masa tanggap darurat berlangsung.",
      "Selain memenuhi kebutuhan pangan, kehadiran dapur umum juga menjadi titik kumpul yang membantu koordinasi bantuan lain bagi warga terdampak di lokasi pengungsian.",
    ],
    publishedAt: "2026-08-14",
    readTimeMinutes: 2,
    isPinned: true,
    imageUrl: dummyImage("kitchen,relief", 3),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n13",
    slug: "sarsip-distribusi-logistik-darurat",
    title: "Armada SARSIP Percepat Distribusi Logistik Darurat",
    excerpt:
      "Armada logistik SARSIP mendistribusikan bantuan ke wilayah terdampak bencana secara cepat dan tepat sasaran.",
    content: [
      "Distribusi logistik darurat menjadi tantangan tersendiri saat bencana memutus akses jalan ke wilayah terdampak. SARSIP menyiagakan armada dan tim distribusi yang siap ditugaskan sewaktu-waktu untuk mengantarkan bantuan logistik ke lokasi-lokasi yang sulit dijangkau.",
      "Setiap penugasan didahului dengan pemetaan kebutuhan bersama tim lapangan agar bantuan yang didistribusikan — mulai dari sembako, air bersih, hingga perlengkapan darurat — benar-benar sesuai kebutuhan warga terdampak.",
      "Koordinasi erat dengan posko-posko bencana setempat memastikan distribusi berjalan tepat sasaran tanpa duplikasi maupun wilayah yang terlewat.",
    ],
    publishedAt: "2026-08-07",
    readTimeMinutes: 3,
    isPinned: true,
    imageUrl: dummyImage("truck,logistics", 4),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n14",
    slug: "sarsip-ambulans-gratis",
    title: "SARSIP Sediakan Layanan Ambulans Gratis bagi Dhuafa",
    excerpt: "Layanan antar-jemput pasien dhuafa dengan ambulans siaga 24 jam, gratis tanpa dipungut biaya.",
    content: [
      "SARSIP menyediakan layanan ambulans gratis bagi warga dhuafa di wilayah dampingan yang membutuhkan layanan antar-jemput ke fasilitas kesehatan, siaga 24 jam tanpa dipungut biaya.",
      "Warga yang membutuhkan cukup menunjukkan surat keterangan tidak mampu dan menghubungi layanan CS LAZSIP untuk penjemputan, baik untuk kondisi darurat maupun kebutuhan kontrol rutin ke rumah sakit.",
    ],
    publishedAt: "2026-07-31",
    readTimeMinutes: 2,
    isPinned: false,
    imageUrl: dummyImage("ambulance,hospital", 5),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n15",
    slug: "sarsip-posko-siaga-wilayah",
    title: "SARSIP Dirikan Posko Siaga Permanen di Titik Rawan Bencana",
    excerpt:
      "Posko siaga permanen SARSIP didirikan di titik-titik rawan bencana untuk mempercepat respons darurat warga sekitar.",
    content: [
      "Sebagai langkah antisipasi, SARSIP mendirikan posko siaga permanen di sejumlah titik yang tercatat rawan bencana, lengkap dengan perlengkapan evakuasi dasar dan relawan yang bertugas bergiliran.",
      "Keberadaan posko ini mempersingkat waktu respons saat terjadi kondisi darurat, sekaligus menjadi pusat informasi dan koordinasi bagi warga sekitar yang membutuhkan bantuan cepat.",
    ],
    publishedAt: "2026-07-24",
    readTimeMinutes: 2,
    isPinned: false,
    imageUrl: dummyImage("tent,camp", 6),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n16",
    slug: "sarsip-pelatihan-siaga-bencana-warga",
    title: "SARSIP Gelar Pelatihan Siaga Bencana bagi Warga Desa Rawan",
    excerpt:
      "Edukasi mitigasi dan simulasi tanggap bencana digelar SARSIP bersama warga desa-desa rawan bencana.",
    content: [
      "Selain menyiagakan tim relawan, SARSIP juga aktif memberikan edukasi mitigasi bencana kepada warga di desa-desa rawan bencana, mencakup materi jalur evakuasi aman hingga simulasi tanggap darurat.",
      "Program ini melibatkan perwakilan warga dan RT setempat yang kemudian dibekali sebagai kader siaga bencana, sehingga kesiapsiagaan dapat terus terjaga meski tim SARSIP belum tiba di lokasi.",
    ],
    publishedAt: "2026-07-17",
    readTimeMinutes: 3,
    isPinned: false,
    imageUrl: dummyImage("training,emergency", 7),
    kategori: "sarsip",
    status: "published",
  },
  {
    id: "n17",
    slug: "sarsip-donor-darah-rutin",
    title: "SARSIP dan PMI Gelar Donor Darah Rutin Jaga Stok Darah Wilayah",
    excerpt:
      "Kegiatan donor darah rutin SARSIP bekerja sama dengan PMI membantu menjaga ketersediaan stok darah wilayah.",
    content: [
      "SARSIP bekerja sama dengan Palang Merah Indonesia (PMI) menggelar kegiatan donor darah rutin untuk membantu menjaga ketersediaan stok darah di wilayah dampingan, terbuka bagi relawan maupun masyarakat umum yang memenuhi syarat medis.",
      "Kegiatan ini menjadi salah satu bentuk kontribusi SARSIP di luar penanganan bencana, sekaligus mempererat sinergi dengan lembaga kesehatan mitra dalam menjaga kesiapsiagaan darah bagi pasien yang membutuhkan.",
    ],
    publishedAt: "2026-07-10",
    readTimeMinutes: 2,
    isPinned: false,
    imageUrl: dummyImage("blood,donation", 8),
    kategori: "sarsip",
    status: "published",
  },
];

export const NEWS_KATEGORI_LABEL: Record<NewsCategory, string> = {
  umum: "Berita & Kabar",
  sarsip: "SARSIP",
};

// Rotasi deterministik (bukan Math.random) supaya tetap konsisten di halaman yang di-generate statis (SSG),
// tapi tiap artikel menampilkan susunan "berita lainnya" yang berbeda. Prioritaskan kategori yang sama.
export function getOtherNews(current: NewsItem, count = 3): NewsItem[] {
  const published = newsList.filter((n) => n.status === "published");
  const sameKategori = published.filter((n) => n.kategori === current.kategori && n.id !== current.id);
  const others = sameKategori.length >= count ? sameKategori : published.filter((n) => n.id !== current.id);
  const startIndex = others.length ? published.findIndex((n) => n.id === current.id) % others.length : 0;
  const rotated = [...others.slice(startIndex), ...others.slice(0, startIndex)];
  return rotated.slice(0, count);
}

export const campaigns: Campaign[] = [
  {
    id: "c1",
    slug: "wakaf-sumur-air-bersih",
    kodeUnik: "WAKAF-SUMUR-01",
    title: "Wakaf Sumur Air Bersih untuk Desa Terpencil",
    description:
      "Membangun sumur bor dan instalasi air bersih untuk 400 kepala keluarga yang kesulitan akses air layak.",
    content: [
      "Desa Cikahuripan menghadapi krisis air bersih setiap musim kemarau, memaksa warga menempuh jarak jauh untuk mengambil air atau membeli air dengan harga tinggi. Campaign ini bertujuan membangun sumur bor dalam beserta instalasi pipa distribusi ke titik-titik pemukiman warga.",
      "Dana yang terkumpul akan digunakan untuk pengeboran sumur, pemasangan tandon air, pompa listrik tenaga surya, serta jaringan pipa distribusi ke 400 kepala keluarga di empat dusun.",
      "Program ini juga mencakup pembentukan kelompok pengelola air warga agar sumur dan instalasi dapat dirawat secara mandiri dan berkelanjutan setelah pembangunan selesai.",
    ],
    target: 150_000_000,
    collected: 98_450_000,
    isPinned: true,
    kategoriLabel: "Infrastruktur",
    lokasi: "Desa Cikahuripan, Bogor",
    donaturCount: 412,
    hariTersisa: 18,
    status: "aktif",
    imageUrl: dummyImage("water,well", 1),
  },
  {
    id: "c2",
    slug: "bedah-rumah-dhuafa",
    kodeUnik: "BEDAH-RUMAH-02",
    title: "Bedah Rumah Dhuafa Ramadan 1447H",
    description:
      "Renovasi total rumah tidak layak huni milik lansia dan keluarga dhuafa di wilayah dampingan.",
    content: [
      "Program Bedah Rumah Dhuafa Ramadan 1447H menyasar rumah-rumah tidak layak huni milik lansia dan keluarga dhuafa yang kondisinya sudah membahayakan penghuninya, mulai dari atap bocor, dinding rapuh, hingga lantai tanah.",
      "Setiap rumah akan direnovasi total mencakup perbaikan struktur, atap, dinding, lantai, serta fasilitas MCK yang layak, dikerjakan oleh tim tukang lokal yang diawasi langsung oleh tim teknis LAZSIP.",
      "Target program ini adalah menyelesaikan renovasi 8 unit rumah sebelum Ramadan tiba, agar penerima manfaat dapat merasakan tempat tinggal yang lebih layak dan aman.",
    ],
    target: 80_000_000,
    collected: 62_000_000,
    isPinned: true,
    kategoriLabel: "Kemanusiaan",
    lokasi: "Kecamatan Cibinong, Bogor",
    donaturCount: 288,
    hariTersisa: 9,
    status: "aktif",
    imageUrl: dummyImage("house,construction", 2),
  },
  {
    id: "c3",
    slug: "gizi-anak-stunting",
    kodeUnik: "GIZI-ANAK-03",
    title: "Bantuan Gizi untuk Anak Stunting",
    description:
      "Pemberian makanan tambahan bergizi selama 6 bulan bagi balita dengan risiko stunting.",
    content: [
      "Berdasarkan data posyandu wilayah dampingan, masih banyak balita dengan risiko stunting akibat kurangnya asupan gizi seimbang. Campaign ini menghadirkan program pemberian makanan tambahan bergizi secara rutin selama 6 bulan.",
      "Setiap balita penerima manfaat akan mendapat paket makanan tambahan tinggi protein dan vitamin, serta dipantau tumbuh kembangnya secara berkala oleh kader posyandu dan tenaga gizi.",
      "Selain intervensi gizi, program ini juga menyertakan edukasi pola makan sehat bagi orang tua balita agar dampak positifnya berkelanjutan setelah program berakhir.",
    ],
    target: 60_000_000,
    collected: 24_300_000,
    isPinned: true,
    kategoriLabel: "Kesehatan",
    lokasi: "Kecamatan Gunung Putri, Bogor",
    donaturCount: 165,
    hariTersisa: 42,
    status: "aktif",
    imageUrl: dummyImage("child,nutrition", 3),
  },
  {
    id: "c4",
    slug: "peduli-yatim-piatu",
    kodeUnik: "YATIM-04",
    title: "Santunan Rutin Anak Yatim Piatu",
    description: "Santunan bulanan untuk kebutuhan sehari-hari dan pendidikan anak yatim binaan.",
    content: [
      "Santunan Rutin Anak Yatim Piatu merupakan program berkelanjutan LAZSIP untuk memenuhi kebutuhan sehari-hari dan pendidikan anak-anak yatim binaan yang tersebar di seluruh wilayah dampingan.",
      "Dana yang terkumpul disalurkan setiap bulan dalam bentuk uang saku, kebutuhan sekolah, dan makanan bergizi, tanpa batas waktu campaign karena sifatnya yang berkelanjutan.",
      "Semakin besar dana yang terkumpul, semakin banyak anak yatim yang dapat terus mendapatkan santunan bulanan secara konsisten.",
    ],
    target: null,
    collected: 41_750_000,
    isPinned: false,
    kategoriLabel: "Yatim & Dhuafa",
    lokasi: "Wilayah Dampingan LAZSIP",
    donaturCount: 530,
    hariTersisa: null,
    status: "aktif",
    imageUrl: dummyImage("children,family", 4),
  },
  {
    id: "c5",
    slug: "peduli-lansia-dhuafa",
    kodeUnik: "LANSIA-05",
    title: "Peduli Lansia Dhuafa",
    description:
      "Bantuan kebutuhan pokok dan layanan kesehatan rutin bagi lansia dhuafa tanpa keluarga.",
    content: [
      "Banyak lansia dhuafa di wilayah dampingan hidup sebatang kara tanpa keluarga yang merawat, sehingga kesulitan memenuhi kebutuhan pokok maupun mengakses layanan kesehatan rutin.",
      "Program Peduli Lansia Dhuafa menghadirkan bantuan kebutuhan pokok bulanan serta pemeriksaan kesehatan rutin yang dijemput langsung oleh tim relawan LAZSIP ke rumah masing-masing lansia.",
      "Program ini juga melibatkan kunjungan rutin relawan untuk memastikan kondisi lansia terpantau baik secara fisik maupun psikologis.",
    ],
    target: 45_000_000,
    collected: 18_200_000,
    isPinned: true,
    kategoriLabel: "Lansia",
    lokasi: "Kecamatan Cibinong, Bogor",
    donaturCount: 97,
    hariTersisa: 25,
    status: "aktif",
    imageUrl: dummyImage("elderly,care", 5),
  },
  {
    id: "c6",
    slug: "qurban-untuk-pelosok",
    kodeUnik: "QURBAN-06",
    title: "Qurban untuk Pelosok Negeri",
    description:
      "Distribusi daging qurban ke wilayah pelosok yang jarang terjangkau penyaluran qurban.",
    content: [
      "Setiap tahun, LAZSIP menghadirkan program Qurban untuk Pelosok Negeri guna mendistribusikan daging qurban ke wilayah-wilayah terpencil yang jarang atau bahkan belum pernah terjangkau penyaluran qurban.",
      "Dana campaign digunakan untuk pembelian hewan qurban, biaya penyembelihan sesuai syariat, hingga distribusi ke desa-desa pelosok yang membutuhkan akses transportasi khusus.",
      "Melalui program ini, LAZSIP berharap kebahagiaan hari raya qurban dapat dirasakan merata, termasuk oleh saudara-saudara di wilayah paling terpencil sekalipun.",
    ],
    target: 120_000_000,
    collected: 76_500_000,
    isPinned: true,
    kategoriLabel: "Qurban",
    lokasi: "Wilayah Pelosok Dampingan",
    donaturCount: 604,
    hariTersisa: 30,
    status: "aktif",
    imageUrl: dummyImage("goat,livestock", 6),
  },
  {
    id: "c7",
    slug: "renovasi-masjid-desa",
    kodeUnik: "MASJID-07",
    title: "Renovasi Masjid Desa Binaan",
    description: "Perbaikan atap dan fasilitas wudhu masjid yang rusak akibat cuaca ekstrem.",
    content: [
      "Masjid di desa binaan LAZSIP mengalami kerusakan pada bagian atap dan fasilitas wudhu akibat cuaca ekstrem beberapa bulan terakhir, membuat kenyamanan jamaah dalam beribadah terganggu.",
      "Dana campaign akan digunakan untuk perbaikan struktur atap yang bocor, renovasi tempat wudhu, serta perbaikan sistem drainase agar masjid tidak lagi tergenang saat hujan deras.",
      "Renovasi ini diharapkan dapat rampung sebelum musim hujan berikutnya agar jamaah dapat kembali beribadah dengan nyaman.",
    ],
    target: 55_000_000,
    collected: 12_800_000,
    isPinned: false,
    kategoriLabel: "Infrastruktur",
    lokasi: "Desa Binaan LAZSIP",
    donaturCount: 74,
    hariTersisa: 60,
    status: "aktif",
    imageUrl: dummyImage("mosque,architecture", 7),
  },
  {
    id: "c8",
    slug: "beasiswa-pendidikan-tinggi",
    kodeUnik: "BEASISWA-08",
    title: "Beasiswa Pendidikan Tinggi Mahasiswa Dhuafa",
    description: "Bantuan biaya kuliah bagi mahasiswa berprestasi dari keluarga tidak mampu.",
    content: [
      "Banyak mahasiswa berprestasi dari keluarga tidak mampu terancam putus kuliah karena kesulitan biaya pendidikan tinggi. Campaign ini menghadirkan bantuan biaya kuliah bagi mereka yang telah lolos seleksi akademik dan verifikasi ekonomi.",
      "Bantuan mencakup biaya UKT/SPP per semester serta tunjangan buku dan kebutuhan perkuliahan lainnya, dengan pendampingan berkala dari tim pendidikan LAZSIP.",
      "Penerima manfaat diwajibkan menjaga prestasi akademik minimal sesuai standar yang ditetapkan agar bantuan dapat terus berlanjut hingga masa studi selesai.",
    ],
    target: 90_000_000,
    collected: 33_400_000,
    isPinned: false,
    kategoriLabel: "Pendidikan",
    lokasi: "Wilayah Dampingan LAZSIP",
    donaturCount: 211,
    hariTersisa: 21,
    status: "aktif",
    imageUrl: dummyImage("university,student", 8),
  },
  {
    id: "c9",
    slug: "air-bersih-musim-kemarau",
    kodeUnik: "AIRBERSIH-09",
    title: "Distribusi Air Bersih Musim Kemarau",
    description: "Pengiriman tangki air bersih rutin ke desa yang mengalami kekeringan.",
    content: [
      "Musim kemarau panjang membuat sejumlah desa dampingan mengalami krisis air bersih yang parah, memaksa warga menempuh jarak jauh atau membeli air dengan harga tinggi untuk kebutuhan sehari-hari.",
      "Campaign ini menghadirkan pengiriman tangki air bersih secara rutin ke desa-desa terdampak menggunakan armada tangki air LAZSIP, didistribusikan langsung ke titik-titik penampungan warga.",
      "Selain solusi darurat, LAZSIP juga menjajaki solusi jangka panjang berupa pembangunan sumur bor di wilayah yang paling parah terdampak kekeringan.",
    ],
    target: 35_000_000,
    collected: 9_600_000,
    isPinned: false,
    kategoriLabel: "Kemanusiaan",
    lokasi: "Desa Rawan Kekeringan",
    donaturCount: 58,
    hariTersisa: 14,
    status: "aktif",
    imageUrl: dummyImage("drought,water", 9),
  },
];

export const programs: Program[] = [
  // Umum — pinned (4)
  {
    id: "p1",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-modal-usaha-mikro",
    slug: "modal-usaha-mikro",
    title: "Bantuan Modal Usaha Mikro",
    description:
      "Pemberian modal bergulir tanpa bunga bagi pelaku usaha mikro binaan LAZSIP.",
    syarat: ["KTP domisili wilayah dampingan", "Memiliki usaha berjalan minimal 3 bulan", "Bersedia mengikuti pendampingan"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: true,
    imageUrl: dummyImage("market,business", 1),
  },
  {
    id: "p1b",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-koperasi-simpan-pinjam-syariah",
    slug: "koperasi-simpan-pinjam-syariah",
    title: "Koperasi Simpan Pinjam Syariah Mustahik",
    description:
      "Akses simpan pinjam tanpa riba khusus mustahik binaan untuk modal usaha kecil.",
    syarat: ["Terdaftar sebagai mustahik binaan", "Memiliki rencana usaha", "Bersedia menabung rutin"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: true,
    imageUrl: dummyImage("finance,coins", 2),
  },
  {
    id: "p1c",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-pendampingan-umkm-naik-kelas",
    slug: "pendampingan-umkm-naik-kelas",
    title: "Pendampingan UMKM Naik Kelas",
    description:
      "Pendampingan manajemen usaha dan pemasaran digital bagi UMKM binaan LAZSIP.",
    syarat: ["Sudah menerima bantuan modal usaha", "Aktif berjualan minimal 6 bulan"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: true,
    imageUrl: dummyImage("shop,small business", 3),
  },
  {
    id: "p1d",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-bantuan-gerobak-usaha",
    slug: "bantuan-gerobak-usaha",
    title: "Bantuan Gerobak Usaha Dhuafa Keliling",
    description:
      "Penyediaan gerobak usaha bagi pedagang keliling dhuafa yang belum memiliki sarana jualan.",
    syarat: ["Berjualan secara keliling", "Belum memiliki sarana usaha layak"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: true,
    imageUrl: dummyImage("cart,vendor", 4),
  },
  // Umum — non-pinned (4)
  {
    id: "p2",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-pelatihan-keterampilan-kerja",
    slug: "pelatihan-keterampilan-kerja",
    title: "Pelatihan Keterampilan Kerja",
    description:
      "Pelatihan menjahit, tata boga, dan digital marketing bagi pencari kerja usia produktif.",
    syarat: ["Usia 18–35 tahun", "Belum bekerja tetap", "Mengikuti seluruh sesi pelatihan"],
    kategori: "umum",
    pendaftaranDibuka: false,
    isPinned: false,
    imageUrl: dummyImage("sewing,tailor", 5),
  },
  {
    id: "p2b",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-program-ternak-bergulir",
    slug: "program-ternak-bergulir",
    title: "Program Ternak Bergulir",
    description:
      "Bantuan ternak kambing bergulir untuk dikembangkan dan diwariskan ke penerima manfaat berikutnya.",
    syarat: ["Memiliki lahan/kandang memadai", "Bersedia mengembalikan anakan pertama"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: false,
    imageUrl: dummyImage("goat,livestock", 6),
  },
  {
    id: "p2c",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-pelatihan-pertanian-organik",
    slug: "pelatihan-pertanian-organik",
    title: "Pelatihan Pertanian Organik Mustahik",
    description: "Pelatihan teknik bertani organik untuk meningkatkan hasil panen petani binaan.",
    syarat: ["Memiliki lahan pertanian", "Berdomisili di wilayah dampingan"],
    kategori: "umum",
    pendaftaranDibuka: true,
    isPinned: false,
    imageUrl: dummyImage("farmer,field", 7),
  },
  {
    id: "p2d",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-bantuan-alat-usaha",
    slug: "bantuan-alat-usaha",
    title: "Bantuan Alat Usaha Produktif",
    description: "Penyediaan alat kerja (mesin jahit, alat masak, dll) sesuai jenis usaha mustahik.",
    syarat: ["Memiliki keahlian sesuai alat yang diajukan", "Surat keterangan tidak mampu"],
    kategori: "umum",
    pendaftaranDibuka: false,
    isPinned: false,
    imageUrl: dummyImage("tools,workshop", 8),
  },

  // Pendidikan — pinned (4)
  {
    id: "p3",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-beasiswa-yatim-dhuafa",
    slug: "beasiswa-yatim-dhuafa",
    title: "Beasiswa Yatim & Dhuafa",
    description:
      "Beasiswa pendidikan jenjang SD–SMA bagi anak yatim dan keluarga dhuafa berprestasi.",
    syarat: ["Yatim/piatu atau dari keluarga dhuafa", "Nilai rapor minimal baik", "Surat keterangan tidak mampu"],
    kategori: "pendidikan",
    pendaftaranDibuka: true,
    isPinned: true,
    imageUrl: dummyImage("school,children", 1),
  },
  {
    id: "p3b",
    tipeKonten: "berita",
    slug: "sekolah-alam-dhuafa",
    title: "Sekolah Alam Dhuafa Binaan",
    description: "Pendidikan dasar gratis berbasis alam bagi anak-anak dhuafa usia sekolah.",
    content: [
      "Sekolah Alam Dhuafa Binaan merupakan program pendidikan dasar gratis berbasis alam yang digagas LAZSIP untuk anak-anak dhuafa usia sekolah di wilayah dampingan, menggabungkan kurikulum akademik dasar dengan pembelajaran langsung di alam terbuka.",
      "Metode belajar di sekolah ini menekankan eksplorasi lingkungan sekitar, keterampilan hidup, dan penguatan karakter, selain materi baca-tulis-hitung yang menjadi fondasi utama pendidikan dasar.",
      "Saat ini sekolah alam binaan LAZSIP telah menampung puluhan anak dari keluarga dhuafa yang sebelumnya kesulitan mengakses pendidikan formal karena keterbatasan biaya maupun jarak tempuh.",
    ],
    kategori: "pendidikan",
    isPinned: true,
    imageUrl: dummyImage("school,nature", 2),
  },
  {
    id: "p3c",
    tipeKonten: "berita",
    slug: "bantuan-perlengkapan-sekolah",
    title: "Bantuan Perlengkapan Sekolah Tahunan",
    description: "Paket seragam, sepatu, dan alat tulis untuk anak dhuafa setiap tahun ajaran baru.",
    content: [
      "Setiap menjelang tahun ajaran baru, LAZSIP mendistribusikan paket perlengkapan sekolah — mulai dari seragam, sepatu, tas, hingga alat tulis — kepada anak-anak dari keluarga dhuafa di wilayah dampingan.",
      "Program ini bertujuan meringankan beban orang tua yang kesulitan memenuhi kebutuhan sekolah anak setiap tahunnya, sekaligus memastikan anak-anak tetap percaya diri dan siap mengikuti kegiatan belajar mengajar.",
      "Distribusi dilakukan langsung ke sekolah-sekolah binaan bekerja sama dengan pihak guru dan wali kelas untuk memastikan bantuan tepat sasaran.",
    ],
    kategori: "pendidikan",
    isPinned: true,
    imageUrl: dummyImage("backpack,school", 3),
  },
  {
    id: "p3d",
    tipeKonten: "berita",
    slug: "kelas-bimbingan-belajar-gratis",
    title: "Kelas Bimbingan Belajar Gratis",
    description: "Bimbingan belajar sore hari untuk siswa SD–SMP di wilayah dampingan.",
    content: [
      "Kelas Bimbingan Belajar Gratis diadakan setiap sore di sejumlah titik wilayah dampingan, terbuka bagi siswa SD hingga SMP yang membutuhkan pendampingan belajar tambahan di luar jam sekolah.",
      "Kelas ini diampu oleh relawan pendidikan LAZSIP yang membantu siswa memahami mata pelajaran yang dirasa sulit, sekaligus menjadi ruang belajar yang nyaman bagi anak-anak dari keluarga dengan keterbatasan akses bimbingan belajar berbayar.",
    ],
    kategori: "pendidikan",
    isPinned: true,
    imageUrl: dummyImage("tutoring,classroom", 4),
  },
  // Pendidikan — non-pinned (4)
  {
    id: "p4",
    tipeKonten: "pendaftaran",
    formUrl: "https://forms.gle/ganti-link-rumah-tahfidz",
    slug: "rumah-tahfidz",
    title: "Rumah Tahfidz Binaan",
    description:
      "Program tahfidz Al-Qur'an gratis dengan asrama bagi santri dari keluarga tidak mampu.",
    syarat: ["Usia 7–15 tahun", "Sehat jasmani rohani", "Izin orang tua/wali"],
    kategori: "pendidikan",
    pendaftaranDibuka: true,
    isPinned: false,
    imageUrl: dummyImage("quran,islamic", 5),
  },
  {
    id: "p4b",
    tipeKonten: "berita",
    slug: "pelatihan-guru-ngaji-relawan",
    title: "Pelatihan Guru Ngaji Relawan",
    description: "Pembekalan metode mengajar Al-Qur'an bagi relawan guru ngaji di TPA binaan.",
    content: [
      "LAZSIP secara rutin menggelar pelatihan bagi relawan guru ngaji yang mengajar di TPA-TPA binaan, mencakup metode pengajaran Al-Qur'an yang efektif untuk anak-anak, mulai dari pengenalan huruf hijaiyah hingga tahsin bacaan.",
      "Pelatihan ini bertujuan menjaga kualitas pengajaran di seluruh TPA binaan tetap konsisten, sekaligus membekali relawan dengan pendekatan mengajar yang menyenangkan agar anak-anak semakin semangat belajar mengaji.",
    ],
    kategori: "pendidikan",
    isPinned: false,
    imageUrl: dummyImage("teacher,mosque", 6),
  },
  {
    id: "p4c",
    tipeKonten: "berita",
    slug: "perpustakaan-keliling-desa",
    title: "Perpustakaan Keliling Desa",
    description: "Layanan baca buku gratis berkeliling ke desa-desa dampingan setiap pekan.",
    content: [
      "Perpustakaan Keliling Desa hadir setiap pekan membawa koleksi buku bacaan anak dan remaja berkeliling ke desa-desa dampingan yang belum memiliki akses perpustakaan atau taman baca tetap.",
      "Selain meminjamkan buku, kegiatan ini juga diisi sesi mendongeng dan permainan edukatif yang mendorong minat baca anak-anak sejak usia dini.",
    ],
    kategori: "pendidikan",
    isPinned: false,
    imageUrl: dummyImage("library,books", 7),
  },
  {
    id: "p4d",
    tipeKonten: "berita",
    slug: "beasiswa-mahasiswa-kurang-mampu",
    title: "Beasiswa Mahasiswa Kurang Mampu",
    description: "Bantuan biaya kuliah bagi mahasiswa aktif dari keluarga tidak mampu.",
    content: [
      "LAZSIP turut mendukung kelangsungan pendidikan tinggi mahasiswa dari keluarga tidak mampu melalui bantuan biaya kuliah bagi mereka yang telah lolos verifikasi ekonomi dan menunjukkan performa akademik yang baik.",
      "Pada periode ini kuota beasiswa untuk tahun ajaran berjalan sudah terpenuhi. Pembukaan pendaftaran periode berikutnya akan diumumkan melalui kanal resmi LAZSIP.",
    ],
    kategori: "pendidikan",
    isPinned: false,
    imageUrl: dummyImage("university,graduate", 8),
  },
];

export const KATEGORI_PROGRAM_LABEL: Record<KategoriProgram, string> = {
  umum: "Program Pemberdayaan",
  pendidikan: "Divisi Pendidikan",
};

export const TIPE_BANTUAN_LABEL: Record<TipeBantuan, string> = {
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  kebutuhan_pokok: "Kebutuhan Pokok",
  lainnya: "Lainnya",
};

export function getOtherPrograms(current: Program, count = 3): Program[] {
  const sameCategory = programs.filter(
    (p) => p.kategori === current.kategori && p.id !== current.id
  );
  const startIndex = sameCategory.length
    ? programs.filter((p) => p.kategori === current.kategori).findIndex((p) => p.id === current.id) %
      sameCategory.length
    : 0;
  const rotated = [...sameCategory.slice(startIndex), ...sameCategory.slice(0, startIndex)];
  return rotated.slice(0, count);
}

export const activities: Activity[] = [
  {
    id: "a1",
    slug: "baksos-kesehatan-gratis",
    title: "Bakti Sosial Layanan Kesehatan Gratis",
    description:
      "Pemeriksaan kesehatan, pembagian obat, dan konsultasi gizi gratis untuk warga dampingan.",
    content: [
      "LAZSIP mengadakan bakti sosial layanan kesehatan gratis bagi warga di wilayah dampingan, mencakup pemeriksaan tekanan darah, gula darah, serta konsultasi umum dengan tenaga medis relawan.",
      "Selain pemeriksaan, warga juga mendapatkan pembagian obat-obatan ringan dan konsultasi gizi khusus bagi ibu hamil dan balita untuk mencegah risiko stunting.",
      "Kegiatan ini merupakan agenda rutin LAZSIP yang diadakan setiap beberapa bulan sekali bekerja sama dengan puskesmas dan relawan medis setempat.",
    ],
    tanggal: "2026-09-14",
    lokasi: "Balai Desa Sukamaju",
    isPinned: true,
    imageUrl: dummyImage("health,checkup", 1),
  },
  {
    id: "a2",
    slug: "pelatihan-relawan-sarsip",
    title: "Pelatihan Dasar Relawan SARSIP",
    description:
      "Pembekalan teknik evakuasi dan pertolongan pertama bagi relawan baru SARSIP.",
    content: [
      "Pelatihan dasar ini ditujukan bagi relawan baru SARSIP untuk membekali kemampuan teknik evakuasi korban bencana dan pertolongan pertama pada kondisi darurat.",
      "Materi pelatihan meliputi simulasi evakuasi air dan darat, penanganan luka ringan hingga berat, serta koordinasi tim di lapangan saat kondisi bencana nyata.",
      "Relawan yang lulus pelatihan dasar ini akan disiagakan sebagai bagian dari tim SARSIP yang siap diterjunkan saat terjadi bencana di wilayah dampingan.",
    ],
    tanggal: "2026-09-21",
    lokasi: "Sekretariat LAZSIP",
    isPinned: true,
    imageUrl: dummyImage("training,rescue", 2),
  },
  {
    id: "a3",
    slug: "santunan-yatim-akhir-pekan",
    title: "Santunan Yatim Akhir Pekan",
    description: "Kegiatan rutin santunan dan pembinaan akhlak bagi anak yatim binaan.",
    content: [
      "Santunan Yatim Akhir Pekan merupakan agenda rutin mingguan LAZSIP yang menghadirkan anak-anak yatim binaan untuk menerima santunan sekaligus mengikuti kegiatan pembinaan akhlak dan keagamaan.",
      "Selain santunan berupa uang saku dan perlengkapan sekolah, anak-anak juga mendapat bimbingan mengaji dan motivasi belajar dari relawan pendidikan LAZSIP.",
      "Kegiatan ini bertujuan menumbuhkan rasa kasih sayang dan perhatian berkelanjutan kepada anak yatim, tidak hanya secara materi tetapi juga pembinaan karakter.",
    ],
    tanggal: "2026-08-30",
    lokasi: "Aula LAZSIP",
    isPinned: false,
    imageUrl: dummyImage("children,charity", 3),
  },
  {
    id: "a4",
    slug: "gerakan-donor-darah",
    title: "Gerakan Donor Darah Peduli Sesama",
    description: "Kolaborasi dengan PMI setempat untuk memenuhi kebutuhan stok darah daerah.",
    content: [
      "LAZSIP bekerja sama dengan Palang Merah Indonesia (PMI) setempat menyelenggarakan gerakan donor darah untuk membantu memenuhi kebutuhan stok darah di wilayah dampingan.",
      "Kegiatan ini terbuka bagi karyawan, relawan, dan masyarakat umum yang memenuhi syarat kesehatan donor darah, dengan pemeriksaan kesehatan singkat sebelum proses donor.",
      "Melalui kegiatan rutin ini, LAZSIP berharap dapat berkontribusi dalam menjaga ketersediaan stok darah bagi pasien yang membutuhkan di rumah sakit mitra.",
    ],
    tanggal: "2026-08-16",
    lokasi: "Kantor LAZSIP Pusat",
    isPinned: false,
    imageUrl: dummyImage("blood,donation", 4),
  },
  {
    id: "a5",
    slug: "buka-puasa-bersama-dhuafa",
    title: "Buka Puasa Bersama Kaum Dhuafa",
    description: "Kegiatan rutin berbagi hidangan berbuka bagi dhuafa dan anak yatim di sekitar sekretariat.",
    content: [
      "Buka Puasa Bersama Kaum Dhuafa menjadi agenda rutin LAZSIP untuk berbagi hidangan berbuka puasa bersama kaum dhuafa dan anak yatim di sekitar wilayah sekretariat.",
      "Selain hidangan berbuka, kegiatan ini juga diisi dengan tausiyah singkat dan pembagian bingkisan sederhana bagi peserta yang hadir.",
      "Kegiatan ini menjadi momen mempererat silaturahmi antara pengurus LAZSIP, relawan, dan masyarakat dhuafa binaan di sekitar sekretariat.",
    ],
    tanggal: "2026-09-28",
    lokasi: "Halaman Sekretariat LAZSIP",
    isPinned: true,
    imageUrl: dummyImage("iftar,ramadan", 5),
  },
  {
    id: "a6",
    slug: "simulasi-tanggap-bencana",
    title: "Simulasi Tanggap Bencana Bersama Warga",
    description: "Simulasi evakuasi dan mitigasi bencana bersama warga desa rawan bencana.",
    content: [
      "Simulasi Tanggap Bencana Bersama Warga digelar di desa rawan bencana untuk melatih kesiapsiagaan warga dalam menghadapi potensi bencana alam seperti banjir dan longsor.",
      "Simulasi mencakup skenario evakuasi mandiri, jalur evakuasi aman, hingga praktik pertolongan pertama yang dipandu langsung oleh tim SARSIP LAZSIP.",
      "Melalui kegiatan ini, warga diharapkan lebih siap dan tanggap apabila bencana sungguhan terjadi di wilayah mereka.",
    ],
    tanggal: "2026-10-05",
    lokasi: "Desa Cikahuripan",
    isPinned: true,
    imageUrl: dummyImage("disaster,drill", 6),
  },
  {
    id: "a7",
    slug: "pembagian-paket-sembako",
    title: "Pembagian Paket Sembako Bulanan",
    description: "Distribusi paket sembako rutin bulanan untuk keluarga dhuafa binaan.",
    content: [
      "Pembagian Paket Sembako Bulanan merupakan agenda rutin LAZSIP untuk mendistribusikan kebutuhan pokok kepada keluarga dhuafa binaan setiap bulannya.",
      "Setiap paket berisi beras, minyak goreng, gula, dan kebutuhan pokok lain yang disesuaikan dengan jumlah anggota keluarga penerima manfaat.",
      "Distribusi dilakukan langsung ke balai desa dengan melibatkan tokoh masyarakat setempat untuk memastikan bantuan tepat sasaran.",
    ],
    tanggal: "2026-08-05",
    lokasi: "Balai Desa Sukamaju",
    isPinned: false,
    imageUrl: dummyImage("rice,food", 7),
  },
  {
    id: "a8",
    slug: "khitanan-massal-gratis",
    title: "Khitanan Massal Gratis",
    description: "Layanan khitanan gratis bagi anak dari keluarga kurang mampu.",
    content: [
      "Khitanan Massal Gratis diselenggarakan LAZSIP bekerja sama dengan puskesmas mitra untuk membantu anak-anak dari keluarga kurang mampu yang belum sempat dikhitan karena keterbatasan biaya.",
      "Proses khitanan ditangani oleh tenaga medis berpengalaman dengan prosedur yang aman dan higienis, serta dilengkapi obat-obatan pasca-khitan secara gratis.",
      "Setiap peserta juga mendapatkan bingkisan dan santunan sebagai bentuk kepedulian LAZSIP terhadap tumbuh kembang anak-anak dhuafa.",
    ],
    tanggal: "2026-07-27",
    lokasi: "Puskesmas Mitra LAZSIP",
    isPinned: false,
    imageUrl: dummyImage("clinic,medical", 8),
  },
];

export function getOtherActivities(current: Activity, count = 3): Activity[] {
  const others = activities.filter((a) => a.id !== current.id);
  const startIndex = activities.findIndex((a) => a.id === current.id) % others.length;
  const rotated = [...others.slice(startIndex), ...others.slice(0, startIndex)];
  return rotated.slice(0, count);
}

export const publicBeneficiaries: PublicBeneficiary[] = [
  {
    id: "b1",
    nama: "Ibu Sartika",
    umur: 52,
    jenisKelamin: "P",
    masalahYangDihadapi: "Kesulitan biaya pengobatan rutin pasca operasi",
    kebutuhan: "Bantuan biaya kontrol dan obat bulanan",
    tahuInfoDari: "Tokoh masyarakat setempat",
    namaVerifikator: "Ahmad Fauzi",
    daerahCakupanVerifikator: "Kecamatan Cibinong",
    tipeBantuan: "kesehatan",
    nominalDiterima: 2_500_000,
    imageUrl: dummyImage("woman,portrait", 1),
  },
  {
    id: "b2",
    nama: "Ananda Putra",
    umur: 9,
    jenisKelamin: "L",
    masalahYangDihadapi: "Putus sekolah karena keterbatasan biaya",
    kebutuhan: "Bantuan seragam, buku, dan SPP",
    tahuInfoDari: "Guru sekolah",
    namaVerifikator: "Siti Nurhaliza",
    daerahCakupanVerifikator: "Kecamatan Gunung Putri",
    tipeBantuan: "pendidikan",
    nominalDiterima: 1_800_000,
    imageUrl: dummyImage("boy,portrait", 1),
  },
  {
    id: "b3",
    nama: "Bapak Suryadi",
    umur: 61,
    jenisKelamin: "L",
    masalahYangDihadapi: "Kehilangan sumber penghasilan akibat sakit",
    kebutuhan: "Bantuan sembako bulanan",
    tahuInfoDari: "RT/RW setempat",
    namaVerifikator: "Ahmad Fauzi",
    daerahCakupanVerifikator: "Kecamatan Cibinong",
    tipeBantuan: "kebutuhan_pokok",
    nominalDiterima: 900_000,
    imageUrl: dummyImage("man,portrait", 1),
  },
  {
    id: "b4",
    nama: "Ibu Ratna",
    umur: 45,
    jenisKelamin: "P",
    masalahYangDihadapi: "Rumah tidak layak huni pasca bencana",
    kebutuhan: "Bantuan renovasi darurat",
    tahuInfoDari: "Posko bencana LAZSIP",
    namaVerifikator: "Dedi Kurniawan",
    daerahCakupanVerifikator: "Kecamatan Citeureup",
    tipeBantuan: "lainnya",
    nominalDiterima: 5_000_000,
    imageUrl: dummyImage("woman,portrait", 2),
  },
  {
    id: "b5",
    nama: "Fajar Ramadhan",
    umur: 15,
    jenisKelamin: "L",
    masalahYangDihadapi: "Terancam putus sekolah tingkat SMP",
    kebutuhan: "Bantuan biaya sekolah tahun ajaran baru",
    tahuInfoDari: "Program beasiswa LAZSIP",
    namaVerifikator: "Siti Nurhaliza",
    daerahCakupanVerifikator: "Kecamatan Gunung Putri",
    tipeBantuan: "pendidikan",
    nominalDiterima: 1_200_000,
    imageUrl: dummyImage("teenager,portrait", 1),
  },
];

export function getOtherBeneficiaries(current: PublicBeneficiary, count = 3): PublicBeneficiary[] {
  const sameTipe = publicBeneficiaries.filter(
    (b) => b.tipeBantuan === current.tipeBantuan && b.id !== current.id
  );
  const others = sameTipe.length >= count
    ? sameTipe
    : publicBeneficiaries.filter((b) => b.id !== current.id);
  const startIndex = others.length
    ? publicBeneficiaries.findIndex((b) => b.id === current.id) % others.length
    : 0;
  const rotated = [...others.slice(startIndex), ...others.slice(0, startIndex)];
  return rotated.slice(0, count);
}

export const transparencyStats = {
  totalCollected: 1_842_650_000,
  totalDonors: 3_412,
  totalBeneficiaries: 926,
};

// Statistik ringkas untuk kartu info di section Tentang Kami.
export const lembagaStats = {
  totalVerifikator: 24,
  totalMitra: 34,
};

// Wilayah yang dijangkau tim verifikator lapangan LAZSIP saat memvalidasi calon penerima manfaat.
export const wilayahCakupanVerifikator: string[] = [
  "Kecamatan Cibinong",
  "Kecamatan Gunung Putri",
  "Kecamatan Citeureup",
  "Kecamatan Bojonggede",
  "Kecamatan Sukaraja",
  "Kecamatan Tajurhalang",
  "Kecamatan Kemang",
  "Kecamatan Parung",
];

export type PengurusItem = { nama: string; jabatan: string };

export const strukturOrganisasi: PengurusItem[] = [
  { nama: "H. Ahmad Zainuddin", jabatan: "Ketua Yayasan" },
  { nama: "Hj. Siti Aminah", jabatan: "Sekretaris" },
  { nama: "Bambang Wijaya", jabatan: "Bendahara" },
  { nama: "Ahmad Fauzi", jabatan: "Kepala Divisi Penghimpunan" },
  { nama: "Rina Kartika", jabatan: "Kepala Divisi Pendidikan" },
  { nama: "Dedi Kurniawan", jabatan: "Kepala Divisi SARSIP" },
  { nama: "Siti Nurhaliza", jabatan: "Kepala Divisi Verifikasi & Penyaluran" },
];

// Dummy — nama lembaga/organisasi fiktif (bukan entitas nyata) untuk mengisi row logo mitra
// yang auto-scroll di atas section Tentang Kami. Ganti dengan data mitra asli LAZSIP nanti.
export const mitraList: string[] = [
  "Yayasan Peduli Umat",
  "Koperasi Syariah Amanah",
  "Bank Sejahtera Syariah",
  "RS Sehat Bersama",
  "Universitas Cahaya Bangsa",
  "Media Kabar Umat",
  "PT Berkah Sejahtera",
  "Yayasan Insan Mandiri",
  "Koperasi Mitra Dhuafa",
  "Klinik Sehat Peduli",
  "Universitas Nurul Ilmi",
  "Radio Suara Umat FM",
  "PT Cahaya Nusantara",
  "Yayasan Rumah Yatim Sejahtera",
  "Komunitas Masjid Al-Ikhlas",
  "Bank Amanah Ummat",
  "Sekolah Tinggi Ekonomi Syariah",
  "RSIA Bunda Peduli",
  "Koperasi Tani Makmur",
  "PT Sinar Abadi Group",
  "Yayasan Dana Kemanusiaan",
  "Perhimpunan Dokter Peduli",
  "Bank Wakaf Mikro Sejahtera",
  "Komunitas Relawan Siaga",
  "Universitas Amal Ilmu",
  "PT Mitra Logistik Peduli",
  "Yayasan Pendidikan Anak Bangsa",
  "Koperasi Simpan Pinjam Barokah",
  "Klinik Bersalin Ar-Rahim",
  "Media Online Berbagi.id",
  "PT Agro Tani Sejahtera",
  "Forum Masjid Peduli Sesama",
  "Yayasan Griya Yatim Aman",
  "Komunitas UMKM Naik Kelas",
];

// Fallback harga emas — dipakai HANYA kalau fetch live ke API harga emas (lib/gold-price.ts)
// gagal/timeout, supaya kalkulator zakat tetap bisa jalan.
export const fallbackGoldPrice = {
  pricePerGram: 1_950_000,
  updatedAt: "2026-09-07",
};

export const nishabGram = 85; // gram emas — acuan nishab zakat maal, penghasilan, emas, dan perdagangan
export const zakatRate = 0.025;

// Nilai zakat fitrah per jiwa — acuan umum lembaga amil zakat (setara ~2,5 kg beras kualitas
// menengah). Belum ada sumber live yang terverifikasi untuk ini, jadi tetap nilai referensi
// statis sampai ada acuan resmi (mis. SK BAZNAS daerah) yang bisa diintegrasikan.
export const fitrahPerJiwa = 45_000;

// Setara tabel `payment_fees` — biaya admin dihitung dinamis per metode pembayaran (lihat CLAUDE.md §3).
export type PaymentMethod = {
  id: string;
  label: string;
  group: string;
  feeFlat: number;
  feePercent: number;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "bca_va", label: "BCA Virtual Account", group: "Virtual Account", feeFlat: 4000, feePercent: 0 },
  { id: "bni_va", label: "BNI Virtual Account", group: "Virtual Account", feeFlat: 4000, feePercent: 0 },
  { id: "mandiri_va", label: "Mandiri Virtual Account", group: "Virtual Account", feeFlat: 4000, feePercent: 0 },
  { id: "qris", label: "QRIS", group: "QRIS", feeFlat: 0, feePercent: 0.007 },
  { id: "gopay", label: "GoPay", group: "E-Wallet", feeFlat: 0, feePercent: 0.02 },
  { id: "dana", label: "DANA", group: "E-Wallet", feeFlat: 0, feePercent: 0.015 },
];

export function calculateAdminFee(nominal: number, method: PaymentMethod): number {
  return Math.round(method.feeFlat + nominal * method.feePercent);
}

export function getOtherCampaigns(current: Campaign, count = 3): Campaign[] {
  const visible = campaigns.filter((c) => c.status !== "nonaktif");
  const others = visible.filter((c) => c.id !== current.id);
  const startIndex = others.length ? visible.findIndex((c) => c.id === current.id) % others.length : 0;
  const rotated = [...others.slice(startIndex), ...others.slice(0, startIndex)];
  return rotated.slice(0, count);
}
