import { Metadata } from "next";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Spesifikasi Website",
  description:
    "Detail teknis, teknologi, dan alat bantu di balik pembuatan website ini",
};

export default function ColophonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
