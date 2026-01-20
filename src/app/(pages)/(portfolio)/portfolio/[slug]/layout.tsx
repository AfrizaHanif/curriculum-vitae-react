import { Metadata } from "next";
import { portfolioItems } from "@/lib/data/portfolioData";

// INFO: Different than project and blog page, this page are the result from splitted page.tsx. This layout is a server component

// (IMPORTANT) This is exclusively for page with dynamic ID / Slug
export function generateStaticParams() {
  // Pre-render pages for both slugs and IDs to handle redirects
  return portfolioItems.flatMap((p) => [{ slug: p.slug }, { slug: p.id }]);
}

// Defines the props for the layout. `params` is a Promise in Next.js 15+,
// but we type it as a union to support both sync and async access if needed.
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Description of Page (Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug); // Extract the slug
  const item = portfolioItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  ); // Find portfolio item by slug (case-insensitive) or ID

  // Check if item are not found
  if (!item) return { title: "Portfolio Item Not Found" };

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/portfolio/${item.slug}` },
  };
}

export default function SelectedPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
