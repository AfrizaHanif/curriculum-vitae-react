"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import CardGroup from "@/components/ui/bootstrap/card-group";
import NextImage from "@/components/ui/next/next-image";
import { portfolioItems } from "@/lib/data/portfolioData";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import jumbotronImage from "../../../assets/images/jumbotron/search.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";

function SearchResults() {
  // Retrieve query parameters from the url
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  console.log("Search query: ", query);

  // Filter items based on title, description, or category
  const filteredItems = portfolioItems.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  });
  console.log("Items matches with query: ", filteredItems.length);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Hasil Pencarian: ${query} | Muhammad Afriza Hanif`,
    url: `https://afrizahanif.com/search?q=${query}`,
  };

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Hasil Pencarian"
        description={
          <>
            Mencari portfolio dari kata: <strong>{query}</strong>
          </>
        }
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Result of search (Cards) */}
      <section aria-label="Search Results">
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
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <AppLayout>
      {/* Use Suspense for isolate the dynamic part of search page */}
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </AppLayout>
  );
}
