"use client"; // Mark this as a Client Component

import dynamic from "next/dynamic";
// STEP 1: Import useState and useEffect from React, and the FeatureItem type.
// import { FeatureItem } from "@/lib/types";

import AppLayout from "@/components/layouts/layout";
import ResumeFeature from "@/components/ui/customs/resume-feature";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
// STEP 2: Comment out or remove the static import.
import {
  certificateItems,
  educationItems,
  experienceItems,
} from "@/lib/data/resumeData";
import { DropdownItem, ModalButtonItem } from "@/lib/bootstrap-types";
import Modal from "@/components/ui/bootstrap/modal";
import { formatDate, formatDateRange, sortItemsByDateKey } from "@/lib/utils";
import { isEducationData, isExperienceData } from "@/lib/customs/type-guards";
import { profileItem } from "@/lib/data/profileData";
import jumbotronImage from "../../../assets/images/jumbotron/resume.jpg";
import NextImage from "@/components/ui/next/next-image";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import styles from "./page.module.css";
import NavTab from "@/components/ui/bootstrap/nav-tab";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import CardBlank from "@/components/ui/bootstrap/card-blank";
import Dropdown from "@/components/ui/bootstrap/dropdown";
// import Loading from "@/components/ui/bootstrap/loading";
// import { useLoading } from "@/hooks/use-loading";

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

// Dynamically import the Map component with SSR turned off
const Map = dynamic(() => import("@/components/ui/customs/map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

// Get Data (Single Array)
const userProfile = profileItem[0];
console.log("Profile data: ", profileItem);

export default function Resume() {
  // const isLoading = useLoading();
  // STEP 3: Create state variables to hold the data fetched from the API.
  // const [educationItems, setEducationItems] = useState<FeatureItem[]>([]);
  // const [experienceItems, setExperienceItems] = useState<FeatureItem[]>([]);

  // STEP 4: Use the useEffect hook to fetch data when the component mounts.
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/resume"); // Example API endpoint
  //     const data = await response.json();
  //     setEducationItems(data.educationItems);
  //     setExperienceItems(data.experienceItems);
  //   };
  //   fetchData();
  // }, []); // The empty dependency array ensures this runs only once.

  // Item of buttons for modal
  const modalButtonItems: ModalButtonItem[] = [
    {
      label: "Tutup",
      type: "button",
      color: "secondary",
      dismiss: true,
    },
  ];

  // Sort certificates by latest issue_date
  const sortedCertificates = sortItemsByDateKey(certificateItems, "issue_date");

  const renderCards = (items: typeof certificateItems) => (
    <PaginatedList
      items={items}
      itemsPerPage={9}
      cardsPerRow={4}
      // key={sortOrder}
      renderItem={(item) => {
        const isPdf = item.file.trim().toLowerCase().endsWith(".pdf");
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
                  file={item.file}
                  alt={item.name}
                  className="w-100 h-100 position-absolute top-0 start-0"
                  pageNumber={1} // You can change this to display a different page
                />
              ) : (
                <NextImage
                  src={item.file}
                  alt={item.name}
                  className="card-img-top rounded-0"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
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
  console.log("Category in tabs: ", uniqueCertificates);

  // Items of tab
  const tabItems = [
    // All certificate (No category filter)
    {
      id: "all",
      title: "Semua",
      content: renderCards(sortedCertificates),
    },
    // Post with category filter
    ...uniqueCertificates.map((type) => ({
      id: type.toLowerCase().replace(/\s+/g, "-"),
      title: type,
      content: renderCards(
        sortedCertificates.filter((item) => item.type === type),
      ),
    })),
  ];

  // Item of card's button
  const generateCertDropdownItems = (
    item: (typeof certificateItems)[0],
  ): DropdownItem[] => {
    const items: DropdownItem[] = [
      {
        label: "Perbesar File",
        // href: item.file,
        icon: "file-earmark-text",
        dataToggle: "modal",
        dataTarget: `modal-cert-${item.id}`,
      },
    ];
    // Add item if url of credential is included
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

  // if (isLoading) {
  //   return <Loading />;
  // }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Resume | Muhammad Afriza Hanif",
    description: "Ringkasan latar belakang profesional saya.",
    url: "https://afrizahanif.com/resume",
    mainEntity: {
      "@type": "Person",
      name: userProfile.fullname,
      jobTitle: userProfile.status,
      url: "https://afrizahanif.com",
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Resume"
        description="Ringkasan latar belakang profesional saya."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Overview */}
      <section aria-label="Overview">
        <Jumbotron backgroundColor="tertiary" className="my-2">
          <h2 className="pb-2 border-bottom">Overview</h2>
          <p className="lead">{userProfile.description}</p>
        </Jumbotron>
      </section>

      {/* Experiences */}
      {/* Features */}
      <section aria-label="Pengalaman Kerja">
        <ResumeFeature
          id="experiences"
          items={experienceItems}
          type="hanging"
          title="Pengalaman"
        />
      </section>
      {/* Modals */}
      {experienceItems
        .filter((item) => item.dataTarget)
        .map((item) => (
          <Modal
            key={item.key}
            id={item.dataTarget!}
            buttonItems={modalButtonItems}
            title={`${
              item.data && isExperienceData(item.data[0])
                ? item.data[0].title
                : ""
            }`}
            subtitle={`${
              item.data && isExperienceData(item.data[0])
                ? item.data[0].location
                : ""
            }`}
            size="lg"
            scrollable
          >
            {item.data?.map(
              (dataItem, i) =>
                isExperienceData(dataItem) && (
                  <div key={i}>
                    <div className="row gy-4 g-md-2">
                      <div className="col-12 col-md-5">
                        {dataItem.description ?? "Tidak ada deskripsi"}
                        <table className="table mt-3">
                          <tbody>
                            <tr>
                              <th
                                scope="col"
                                className="text-body-secondary fw-normal"
                              >
                                Status
                              </th>
                              <td>{dataItem.status}</td>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="text-body-secondary fw-normal"
                              >
                                Periode
                              </th>
                              <td>
                                {formatDateRange(
                                  dataItem.start_period,
                                  dataItem.finish_period,
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="my-3">
                          {dataItem.latitude !== undefined &&
                            dataItem.longitude !== undefined && (
                              <Map
                                position={[
                                  dataItem.latitude,
                                  dataItem.longitude,
                                ]}
                                zoom={15}
                                popupContent={dataItem.address}
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </Modal>
        ))}

      {/* Educations */}
      {/* Featured */}
      <section aria-label="Pendidikan">
        <ResumeFeature
          id="educations"
          items={educationItems} // This will be from state
          type="hanging"
          title="Pendidikan"
        />
      </section>
      {/* Modals */}
      {educationItems
        .filter((item) => item.dataTarget)
        .map((item) => (
          <Modal
            key={item.key}
            id={item.dataTarget!}
            buttonItems={modalButtonItems}
            title={`${
              item.data && isEducationData(item.data[0])
                ? item.data[0].location
                : ""
            }`}
            subtitle={`${
              item.data && isEducationData(item.data[0])
                ? `${item.data[0].degree} - ${item.data[0].major}`
                : ""
            }`}
            size="lg"
            scrollable
          >
            {item.data?.map(
              (dataItem, i) =>
                isEducationData(dataItem) && (
                  <div key={i}>
                    <div className="row gy-4 g-md-2">
                      <div className="col-12 col-md-5">
                        {dataItem.description}
                        <table className="table mt-3">
                          <tbody>
                            <tr>
                              <th
                                scope="col"
                                className="text-body-secondary fw-normal"
                              >
                                Status
                              </th>
                              <td>{dataItem.status}</td>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="text-body-secondary fw-normal"
                              >
                                Periode
                              </th>
                              <td>
                                {formatDateRange(
                                  dataItem.start_period,
                                  dataItem.finish_period,
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="text-body-secondary fw-normal"
                              >
                                Nilai Akhir
                              </th>
                              <td>{dataItem.gpa}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="my-3">
                          {dataItem.latitude !== undefined &&
                            dataItem.longitude !== undefined && (
                              <Map
                                position={[
                                  dataItem.latitude,
                                  dataItem.longitude,
                                ]}
                                zoom={15}
                                popupContent={dataItem.address}
                              />
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </Modal>
        ))}

      {/* Certificates */}
      {/* Cards */}
      <section aria-label="Sertifikat">
        <NavTab title="Sertifikat" id="certificate-tab" items={tabItems} />
      </section>
      {/* Modals */}
      {sortedCertificates.map((item) => {
        const isPdf = item.file.trim().toLowerCase().endsWith(".pdf");
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
                data={item.file}
                type="application/pdf"
                width="100%"
                height="100%"
                aria-label={`PDF viewer for ${item.name}`}
              >
                <div className="alert alert-warning m-3" role="alert">
                  Browser Anda tidak mendukung penampil PDF. Anda bisa{" "}
                  <a href={item.file} className="alert-link">
                    mengunduh file PDF
                  </a>{" "}
                  untuk melihatnya.
                </div>
              </object>
            ) : (
              <NextImage
                src={item.file}
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
    </AppLayout>
  );
}
