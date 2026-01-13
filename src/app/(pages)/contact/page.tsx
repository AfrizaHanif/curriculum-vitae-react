import AppLayout from "@/components/layouts/layout";
import Accordion from "@/components/ui/bootstrap/accordion";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import { profileItem, socialItems } from "@/lib/data/profileData";
import { Metadata } from "next";
import ContactForm from "./contact-form";
import jumbotronImage from "../../../assets/images/jumbotron/contact.jpg";

const userProfile = profileItem[0];

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Hubungi Saya",
};

export default function Contact() {
  // Items of Accordion's Items
  const contactAccordionItems = [
    {
      title: "Contact Me",
      content: (
        <>
          <p>Anda dapat menghubungi saya melalui nomor telepon atau e-mail:</p>
          <ul>
            <li>
              <b>{userProfile.fullname}</b>
            </li>
            <li>
              <b>No. Telp: </b>
              {userProfile.phone}
            </li>
            <li>
              <b>E-Mail: </b>
              {userProfile.email}
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Social Media",
      content: (
        <>
          <p>Kunjungi media sosial saya:</p>
          <div className="list-group">
            {socialItems.map((item) => (
              <a
                key={item.key}
                href={item.url}
                className="list-group-item list-group-item-action"
              >
                <i className={`bi bi-${item.icon} pe-2 fs-5`}></i>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </>
      ),
    },
  ];

  // // Items of selectbox
  // const subjectItems: SelectItem[] = [
  //   { label: "Penawaran Proyek", value: "order_project" },
  //   { label: "Pertanyaan Umum", value: "general_question" },
  //   { label: "Apresiasi", value: "apresiasi" },
  //   { label: "Kritik dan Saran", value: "critics" },
  //   { label: "Lainnya", value: "other" },
  // ];

  // // Items of checkbox
  // const checkItems: CheckItem[] = [
  //   {
  //     label: "Saya telah mengisi form ini sesuai dengan yang saya butuhkan",
  //     value: "confirm",
  //     id: "confirm-check",
  //     name: "confirm-check",
  //     required: true,
  //   },
  // ];

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
            <h1 className="display-5 fw-bold">Kontak</h1>
            <p className="col-md-8 fs-4">
              Punya pertanyaan atau ingin bekerja sama? Silakan isi form di
              bawah ini.
            </p>
          </div>
        </div>
      </Jumbotron>

      {/* Content */}
      <div className="row justify-content-center g-3">
        {/* Accordion */}
        <div className="col-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            <Accordion
              id="my-new-accordion"
              items={contactAccordionItems}
              openItemIndex={0}
            />
          </div>
        </div>
        {/* Form */}
        <div className="col-8">
          <ContactForm />
        </div>
      </div>
    </AppLayout>
  );
}
