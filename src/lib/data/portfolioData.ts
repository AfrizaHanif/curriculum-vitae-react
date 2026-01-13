// import { PortfolioItem } from "../types";

// Portfolios
export const portfolioItems = [
  {
    id: "POR-001",
    title:
      "Rancang Bangun Aplikasi Pelayanan Perpustakaan pada Badan Pusat Statistik Provinsi Jawa Timur",
    slug: "rancang-bangun-aplikasi-pelayanan-perpustakaan-pada-badan-pusat-statistik-provinsi-jawa-timur",
    category: "Proyek Akademik",
    subcategory: "Full-Stack Development",
    type: "Aplikasi Web",
    image: "/images/portfolios/POR-001.png",
    gallery: [
      "/images/portfolios/gallery/IMG-001-001.png",
      "/images/portfolios/gallery/IMG-001-002.png",
      "/images/portfolios/gallery/IMG-001-003.png",
      "/images/portfolios/gallery/IMG-001-004.png",
      "/images/portfolios/gallery/IMG-001-005.png",
      "/images/portfolios/gallery/IMG-001-006.png",
      "/images/portfolios/gallery/IMG-001-007.png",
      "/images/portfolios/gallery/IMG-001-008.png",
      "/images/portfolios/gallery/IMG-001-009.png",
      "/images/portfolios/gallery/IMG-001-010.png",
      "/images/portfolios/gallery/IMG-001-011.png",
      "/images/portfolios/gallery/IMG-001-012.png",
      "/images/portfolios/gallery/IMG-001-013.png",
    ],
    start_period: "2023-01-01",
    finish_period: "2023-07-02",
    description:
      "Membangun aplikasi untuk membantu pelayanan perpustakaan di BPS Provinsi Jawa Timur. Aplikasi ini dirancang untuk mempermudah dan mempercepat kinerja pegawai saat melayani konsumen.",
    tags: ["Kerja Praktik", "Aplikasi Web", "BPS", "Perpustakaan"],
    technology: ["Laravel", "PHP"],
    repository: "https://repository.dinamika.ac.id/id/eprint/7167/",
    repository_type: "Document",
  },
  {
    id: "POR-002",
    title:
      "Rancang Bangun Aplikasi Penentuan Karyawan Terbaik Berbasis Web menggunakan Metode Simple Additive Weighting (SAW) pada BPS Provinsi Jawa Timur",
    slug: "rancang-bangun-aplikasi-penentuan-karyawan-terbaik-berbasis-web-menggunakan-metode-simple-additive-weighting-saw-pada-bps-provinsi-jawa-timur",
    category: "Proyek Akademik",
    subcategory: "Full-Stack Development",
    type: "Aplikasi Web",
    image: "/images/portfolios/POR-002.png",
    gallery: [
      "/images/portfolios/gallery/IMG-002-001.png",
      "/images/portfolios/gallery/IMG-002-002.png",
      "/images/portfolios/gallery/IMG-002-003.png",
      "/images/portfolios/gallery/IMG-002-004.png",
      "/images/portfolios/gallery/IMG-002-005.png",
      "/images/portfolios/gallery/IMG-002-006.png",
      "/images/portfolios/gallery/IMG-002-007.png",
      "/images/portfolios/gallery/IMG-002-008.png",
      "/images/portfolios/gallery/IMG-002-009.png",
      "/images/portfolios/gallery/IMG-002-010.png",
      "/images/portfolios/gallery/IMG-002-011.png",
      "/images/portfolios/gallery/IMG-002-012.png",
      "/images/portfolios/gallery/IMG-002-013.png",
    ],
    start_period: "2024-10-01",
    finish_period: "2025-01-01",
    description:
      "Membangun aplikasi berbasis web untuk membantu proses penilaian dan pemilihan karyawan terbaik di BPS Provinsi Jawa Timur dengan menggunakan metode Simple Additive Weighting (SAW). Aplikasi ini dirancang untuk mempermudah pengambilan keputusan berbasis kriteria yang telah ditentukan, seperti kehadiran, capaian kinerja pegawai, dan tujuh indikator BerAkhlak.",
    tags: [
      "Tugas Akhir",
      "Aplikasi Web",
      "BPS",
      "Simple Additive Weighting",
      "Sistem Pendukung Keputusan",
    ],
    technology: ["Laravel", "PHP"],
    repository: "https://repository.dinamika.ac.id/id/eprint/7908/",
    repository_type: "Document",
  },
];
export const repositoryItems = [
  {
    id: "REP-001",
    portfolio_id: "POR-001",
    label: "Dokumen",
    icon: "file-earmark-text",
    href: "https://repository.dinamika.ac.id/id/eprint/7167/",
  },
  {
    id: "REP-002",
    portfolio_id: "POR-002",
    label: "Dokumen",
    icon: "file-earmark-text",
    href: "https://repository.dinamika.ac.id/id/eprint/7908/",
  },
  {
    id: "REP-003",
    portfolio_id: "POR-002",
    label: "Source Code (GitHub)",
    icon: "code-slash",
    href: "https://github.com/AfrizaHanif/tugas_akhir_s1/",
  },
  ,
  {
    id: "REP-004",
    portfolio_id: "POR-002",
    label: "Jurnal (JATI)",
    icon: "journal-text",
    href: "https://ojs.unikom.ac.id/index.php/jati/article/view/15243/",
  },
];

// Other Projects
export const projectItems = [
  {
    id: "PRO-001",
    title: "Web Delta Sari (Indah dan Baru)",
    slug: "web-delta-sari-indah-dan-baru",
    category: "Personal Project",
    subcategory: "Full-Stack Development",
    type: "Aplikasi Web",
    image: "/images/portfolios/PRO-001.png",
    start_period: "2025-03-01",
    status: "Ongoing",
    description: "Test",
    tags: ["Estate"],
    technology: ["Laravel", "PHP"],
    sourcecode: "example.com",
  },
];
