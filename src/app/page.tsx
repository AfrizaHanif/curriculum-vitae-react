import AppLayout from "@/components/layouts/layout";
// import myPhoto from "@/images/Profile.jpg";
import { portfolioItems } from "@/lib/data/portfolioData";
import jumbotronImage from "../assets/images/jumbotron/home.jpg";
import { profileItem } from "@/lib/data/profileData";
import { educationItems } from "@/lib/data/resumeData";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import FeaturedHeroesInteractive from "@/components/home/featured-heroes-interactive";
import { fetchLaravel } from "@/lib/laravel";
import { PortfolioItem, ProfileItem } from "@/types/customs/data-type";
import ErrorToast from "@/components/home/error-toast";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { resolveAssetUrl } from "@/lib/assets";

export default async function Home() {
  // Local loading state
  // const isLoading = useLoading();

  // --- Data Fetching ---
  // 1. Fetch Profile and Portfolio from Laravel in parallel using the reusable helper
  const [profileResult, portfolioResult] = await Promise.all([
    fetchWithFallback<ProfileItem[]>(
      fetchLaravel<ProfileItem[]>("api/profiles", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      profileItem, // Static Fallback
      "Gagal memuat data Profil terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
    fetchWithFallback<PortfolioItem[]>(
      fetchLaravel<PortfolioItem[]>("api/portfolios", {
        next: { revalidate: 3600, tags: ["portfolio"] },
        skipAuth: true,
      }),
      portfolioItems, // Static Fallback
      "Gagal memuat data Portfolio terbaru.", // Error Message
      (data) => Array.isArray(data), // Relaxed Validator
    ),
  ]);

  // 2. Assign Data (Will use fallback if API failed)
  // Access [0] safely because fallback `profileItem` is also an array
  const userProfile = profileResult.data[0];
  const displayedPortfolioItems = portfolioResult.data;

  // 3. Consolidated Error Message
  const fetchErrorMessage = profileResult.error || portfolioResult.error;

  // 3. Calculate latest education
  // Moved inside component so it runs on request time
  const latestEducation = [...educationItems].sort((a, b) => {
    const dateA = a.finish_period
      ? a.finish_period.getTime()
      : new Date().getTime();
    const dateB = b.finish_period
      ? b.finish_period.getTime()
      : new Date().getTime();
    return dateB - dateA;
  })[0];

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat Portfolio",
      color: "primary",
      href: `/portfolio`,
    },
    {
      label: "Hubungi Saya",
      color: "secondary",
      href: `/contact`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: userProfile.fullname,
        jobTitle: userProfile.status,
        url: "https://afrizahanif.com",
        image: resolveAssetUrl(userProfile.photo),
      },
      {
        "@type": "WebSite",
        url: "https://afrizahanif.com",
        name: `${userProfile.fullname} - Portfolio`,
        description: "Sebuah Website Portofolio dari Muhammad Afriza Hanif",
        publisher: {
          "@type": "Person",
          name: userProfile.fullname,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://afrizahanif.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  // Content Area
  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Error Toast Notification */}
      <ErrorToast message={fetchErrorMessage} />

      {/* Welcome Jumbotron */}
      <JumbotronTitle
        title={userProfile.fullname}
        description={
          latestEducation
            ? `${userProfile.status} | ${latestEducation.degree} | ${latestEducation.major}`
            : "Fresh Graduate | Sarjana 1 | Sistem Informasi"
        }
        backgroundImg={jumbotronImage.src}
        urlButton="/profile"
        labelButton="Ketahui Lebih Lanjut"
        iconImg={resolveAssetUrl(userProfile.photo)}
      />

      {/* Featured Portfolio Heroes */}
      {displayedPortfolioItems.length > 0 && (
        <FeaturedHeroesInteractive items={displayedPortfolioItems} />
      )}

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Siap untuk Langkah Selanjutnya?"
          buttonItem={nextPageHeroesButtonItem}
          icon="signpost-split-fill"
        >
          Jelajahi kumpulan proyek saya atau hubungi saya jika Anda punya
          pertanyaan atau ide proyek
        </Heroes>
      </section>
    </AppLayout>
  );
}
