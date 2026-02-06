import React from "react";
import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import {
  getAllPortfolioItems,
  getCaseStudy,
  getDiagram,
  getPortfolioItem,
  getSolutions,
} from "@/lib/data/services";
import { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import ScrollSpy from "@/components/ui/bootstrap/scrollspy";
import jumbotronImage from "@/assets/images/jumbotron/case-study.jpg";
import SectionContent from "./section-content";
import Button from "@/components/ui/bootstrap/button";
import Link from "next/link";
import Offcanvas from "@/components/ui/bootstrap/offcanvas";
import Accordion from "@/components/ui/bootstrap/accordion";

// (IMPORTANT) This is exclusively for page with dynamic ID / Slug. That include this page inside of ID / Slug
export function generateStaticParams() {
  // Pre-render pages for both slugs and IDs to handle redirects
  return getAllPortfolioItems().flatMap((p) => [
    { slug: p.slug },
    { slug: p.id },
  ]);
}

// Set Props for metadata
type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Title and Description of Page (Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getPortfolioItem(resolvedParams.slug);
  if (!item) return { title: "Portfolio Item Not Found" };
  return {
    title: { absolute: `Studi Kasus (${item.title}) | Muhammad Afriza Hanif` },
    alternates: { canonical: `/portfolio/${item.slug}/case-study` },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get Data of Portfolio (Slug)
  const resolvedParams = await params;
  const item = getPortfolioItem(resolvedParams.slug);
  console.log("Item of selected portfolio (Case Study): ", item);

  // Check if item are not found
  if (!item) return notFound();

  // Check if item are not slug (Prevent duplicate content SEO)
  const currentSlug = decodeURIComponent(resolvedParams.slug);
  if (currentSlug !== item.slug) {
    permanentRedirect(`/portfolio/${encodeURIComponent(item.slug)}/case-study`);
  }

  // Get Data of Case Study
  const caseStudy = getCaseStudy(item.id);

  if (!caseStudy) {
    return redirect(`/portfolio/${encodeURIComponent(item.slug)}`);
  }

  // Get Data of Diagram
  const diagram = getDiagram(caseStudy.id);

  // Get Data of Solution
  const solution = getSolutions(caseStudy.id);

  // Check if subsection of section are not empty
  const diagramSubSections = [
    diagram?.context && { id: "context-diagram", title: "Context Diagram" },
    diagram?.dfd_0 && { id: "dfd-0", title: "DFD Level 0" },
    diagram?.pdm && { id: "pdm", title: "PDM" },
  ].filter((s): s is { id: string; title: string } => !!s);

  const processSubSections = [
    caseStudy.progress &&
      caseStudy.progress.length > 0 && {
        id: "process-progress",
        title: "Proses",
      },
    solution &&
      solution.length > 0 && { id: "process-solution", title: "Solusi" },
    item.image && {
      id: "process-image",
      title: "Galeri Hasil Proyek",
    },
  ].filter((s): s is { id: string; title: string } => !!s);

  const challengeSubSections = [
    caseStudy.challenges &&
      caseStudy.challenges.length > 0 && {
        id: "challenge-challenge",
        title: "Tantangan",
      },
    caseStudy.lessons &&
      caseStudy.lessons.length > 0 && {
        id: "challenge-lessons",
        title: "Pembelajaran",
      },
  ].filter((s): s is { id: string; title: string } => !!s);

  // Sections of Case Study (ScrollSpy)
  const caseStudySections = [
    {
      id: "overview",
      title: "Ringkasan Proyek",
    },
    caseStudy.role && { id: "role", title: "Peran & Tanggung Jawab" },
    caseStudy.problems &&
      caseStudy.problems.length > 0 && {
        id: "problem",
        title: "Permasalahan",
      },
    caseStudy.goal &&
      caseStudy.benefits &&
      caseStudy.benefits.length > 0 && {
        id: "goal-benefits",
        title: "Tujuan dan Manfaat",
      },
    diagramSubSections.length > 0 && {
      id: "design",
      title: "Perancangan Proyek",
      subSections: diagramSubSections,
    },
    item.technology &&
      item.technology.length > 0 && {
        id: "tech-stack",
        title: "Teknologi yang Digunakan",
      },
    processSubSections.length > 0 && {
      id: "process",
      title: "Proses & Solusi",
      subSections: processSubSections,
    },
    challengeSubSections.length > 0 && {
      id: "challenges",
      title: "Tantangan & Pembelajaran",
      subSections: challengeSubSections,
    },
    ((caseStudy.result && caseStudy.result.length > 0) || item.image) && {
      id: "results",
      title: "Hasil Akhir",
    },
  ].filter(
    (
      s,
    ): s is {
      id: string;
      title: string;
      subSections?: { id: string; title: string }[];
    } => !!s,
  );

  const helpAccordionItem = [
    {
      title: "Ringkasan Proyek",
      content:
        "Pada bagian section ini merupakan penjelasan singkat mengenai proyek disertai dengan detail-detail dari proyek ini",
    },
    {
      title: "Peran & Tanggung Jawab",
      content:
        "Paga bagian section ini merupakan peran yang saya ambil selama mengerjakan proyek dan tanggung jawab yang harus saya lakukan",
    },
    {
      title: "Permasalahan",
      content:
        "Pada bagian section ini merupakan penjelasan permasalahan yang ada setelah saya melakukan observasi, wawancara, atau eksplorasi tempat",
    },
    {
      title: "Tujuan & Manfaat",
      content:
        "Pada bagian section ini merupakan penjelasan tujuan dibuatnya proyek dan manfaat yang diperoleh dari proyek ini",
    },
    {
      title: "Perancangan Proyek",
      content:
        "Pada bagian section ini merupakan penjelasan perancangan sebelum dilakukannya proyek berupa diagram (Context Diagram, DFD 0, dan PDM)",
    },
    {
      title: "Teknologi yang Digunakan",
      content:
        "Pada bagian section ini merupakan daftar teknologi yang saya gunakan untuk melakukan proyek",
    },
    {
      title: "Proses & Solusi",
      content:
        "Pada bagian section ini merupakan penjelasan proses selama saya mengerjakan proyek dan solusi yang saya dapatkan dari proyek ini",
    },
    {
      title: "Tantangan & Pembelajaran",
      content:
        "Pada bagian section ini merupakan tantangan yang saya alami saat mengerjakan proyek dan pembelajaran yang saya dapatkan dari proyek ini",
    },
    {
      title: "Hasil Akhir",
      content:
        "Pada bagian section ini merupakan hasil / kesimpulan dari proyek ini berupa poin-poin dan/atau video hasil",
    },
  ];

  return (
    <AppLayout>
      {/* Initialize ScrollSpy for the body */}
      <ScrollSpy targetId="case-study-nav" />
      {/* Jumbotron */}
      <Jumbotron
        backgroundColor="secondary"
        textColor="dark"
        className="my-3"
        img={jumbotronImage.src}
      >
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Studi Kasus</h1>
            <p className="col-md-8 fs-4">{item.title}</p>
          </div>
        </div>
      </Jumbotron>

      <div className="row">
        {/* Navigations */}
        <div className="col-4 border-end">
          <div
            className="sticky-top"
            style={{
              top: "1rem",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
            }}
          >
            <Link href={`/portfolio/${item.slug}`}>
              <Button color="secondary" className="mb-2 me-2" outline>
                <i className="bi bi-arrow-return-left pe-2"></i>
                Kembali
              </Button>
            </Link>
            <Button
              color="secondary"
              className="mb-2"
              dataToggle="offcanvas"
              dataTarget="offcanvas-help-cs"
            >
              <i className="bi bi-question-lg pe-2"></i>
              Penjelasan
            </Button>
            <nav
              id="case-study-nav"
              className="h-100 flex-column align-items-stretch"
            >
              <nav className="nav nav-pills flex-column">
                {caseStudySections.map((section) => (
                  <React.Fragment key={section.id}>
                    <a className="nav-link" href={`#${section.id}`}>
                      {section.title}
                    </a>
                    {section.subSections && (
                      <nav className="nav nav-pills flex-column">
                        {section.subSections.map((sub) => (
                          <a
                            key={sub.id}
                            className="nav-link ms-3 my-1"
                            href={`#${sub.id}`}
                          >
                            {sub.title}
                          </a>
                        ))}
                      </nav>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </nav>
          </div>
        </div>
        {/* Contents */}
        <div className="col-8">
          <div className="scrollspy-example-2" tabIndex={0}>
            {caseStudySections.map((section) => (
              <div key={section.id} id={section.id} className="mb-3">
                <h4>{section.title}</h4>
                <SectionContent
                  sectionId={section.id}
                  sectionTitle={section.title}
                  item={item}
                  caseStudy={caseStudy}
                  diagram={diagram}
                  solution={solution}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Offcanvas */}
      <Offcanvas
        id={"offcanvas-help-cs"}
        title={"Penjelasan Studi Kasus"}
        position={"end"}
      >
        <Accordion id={"accordion-help-cs"} items={helpAccordionItem} />
      </Offcanvas>
    </AppLayout>
  );
}
