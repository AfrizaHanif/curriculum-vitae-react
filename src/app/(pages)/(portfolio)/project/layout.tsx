import { Metadata } from "next";

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
