import AppLayout from "@/components/layouts/layout";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import SlugNavigation from "@/components/ui/customs/slug-navigation";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { formatDate } from "@/lib/utils";
import { fetchLaravel } from "@/lib/laravel";
import { FeatureProjectItem, ProjectItem } from "@/types/customs/data-type";
import { featureProjectItems, projectItems } from "@/lib/data/portfolioData";
import ErrorToast from "@/components/home/error-toast";
import { resolveAssetUrl } from "@/lib/assets";
import ProjectGallery from "@/components/ui/customs/project-gallery";
import { techIcons } from "@/lib/data/techIcons";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import ProgressBar from "@/components/ui/bootstrap/progress-bar";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import Alert from "@/components/ui/bootstrap/alert";

// NOTE: This component / page are using async await to make the params are to be resolved for metadata. Do not modify / remove unless you know the risk

// (IMPORTANT) This is exclusively for page with dynamic ID / Slug
export async function generateStaticParams() {
  try {
    const projects = await fetchLaravel<ProjectItem[]>("api/projects", {
      skipAuth: true,
    });
    // Ensure build succeeds even if API is offline
    const data =
      projects && Array.isArray(projects) && projects.length > 0
        ? projects
        : projectItems;

    // Pre-render pages for both slugs and IDs to handle redirects
    return data.flatMap((p) => [{ slug: p.slug }, { slug: String(p.id) }]);
  } catch (error) {
    console.error("Error generating static params for project:", error);
    return projectItems.flatMap((p) => [
      { slug: p.slug },
      { slug: String(p.id) },
    ]);
  }
}

// Set Props for metadata
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Description of Page (Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const [projectResult] = await Promise.all([
    fetchWithFallback<ProjectItem>(
      fetchLaravel<ProjectItem>(`api/projects/${slug}`, {
        next: { revalidate: 3600, tags: ["project", `project-${slug}`] },
        skipAuth: true,
      }),
      projectItems.find(
        (p) => p.slug === slug || String(p.id) === slug,
      ) as ProjectItem,
      "Gagal memuat detail Proyek.",
      (data) => !!data && typeof data === "object" && "slug" in data,
    ),
  ]);

  const item = projectResult.data;
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

  const [projectResult, listResult, featureResult] = await Promise.all([
    fetchWithFallback<ProjectItem>(
      fetchLaravel<ProjectItem>(`api/projects/${resolvedParams.slug}`, {
        next: {
          revalidate: 3600,
          tags: ["project", `project-${resolvedParams.slug}`],
        },
        skipAuth: true,
      }),
      projectItems.find(
        (p) =>
          p.slug === resolvedParams.slug ||
          String(p.id) === resolvedParams.slug,
      ) as ProjectItem,
      "Gagal memuat detail Proyek terbaru.",
      (data) => !!data && typeof data === "object" && "slug" in data,
    ),
    fetchWithFallback<ProjectItem[]>(
      fetchLaravel<ProjectItem[]>("api/projects", {
        next: { revalidate: 3600, tags: ["project"] },
        skipAuth: true,
      }),
      projectItems,
      "Gagal memuat daftar Proyek.",
      (data) => Array.isArray(data),
    ),
    fetchWithFallback<FeatureProjectItem[]>(
      fetchLaravel<FeatureProjectItem[]>("api/feature-projects", {
        next: { revalidate: 3600, tags: ["feature-project"] },
        skipAuth: true,
      }),
      featureProjectItems,
      "Gagal memuat data Fitur.",
      (data) => Array.isArray(data),
    ),
  ]);

  const item = projectResult.data;
  const projectList = listResult.data;
  const fetchErrorMessage =
    projectResult.error || listResult.error || featureResult.error;

  if (!item) return notFound();

  if (decodeURIComponent(resolvedParams.slug) !== item.slug) {
    permanentRedirect(`/project/${encodeURIComponent(item.slug)}`);
  }

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Hubungi Saya",
      color: "primary",
      href: `/contact`,
    },
    {
      label: "Lihat Proyek Lain",
      color: "secondary",
      href: `/project`,
      outline: true,
    },
  ];

  // Get Data of Feature
  const filteredFeatures = featureResult.data.filter(
    (feature) => feature.project_id === item.id,
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
        url: `https://afrizahanif.com/project/${item.slug}`,
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
            name: "Project",
            item: "https://afrizahanif.com/project",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `https://afrizahanif.com/project/${item.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Set Title into Breadcrumb */}
      <BreadcrumbSetter title={item.title} />

      {/* Jumbotron */}
      <JumbotronTitle
        title={`${item.title}`}
        description={`${item.category} - ${item.subcategory}`}
        className="my-3"
      />

      {/* Contents */}
      <main className="row justify-content-center g-2">
        <article className="col-12 col-lg-8 order-2 order-lg-1">
          {/* Gallery */}
          <section id="project-gallery">
            <ProjectGallery
              mainImage={item.image}
              images={item.gallery || []}
              altText={item.title}
            />
          </section>

          {/* Description */}
          <section
            id="project-description"
            aria-labelledby="project-description-heading"
            className="mt-4"
          >
            <h2 id="project-description-heading" className="lh-1">
              Deskripsi Proyek
            </h2>
            <p className="lead">{item.description}</p>
          </section>

          {/* Planned Features */}
          {filteredFeatures && filteredFeatures.length > 0 && (
            <section id="planned-features" className="mt-4">
              <h3 className="h4 mb-3">Rencana Fitur</h3>
              <ul className="list-group list-group-flush">
                {filteredFeatures.map(
                  (feature: FeatureProjectItem, index: number) => (
                    <li
                      key={index}
                      className="list-group-item bg-transparent px-0 d-flex align-items-start"
                    >
                      <i
                        className={`bi ${
                          feature.progress === 100
                            ? "bi-check-circle-fill text-success"
                            : item.status === "Delayed"
                              ? "bi-exclamation-triangle-fill text-warning"
                              : "bi-clock-history text-primary"
                        } me-2 mt-1`}
                      ></i>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-semibold">{feature.title}</span>
                          {feature.progress !== undefined && (
                            <small className="text-body-secondary fw-medium">
                              {feature.progress}%
                            </small>
                          )}
                        </div>
                        {feature.description && (
                          <p className="mb-2 small text-body-secondary">
                            {feature.description}
                          </p>
                        )}
                        {feature.progress !== undefined && (
                          <ProgressBar
                            percentNow={feature.progress}
                            color={
                              feature.progress === 100
                                ? "success"
                                : item.status === "Delayed"
                                  ? "warning"
                                  : "primary"
                            }
                            stripped={
                              feature.progress > 0 && feature.progress < 100
                            }
                            animated={
                              feature.progress > 0 && feature.progress < 100
                            }
                          />
                        )}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </section>
          )}

          {/* Delay Reason Explanation */}
          {item.status === "Delayed" && item.delay_reason && (
            <section id="delay-reason-explanation" className="mt-4">
              <div className="alert alert-info border-0 shadow-sm rounded-3">
                <h4 className="h5 alert-heading d-flex align-items-center">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Catatan Status: Ditunda
                </h4>
                <p className="mb-0 small">{item.delay_reason}</p>
                {item.resume_date && (
                  <div className="mt-2 pt-2 border-top border-info-subtle small fw-medium">
                    <i className="bi bi-calendar-event me-2"></i>
                    Estimasi Dilanjutkan: {formatDate(item.resume_date)}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Explanation for private projects */}
          {!!item.is_private && (
            <section
              id="private-project-explanation"
              aria-labelledby="private-project-explanation-heading"
              className="mt-4"
            >
              <Alert
                color="warning"
                withIcon
                customIcon="lock-fill"
                customLabel="Private Project"
                labelled
              >
                <p className="mb-0 small text-body-secondary">
                  Karena proyek ini bersifat pribadi atau dikembangkan untuk
                  klien tertentu, kode sumber pada proyek ini tidak dapat
                  diakses secara publik. Halaman ini bertujuan untuk memberikan
                  gambaran umum mengenai arsitektur dan teknologi yang
                  diimplementasikan.
                </p>
              </Alert>
            </section>
          )}

          {/* Technology Used */}
          {item.technology && item.technology.length > 0 && (
            <section id="technology-used" className="mt-4">
              <h3 className="h4 mb-3">Teknologi yang Digunakan</h3>
              <CardGroup cardPerRow={4}>
                {item.technology.map((tech, index) => (
                  <Card key={index} insideGroup>
                    <div className="d-flex flex-column align-items-center">
                      {techIcons[tech] && (
                        <div
                          style={{ width: "40px", height: "24px" }}
                          className="mb-4"
                        >
                          {techIcons[tech]}
                        </div>
                      )}
                      <span className="small fw-semibold">{tech}</span>
                    </div>
                  </Card>
                ))}
              </CardGroup>
            </section>
          )}
        </article>

        <aside className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            {projectList.length > 0 ? (
              <SlugNavigation
                items={projectList}
                item={item}
                backURL="project"
              />
            ) : (
              <div className="text-center py-3">
                <p className="text-muted">Tidak ada proyek lain.</p>
              </div>
            )}
            {/* Details */}
            <DetailItem type={"Project"} item={item} shareable />
          </div>
        </aside>
      </main>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Tertarik dengan Proyek Ini?"
          buttonItem={nextPageHeroesButtonItem}
          icon="project"
        >
          Jika Anda memiliki pertanyaan atau ingin berdiskusi tentang proyek
          ini, jangan ragu untuk menghubungi saya. Atau kembali ke daftar proyek
          lainnya
        </Heroes>
      </section>

      {/* Error Toast Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
