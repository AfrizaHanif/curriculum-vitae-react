import { portfolioItems } from "@/lib/data/portfolioData";
import { formatDateRange } from "@/lib/utils";

type PortfolioItem = (typeof portfolioItems)[number];

interface OverviewSectionProps {
  item: PortfolioItem;
}

export default function OverviewSection({ item }: OverviewSectionProps) {
  return (
    <div className="d-flex flex-column">
      <div id="overview-description">
        <h5>Deskripsi</h5>
        <p>{item.description}</p>
      </div>
      <div id="overview-details">
        <h5>Detail Portfolio</h5>
        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <th scope="row">Kategori</th>
              <td>{item.category}</td>
            </tr>
            <tr>
              <th scope="row">Tipe</th>
              <td>{item.type}</td>
            </tr>
            <tr>
              <th scope="row">Periode</th>
              <td>{formatDateRange(item.start_period, item.finish_period)}</td>
            </tr>
            <tr>
              <th scope="row">Tags</th>
              <td>
                {item.tags?.map((tag) => (
                  <span key={tag} className="badge text-bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
