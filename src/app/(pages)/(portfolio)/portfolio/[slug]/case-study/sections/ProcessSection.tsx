import ProjectGallery from "@/components/ui/customs/project-gallery";
import {
  portfolioItems,
  caseStudyItems,
  solutionCSItems,
} from "@/lib/data/portfolioData";
import NextImageModal from "@/components/ui/customs/next-image-modal";

type PortfolioItem = (typeof portfolioItems)[number];
type CaseStudyItem = (typeof caseStudyItems)[number];
type SolutionItem = (typeof solutionCSItems)[number];

interface ProcessSectionProps {
  item: PortfolioItem;
  caseStudy?: CaseStudyItem;
  solution?: SolutionItem[];
}

export default function ProcessSection({
  item,
  caseStudy,
  solution,
}: ProcessSectionProps) {
  if (
    (caseStudy?.progress && caseStudy.progress.length > 0) ||
    (solution && solution.length > 0)
  ) {
    return (
      <div>
        <p>
          Pada masalah-masalah yang ada, saya telah menemukan{" "}
          {caseStudy?.progress && caseStudy.progress.length > 0 && (
            <span>proses yang telah saya lakukan serta </span>
          )}{" "}
          solusi yang telah saya temukan
        </p>
        {caseStudy?.progress && caseStudy.progress.length > 0 && (
          <div id="process-progress" style={{ scrollMarginTop: "4rem" }}>
            <h5>Proses</h5>
            <ol>
              {caseStudy.progress.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        )}
        {solution && solution.length > 0 && (
          <div id="process-solution" style={{ scrollMarginTop: "4rem" }}>
            <h5>Solusi</h5>
            <ol>
              {solution.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <br />
                  {item.visual && (
                    <>
                      <NextImageModal
                        src={item.visual}
                        alt="Context Diagram"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        className="my-2 img-fluid border rounded shadow-sm"
                      />
                      <br />
                    </>
                  )}
                  {item.context}
                </li>
              ))}
            </ol>
          </div>
        )}
        {item.image && (
          <div id="process-image" style={{ scrollMarginTop: "4rem" }}>
            <h5>Galeri Hasil Proyek</h5>
            <ProjectGallery
              mainImage={item.image}
              images={item.gallery}
              altText={item.title}
            />
          </div>
        )}
      </div>
    );
  }
  return null;
}
