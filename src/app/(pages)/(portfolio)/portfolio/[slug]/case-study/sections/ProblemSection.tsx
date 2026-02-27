import { caseStudyItems } from "@/lib/data/portfolioData";

type CaseStudyItem = (typeof caseStudyItems)[number];

interface ProblemSectionProps {
  caseStudy?: CaseStudyItem;
}

export default function ProblemSection({ caseStudy }: ProblemSectionProps) {
  // Check if problems available
  if (caseStudy?.problems) {
    return (
      <>
        <p>
          Selama mengerjakan proyek ini, saya mengidentifikasi beberapa kendala
          / masalah yang ada. Di antaranya adalah:
        </p>
        <ol>
          {caseStudy.problems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </>
    );
  }

  // Fallback
  return (
    <div>
      <p>
        Bagian ini menjelaskan tantangan utama yang dihadapi sebelum solusi
        diterapkan. Fokus pada <strong>Konteks</strong>,{" "}
        <strong>Masalah Utama</strong>, dan <strong>Dampak</strong>.
      </p>
      <ul>
        <li>
          <strong>Konteks:</strong> Jelaskan latar belakang proyek. Mengapa
          proyek ini diperlukan?
        </li>
        <li>
          <strong>Pain Points:</strong> Apa kesulitan spesifik yang dialami
          pengguna atau inefisiensi pada sistem lama?
        </li>
        <li>
          <strong>Dampak Bisnis:</strong> Bagaimana masalah ini mempengaruhi
          metrik bisnis atau kepuasan pengguna? (Misal:{" "}
          <em>Bounce rate tinggi</em> atau <em>Proses manual yang lambat</em>).
        </li>
      </ul>
    </div>
  );
}
