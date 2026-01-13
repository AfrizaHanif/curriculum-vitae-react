import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { blogItems } from "@/lib/data/blogData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NextImage from "@/components/ui/react/next-image";
import SanitizedContent from "@/components/ui/react/sanitized-content";
import Link from "next/link";
import Button from "@/components/ui/bootstrap/button";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import ShareButton from "@/components/ui/customs/share-button";
import { formatDate } from "@/lib/utils";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

export function generateStaticParams() {
  return blogItems.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Descriptions of page (Using Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = blogItems.find((p) => p.slug === slug || p.id === slug);
  if (!item) return { title: "Post Not Found" };
  return {
    title: item.title,
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
  const item = blogItems.find((p) => p.id === slug || p.slug === slug);
  if (!item) return notFound();

  // If the incoming param is actually an id, redirect to the canonical slug URL
  if (item && slug === item.id) {
    // Use a server-side redirect so search engines see a single canonical URL
    // next/navigation redirect is sufficient here since middleware already handles blog ids as well
    // but keeping this ensures correct behavior even without middleware
    const { redirect } = await import("next/navigation");
    redirect(`/blog/${encodeURIComponent(item.slug)}`);
  }

  // Navigation's Function
  const currentIndex = blogItems.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? blogItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < blogItems.length - 1 ? blogItems[currentIndex + 1] : null;

  return (
    <AppLayout>
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <Jumbotron backgroundColor="secondary" className="my-3">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold">{item.title}</h1>
          <p className="fs-4">{item.summary}</p>
        </div>
      </Jumbotron>
      {/* Contents */}
      <div className="row justify-content-center g-2">
        <div className="col-8">
          {/* Image */}
          <div
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
          </div>
          {/* Description */}
          <div className="mt-4">
            <SanitizedContent className="lead" content={item.content} />
          </div>
        </div>
        <div className="col-4">
          {/* Navigation */}
          <div className="pb-3">
            <div className="row justify-content-center g-2">
              <div className="col">
                <Link href={`/blog`}>
                  <Button color="secondary" outline>
                    <i className="bi bi-arrow-return-left pe-2"></i>
                    Kembali
                  </Button>
                </Link>
              </div>
              <div className="col text-end">
                <ButtonGroup role={"group"} arialabel={"port-nav"}>
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
          </div>
          {/* Details */}
          <CardBlank className="p-3">
            <h5 className="card-title mb-3">Detail Post</h5>
            <dl className="row">
              <dt className="col-4 mb-2 text-body-secondary">Penulis</dt>
              <dd className="col-8">{item.author}</dd>
              <dt className="col-4 mb-2 text-body-secondary">Tanggal Rilis</dt>
              <dd className="col-8">{formatDate(item.date)}</dd>
              {item.tags && item.tags.length > 0 && (
                <>
                  <dt className="col-12 mb-2 text-body-secondary">Tags</dt>
                  <dd className="col-12 d-flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="badge text-bg-secondary">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </>
              )}
            </dl>
            <div className="d-grid gap-1">
              <ShareButton
                title={item.title}
                text={`Check out this project: ${item.title}`}
              >
                <i className="bi bi-share-fill me-2"></i>
                Bagikan
              </ShareButton>
            </div>
          </CardBlank>
        </div>
      </div>
    </AppLayout>
  );
}
