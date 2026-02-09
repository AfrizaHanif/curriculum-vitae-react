import { HeaderItem } from "@/lib/bootstrap-types";

export const headerItems: HeaderItem[] = [
  { label: "Home", icon: "home", href: "/" },
  {
    label: "Profil",
    icon: "about",
    subItems: [
      { label: "Tentang Saya", icon: "profile", href: "/profile" },
      { label: "Peralatan Saya", icon: "setup", href: "/setup" },
    ],
  },
  { label: "Resume", icon: "resume", href: "/resume" },
  { label: "Keahlian", icon: "expertise", href: "/expertise" },
  // {
  //   label: "Keahlian",
  //   icon: "expertise",
  //   subItems: [
  //     { label: "Ringkasan Keahlian", icon: "expertise", href: "/expertise" },
  //     { label: "Layanan Tersedia", icon: "service", href: "/service" },
  //   ],
  // },
  {
    label: "Portfolio",
    icon: "portfolio",
    subItems: [
      { label: "Portfolio Utama", icon: "portfolio", href: "/portfolio" },
      { label: "Proyek Lainnya", icon: "project", href: "/project" },
    ],
  },
  { label: "Blog", icon: "blog", href: "/blog" },
  { label: "Testimoni", icon: "testimony", href: "/testimony" },
  { label: "Kontak", icon: "contact", href: "/contact" },
];
