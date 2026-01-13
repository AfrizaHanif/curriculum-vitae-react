import { ResumeFeatureItem } from "../custom-types";

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
    issuer: "Udemy",
    issue_date: "2025-10-01",
    credential_id: "UC-79cc6a5a-c324-440e-9015-8fb029874530",
    credential_url:
      "https://www.udemy.com/certificate/UC-79cc6a5a-c324-440e-9015-8fb029874530/",
    file: "/images/certificates/CER-001.jpg",
  },
  {
    id: "CER-002",
    name: "The Complete JavaScript Course 2025: From Zero to Expert!",
    issuer: "Udemy",
    issue_date: "2025-10-01",
    credential_id: "UC-667e140f-afa4-45f7-be92-033c83f4d366",
    credential_url:
      "https://www.udemy.com/certificate/UC-667e140f-afa4-45f7-be92-033c83f4d366/",
    file: "/images/certificates/CER-002.jpg",
  },
];
