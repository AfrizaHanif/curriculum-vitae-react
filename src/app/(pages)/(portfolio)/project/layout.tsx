import { Metadata } from "next";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Proyek Lainnya",
  description: "Pelajari proyek-proyek yang sedang dikerjakan oleh saya",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
