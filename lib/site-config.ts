// Rincian legalitas per lembaga — field terpisah supaya form admin "Kelola Konten Umum" bisa
// mengedit tiap nomor izin sendiri-sendiri. `legalitas` (array tampilan) diturunkan dari sini
// supaya publik & admin selalu melihat data yang sama (single source of truth).
export const legalitasDetail = {
  aktaNotaris: "Akta Notaris No. 12 Tahun 2015",
  izinDinsos: "Izin Operasional Dinas Sosial No. 460/123/Dinsos",
  izinKemenkumham: "Terdaftar di Kemenkumham RI",
  izinBaznas: "Bermitra Resmi dengan BAZNAS",
  izinKemenag: "Terdaftar di Kementerian Agama RI",
};

export const siteConfig = {
  name: "LAZSIP",
  fullName: "Lembaga Amil Zakat Solidaritas Insan Peduli",
  tagline: "Menyalurkan Kepedulian, Menguatkan Solidaritas Umat",
  foundedYear: 2015,
  whatsappNumber: "6281234567890",
  email: "info@lazsip.or.id",
  address: "Jl. Solidaritas No. 1, Cibinong, Kabupaten Bogor, Jawa Barat",
  jamOperasional: [
    { hari: "Senin – Jumat", jam: "08.00 – 16.00 WIB" },
    { hari: "Sabtu", jam: "08.00 – 12.00 WIB" },
    { hari: "Minggu & Hari Libur Nasional", jam: "Tutup" },
  ],
  // Konten section Hero landing page — dikelola lewat /admin/konten-umum.
  hero: {
    headline: "Menyalurkan Kepedulian, Menguatkan Solidaritas Umat",
    subheadline:
      "Lembaga Amil Zakat Solidaritas Insan Peduli membantu Anda menunaikan zakat, infak, dan donasi dengan mudah, aman, dan tersalurkan tepat sasaran.",
    ctaPrimaryLabel: "Hitung & Bayar Zakat",
    ctaSecondaryLabel: "Donasi Sekarang",
  },
  // Konten section/halaman Tentang Kami — dikelola lewat /admin/konten-umum.
  tentang: {
    ringkasDescription:
      "Berdiri di atas semangat solidaritas, kami hadir sebagai jembatan antara muzakki dan mustahik dengan tata kelola yang amanah dan transparan.",
    visi:
      "Menjadi lembaga amil zakat terpercaya yang berperan aktif dalam mewujudkan kesejahteraan umat melalui pengelolaan zakat, infak, dan sedekah yang profesional dan berkelanjutan.",
    misi: [
      "Optimalkan penghimpunan ZIS dari muzakki dan donatur.",
      "Salurkan bantuan tepat sasaran kepada mustahik yang berhak.",
      "Bangun kemandirian ekonomi mustahik lewat program pemberdayaan.",
      "Jaga transparansi pengelolaan dana umat kepada publik.",
    ],
  },
  legalitas: Object.values(legalitasDetail),
  legalitasDetail,
  social: {
    instagram: "https://instagram.com/lazsip.id",
    facebook: "https://facebook.com/lazsip.id",
    youtube: "https://youtube.com/@lazsip",
    tiktok: "",
  },
  nav: [
    { label: "Tentang", href: "#tentang" },
    { label: "Kalkulator Zakat", href: "#kalkulator-zakat" },
    { label: "Berita", href: "#berita" },
    { label: "Donasi", href: "#donasi" },
    { label: "Program", href: "#program" },
    { label: "Kegiatan", href: "#kegiatan" },
    { label: "Penyaluran", href: "#penyaluran" },
  ],
};
