import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import ShareButton from "@/components/ui/customs/share-button";
import { portfolioItems, repositoryItems } from "@/lib/data/portfolioData";
import { formatDateRange } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import Link from "next/link";
import ButtonGroup from "@/components/ui/bootstrap/button-group";
import Dropdown from "@/components/ui/bootstrap/dropdown";
import { DropdownItem } from "@/lib/bootstrap-types";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

// (IMPORTANT) This is exclusively for page with dynamic ID / Slug
export function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug })); // pre-render pages using slug
}

// Title of portfolio into web title
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) return { title: "Portfolio Item Not Found" };

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/portfolio/${item.slug}` },
  };
}

export default async function SelectedPortfolio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return notFound();

  // Navigation's Function
  const currentIndex = portfolioItems.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < portfolioItems.length - 1
      ? portfolioItems[currentIndex + 1]
      : null;

  //
  const filteredRepositoryItems: DropdownItem[] = repositoryItems.filter(
    (repo) => repo?.portfolio_id === item.id
  ) as DropdownItem[];

  return (
    <AppLayout>
      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <Jumbotron backgroundColor="secondary" className="my-3">
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold">{item.title}</h1>
          <p className="fs-4">
            {item.category} - {item.subcategory}
          </p>
        </div>
      </Jumbotron>
      {/* Contents */}
      <div className="row justify-content-center g-2">
        <div className="col-8">
          {/* Gallery */}
          <ProjectGallery
            mainImage={item.image}
            images={item.gallery}
            altText={item.title}
          />
          {/* Description */}
          <div className="mt-4">
            <h2 className="lh-1">Deskripsi Proyek</h2>
            <p className="lead">{item.description}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            {/* Navigation */}
            <div className="pb-3">
              <div className="row justify-content-center g-2">
                <div className="col">
                  <Link href={`/portfolio`}>
                    <Button color="secondary" outline>
                      <i className="bi bi-arrow-return-left pe-2"></i>
                      Kembali
                    </Button>
                  </Link>
                </div>
                <div className="col text-end">
                  <ButtonGroup role={"group"} arialabel={"port-nav"}>
                    {prevItem ? (
                      <Link href={`/portfolio/${prevItem.slug}`}>
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
                      <Link href={`/portfolio/${nextItem.slug}`}>
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
              <h5 className="card-title mb-3">Detail Proyek</h5>
              <dl className="row">
                <dt className="col-4 mb-2 text-body-secondary">Kategori</dt>
                <dd className="col-8">{item.category}</dd>
                <dt className="col-4 mb-2 text-body-secondary">Tipe</dt>
                <dd className="col-8">{item.type}</dd>
                <dt className="col-4 mb-2 text-body-secondary">Periode</dt>
                <dd className="col-8">
                  {formatDateRange(item.start_period, item.finish_period)}
                </dd>
                {item.tags && item.tags.length > 0 && (
                  <>
                    <dt className="col-12 mb-2 text-body-secondary">
                      Tags & Teknologi
                    </dt>
                    <dd className="col-12 d-flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="badge text-bg-secondary">
                          {tag}
                        </span>
                      ))}
                      {item.technology.map((tech) => (
                        <span key={tech} className="badge text-bg-info">
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </>
                )}
              </dl>
              <div className="d-grid gap-1">
                {/* <Button
                  as="a"
                  href={item.repository || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2"
                  color="secondary"
                  disabled={!item.repository}
                >
                  Lihat Repository
                </Button> */}
                <Dropdown
                  color="secondary"
                  items={filteredRepositoryItems}
                  className="mb-2"
                  newTab
                  fullWidth
                >
                  Lihat Repository
                </Dropdown>
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
      </div>
    </AppLayout>
  );
}
