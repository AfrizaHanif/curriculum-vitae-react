import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface ResultsSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function ResultsSection({ caseStudy }: ResultsSectionProps) {
  return caseStudy?.result ? (
    <>
      <p>
        Pada proyek ini telah menghasilkan hasil akhir yang telah saya kerjakan.
        Terdapat poin-poin hasil akhir yang ada:
      </p>
      {caseStudy.result && caseStudy.result.length > 0 && (
        <ol>
          {caseStudy.result.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
      {caseStudy?.video && (
        <>
          <p>
            Dari hasil tersebut, terdapat video yang dapat dilihat mengenai
            hasil proyek yang telah saya kerjakan:
          </p>
          <p>VIDEO AREA</p>
        </>
      )}
    </>
  ) : (
    <p className="text-muted">Belum ada hasil akhir.</p>
  );
}
