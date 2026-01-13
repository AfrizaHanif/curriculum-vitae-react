import { Metadata } from "next";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Pikiran, tutorial, dan cerita dari perjalanan pengembangan saya",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
