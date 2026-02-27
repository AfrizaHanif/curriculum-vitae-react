import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface GoalBenefitsSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function GoalBenefitsSection({
  caseStudy,
}: GoalBenefitsSectionProps) {
  // Check if goal and benefits available
  return caseStudy?.goal && caseStudy?.benefits ? (
    <>
      {/* Check if goal more than 1 */}
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
      {/* Benefits */}
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
