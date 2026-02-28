import { Metadata } from "next";
import { ReactNode } from "react";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Portfolio Utama",
  description:
    "Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan web dan desain",
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
