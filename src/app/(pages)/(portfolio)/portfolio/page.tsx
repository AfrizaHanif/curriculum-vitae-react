import AppLayout from "@/components/layouts/layout";
import { portfolioItems } from "@/lib/data/portfolioData";
import { PortfolioItem } from "@/types/customs/data-type";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import jumbotronImage from "../../../../assets/images/jumbotron/portfolio.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import PortfolioList from "./portfolio-list";
import ErrorToast from "@/components/home/error-toast";

export default async function Portfolio() {
  const [portfolioResult] = await Promise.all([
    fetchWithFallback<PortfolioItem[]>(
      fetchLaravel<PortfolioItem[]>("api/portfolios", {
        next: { revalidate: 3600, tags: ["portfolio"] },
        skipAuth: true,
      }),
      portfolioItems, // Static Fallback
      "Gagal memuat data Portofolio terbaru.", // Error Message
      (data) => Array.isArray(data), // Validator
    ),
  ]);

  const displayedPortfolioItems = portfolioResult.data;
  const fetchErrorMessage = portfolioResult.error;

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Hubungi Saya",
      color: "primary",
      href: `/contact`,
    },
    {
      label: "Buka Proyek Lainnya",
      color: "secondary",
      href: `/project`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio Utama | Muhammad Afriza Hanif",
    description:
      "Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan web dan desain.",
    url: "https://afrizahanif.com/portfolio",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: displayedPortfolioItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://afrizahanif.com/portfolio/${item.slug}`,
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
        title="Portfolio Utama"
        description="Kumpulan proyek yang menampilkan keahlian saya dalam pengembangan web dan desain."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Interactive List */}
      {displayedPortfolioItems.length > 0 ? (
        <PortfolioList items={displayedPortfolioItems} />
      ) : (
        <div className="text-center py-5">
          <p className="lead">Belum ada portofolio untuk ditampilkan.</p>
        </div>
      )}

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Hubungi Saya"
          buttonItem={nextPageHeroesButtonItem}
          icon="contact"
        >
          Tertarik dengan portfolio saya? Jangan ragu untuk menghubungi saya,
          atau lihat proyek-proyek yang sedang berjalan
        </Heroes>
      </section>

      {/* Error Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
