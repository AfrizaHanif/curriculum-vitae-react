import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import { projectItems } from "@/lib/data/portfolioData";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

// (IMPORTANT) This is exclusively for page with dynamic ID / Slug
export function generateStaticParams() {
  // Pre-render pages for both slugs and IDs to handle redirects
  return projectItems.flatMap((p) => [{ slug: p.slug }, { slug: p.id }]);
}

// Set Props for metadata
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Description of Page (Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = projectItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
  if (!item) return { title: "Project Item Not Found" };
  return {
    title: { absolute: `${item.title} | Muhammad Afriza Hanif` },
    description: item.description,
    alternates: { canonical: `/project/${item.slug}` },
  };
}

export default async function SelectedProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = projectItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
  console.log("Item of selected project: ", item);
  if (!item) return notFound();

  if (slug !== item.slug) {
    permanentRedirect(`/project/${encodeURIComponent(item.slug)}`);
  }

  // Navigation's Function
  const currentIndex = projectItems.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? projectItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < projectItems.length - 1
      ? projectItems[currentIndex + 1]
      : null;

  return (
    <AppLayout>
      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <JumbotronTitle
        title={item.title}
        description={`${item.category} - ${item.subcategory}`}
        className="my-3"
      />

      {/* Contents */}
      <div className="row justify-content-center g-2">
        <div className="col-12 col-lg-8 order-2 order-lg-1">
          {/* Gallery */}
          {/* <ProjectGallery
            mainImage={item.image}
            images={item.gallery}
            altText={item.title}
          /> */}
          {/* Description */}
          <div className="mt-4">
            <h2 className="lh-1">Deskripsi Proyek</h2>
            <p className="lead">{item.description}</p>
          </div>
        </div>
        <div className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            <div className="pb-3">
              <div className="row justify-content-center g-2">
                {/* Back to list of projects */}
                <div className="col">
                  <Link href={`/project`}>
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
                      <Link href={`/project/${prevItem.slug}`}>
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
                      <Link href={`/project/${nextItem.slug}`}>
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
            <DetailItem type={"Project"} item={item} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
