import { FeatureItem } from "../bootstrap-types";
import { ExpertiseFeatureItem } from "../custom-types";

// Expertises
export const expertiseItems: ExpertiseFeatureItem[] = [
  {
    key: "EPR-001",
    icon: "code-slash",
    title: "Full-Stack Developer Laravel",
    description:
      "Saya adalah Full-Stack Developer dengan spesialisasi pada framework Laravel, berpengalaman dalam membangun aplikasi web yang scalable, aman, dan user-friendly. Memiliki pemahaman mendalam terhadap arsitektur MVC, RESTful API, dan pengembangan sisi frontend maupun backend.",
    buttonLabel: "Dibuktikan dalam proyek...",
    dataToggle: "modal",
    dataTarget: "EPR-001",
    projects: ["POR-001", "POR-002"],
  },
];

// Services
export const servicesList = [
  {
    title: "Pengembangan Web",
    description:
      "Membangun website responsif, cepat, dan modern menggunakan teknologi terbaru seperti React dan Next.js.",
    icon: "💻",
  },
  {
    title: "Desain UI/UX",
    description:
      "Merancang antarmuka yang intuitif dan menarik untuk meningkatkan pengalaman pengguna aplikasi Anda.",
    icon: "🎨",
  },
  {
    title: "Optimasi Performa",
    description:
      "Meningkatkan kecepatan loading dan efisiensi aplikasi web untuk skor SEO dan retensi user yang lebih baik.",
    icon: "⚡",
  },
  {
    title: "Konsultasi Teknis",
    description:
      "Memberikan solusi arsitektur software dan saran teknis untuk kebutuhan transformasi digital bisnis Anda.",
    icon: "🤝",
  },
];
export const progressList: FeatureItem[] = [
  {
    key: "1",
    icon: "1-square",
    title: "Diskusi & Perencanaan",
    description:
      "Memahami visi, kebutuhan, dan target audiens proyek Anda secara mendalam.",
  },
  {
    key: "2",
    icon: "2-square",
    title: "Pengembangan",
    description:
      "Eksekusi kode dengan standar kualitas tinggi, bersih, dan mudah dipelihara.",
  },
  {
    key: "3",
    icon: "3-square",
    title: "Peluncuran & Support",
    description:
      "Deployment aplikasi ke server production dan dukungan pemeliharaan berkelanjutan.",
  },
];
export const pricingList = [
  {
    plan: "Dasar",
    price: "1.5Jt",
    priceSuffix: "/proyek",
    features: [
      "Desain Landing Page",
      "Hingga 3 Halaman",
      "Responsif di Mobile",
      "Setup Domain & Hosting",
    ],
    buttonText: "Pilih Paket Dasar",
    featured: false,
  },
  {
    plan: "Standar",
    price: "4Jt",
    priceSuffix: "/proyek",
    features: [
      "Semua di paket Dasar",
      "Hingga 7 Halaman",
      "Integrasi CMS",
      "Optimasi SEO Dasar",
      "Dukungan 1 Bulan",
    ],
    buttonText: "Pilih Paket Standar",
    featured: true,
  },
  {
    plan: "Premium",
    price: "Hubungi",
    priceSuffix: "",
    features: [
      "Semua di paket Standar",
      "Halaman tidak terbatas",
      "Fitur E-commerce",
      "Integrasi API Kustom",
      "Dukungan Prioritas",
    ],
    buttonText: "Diskusi Proyek",
    featured: false,
  },
];
