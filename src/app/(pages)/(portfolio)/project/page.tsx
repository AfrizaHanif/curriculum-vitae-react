import AppLayout from "@/components/layouts/layout";
import { projectItems } from "@/lib/data/portfolioData";
import { ProjectItem } from "@/types/customs/data-type";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import jumbotronImage from "../../../../assets/images/jumbotron/project.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import ProjectList from "./project-list";
import ErrorToast from "@/components/home/error-toast";

export default async function Project() {
  const [projectResult] = await Promise.all([
    fetchWithFallback<ProjectItem[]>(
      fetchLaravel<ProjectItem[]>("api/projects", {
        next: { revalidate: 3600, tags: ["project"] },
        skipAuth: true,
      }),
      projectItems, // Static Fallback
      "Gagal memuat data Proyek terbaru.", // Error Message
      (data) => Array.isArray(data), // Validator
    ),
  ]);

  const allProjects = projectResult.data;
  const fetchErrorMessage = projectResult.error;

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Portofolio Utama",
      color: "primary",
      href: `/portfolio`,
    },
    {
      label: "Lihat Resume",
      color: "secondary",
      href: `/resume`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Proyek Lainnya | Muhammad Afriza Hanif",
    description: "Pelajari proyek-proyek yang sedang dikerjakan oleh saya",
    url: "https://afrizahanif.com/project",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allProjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://afrizahanif.com/project/${item.slug}`,
        name: item.title,
      })),
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Proyek Lainnya"
        description="Pelajari proyek-proyek yang sedang dikerjakan oleh saya"
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Interactive List */}
      {allProjects.length > 0 ? (
        <ProjectList items={allProjects} />
      ) : (
        <div className="text-center py-5">
          <p className="lead">Belum ada proyek untuk ditampilkan.</p>
        </div>
      )}

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Lihat Portfolio"
          buttonItem={nextPageHeroesButtonItem}
          icon="portfolio"
        >
          Lihat proyek unggulan saya di halaman portofolio utama atau pelajari
          latar belakang saya
        </Heroes>
      </section>

      {/* Error Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
