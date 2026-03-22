"use client";

import AppLayout from "@/components/layouts/layout";
import { formatDate, sortItems } from "@/lib/utils";
import { useState, useEffect } from "react";
import jumbotronImage from "../../../assets/images/jumbotron/blog.jpg";
import Card from "@/components/ui/bootstrap/card";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/lib/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import { getAllBlogItems } from "@/lib/data/services";

export default function Blog() {
  console.info("This page are being sorted from newest post");

  // Get all project items from the data service
  const allPosts = getAllBlogItems();

  // Get Random Post
  // Initialize with the first item to ensure server/client match during hydration
  const [featuredPost, setFeaturedPost] = useState(allPosts[0]);

  useEffect(() => {
    // Randomize on the client side after mount
    const randomIndex = Math.floor(Math.random() * allPosts.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeaturedPost(allPosts[randomIndex]);
  }, [allPosts]);

  console.log("Featured Post: " + featuredPost.title);

  // Item of Featured Portfolio (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/blog/${featuredPost.slug}`,
    },
  ];

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
      <section aria-label="Featured Post">
        <Heroes
          type="responsive"
          title={featuredPost.title}
          img={featuredPost.image}
          buttonItem={heroesButtonItem}
        >
          {featuredPost.summary}
        </Heroes>
      </section>

      {/* List of Posts (Cards) */}
      <section aria-label="Daftar Artikel">
        <PaginatedList
          items={sortItems(allPosts, {
            sortOrder: "newest",
            titleKey: "title",
            primaryDateKey: "date",
          })}
          itemsPerPage={9}
          renderItem={(item) => (
            <Card
              key={item.id}
              header={formatDate(item.date)}
              image={item.image}
              footer={`Oleh ${item.author}`}
              url={`/blog/${item.slug}`}
              buttonName="Lihat"
              insideGroup
              fullHeight
              clickable
            >
              <h5 className="card-title">{item.title}</h5>
              <p>{item.summary}</p>
            </Card>
          )}
        />
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
    </AppLayout>
  );
}
