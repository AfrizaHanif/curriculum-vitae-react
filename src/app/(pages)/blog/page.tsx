"use client";

import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/react/next-image";
import { blogItems } from "@/lib/data/blogData";
import { formatDate, sortItemsByDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import jumbotronImage from "../../../assets/images/jumbotron/blog.jpg";
import Card from "@/components/ui/bootstrap/card";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";

export default function Blog() {
  console.info("This page are being sorted from newest post");

  // Get Random Post
  const [featuredPost] = useState(() => {
    const randomIndex = Math.floor(Math.random() * blogItems.length);
    return blogItems[randomIndex];
  });
  console.log("Featured Post: " + featuredPost.title);

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
      <div className="container col-xxl-8 px-4 py-1">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            {/* <img
              src="bootstrap-themes.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            /> */}
            <NextImage
              src={featuredPost.image}
              className="d-block mx-lg-auto img-fluid rounded-3"
              alt={featuredPost.title}
              width="700"
              height="500"
              loading="lazy"
              style={{
                aspectRatio: "16 / 9",
                objectFit: "cover",
                objectPosition: "top",
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              {featuredPost.title}
            </h1>
            <p className="lead">{featuredPost.summary}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link href={`/blog/${featuredPost.slug}`}>
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Baca Selengkapnya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
