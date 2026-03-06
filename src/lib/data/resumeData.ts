import { ResumeFeatureItem } from "../customs/custom-types";

// Educations
export const educationItems: ResumeFeatureItem[] = [
  {
    key: "EDU-001",
    icon: "education",
    buttonLabel: "Lihat Detail",
    dataToggle: "modal",
    dataTarget: "EDU-001",
    data: [
      {
        type: "education",
        location: "Universitas Dinamika",
        address:
          "Jl. Raya Kedung Baruk No.98, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298",
        degree: "S1",
        major: "Sistem Informasi",
        gpa: 3.26,
        status: "Finished",
        description:
          "Fokus pada pengembangan perangkat lunak dan analisis sistem, dengan proyek akhir membangun sistem pendukung keputusan untuk evaluasi kinerja karyawan.",
        start_period: new Date("2021-08-01"),
        finish_period: new Date("2025-03-01"),
        latitude: -7.311713,
        longitude: 112.782191,
      },
    ],
  },
];

// Experiences
export const experienceItems: ResumeFeatureItem[] = [
  {
    key: "EXP-001",
    icon: "experience",
    buttonLabel: "Lihat Detail",
    dataToggle: "modal",
    dataTarget: "EXP-001",
    data: [
      {
        type: "experience",
        title: "Intern Web Developer",
        description:
          "Bertanggung jawab dalam merancang dan membangun aplikasi pelayanan perpustakaan untuk meningkatkan efisiensi layanan. Terlibat dalam seluruh siklus pengembangan, mulai dari pengumpulan kebutuhan hingga implementasi.",
        location: "BPS Jawa Timur",
        address:
          "Jl. Raya Kendangsari Industri No.43-44, Kendangsari, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292",
        status: "Finished",
        start_period: new Date("2023-01-01"),
        finish_period: new Date("2023-03-01"),
        latitude: -7.328969,
        longitude: 112.745766,
      },
    ],
  },
  {
    key: "EXP-002",
    icon: "experience",
    buttonLabel: "Lihat Detail",
    dataToggle: "modal",
    dataTarget: "EXP-002",
    data: [
      {
        type: "experience",
        title: "Intern Frontend Developer",
        location: "Kominfo Jawa Timur",
        address:
          "Jl. Ahmad Yani No.242-244, Gayungan, Kec. Gayungan, Surabaya, Jawa Timur 60235",
        status: "Finished",
        start_period: new Date("2025-09-01"),
        finish_period: new Date("2026-01-31"),
        latitude: -7.336187,
        longitude: 112.729142,
      },
    ],
  },
];

// Certificates
export const certificateItems = [
  {
    id: "CER-001",
    name: "The Complete Full-Stack Web Development Bootcamp",
    type: "Kursus",
    issuer: "Udemy",
    issue_date: "2025-11-23",
    credential_id: "UC-79cc6a5a-c324-440e-9015-8fb029874530",
    credential_url:
      "https://www.udemy.com/certificate/UC-79cc6a5a-c324-440e-9015-8fb029874530/",
    file: "/images/certificates/CER-001.jpg",
  },
  {
    id: "CER-002",
    name: "The Complete JavaScript Course 2025: From Zero to Expert!",
    type: "Kursus",
    issuer: "Udemy",
    issue_date: "2025-11-30",
    credential_id: "UC-667e140f-afa4-45f7-be92-033c83f4d366",
    credential_url:
      "https://www.udemy.com/certificate/UC-667e140f-afa4-45f7-be92-033c83f4d366/",
    file: "/images/certificates/CER-002.jpg",
  },
  {
    id: "CER-003",
    name: "Konsep Pemrograman",
    type: "Pelatihan",
    issuer: "DigiTalent",
    issue_date: "2025-06-15",
    credential_id: "2299793850-1837",
    credential_url: "https://digitalent.komdigi.go.id/cek-sertifikat",
    file: "/pdfs/certificates/CER-003.pdf",
  },
  {
    id: "CER-004",
    name: "Computational Thinking: Cara Berpikir Logis untuk Mengatasi Masalah",
    type: "Pelatihan",
    issuer: "DigiTalent",
    issue_date: "2025-10-06",
    credential_id: "22910204850-7122",
    credential_url: "https://digitalent.komdigi.go.id/cek-sertifikat",
    file: "/pdfs/certificates/CER-004.pdf",
  },
  {
    id: "CER-005",
    name: "Pengantar Mindset Digital 1: Mengubah Masa Depan Anda Dengan Pola Pikir Digital (Micro Skill)",
    type: "Pelatihan",
    issuer: "DigiTalent",
    issue_date: "2025-06-16",
    credential_id: "2299815850-3827",
    credential_url: "https://digitalent.komdigi.go.id/cek-sertifikat",
    file: "/pdfs/certificates/CER-005.pdf",
  },
  {
    id: "CER-006",
    name: "Magang Mandiri SEAL Batch 2 (Frontend Developer Intern)",
    type: "Magang",
    issuer: "SEAL Internship",
    issue_date: "2026-01-31",
    file: "/pdfs/certificates/CER-006.pdf",
  },
  {
    id: "CER-007",
    name: "Praktik Kerja Lapangan di Badan Pusat Statistik Provinsi Jawa Timur",
    type: "Magang",
    issuer: "BPS Jawa Timur",
    issue_date: "2023-03-03",
    file: "/pdfs/certificates/CER-007.pdf",
  },
];
