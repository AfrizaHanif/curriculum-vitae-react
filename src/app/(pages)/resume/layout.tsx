import { Metadata } from "next";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Resume",
  description: "Pelajari ringkatan latar belakang profesional saya",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
