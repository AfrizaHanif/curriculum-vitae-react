import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface ChallengesSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function ChallengesSection({
  caseStudy,
}: ChallengesSectionProps) {
  return caseStudy?.challenges ? (
    <div>
      <p>
        Dari proyek yang telah saya kerjakan, terdapat tantangan yang saya alami
        {caseStudy.lessons && caseStudy.lessons.length > 0 && (
          <span> dan pembelajaran yang saya dapatkan</span>
        )}
        :
      </p>
      {caseStudy.challenges && caseStudy.challenges.length > 0 && (
        <div id="challenge-challenge">
          <h5>Tantangan</h5>
          <ol>
            {caseStudy.challenges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
      {caseStudy.lessons && caseStudy.lessons.length > 0 && (
        <div id="challenge-lessons">
          <h5>Pembelajaran</h5>
          <ol>
            {caseStudy.lessons.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  ) : (
    <p className="text-muted">Belum ada tantangan dan pembelajaran.</p>
  );
}
