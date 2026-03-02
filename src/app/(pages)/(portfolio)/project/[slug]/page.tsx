import AppLayout from "@/components/layouts/layout";
import BreadcrumbSetter from "@/components/utility/breadcrumb-setter";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { projectItems } from "@/lib/data/portfolioData";
import DetailItem from "@/components/ui/customs/detail-item";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import SlugNavigation from "@/components/ui/customs/slug-navigation";

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

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Project",
        name: item.title,
        description: item.description,
        url: `https://afrizahanif.com/project/${item.slug}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: (item.image as any)?.src || item.image,
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
        title={item.title}
        description={`${item.category} - ${item.subcategory}`}
        className="my-3"
      />

      {/* Contents */}
      <main className="row justify-content-center g-2">
        <article className="col-12 col-lg-8 order-2 order-lg-1">
          {/* Gallery */}
          {/* <ProjectGallery
            mainImage={item.image}
            images={item.gallery}
            altText={item.title}
          /> */}
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
        </article>
        <aside className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            {/* Menu button */}
            <SlugNavigation
              items={projectItems}
              item={item}
              backURL="project"
            />
            {/* Details */}
            <DetailItem type={"Project"} item={item} />
          </div>
        </aside>
      </main>
    </AppLayout>
  );
}
