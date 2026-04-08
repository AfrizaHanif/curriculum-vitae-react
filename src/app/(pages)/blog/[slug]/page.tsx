import AppLayout from "@/components/layouts/layout";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import NextImage from "@/components/ui/next/next-image";
import SanitizedContent from "@/components/ui/react/sanitized-content";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import SlugNavigation from "@/components/ui/customs/slug-navigation";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import { BlogItem } from "@/types/customs/data-type";
import { blogItems } from "@/lib/data/blogData";
import ErrorToast from "@/components/home/error-toast";
import { resolveAssetUrl } from "@/lib/assets";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

export async function generateStaticParams() {
  try {
    const posts = await fetchLaravel<BlogItem[]>("api/blogs", {
      skipAuth: true,
    });
    // For 'output: export', we must ensure generateStaticParams returns paths
    // even if the API is unavailable during build time.
    const data =
      posts && Array.isArray(posts) && posts.length > 0 ? posts : blogItems;

    // Pre-render pages for both slugs and IDs to handle redirects
    return data.flatMap((p) => [{ slug: p.slug }, { slug: String(p.id) }]);
  } catch (error) {
    console.error("Error generating static params for blog:", error);
    // Fallback to local data to ensure the build succeeds
    return blogItems.flatMap((p) => [{ slug: p.slug }, { slug: String(p.id) }]);
  }
}

// Set Props for metadata
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Descriptions of page (Using Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  const [blogResult] = await Promise.all([
    fetchWithFallback<BlogItem>(
      fetchLaravel<BlogItem>(`api/blogs/${resolvedParams.slug}`, {
        next: {
          revalidate: 3600,
          tags: ["blog", `blog-${resolvedParams.slug}`],
        },
        skipAuth: true,
      }),
      blogItems.find(
        (b) =>
          b.slug === resolvedParams.slug ||
          String(b.id) === resolvedParams.slug,
      ) as BlogItem,
      "Gagal memuat detail Blog.",
      (data) => !!data && typeof data === "object" && "slug" in data, // Validator
    ),
  ]);

  const item = blogResult.data;
  if (!item) return { title: "Post Not Found" };
  return {
    title: { absolute: `${item.title} | Muhammad Afriza Hanif` },
    description: item.summary,
    alternates: { canonical: `/blog/${item.slug}` },
  };
}

export default async function SelectedPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // `params` may be a Promise in some Next.js versions; await it before use
  const resolvedParams = await params;

  const [blogResult, listResult] = await Promise.all([
    fetchWithFallback<BlogItem>(
      fetchLaravel<BlogItem>(`api/blogs/${resolvedParams.slug}`, {
        next: {
          revalidate: 3600,
          tags: ["blog", `blog-${resolvedParams.slug}`],
        },
        skipAuth: true,
      }),
      blogItems.find(
        (b) =>
          b.slug === resolvedParams.slug ||
          String(b.id) === resolvedParams.slug,
      ) as BlogItem,
      "Gagal memuat detail Blog terbaru.",
      (data) => !!data && typeof data === "object" && "slug" in data, // Validator
    ),
    fetchWithFallback<BlogItem[]>(
      fetchLaravel<BlogItem[]>("api/blogs", {
        next: { revalidate: 3600, tags: ["blog"] },
        skipAuth: true,
      }),
      blogItems,
      "Gagal memuat daftar Blog.",
      (data) => Array.isArray(data),
    ),
  ]);

  const item = blogResult.data;
  const blogList = listResult.data;
  const fetchErrorMessage = blogResult.error || listResult.error;

  if (!item) return notFound();

  if (decodeURIComponent(resolvedParams.slug) !== item.slug) {
    permanentRedirect(`/blog/${encodeURIComponent(item.slug)}`);
  }

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Baca Artikel Lain",
      color: "primary",
      href: `/blog`,
    },
    {
      label: "Tentang Penulis",
      color: "secondary",
      href: `/profile`,
      outline: true,
    },
  ];

  // Resolve image for JSON-LD and Metadata consistency
  const resolvedImage =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item.image as any)?.src || (item.image ? resolveAssetUrl(item.image) : "");

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: item.title,
        description: item.summary,
        image: resolvedImage,
        url: `https://afrizahanif.com/blog/${item.slug}`,
        author: {
          "@type": "Person",
          name: "Muhammad Afriza Hanif",
        },
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
            name: "Blog",
            item: "https://afrizahanif.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `https://afrizahanif.com/blog/${item.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <JumbotronTitle
        title={item.title}
        description={item.summary}
        className="my-3"
      />

      {/* Contents */}
      <main className="row justify-content-center g-2">
        <article className="col-12 col-lg-8 order-2 order-lg-1">
          <figure
            className="position-relative mb-3"
            style={{ aspectRatio: "16 / 9" }}
          >
            <NextImage
              src={resolveAssetUrl(item.image)}
              alt={item.title}
              className="rounded-3"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </figure>
          <section id="blog-content" aria-label="Blog content" className="mt-4">
            <SanitizedContent className="lead" content={item.content} />
          </section>
        </article>
        <aside className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            <SlugNavigation items={blogList} item={item} backURL="blog" />
            {/* Details */}
            <DetailItem type={"Blog"} item={item} />
          </div>
        </aside>
      </main>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Suka dengan Artikel Ini?"
          buttonItem={nextPageHeroesButtonItem}
          icon="blog"
        >
          Jangan lewatkan artikel menarik lainnya di blog saya, atau pelajari
          lebih lanjut tentang penulisnya
        </Heroes>
      </section>

      {/* Error Toast Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
