import AppLayout from "@/components/layouts/layout";
import Alert from "@/components/ui/bootstrap/alert";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import { portfolioItems } from "@/lib/data/portfolioData";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

export function generateStaticParams() {
  // Pre-render pages for both slugs and IDs to handle redirects
  return portfolioItems.flatMap((p) => [{ slug: p.slug }, { slug: p.id }]);
}

export const metadata: Metadata = {
  title: "Studi Kasus",
};

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);
  const item = portfolioItems.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug,
  );
  console.log("Item of selected portfolio (Case Study): ", item);
  if (!item) return notFound();

  if (slug !== item.slug) {
    permanentRedirect(`/portfolio/${encodeURIComponent(item.slug)}/case-study`);
  }

  return (
    <AppLayout>
      {/* Jumbotron */}
      <Jumbotron backgroundColor="secondary" className="my-3">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Studi Kasus</h1>
            <p className="col-md-8 fs-4">{item.title}</p>
          </div>
        </div>
      </Jumbotron>
      {/* Alert (Might to be removed after it's fully functional) */}
      <Alert color={"info"}>
        Halaman ini sedang dalam pengembangan. Kemungkinan akan terupdate tanpa
        pemberitahuan lebih lanjut.
      </Alert>
    </AppLayout>
  );
}
