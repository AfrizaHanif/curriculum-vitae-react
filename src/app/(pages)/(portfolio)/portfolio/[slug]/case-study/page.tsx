import React from "react";
import AppLayout from "@/components/layouts/layout";
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
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import CaseStudyNavigation from "./case-study-navigation";
import JsonLd from "@/components/json-ld";

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
  // Diagram
  const diagramSubSections = [
    diagram?.context && { id: "context-diagram", title: "Context Diagram" },
    diagram?.dfd_0 && { id: "dfd-0", title: "DFD Level 0" },
    diagram?.pdm && { id: "pdm", title: "PDM" },
  ].filter((s): s is { id: string; title: string } => !!s);
  // Process
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
  // Challenge
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

  // Explanation of section (Accordion Item)
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

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Studi Kasus: ${item.title}`,
        description: `Studi kasus mendalam mengenai proyek ${item.title}.`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: (item.image as any)?.src || item.image,
        author: {
          "@type": "Person",
          name: "Muhammad Afriza Hanif",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://afrizahanif.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://afrizahanif.com/portfolio",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: `https://afrizahanif.com/portfolio/${item.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Studi Kasus",
            item: `https://afrizahanif.com/portfolio/${item.slug}/case-study`,
          },
        ],
      },
    ],
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Initialize ScrollSpy for the body */}
      <ScrollSpy targetId="case-study-nav" />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Studi Kasus"
        description={item.title}
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Menu button */}
      <nav className="mb-3" aria-label="Case study page navigation">
        {/* Back to portfolio */}
        <Link href={`/portfolio/${item.slug}`}>
          <Button color="secondary" className="mb-2 me-2" outline>
            <i className="bi bi-arrow-return-left pe-2"></i>
            Kembali
          </Button>
        </Link>
        {/* Explanation */}
        <Button
          color="secondary"
          className="mb-2 me-2"
          dataToggle="offcanvas"
          dataTarget="offcanvas-help-cs"
        >
          <i className="bi bi-question-lg pe-2"></i>
          Penjelasan
        </Button>
        {/* List of content (Only for mobile / tablet device) */}
        <Button
          color="primary"
          className="d-lg-none mb-2"
          dataToggle="offcanvas"
          dataTarget="offcanvas-casestudy-nav"
        >
          <i className="bi bi-list pe-2"></i>
          Daftar Isi
        </Button>
      </nav>

      {/* ScrollSpy Area */}
      <main className="row">
        {/* Navigations */}
        <aside className="col-lg-4 d-none d-lg-block border-end pe-lg-3">
          <div
            className="sticky-lg-top"
            style={{
              top: "1rem",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
            }}
          >
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
        </aside>
        {/* Contents */}
        <article className="col-12 col-lg-8">
          <div
            className="scrollspy-example-2 ps-lg-3"
            tabIndex={0}
            role="document"
          >
            {caseStudySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-3"
                style={{ scrollMarginTop: "4rem" }}
                aria-labelledby={`${section.id}-heading`}
              >
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                <SectionContent
                  sectionId={section.id}
                  sectionTitle={section.title}
                  item={item}
                  caseStudy={caseStudy}
                  diagram={diagram}
                  solution={solution}
                />
              </section>
            ))}
          </div>
        </article>
      </main>

      {/* Offcanvas */}
      {/* Explanation */}
      <Offcanvas
        id="offcanvas-help-cs"
        title={"Penjelasan Studi Kasus"}
        position={"end"}
      >
        <Accordion id={"accordion-help-cs"} items={helpAccordionItem} />
      </Offcanvas>
      {/* List of content */}
      <Offcanvas
        id="offcanvas-casestudy-nav"
        title="Daftar Isi"
        position="start"
        className="d-lg-none"
      >
        <CaseStudyNavigation sections={caseStudySections} />
      </Offcanvas>
    </AppLayout>
  );
}
