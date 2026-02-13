"use client";

import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/next/next-image";
import { blogItems } from "@/lib/data/blogData";
import { formatDate, sortItemsByDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import jumbotronImage from "../../../assets/images/jumbotron/blog.jpg";
import Card from "@/components/ui/bootstrap/card";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/lib/bootstrap-types";

export default function Blog() {
  console.info("This page are being sorted from newest post");

  // Get Random Post
  const [featuredPost] = useState(() => {
    const randomIndex = Math.floor(Math.random() * blogItems.length);
    return blogItems[randomIndex];
  });
  console.log("Featured Post: " + featuredPost.title);

  // Item of Featured Portfolio (Heroes)
  const heroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Lihat",
      color: "primary",
      href: `/blog/${featuredPost.slug}`,
    },
  ];

  return (
    <AppLayout>
      {/* Jumbotron */}
      <Jumbotron
        backgroundColor="secondary"
        textColor="dark"
        className="my-3"
        img={jumbotronImage.src}
      >
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Blog</h1>
            <p className="col-md-8 fs-4">
              Pikiran, tutorial, dan cerita dari perjalanan pengembangan saya.
            </p>
          </div>
        </div>
      </Jumbotron>

      {/* Featured Post Heroes */}
      <Heroes
        type="responsive"
        title={featuredPost.title}
        img={featuredPost.image}
        buttonItem={heroesButtonItem}
      >
        {featuredPost.summary}
      </Heroes>

      {/* List of Posts (Cards) */}
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
    </AppLayout>
  );
}
