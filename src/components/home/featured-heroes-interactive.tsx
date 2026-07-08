"use client";

import { useState, useEffect } from "react";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { PortfolioItem } from "@/types/customs/data-type";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

interface FeaturedHeroesInteractiveProps {
  items: PortfolioItem[];
}

export default function FeaturedHeroesInteractive({
  items,
}: FeaturedHeroesInteractiveProps) {
  // State to hold the randomly selected portfolio item
  // Initialize with the first item to match server rendering (hydration)
  const [featuredPortfolio, setFeaturedPortfolio] = useState(items[0]);

  useEffect(() => {
    // Randomize only on client side after mount
    setFeaturedPortfolio(items[Math.floor(Math.random() * items.length)]);
  }, [items]);

  // Item of Featured Portfolio (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/portfolio/${featuredPortfolio.slug}`,
    },
  ];

  return (
    <Heroes
      type="responsive"
      title={truncateText(featuredPortfolio.title, 40)}
      img={featuredPortfolio.image}
      buttonItem={heroesButtonItem}
    >
      {truncateText(featuredPortfolio.description, 150)}
    </Heroes>
  );
}
