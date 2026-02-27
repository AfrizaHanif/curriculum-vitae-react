import { portfolioItems } from "@/lib/data/portfolioData";
import { techIcons } from "@/lib/data/techIcons";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";

type PortfolioItem = (typeof portfolioItems)[number];

interface TechStackSectionProps {
  item: PortfolioItem;
}

export default function TechStackSection({ item }: TechStackSectionProps) {
  // Check if technology are available
  return item?.technology ? (
    <>
      <p>Pada proyek ini, saya menggunakan teknologi yang digunakan:</p>
      <CardGroup cardPerRow={4}>
        {item.technology.map((tech, index) => (
          <Card key={index} insideGroup>
            <div className="d-flex flex-column align-items-center">
              {techIcons[tech] && (
                <div style={{ width: "40px", height: "24px" }} className="mb-4">
                  {techIcons[tech]}
                </div>
              )}
              <span>{tech}</span>
            </div>
          </Card>
        ))}
      </CardGroup>
    </>
  ) : (
    <p className="text-muted">Belum ada teknologi.</p>
  );
}
