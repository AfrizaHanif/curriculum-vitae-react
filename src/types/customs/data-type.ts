/*
PERHATIAN: Untuk menghubungkan ke Backend API (Seperti Laravel), pastikan column tersebut sama dan tidak ada satupun yang berbeda, karena ini akan digunakan untuk mapping data dari API ke dalam aplikasi. Jika ada perbedaan, maka data tidak akan terhubung dengan benar dan bisa menyebabkan error atau data yang tidak sesuai.
CATATAN: Jika ada perubahan pada struktur data di Backend API, pastikan untuk memperbarui interface yang sesuai di sini agar tetap sinkron dengan data yang diterima dari API. Hal ini penting untuk menjaga integritas data dan memastikan aplikasi berjalan dengan lancar. Berikan komentar // NEW pada setiap penambahan properti baru untuk memudahkan identifikasi perubahan di masa mendatang.
*/

export interface ProfileItem {
  id: string;
  fullname: string;
  phone: string;
  current_city?: string;
  current_province?: string;
  email: string;
  birthday: string;
  tagline?: string;
  description?: string;
  philosophy?: string;
  status: string;
  photo?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  since: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: any;
}

export interface HobbyItem {
  id: string;
  title: string;
  icon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: any;
}

export interface SocialItem {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface SetupItem {
  name: string;
  category: string;
  description: string;
  why?: string;
}

export interface EducationItem {
  id: string;
  type: string;
  location: string;
  address?: string;
  degree: string;
  major: string;
  gpa?: number;
  status: "Planning" | "Ongoing" | "Stopped" | "Finished";
  start_period: Date;
  finish_period?: Date;
  description?: string[];
  latitude?: number;
  longitude?: number;
}

export interface ExperienceItem {
  id: string;
  type: string;
  title: string;
  location: string;
  address?: string;
  status: "Planning" | "Ongoing" | "Stopped" | "Finished";
  start_period: Date;
  finish_period?: Date;
  description?: string[];
  latitude?: number;
  longitude?: number;
}

export interface CertificateItem {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  file: string;
}

export interface ExpertiseItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  projects: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  type: string;
  image: string;
  gallery?: string[];
  start_period: string;
  finish_period: string;
  description: string;
  tags?: string[];
  technology?: string[];
  repository?: string;
  repository_type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: any;
}

export interface RepositoryItem {
  id: string;
  portfolio_id: string;
  label: string;
  icon?: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  portfolio_id: string;
  title: string;
  description?: string;
}

export interface CaseStudyItem {
  id: string;
  portfolio_id: string;
  role: string;
  responsibles: string[];
  problems: string[];
  goal: string[];
  benefits: string[];
  progress: string[];
  challenges: string[];
  lessons: string[];
  results: string[];
  video?: string;
}

export interface DiagramCSItem {
  id: string;
  case_study_id: string;
  context?: string;
  dfd_0?: string;
  pdm?: string;
}

export interface SolutionCSItem {
  id: string;
  case_study_id: string;
  title: string;
  context: string;
  visual?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  type: string;
  image: string;
  gallery?: string[]; // NEW
  start_period: string;
  finish_period?: string;
  status: string;
  description: string;
  delay_reason?: string; // NEW
  resume_date?: string; // NEW
  tags?: string[];
  technology?: string[];
  source_code?: string;
  is_private?: boolean; // NEW
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: any;
}

export interface FeatureProjectItem {
  // NEW
  id: string;
  project_id: string;
  title: string;
  description?: string;
  progress: number;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  tags?: string[];
  summary: string;
  image?: string;
  content: string;
  is_featured: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: any;
}

export interface TestimonyItem {
  id: string;
  name: string;
  role: string;
  content: string;
}
