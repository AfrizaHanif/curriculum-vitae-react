import { Metadata } from "next";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan web dan desain",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
