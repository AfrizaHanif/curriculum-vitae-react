import { caseStudyItems } from "@/lib/data/portfolioData";
import { resolveAssetUrl } from "@/lib/assets";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface ResultsSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function ResultsSection({ caseStudy }: ResultsSectionProps) {
  // NOTE: Video of result are optional
  return caseStudy?.results ? (
    <>
      <p>
        Pada proyek ini telah menghasilkan hasil akhir yang telah saya kerjakan.
        Terdapat poin-poin hasil akhir yang ada:
      </p>
      {/* Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <ol>
          {caseStudy.results.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
      {/* Video */}
      {caseStudy?.video && (
        <>
          <p>
            Dari hasil tersebut, terdapat video yang dapat dilihat mengenai
            hasil proyek yang telah saya kerjakan:
          </p>
          <video
            controls
            preload="metadata"
            className="w-100 rounded border shadow-sm"
            style={{ maxHeight: "500px", backgroundColor: "#000" }}
          >
            <source src={resolveAssetUrl(caseStudy.video)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </>
  ) : (
    <p className="text-muted">Belum ada hasil akhir.</p>
  );
}
