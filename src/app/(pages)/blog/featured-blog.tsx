"use client";

import { useState, useEffect } from "react";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { BlogItem } from "@/types/customs/data-type";

interface FeaturedBlogProps {
  items: BlogItem[];
}

export default function FeaturedBlog({ items }: FeaturedBlogProps) {
  // Get Random Post
  // Initialize with the first item to ensure server/client match during hydration
  const [featuredPost, setFeaturedPost] = useState(items[0]);

  useEffect(() => {
    // Randomize on the client side after mount
    const randomIndex = Math.floor(Math.random() * items.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeaturedPost(items[randomIndex]);
  }, [items]);

  // Item of Featured Post (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/blog/${featuredPost.slug}`,
    },
  ];

  return (
    <Heroes
      type="responsive"
      title={featuredPost.title}
      img={featuredPost.image}
      buttonItem={heroesButtonItem}
    >
      {featuredPost.summary}
    </Heroes>
  );
}
