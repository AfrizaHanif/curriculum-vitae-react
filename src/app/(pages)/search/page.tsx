"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import CardGroup from "@/components/ui/bootstrap/card-group";
import NextImage from "@/components/ui/react/next-image";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import { portfolioItems } from "@/lib/data/portfolioData";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import jumbotronImage from "../../../assets/images/jumbotron/search.jpg";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Filter items based on title, description, or category
  const filteredItems = portfolioItems.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <>
      <Jumbotron
        backgroundColor="secondary"
        textColor="dark"
        className="my-3"
        img={jumbotronImage.src}
      >
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Hasil Pencarian</h1>
            <p className="col-md-8 fs-4">
              Mencari portfolio dari kata: <strong>{query}</strong>
            </p>
          </div>
        </div>
      </Jumbotron>

      {filteredItems.length > 0 ? (
        <CardGroup>
          {filteredItems.map((item) => (
            <CardBlank key={item.id} fullHeight insideGroup>
              <div className="card-header text-uppercase small fw-semibold text-body-secondary">
                {item.category}
              </div>
              <NextImage
                src={item.image}
                alt={item.title}
                className="card-img-top rounded-0"
                width={500}
                height={300}
                style={{
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  height: "auto",
                  objectPosition: "top",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
              <div className="card-footer text-body-secondary">
                <div className="row justify-content-center align-items-center g-2">
                  <div className="col-8 small">
                    {formatDateRange(item.start_period, item.finish_period)}
                  </div>
                  <div className="col-4 text-end">
                    <Link href={`/portfolio/${item.slug}`}>
                      <Button color="primary" size="sm" stretchedLink>
                        Lihat
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardBlank>
          ))}
        </CardGroup>
      ) : (
        <div className="text-center py-5">
          <h3>No results found</h3>
          <p>Try adjusting your search query.</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </AppLayout>
  );
}
