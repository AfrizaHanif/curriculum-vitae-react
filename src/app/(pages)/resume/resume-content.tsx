/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import Feature from "@/components/ui/bootstrap/feature";
import Modal from "@/components/ui/bootstrap/modal";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import Dropdown from "@/components/ui/bootstrap/dropdown";
import Heroes from "@/components/ui/bootstrap/heroes";
import NextImage from "@/components/ui/next/next-image";
import { formatDate, formatDateRange, sortItemsByDateKey } from "@/lib/utils";
import {
  DropdownItem,
  FeatureItem,
  HeroesButtonItem,
  ModalButtonItem,
} from "@/types/bootstrap-types";
import {
  CertificateItem,
  EducationItem,
  ExperienceItem,
} from "@/types/customs/data-type";
import styles from "./page.module.css";
import { resolveAssetUrl } from "@/lib/assets";
import { normalizeData } from "@/lib/normalize";

const PdfThumbnail = dynamic(
  () => import("@/components/ui/customs/pdf-thumbnail"),
  {
    ssr: false,
    loading: () => (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ),
  },
);

const Map = dynamic(() => import("@/components/ui/customs/map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

interface ResumeContentProps {
  certificates: CertificateItem[];
  educations: EducationItem[];
  experiences: ExperienceItem[];
}

export default function ResumeContent({
  certificates,
  educations,
  experiences,
}: ResumeContentProps) {
  const modalButtonItems: ModalButtonItem[] = [
    { label: "Tutup", type: "button", color: "secondary", dismiss: true },
  ];

  const sortedCertificates = sortItemsByDateKey(certificates, "issue_date");

  const generateCertDropdownItems = (item: CertificateItem): DropdownItem[] => {
    const items: DropdownItem[] = [
      {
        label: "Perbesar File",
        icon: "file-earmark-text",
        dataToggle: "modal",
        dataTarget: `modal-cert-${item.id}`,
      },
    ];
    if (item.credential_url) {
      items.push(
        { type: "divider", label: "" },
        {
          label: "Kunjungi Link",
          href: item.credential_url,
          newTab: true,
          icon: "patch-check",
        },
      );
    }
    return items;
  };

  const renderCards = (items: CertificateItem[]) => (
    <PaginatedList
      items={items}
      itemsPerPage={9}
      cardsPerRow={4}
      renderItem={(item) => {
        const fileUrl = resolveAssetUrl(item.file);
        const isPdf = fileUrl.trim().toLowerCase().endsWith(".pdf");
        return (
          <CardBlank key={item.id} fullHeight insideGroup>
            <div className="card-header small fw-semibold text-body-secondary">
              <span className="text-uppercase">{item.issuer}</span> -{" "}
              {item.type}
            </div>
            <div
              className="position-relative bg-body-tertiary d-flex align-items-center justify-content-center"
              style={{ aspectRatio: "16 / 9" }}
            >
              {isPdf ? (
                <PdfThumbnail
                  file={fileUrl}
                  alt={item.name}
                  className="w-100 h-100 position-absolute top-0 start-0"
                  pageNumber={1}
                />
              ) : (
                <NextImage
                  src={fileUrl}
                  alt={item.name}
                  className="card-img-top rounded-0"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  errorContent
                />
              )}
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{item.name}</h5>
            </div>
            <div className="card-footer text-body-secondary">
              <div className="row justify-content-center align-items-center g-2">
                <div className="col-8 small">{formatDate(item.issue_date)}</div>
                <div className="col-4 text-end">
                  <Dropdown
                    color="primary"
                    size="sm"
                    items={generateCertDropdownItems(item)}
                    fullWidth
                  >
                    Lihat
                  </Dropdown>
                </div>
              </div>
            </div>
          </CardBlank>
        );
      }}
    />
  );

  const uniqueCertificates = Array.from(
    new Set(sortedCertificates.map((item) => item.type)),
  );

  const tabItems = [
    { id: "all", title: "Semua", content: renderCards(sortedCertificates) },
    ...uniqueCertificates.map((type) => ({
      id: type.toLowerCase().replace(/\s+/g, "-"),
      title: type,
      content: renderCards(
        sortedCertificates.filter((item) => item.type === type),
      ),
    })),
  ];

  const getStatusName = (status?: string) => {
    const statuses: Record<string, string> = {
      Ongoing: "Sedang Berlangsung",
      Finished: "Telah Selesai",
      Planning: "Sedang Direncanakan",
      Stopped: "Telah Berhenti",
    };
    return status ? statuses[status] : "";
  };

  const getStatusBadgeClass = (status?: string) => {
    if (status === "Ongoing") return "text-bg-primary";
    if (status === "Finished") return "text-bg-success";
    return "text-bg-secondary";
  };

  const formatFeatureItems = (
    items: (ExperienceItem | EducationItem)[],
    icon: string,
  ): FeatureItem[] => {
    return normalizeData<FeatureItem>(
      items as any,
      {
        title: (item: any) => item.title || item.location,
        button: (item: any) => ({
          label: "Lihat Detail",
          dataToggle: "modal",
          dataTarget: item.id,
        }),
        description: (item: any) => (
          <>
            <h3 className="fs-2 text-body-emphasis d-flex align-items-center gap-2 flex-wrap">
              <span
                className={`badge fs-6 fw-medium ${getStatusBadgeClass(item.status)}`}
              >
                {getStatusName(item.status)}
              </span>
            </h3>
            <p className="mb-1">
              {item.degree ? `${item.degree} ${item.major}` : item.location}
            </p>
            <p className="mb-1">
              <small className="text-body-secondary">
                {formatDateRange(item.start_period, item.finish_period)}
              </small>
            </p>
            {item.gpa && (
              <p className="mb-1">
                <strong>IPK:</strong> {item.gpa}
              </p>
            )}
          </>
        ),
      },
      { icon }, // Apply the icon to all items via the new defaults parameter
    );
  };

  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    { label: "Buka Portfolio", color: "primary", href: `/portfolio` },
    {
      label: "Hubungi Saya",
      color: "secondary",
      href: `/contact`,
      outline: true,
    },
  ];

  return (
    <>
      <section aria-label="Pengalaman Kerja">
        <Feature
          id="experiences"
          items={formatFeatureItems(experiences, "experience")}
          type="hanging"
          title="Pengalaman"
          iconType="svg"
          chevron
        />
      </section>

      {experiences.map((item) => (
        <Modal
          key={item.id}
          id={item.id}
          buttonItems={modalButtonItems}
          title={item.title}
          subtitle={item.location}
          size="lg"
          scrollable
        >
          <div className="row gy-4 g-md-2">
            <div className="col-12 col-md-5">
              <h6>Deskripsi</h6>
              {Array.isArray(item.description) ? (
                <ul>
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}
              <h6 className="mt-3">Detail</h6>
              <table className="table">
                <tbody>
                  <tr>
                    <th className="text-body-secondary fw-normal">Status</th>
                    <td>{getStatusName(item.status)}</td>
                  </tr>
                  <tr>
                    <th className="text-body-secondary fw-normal">Periode</th>
                    <td>
                      {formatDateRange(item.start_period, item.finish_period)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-md-7">
              {item.latitude && item.longitude && (
                <Map
                  position={[item.latitude, item.longitude]}
                  zoom={15}
                  popupContent={item.address}
                />
              )}
            </div>
          </div>
        </Modal>
      ))}

      <section aria-label="Pendidikan">
        <Feature
          id="educations"
          items={formatFeatureItems(educations, "education")}
          type="hanging"
          title="Pendidikan"
          iconType="svg"
          chevron
        />
      </section>

      {educations.map((item) => (
        <Modal
          key={item.id}
          id={item.id}
          buttonItems={modalButtonItems}
          title={item.location}
          subtitle={`${item.degree} - ${item.major}`}
          size="lg"
          scrollable
        >
          <div className="row gy-4 g-md-2">
            <div className="col-12 col-md-5">
              <h6>Deskripsi</h6>
              {Array.isArray(item.description) ? (
                <ul>
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.description}</p>
              )}
              <h6 className="mt-3">Detail</h6>
              <table className="table">
                <tbody>
                  <tr>
                    <th className="text-body-secondary fw-normal">Status</th>
                    <td>{getStatusName(item.status)}</td>
                  </tr>
                  <tr>
                    <th className="text-body-secondary fw-normal">Periode</th>
                    <td>
                      {formatDateRange(item.start_period, item.finish_period)}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-body-secondary fw-normal">
                      Nilai Akhir
                    </th>
                    <td>{item.gpa}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-md-7">
              {item.latitude && item.longitude && (
                <Map
                  position={[item.latitude, item.longitude]}
                  zoom={15}
                  popupContent={item.address}
                />
              )}
            </div>
          </div>
        </Modal>
      ))}

      <section aria-label="Sertifikat">
        <NavTab title="Sertifikat" id="certificate-tab" items={tabItems} />
      </section>

      {sortedCertificates.map((item) => {
        const fileUrl = resolveAssetUrl(item.file);
        const isPdf = fileUrl.trim().toLowerCase().endsWith(".pdf");
        return (
          <Modal
            key={item.id}
            id={`modal-cert-${item.id}`}
            buttonItems={modalButtonItems}
            title={item.name}
            size="lg"
            fullscreen
          >
            {isPdf ? (
              <object
                data={fileUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                aria-label={`PDF viewer for ${item.name}`}
              >
                <div className="alert alert-warning m-3">
                  Browser tidak mendukung penampil PDF.{" "}
                  <a href={fileUrl} className="alert-link" download={item.name}>
                    Unduh file
                  </a>
                  .
                </div>
              </object>
            ) : (
              <NextImage
                src={fileUrl}
                alt={item.name}
                type="fluid"
                width={0}
                height={0}
                sizes="100vw"
                className={styles.certificateImage}
              />
            )}
          </Modal>
        );
      })}

      <section aria-label="Next Page">
        <Heroes
          title="Lihat Portofolio"
          buttonItem={nextPageHeroesButtonItem}
          icon="portfolio"
        >
          Tertarik dengan pengalaman saya? Lihat proyek-proyek yang telah saya
          kerjakan.
        </Heroes>
      </section>
    </>
  );
}
