"use client";

import AppLayout from "@/components/layouts/layout";
import { blogItems } from "@/lib/data/blogData";
import { formatDate, sortItemsByDate } from "@/lib/utils";
import { useState, useEffect } from "react";
import jumbotronImage from "../../../assets/images/jumbotron/blog.jpg";
import Card from "@/components/ui/bootstrap/card";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/lib/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

export default function Blog() {
  console.info("This page are being sorted from newest post");

  // Get Random Post
  // Initialize with the first item to ensure server/client match during hydration
  const [featuredPost, setFeaturedPost] = useState(blogItems[0]);

  useEffect(() => {
    // Randomize on the client side after mount
    const randomIndex = Math.floor(Math.random() * blogItems.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeaturedPost(blogItems[randomIndex]);
  }, []);

  console.log("Featured Post: " + featuredPost.title);

  // Item of Featured Portfolio (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/blog/${featuredPost.slug}`,
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
      itemListElement: blogItems.map((item, index) => ({
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
          items={sortItemsByDate(blogItems)}
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
    </AppLayout>
  );
}
