import AppLayout from "@/components/layouts/layout";
import { sortItems } from "@/lib/utils";
import jumbotronImage from "../../../assets/images/jumbotron/blog.jpg";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import FeaturedBlog from "./featured-blog";
import BlogList from "./blog-list";
import { BlogItem } from "@/types/customs/data-type";
import { fetchLaravel } from "@/lib/laravel";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { blogItems } from "@/lib/data/blogData";
import ErrorToast from "@/components/home/error-toast";

export default async function Blog() {
  const [blogResult] = await Promise.all([
    fetchWithFallback<BlogItem[]>(
      fetchLaravel<BlogItem[]>("api/blogs", {
        next: { revalidate: 3600, tags: ["blog"] },
        skipAuth: true,
      }),
      blogItems, // Static Fallback
      "Gagal memuat data Blog terbaru.", // Error Message
      (data) => Array.isArray(data), // Relaxed Validator: allows empty list if API is healthy
    ),
  ]);

  const fetchErrorMessage = blogResult.error;
  const allPosts = blogResult.data;

  console.info("This page are being sorted from newest post");

  // Sort items on server side as it is static for this page
  const sortedPosts = sortItems(allPosts, {
    sortOrder: "newest",
    titleKey: "title",
    primaryDateKey: "date",
  });

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Tentang Saya",
      color: "primary",
      href: `/about`,
    },
    {
      label: "Hubungi Saya",
      color: "secondary",
      href: `/contact`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data for Blog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Muhammad Afriza Hanif",
    description: "Tulisan dan artikel mengenai teknologi dan pengalaman saya.", // Adjust description
    url: "https://afrizahanif.com/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://afrizahanif.com/blog/${item.slug}`,
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
        title="Blog"
        description="Pikiran, tutorial, dan cerita dari perjalanan pengembangan saya."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Featured Post Heroes */}
      {allPosts.length > 0 && (
        <section aria-label="Featured Post">
          <FeaturedBlog items={allPosts} />
        </section>
      )}

      {/* List of Posts (Cards) */}
      <section aria-label="Daftar Artikel">
        {allPosts.length > 0 ? (
          <BlogList items={sortedPosts} />
        ) : (
          <div className="text-center py-5">
            <p className="lead">Belum ada artikel yang diterbitkan saat ini.</p>
          </div>
        )}
      </section>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Pelajari tentang Saya"
          buttonItem={nextPageHeroesButtonItem}
          icon="about"
        >
          Suka dengan tulisan saya? Pelajari lebih lanjut tentang saya atau
          hubungi saya untuk diskusi
        </Heroes>
      </section>

      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
