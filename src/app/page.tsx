"use client";

import AppLayout from "@/components/layouts/layout";
import { useState, useEffect } from "react";
import myPhoto from "@/assets/images/profile.jpg";
import { portfolioItems } from "@/lib/data/portfolioData";
import jumbotronImage from "../assets/images/jumbotron/home.jpg";
import { profileItem } from "@/lib/data/profileData";
import { educationItems } from "@/lib/data/resumeData";
import { isEducationData } from "@/lib/customs/type-guards";
import { HeroesButtonItem } from "@/lib/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";

// Get Data from JSON (Single)
const userProfile = profileItem[0];

export default function Home() {
  // Local loading state
  // const isLoading = useLoading();
  // State to hold the randomly selected portfolio item
  const [featuredPortfolio, setFeaturedPortfolio] = useState(portfolioItems[0]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeaturedPortfolio(
      portfolioItems[Math.floor(Math.random() * portfolioItems.length)],
    );
  }, []);
  console.log("Featured Portfolio: ", featuredPortfolio.title);

  // Get latest education data
  const latestEducation = educationItems
    .flatMap((item) => item.data || []) // Use flatMap if the item inside of object as data
    .filter(isEducationData)
    .sort((a, b) => {
      const dateA = a.finish_period
        ? a.finish_period.getTime()
        : new Date().getTime();
      const dateB = b.finish_period
        ? b.finish_period.getTime()
        : new Date().getTime();
      return dateB - dateA;
    })[0];
  console.log(
    "Latest Education: " + latestEducation.degree + " " + latestEducation.major,
  );

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // Show the Loading component while state is initializing
  // if (isLoading) {
  //   return <Loading />;
  // }

  // Item of Featured Portfolio (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/portfolio/${featuredPortfolio.slug}`,
    },
  ];

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
        image: myPhoto.src,
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
        iconImg={myPhoto.src}
      />

      {/* Featured Portfolio Heroes */}
      <Heroes
        type="responsive"
        title={truncateText(featuredPortfolio.title, 40)}
        img={featuredPortfolio.image}
        buttonItem={heroesButtonItem}
      >
        {truncateText(featuredPortfolio.description, 150)}
      </Heroes>

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
