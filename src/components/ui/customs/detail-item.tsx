import { ComponentPropsWithoutRef, ElementType } from "react";
import CardBlank from "../bootstrap/card-blank";
import { formatDate, formatDateRange } from "@/lib/utils";
import Dropdown from "../bootstrap/dropdown";
import ShareButton from "./share-button";
import { DropdownItem } from "@/types/bootstrap-types";
import { AllowedColorsStatus } from "@/types/bootstrap-allowed";
import Button from "../bootstrap/button";
import Link from "next/link";

type ItemData = {
  title: string;
  category?: string;
  type?: string;
  start_period?: string;
  finish_period?: string;
  author?: string;
  date?: string;
  tags?: string[];
  technology?: string[];
  status?: string;
  // [key: string]: unknown;
};

type DetailProps = ComponentPropsWithoutRef<"div"> & {
  color?: AllowedColorsStatus;
  type: "Portfolio" | "Project" | "Blog";
  item: ItemData;
  repositoryItems?: DropdownItem[];
  caseStudyLink?: string;
  locale?: string;
  shareable?: boolean;
  as?: ElementType;
};

export default function DetailItem({
  type,
  item,
  repositoryItems,
  caseStudyLink,
  locale = "id-ID",
  shareable = false,
  className,
  as,
  ...props
}: DetailProps) {
  const statusColors: Record<string, string> = {
    Planning: "text-bg-secondary",
    Active: "text-bg-primary",
    Delayed: "text-bg-warning",
    Cancelled: "text-bg-danger",
    Finished: "text-bg-success",
  };

  const statusText: Record<string, string> = {
    Planning: "Dalam Rencana",
    Active: "Aktif",
    Delayed: "Ditunda",
    Cancelled: "Dibatalkan",
    Finished: "Selesai",
  };

  return (
    <CardBlank as={as} className={`p-3 ${className || ""}`} {...props}>
      {/* Title of detail item */}
      <h5 className="card-title mb-3">{`Detail ${
        type === "Portfolio"
          ? "Portfolio"
          : type === "Project"
            ? "Proyek"
            : "Post"
      }`}</h5>
      {/* Detail of item */}
      <dl className="row">
        {(type === "Portfolio" || type === "Project") && (
          <>
            {item.status && (
              <>
                <dt className="col-4 mb-2 text-body-secondary">Status</dt>
                <dd className="col-8">
                  <span
                    className={`badge ${statusColors[item.status] || "text-bg-secondary"}`}
                  >
                    {statusText[item.status] || item.status}
                  </span>
                </dd>
              </>
            )}
            <dt className="col-4 mb-2 text-body-secondary">Kategori</dt>
            <dd className="col-8">{item.category}</dd>
            <dt className="col-4 mb-2 text-body-secondary">Tipe</dt>
            <dd className="col-8">{item.type}</dd>
            <dt className="col-4 mb-2 text-body-secondary">Periode</dt>
            <dd className="col-8">
              {type === "Project" && item.start_period
                ? formatDate(item.start_period)
                : item.start_period &&
                  formatDateRange(item.start_period, item.finish_period)}
            </dd>
          </>
        )}
        {type === "Blog" && (
          <>
            <dt className="col-4 mb-2 text-body-secondary">Penulis</dt>
            <dd className="col-8">{item.author}</dd>
            <dt className="col-4 mb-2 text-body-secondary">Tanggal Rilis</dt>
            <dd className="col-8">
              {item.date && formatDate(item.date, locale)}
            </dd>
          </>
        )}
        {((item.tags && item.tags.length > 0) ||
          (item.technology && item.technology.length > 0)) && (
          <>
            <dt className="col-12 mb-2 text-body-secondary">
              {type === "Blog" ? "Tags" : "Tags & Teknologi"}
            </dt>
            <dd className="col-12 d-flex flex-wrap gap-1">
              {item.tags?.map((tag) => (
                <span key={tag} className="badge text-bg-secondary">
                  {tag}
                </span>
              ))}
              {item.technology?.map((tech) => (
                <span key={tech} className="badge text-bg-info">
                  {tech}
                </span>
              ))}
            </dd>
          </>
        )}
      </dl>
      {/* Menu buttons */}
      <div className="d-grid gap-1">
        {caseStudyLink && (
          <Link href={caseStudyLink}>
            <Button color="primary" className="mb-2" fullWidth>
              Studi Kasus
            </Button>
          </Link>
        )}
        {/* <Button
          as="a"
          href={item.repository || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2"
          color="secondary"
          disabled={!item.repository}
        >
          Lihat Repository
        </Button> */}
        {repositoryItems && repositoryItems.length > 0 && (
          <Dropdown
            color="secondary"
            items={repositoryItems}
            className="mb-2"
            fullWidth
          >
            Lihat Repository
          </Dropdown>
        )}
        {shareable && (
          <ShareButton
            title={item.title}
            text={`Check out this ${type.toLowerCase()}: ${item.title}`}
          >
            <i className="bi bi-share-fill me-2"></i>
            Bagikan
          </ShareButton>
        )}
      </div>
    </CardBlank>
  );
}
