import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface RoleSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function RoleSection({ caseStudy }: RoleSectionProps) {
  return caseStudy?.role ? (
    <>
      <p>
        Saya mengerjakan proyek ini sebagai <b>{caseStudy.role}</b>{" "}
        {caseStudy?.responsibles && caseStudy.responsibles.length > 0 && (
          <span>
            {" "}
            dan memiliki tanggung jawab yang harus saya lakukan pada proyek ini:
          </span>
        )}
      </p>
      {caseStudy?.responsibles && caseStudy.responsibles.length > 0 && (
        <ol>
          {caseStudy.responsibles.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
    </>
  ) : (
    <p className="text-muted">Belum ada role.</p>
  );
}
