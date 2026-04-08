import AppLayout from "@/components/layouts/layout";
import {
  portfolioItems,
  repositoryItems,
  featureItems,
  caseStudyItems,
} from "@/lib/data/portfolioData";
import {
  PortfolioItem,
  RepositoryItem,
  FeatureItem,
  CaseStudyItem,
} from "@/types/customs/data-type";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { DropdownItem } from "@/types/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import PortfolioDetail from "./portfolio-detail";
import ErrorToast from "@/components/home/error-toast";
import { resolveAssetUrl } from "@/lib/assets";

export async function generateStaticParams() {
  try {
    const portfolios = await fetchLaravel<PortfolioItem[]>("api/portfolios", {
      skipAuth: true,
    });
    // Ensure build succeeds even if API is offline
    const data =
      portfolios && Array.isArray(portfolios) && portfolios.length > 0
        ? portfolios
        : portfolioItems;

    return data.flatMap((p) => [{ slug: p.slug }, { slug: String(p.id) }]);
  } catch (error) {
    console.error("Error generating static params for portfolio:", error);
    return portfolioItems.flatMap((p) => [
      { slug: p.slug },
      { slug: String(p.id) },
    ]);
  }
}

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [portfolioResult] = await Promise.all([
    fetchWithFallback<PortfolioItem>(
      fetchLaravel<PortfolioItem>(`api/portfolios/${slug}`, {
        next: { revalidate: 3600, tags: ["portfolio", `portfolio-${slug}`] },
        skipAuth: true,
      }),
      portfolioItems.find(
        (p) => p.slug === slug || String(p.id) === slug,
      ) as PortfolioItem,
      "Gagal memuat detail Portofolio.",
      (data) => !!data && typeof data === "object" && "slug" in data,
    ),
  ]);

  const item = portfolioResult.data;
  if (!item) return { title: "Portfolio Item Not Found" };
  return {
    title: { absolute: `${item.title} | Muhammad Afriza Hanif` },
    description: item.description,
    alternates: { canonical: `/portfolio/${item.slug}` },
  };
}

export default async function SelectedPortfolio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [
    portfolioResult,
    listResult,
    repoResult,
    featureResult,
    caseStudyResult,
  ] = await Promise.all([
    fetchWithFallback<PortfolioItem>(
      fetchLaravel<PortfolioItem>(`api/portfolios/${slug}`, {
        next: { revalidate: 3600, tags: ["portfolio", `portfolio-${slug}`] },
        skipAuth: true,
      }),
      portfolioItems.find(
        (p) => p.slug === slug || String(p.id) === slug,
      ) as PortfolioItem,
      "Gagal memuat detail Portofolio terbaru.",
      (data) => !!data && typeof data === "object" && "slug" in data,
    ),
    fetchWithFallback<PortfolioItem[]>(
      fetchLaravel<PortfolioItem[]>("api/portfolios", {
        next: { revalidate: 3600, tags: ["portfolio"] },
        skipAuth: true,
      }),
      portfolioItems,
      "Gagal memuat daftar Portofolio.",
      (data) => Array.isArray(data),
    ),
    // Fetch Related Repositories
    fetchWithFallback<RepositoryItem[]>(
      fetchLaravel<RepositoryItem[]>("api/repositories", {
        next: { revalidate: 3600, tags: ["repository"] },
        skipAuth: true,
      }),
      repositoryItems,
      "Gagal memuat data Repositori.",
      (data) => Array.isArray(data),
    ),
    // Fetch Related Features
    fetchWithFallback<FeatureItem[]>(
      fetchLaravel<FeatureItem[]>("api/features", {
        next: { revalidate: 3600, tags: ["feature"] },
        skipAuth: true,
      }),
      featureItems,
      "Gagal memuat data Fitur.",
      (data) => Array.isArray(data),
    ),
    // Fetch Related Case Studies
    fetchWithFallback<CaseStudyItem[]>(
      fetchLaravel<CaseStudyItem[]>("api/case-studies", {
        next: { revalidate: 3600, tags: ["case-study"] },
        skipAuth: true,
      }),
      caseStudyItems,
      "Gagal memuat data Studi Kasus.",
      (data) => Array.isArray(data),
    ),
  ]);

  const item = portfolioResult.data;
  const allPortfolios = listResult.data;
  const fetchErrorMessage =
    portfolioResult.error ||
    listResult.error ||
    repoResult.error ||
    featureResult.error;

  if (!item) return notFound();

  // Redirect to canonical slug if the request was for an ID or a non-canonical case
  if (slug !== item.slug) {
    redirect(`/portfolio/${encodeURIComponent(item.slug)}`);
  }

  // Item of repository
  const filteredRepositoryItems: DropdownItem[] = repoResult.data
    .filter((repo) => repo?.portfolio_id === item.id)
    .map((repo) => ({ ...repo, newTab: true })) as DropdownItem[];

  // Check if case study exists
  const hasCaseStudy = caseStudyResult.data.some(
    (cs) => cs.portfolio_id === item.id,
  );

  // Get Data of Feature
  const filteredFeatures = featureResult.data.filter(
    (feature) => feature.portfolio_id === item.id,
  );

  // Resolve image for JSON-LD and Metadata consistency
  const resolvedImage =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item.image as any)?.src || (item.image ? resolveAssetUrl(item.image) : "");

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Project",
        name: item.title,
        description: item.description,
        url: `https://afrizahanif.com/portfolio/${item.slug}`,
        image: resolvedImage,
        keywords: `${item.category}, ${item.subcategory}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://afrizahanif.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://afrizahanif.com/portfolio",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `https://afrizahanif.com/portfolio/${item.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron - Can remain in Server Component if it is static display */}
      <JumbotronTitle
        title={item.title}
        description={`${item.category} - ${item.subcategory}`}
        className="my-3"
      />

      {/* Client Side Interactive Content */}
      <PortfolioDetail
        item={item}
        allItems={allPortfolios}
        repositoryItems={filteredRepositoryItems}
        hasCaseStudy={hasCaseStudy}
        features={filteredFeatures}
      />

      {/* Error Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
