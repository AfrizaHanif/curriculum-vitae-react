"use client";

import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import { useState, useEffect } from "react";
import myPhoto from "@/assets/images/profile.jpg";
import { portfolioItems } from "@/lib/data/portfolioData";
import Link from "next/link";
import jumbotronImage from "../assets/images/jumbotron/home.jpg";
import { profileItem } from "@/lib/data/profileData";
import { educationItems } from "@/lib/data/resumeData";
import { isEducationData } from "@/lib/customs/type-guards";
import Button from "@/components/ui/bootstrap/button";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/lib/bootstrap-types";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";

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

  // Content Area
  return (
    <AppLayout>
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

      {/* Sub Jumbotron */}
      <div className="row align-items-md-stretch gy-4">
        <div className="col-md-6">
          <Jumbotron backgroundColor="tertiary" className="h-100">
            <h2>My Portfolio</h2>
            <p>
              Jelajahi kumpulan proyek terbaru saya yang menampilkan keahlian
              saya dalam pengembangan dan desain web. Lihat bagaimana saya
              mengubah ide menjadi kenyataan.
            </p>
            <Link href={"/portfolio"}>
              <Button color="secondary" outline>
                View Portfolio
              </Button>
            </Link>
          </Jumbotron>
        </div>
        <div className="col-md-6">
          <Jumbotron backgroundColor="tertiary" className="h-100">
            <h2>Let&apos;s Connect</h2>
            <p>
              Punya proyek dalam pikiran, pertanyaan, atau sekadar ingin
              menyapa? Saya senang mendengarnya. Mari kita ciptakan sesuatu yang
              hebat bersama-sama.
            </p>
            <Link href={"/contact"}>
              <Button color="secondary" outline>
                Contact Me
              </Button>
            </Link>
          </Jumbotron>
        </div>
      </div>
    </AppLayout>
  );
}
