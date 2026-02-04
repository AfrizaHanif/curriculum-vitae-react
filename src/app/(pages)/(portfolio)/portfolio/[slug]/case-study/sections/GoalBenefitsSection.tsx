import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface GoalBenefitsSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function GoalBenefitsSection({
  caseStudy,
}: GoalBenefitsSectionProps) {
  return caseStudy?.goal && caseStudy?.benefits ? (
    <>
      {Array.isArray(caseStudy.goal) && caseStudy.goal.length > 1 ? (
        <>
          <p>Saya memiliki tujuan dilakukannya proyek ini. Tujuannya adalah:</p>
          <ol>
            {caseStudy.goal.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <p>
            Terdapat juga manfaat yang diperoleh setelah saya melakukan proyek
            ini:
          </p>
        </>
      ) : (
        <p>
          Saya memiliki tujuan dilakukannya proyek ini. Tujuannya adalah{" "}
          <b>{caseStudy.goal}</b>. Terdapat juga manfaat yang diperoleh setelah
          saya melakukan proyek ini:
        </p>
      )}
      <ol>
        {caseStudy.benefits.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </>
  ) : (
    <p className="text-muted">Belum ada Tujuan.</p>
  );
}
