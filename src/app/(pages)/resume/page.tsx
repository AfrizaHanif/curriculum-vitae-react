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
import { formatDate, formatDateRange } from "@/lib/utils";
import { isEducationData, isExperienceData } from "@/lib/type-guards";
import { profileItem } from "@/lib/data/profileData";
import jumbotronImage from "../../../assets/images/jumbotron/resume.jpg";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import Image from "@/components/ui/image";
// import Loading from "@/components/ui/bootstrap/loading";
// import { useLoading } from "@/hooks/use-loading";

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
      { type: "divider", label: "" },
    ];
    // Add item if url of credential is included
    if (item.credential_url) {
      items.push({
        label: "Kunjungi Link",
        href: item.credential_url,
        icon: "patch-check",
      });
    }
    return items;
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <AppLayout>
      {/* Jumbotron */}
      <Jumbotron
        backgroundColor="secondary"
        textColor="dark"
        className="my-3"
        img={jumbotronImage.src}
      >
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <h1 className="display-5 fw-bold">Resume</h1>
            <p className="col-md-8 fs-4">
              Ringkasan latar belakang profesional saya.
            </p>
          </div>
        </div>
      </Jumbotron>

      {/* Overview */}
      <Jumbotron backgroundColor="tertiary" className="my-2">
        <h2 className="pb-2 border-bottom">Overview</h2>
        <p className="lead">{userProfile.description}</p>
      </Jumbotron>

      {/* Experiences */}
      {/* Features */}
      <ResumeFeature
        id="experiences"
        items={experienceItems}
        type="hanging"
        title="Pengalaman"
      />
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
                    <div className="row g-2">
                      <div className="col-5">
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
                      <div className="col-7">
                        <div className="my-3">
                          {dataItem.latitude !== undefined &&
                            dataItem.longitude !== undefined && (
                              <Map
                                position={[
                                  dataItem.latitude,
                                  dataItem.longitude,
                                ]}
                                zoom={15}
                                popupContent={dataItem.location}
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
      <ResumeFeature
        id="educations"
        items={educationItems} // This will be from state
        type="hanging"
        title="Pendidikan"
      />
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
                    <div className="row g-2">
                      <div className="col-5">
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
                      <div className="col-7">
                        <div className="my-3">
                          {dataItem.latitude !== undefined &&
                            dataItem.longitude !== undefined && (
                              <Map
                                position={[
                                  dataItem.latitude,
                                  dataItem.longitude,
                                ]}
                                zoom={15}
                                popupContent={dataItem.location}
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
      <CardGroup title="Sertifikat" cardPerRow={4}>
        {certificateItems.map((item) => (
          <Card
            key={item.id}
            header={item.issuer}
            footer={formatDate(item.issue_date)}
            image={item.file}
            url={item.credential_url}
            urlType="dropdown"
            urlItems={generateCertDropdownItems(item)}
            buttonName="Lihat"
            clickable
            insideGroup
          >
            <h5 className="card-title">{item.name}</h5>
          </Card>
        ))}
      </CardGroup>
      {/* Modals */}
      {certificateItems.map((item) => (
        <Modal
          key={item.id}
          id={`modal-cert-${item.id}`}
          buttonItems={modalButtonItems}
          title={item.name}
          size="lg"
          fullscreen
        >
          <Image src={item.file} alt={item.name} type="fluid" />
        </Modal>
      ))}
    </AppLayout>
  );
}
