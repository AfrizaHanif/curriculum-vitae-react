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
    ],
    start_period: "2023-01-01",
    finish_period: "2023-07-02",
    description:
      "Saya mengembangkan aplikasi manajemen perpustakaan digital untuk BPS Provinsi Jawa Timur menggunakan PHP dan Laravel. Fokus utama proyek ini adalah mentransformasi proses pelayanan manual menjadi sistem yang terintegrasi untuk meningkatkan efisiensi kerja pegawai dan kecepatan layanan konsumen",
    tags: ["Kerja Praktik", "Aplikasi Web", "BPS", "Perpustakaan"],
    technology: ["Laravel", "PHP", "Bootstrap"],
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
    technology: ["Laravel", "PHP", "Bootstrap"],
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

// Case Studies
export const caseStudyItems = [
  {
    id: "CAS-001",
    portfolio_id: "POR-001",
    role: "Full-Stack Developer",
    responsibles: [
      "Mengerjakan proyek sesuai dengan kebutuhan dari pegawai PST",
      "Mengerjakan proyek tanpa mengubah data asli yang ada di BPS Jawa Timur",
    ],
    problems: [
      "User Experience (UX) yang Kurang Optimal: Tata letak antarmuka (interface) belum mengikuti standar usability, sehingga menyulitkan navigasi pengguna dalam mengoperasikan aplikasi",
      "Aksesibilitas Terbatas: Operasional aplikasi masih bersifat tertutup (eksklusif) hanya untuk Pegawai PST, sehingga menghambat koordinasi data antar departemen/unit lain",
      "Keterbatasan Fungsionalitas: Fitur-fitur yang tersedia belum mencakup seluruh proses bisnis yang dibutuhkan, sehingga masih diperlukan proses manual di luar sistem",
      "Ketiadaan Modul Pelaporan: Sistem belum memiliki fitur manajemen laporan, yang mengakibatkan sulitnya proses pengambilan keputusan berbasis data bagi pihak manajemen",
    ],
    goal: "Merancang Bangun Aplikasi Pelayanan Perpustakaan Pada Badan Pusat Statistik Provinsi Jawa Timur",
    benefits: [
      "Mempermudah pengguna untuk mengakses daftar buku dan daftar isi dengan cepat",
      "Mempermudah dan mempercepat pengguna untuk melakukan pengisian peminjaman dan pengembalian buku",
      "Mempermudah pegawai / pengunjung untuk mencari informasi terkait dengan buku yang dicari",
    ],
    progress: [
      "Setelah dilakukannya observasi dan wawancara, saya melakukan pengumpulan data mengenai masalah-masalah yang ada dan kebutuhan data untuk pembuatan aplikasi pada proyek ini",
      "Agar proyek ini berjalan dengan baik, saya menggunakan metode pengembangan aplikasi Waterfall milik Pressman tahun 2015",
      "Sebelum dilakukannya pembuatan aplikasi, saya membuat sebuah diagram (Context Diagram, DFD Level 0, dan PDM) yang memudahkan saya untuk merencanakan pembangunan aplikasi pada proyek ini",
      "Saya memilih Framework Laravel karena fitur Eloquent ORM yang memudahkan pengelolaan database relasional yang kompleks serta sistem keamanan built-in yang kuat untuk melindungi data instansi",
      "Proses pengembangan dilakukan secara bertahap, dimulai dari pembangunan skema database hingga perancangan kode pada sisi Frontend dan Backend",
    ],
    challenges: [
      "Saat mengerjakan proyek ini, saya membutuhkan waktu sedikit lama untuk mempelajari CRUD (Memasukkan, mengubah, membaca, dan menghapus data), Laravel, dan Bootstrap",
      "Dalam waktu yang sangat singkat (Batasan waktu KP), tampilan dari aplikasi yang telah saya buat masih standar",
    ],
    lessons: [
      "Dari proyek ini, saya akan mempelajari lebih dalam mengenai Laravel dan Bootstrap",
      "Saya akan meningkatkan tampilan halaman yang lebih menarik",
      "Saya akan melakukan ekspesimen CRUD hanya dalam satu halaman",
    ],
    result: [
      "Pegawai PST dapat mencatat dan menampilkan daftar buku, daftar isi, pegawai, dan transaksi peminjaman dan pengembalian",
      "Dengan adanya aplikasi yang telah saya buat, pegawai PST akan terbantu dalam mencari buku dan daftar isi yang dibutuhkan oleh pegawai lain tanpa harus berpindah dari halaman ke halaman lain",
      "Pegawai PST dapat melakukan import / memasukkan data-data buku dan daftar isi dari file Excel agar pegawai PST tidak perlu melakukan input manual ketika server tersebut bermasalah atau pindah server",
    ],
    video: "",
  },
  {
    id: "CAS-002",
    portfolio_id: "POR-002",
    role: "Full-Stack Developer",
    responsibles: [
      "Mengerjakan proyek sesuai dengan kebutuhan dari pengguna (Kepegawaian, Kepala BPS Jawa Timur, dan seluruh pegawai BPS Jawa Timur)",
      "Mengerjakan proyek tanpa mengubah data nilai asli yang dimiliki oleh BPS Jawa Timur",
    ],
    problems: [
      "Presensi saat melakukan apel Senin dan senam Jumat masih menggunakan presensi manual sehingga proses rekap akan berlangsung lama karena diselingi aktivitas lain dan perlu dilakukan proses entry sampai satu minggu",
      "Belum ada pembobotan untuk menilai secara kualitatif kinerja karyawan yang didasarkan pada indikator BerAkhlak",
    ],
    goal: [
      "Menghasilkan aplikasi penentuan karyawan terbaik pada BPS Jawa Timur",
      "Penilaian kinerja dapat ditentukan berdasarkan kinerja karyawan yang sebenarnya",
      "Dapat memenuhi kriteria kedisiplinan (Kehadiran dan Keterlambatan), kinerja karyawan (CKP) dan 7 perilaku BerAkhlak (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif) serta memiliki integritas yang tinggi secara objektif",
    ],
    benefits: [
      "Mempermudah dan mempercepat pengguna untuk melakukan pengisian nilai kinerja untuk melakukan proses karyawan terbaik",
      "Mempermudah pengguna untuk mengakses daftar nilai di setiap kriteria",
    ],
    progress: [
      "Setelah dilakukannya observasi dan wawancara, saya melakukan pengumpulan data mengenai masalah-masalah yang ada dan kebutuhan data untuk pembuatan aplikasi pada proyek ini",
      "Agar proyek ini berjalan dengan baik, saya menggunakan model pengembangan aplikasi Waterfall milik Sommerville tahun 2016",
      "Sebelum dilakukannya pembuatan aplikasi, saya membuat sebuah diagram (Context Diagram, DFD Level 0, dan PDM) yang memudahkan saya untuk merencanakan pembangunan aplikasi pada proyek ini",
      "Saya memilih Framework Laravel karena fitur Eloquent ORM yang memudahkan pengelolaan database relasional yang kompleks serta sistem keamanan built-in yang kuat untuk melindungi data instansi",
      "Proses pengembangan dilakukan secara bertahap, dimulai dari pembangunan skema database hingga perancangan kode pada sisi Frontend dan Backend",
    ],
    challenges: [
      "Pada proyek ini membutuhkan waktu lama untuk mempelajari metode SAW untuk digunakan pada aplikasi ini",
    ],
    lessons: [
      "Dari proyek yang saya kerjakan, untuk kedepannya saya akan mempelajari cara mempersingkat kodingan agar terlihat lebih ringkas",
    ],
    result: [
      "Kepegawaian dapat mengelola data karyawan, pengguna, kriteria, dan periode dalam satu halaman saja",
      "Dengan adanya aplikasi yang telah saya buat, pengguna dapat melakukan pemasukan data karyawan dan data nilai menggunakan import untuk mempercepat proses saat melakukan pemasukan kedua data tersebut",
      "Proyek ini dapat melakukan analisis SAW dan menghasilkan laporan (Lap. Karyawan, Lap. Hasil Analisis SAW, Lap. Nilai Akhir, Lap. Nilai Pegawai, Lap. Karyawan Terbaik, Sertifikat Karyawan Terbaik)",
      "Total waktu responsif pada aplikasi yang telah saya buat sekitar 01.79 Menit dibandingkan dengan waktu sebelum adanya aplikasi tersebut sekitar 4 sampai 5 minggu",
    ],
    video: "",
  },
];
export const diagramCSItems = [
  {
    id: "DIA-001",
    case_study_id: "CAS-001",
    context: "/images/portfolios/case-study/CAS-001-Context.jpg",
    dfd_0: "/images/portfolios/case-study/CAS-001-DFD0.jpg",
    pdm: "/images/portfolios/case-study/CAS-001-PDM.jpg",
  },
  {
    id: "DIA-002",
    case_study_id: "CAS-002",
    context: "/images/portfolios/case-study/CAS-002-Context.png",
    dfd_0: "/images/portfolios/case-study/CAS-002-DFD0.png",
    pdm: "/images/portfolios/case-study/CAS-002-PDM.png",
  },
];
export const solutionCSItems = [
  {
    id: "SOl-001-001",
    case_study_id: "CAS-001",
    title: "Penggunaan Bootstrap sebagai alat desain Frontend",
    context:
      "Saya telah melakukan desain ulang pada aplikasi ini agar tata letak antarmuka (Interface) terlihat lebih rapi menggunakan Bootstrap yang dapat memudahkan saya untuk merapikan elemen-elemen yang ada di halaman-halaman pada aplikasi tersebut",
    visual: "",
  },
  {
    id: "SOl-001-002",
    case_study_id: "CAS-001",
    title: "Aksesibilitas untuk non-pegawai PST",
    context:
      "Agar para pegawai dapat mengakses daftar buku apa saja yang ada di perpustakaan, saya telah membangun ulang halaman utama pada aplikasi agar pengguna dapat mengakses daftar buku yang ada",
    visual: "",
  },
  {
    id: "SOl-002-001",
    case_study_id: "CAS-002",
    title: "Menggantikan cara tradisional menjadi aplikasi web",
    context:
      "Saya membuat aplikasi web untuk menggantikan cara tradisional dari masalah yang ada agar memudahkan pengguna untuk mengisi data dengan cepat menggunakan fitur import file ke aplikasi web",
    visual: "",
  },
  {
    id: "SOl-002-002",
    case_study_id: "CAS-002",
    title:
      "Menggunakan Simple Additive Weighting (SAW) sebagai metode pemilihan keputusan untuk perhitungan karyawan terbaik",
    context:
      "Untuk mementukan pemilihan karyawan terbaik menggunakan bobot, saya menggunakan Simple Additive Weighting (SAW) sebagai metode pemilihan keputusan",
    visual: "",
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
