import { FeatureItem } from "../bootstrap-types";
import { SetupItem } from "../customs/data-types";

// Profile
export const profileItem = [
  {
    key: "PRO-001-001",
    fullname: "Muhammad Afriza Hanif",
    phone: "+6287777056650",
    current_city: "Sidoarjo",
    current_province: "Jawa Timur",
    email: "afrizahanif728@gmail.com",
    birthday: "1996-04-08",
    tagline: "Bersemangat untuk Berkontribusi pada Web Developer",
    description:
      "Lulusan S1 Sistem Informasi dari Universitas Dinamika dengan IPK 3.2. Memiliki pengalaman magang di BPS Jawa Timur (Jan–Mar 2023) sebagai intern Kerja Praktik, terlibat dalam pengelolaan data dan sistem informasi. Berpengalaman dalam pengembangan aplikasi web menggunakan Laravel, serta aktif mempelajari Python, Artificial Intelligence (AI), desain grafis, CSS, dan JavaScript. Tertarik pada posisi Web Developer dan antusias untuk terus berkembang di lingkungan kerja yang dinamis dan kolaboratif.",
    philosophy:
      "Sebagai web programmer, saya meyakini bahwa teknologi harus memberikan solusi yang efisien, aman, dan berkelanjutan. Saya berkomitmen untuk menulis kode yang terstruktur dan mudah dipelihara, mengikuti standar industri, serta beradaptasi dengan perkembangan teknologi dan kebutuhan bisnis. Dalam setiap proyek, saya menjunjung tinggi profesionalisme, komunikasi yang jelas, dan integritas kerja untuk menghasilkan sistem yang fungsional dan berdampak.",
    status: "Fresh Graduate",
    photo: "assets/images/profile.jpg",
  },
];
export const skillItems = [
  {
    key: "SKI-001",
    name: "Bootstrap",
    level: "Mahir",
    since: 2023,
  },
  {
    key: "SKI-002",
    name: "Laravel",
    level: "Mahir",
    since: 2022,
  },
  {
    key: "SKI-003",
    name: "MySQL",
    level: "Menengah",
    since: 2022,
  },
  {
    key: "SKI-004",
    name: "PHP",
    level: "Mahir",
    since: 2022,
  },
  {
    key: "SKI-005",
    name: "HTML",
    level: "Mahir",
    since: 2022,
  },
  {
    key: "SKI-006",
    name: "Angular",
    level: "Pemula",
    since: 2025,
  },
  {
    key: "SKI-007",
    name: "JavaScript",
    level: "Pemula",
    since: 2025,
  },
  {
    key: "SKI-008",
    name: "React",
    level: "Pemula",
    since: 2025,
  },
];
export const hobbyItems: FeatureItem[] = [
  {
    key: "HOB-001",
    title: "Foto-Foto",
    icon: "camera",
  },
  {
    key: "HOB-002",
    title: "Mendengarkan Musik",
    icon: "music-note",
  },
];
export const socialItems = [
  {
    key: "SOC-001",
    name: "Linkedin",
    url: "https://linkedin.com/in/afrizahanif",
    icon: "linkedin",
  },
  {
    key: "SOC-002",
    name: "GitHub",
    url: "https://github.com/AfrizaHanif",
    icon: "github",
  },
];

// Setups
export const setupItems: SetupItem[] = [
  {
    name: "Komputer Utama",
    category: "Home Workstation",
    description: "PC Rakitan (AMD Ryzen 5, 16GB RAM)",
    why: "Komputer ini digunakan untuk melakukan pemrograman dengan cepat dan stabil tanpa bottleneck",
  },
  {
    name: "Monitor",
    category: "Home Workstation",
    description: "LG 19M38A 19 inch",
    why: "Menghasilkan layar yang cukup luas untuk melakukan multitasking saat melakukan pengerjaan",
  },
  {
    name: "Keyboard",
    category: "Home Workstation",
    description: "Logitech Pebble Keys 2 K380s",
    why: "Ringkas dan nyaman. Layout keyboard ini beradaptasi dengan keyboard laptop 14 inch",
  },
  {
    name: "Mouse",
    category: "Home Workstation",
    description: "Logitech Pebble M350",
    why: "Ringkas dan hening tanpa mengganggu aktivitas",
  },
  {
    name: "Laptop",
    category: "Portable Setup",
    description: "Lenovo Ideapad 3 (2021)",
    why: "Laptop ini digunakan untuk melakukan programming dimana saja saat bepergian",
  },
  {
    name: "Mouse",
    category: "Portable Setup",
    description: "Logitech M240",
    why: "Ergonomic dan hening tanpa mengganggu aktivitas orang lain.",
  },
  {
    name: "Primary Phone",
    category: "Gadget Devices",
    description: "Samsung Galaxy A54 5G",
  },
  {
    name: "Wearable",
    category: "Gadget Devices",
    description: "Samsung Galaxy Fit3",
  },
  {
    name: "Code Editor",
    category: "Shared Development Tools",
    description: "Visual Studio Code",
    why: "Cepat, dapat disesuaikan dengan ekosistem ekstensi yang luas, dan memiliki dukungan bawaan yang hebat untuk banyak bahasa pemrograman yang saya gunakan",
  },
  {
    name: "Terminal",
    category: "Shared Development Tools",
    description: "Windows Terminal with PowerShell",
    why: "Terminal modern yang mendukung banyak tab, panel, dan profil. PowerShell sangat kuat untuk scripting dan otomatisasi di Windows",
  },
  {
    name: "Browser",
    category: "Shared Development Tools",
    description: "Google Chrome & Firefox Developer Edition",
    why: "Saya menggunakan Google Chrome karena alat pengembangnya yang tangguh dan kompatibilitasnya yang luas, dan Firefox Developer Edition karena inspector CSS grid-nya yang luar biasa dan fitur privasinya",
  },
  {
    name: "API Client",
    category: "Shared Development Tools",
    description: "Postman",
    why: "Sebuah alat yang tak tergantikan untuk menguji dan berinteraksi dengan API. Alat ini dapat menyederhanakan proses pengiriman permintaan dan pemeriksaan respons",
  },
];

// NOTE:
// skillItems are not using interface of item since the card from card-group can be customized. Only to be used if the component are fixed / not customized from page.tsx
