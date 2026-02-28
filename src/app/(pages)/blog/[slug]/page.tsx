import AppLayout from "@/components/layouts/layout";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { blogItems } from "@/lib/data/blogData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NextImage from "@/components/ui/next/next-image";
import SanitizedContent from "@/components/ui/react/sanitized-content";
import Link from "next/link";
import Button from "@/components/ui/bootstrap/button";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

export function generateStaticParams() {
  // Pre-render pages for both slugs and IDs to handle redirects
  return blogItems.flatMap((p) => [{ slug: p.slug }, { slug: p.id }]);
}

// Set Props for metadata
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Descriptions of page (Using Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = blogItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
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
  const slug = decodeURIComponent(resolvedParams.slug); // support id or slug in the URL
  const item = blogItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
  console.log("Item of selected post of blog: ", item);
  if (!item) return notFound();

  if (slug !== item.slug) {
    const { redirect } = await import("next/navigation");
    redirect(`/blog/${encodeURIComponent(item.slug)}`);
  }

  // Navigation's Function
  const currentIndex = blogItems.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? blogItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < blogItems.length - 1 ? blogItems[currentIndex + 1] : null;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: item.title,
        description: item.summary,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: (item.image as any)?.src || item.image,
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
              src={item.image}
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
            <nav className="pb-3" aria-label="Blog post navigation">
              <div className="row justify-content-center g-2">
                {/* Back to list of posts */}
                <div className="col">
                  <Link href={`/blog`}>
                    <Button color="secondary" outline>
                      <i className="bi bi-arrow-return-left pe-2"></i>
                      Kembali
                    </Button>
                  </Link>
                </div>
                {/* Navigation */}
                <div className="col text-end">
                  <ButtonGroup role={"group"} arialabel={"port-nav"}>
                    {/* Previous item */}
                    {prevItem ? (
                      <Link href={`/blog/${prevItem.slug}`}>
                        <Button
                          color="secondary"
                          style={{
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}
                          outline
                        >
                          <i className="bi bi-arrow-left pe-2"></i>
                          Prev
                        </Button>
                      </Link>
                    ) : (
                      <Button color="secondary" outline disabled>
                        <i className="bi bi-arrow-left pe-2"></i>
                        Prev
                      </Button>
                    )}
                    {/* Next item */}
                    {nextItem ? (
                      <Link href={`/blog/${nextItem.slug}`}>
                        <Button
                          color="secondary"
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                          }}
                          outline
                        >
                          Next
                          <i className="bi bi-arrow-right ps-2"></i>
                        </Button>
                      </Link>
                    ) : (
                      <Button color="secondary" outline disabled>
                        Next
                        <i className="bi bi-arrow-right ps-2"></i>
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </div>
            </nav>
            {/* Details */}
            <DetailItem type={"Blog"} item={item} />
          </div>
        </aside>
      </main>
    </AppLayout>
  );
}
