import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
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
          <DetailItem type={"Blog"} item={item} />
        </div>
      </div>
    </AppLayout>
  );
}
