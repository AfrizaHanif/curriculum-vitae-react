import AppLayout from "@/components/layouts/layout";
import Accordion from "@/components/ui/bootstrap/accordion";
import { profileItem, socialItems } from "@/lib/data/profileData";
import { Metadata } from "next";
import ContactForm from "./contact-form";
import jumbotronImage from "../../../assets/images/jumbotron/contact.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem } from "@/types/bootstrap-types";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { ProfileItem, SocialItem } from "@/types/customs/data-type";
import { fetchLaravel } from "@/lib/laravel";
import ErrorToast from "@/components/home/error-toast";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Hubungi Saya",
};

export default async function Contact() {
  const [profileResult, socialResult] = await Promise.all([
    fetchWithFallback<ProfileItem[]>(
      fetchLaravel<ProfileItem[]>("api/profiles", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      profileItem, // Static Fallback
      "Gagal memuat data Profil terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
    fetchWithFallback<SocialItem[]>(
      fetchLaravel<SocialItem[]>("api/socials", {
        next: { revalidate: 3600, tags: ["social"] },
        skipAuth: true,
      }),
      socialItems, // Static Fallback
      "Gagal memuat data Media Sosial terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
  ]);

  const userProfile = profileResult.data[0];

  const fetchErrorMessage = profileResult.error;

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
            {socialResult.data.map((item) => (
              <a
                key={item.id}
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

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Buka Portfolio",
      color: "primary",
      href: `/portfolio`,
    },
    {
      label: "Ke Beranda",
      color: "secondary",
      href: `/`,
      outline: true,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Hubungi Saya | Muhammad Afriza Hanif",
    description: "Halaman kontak untuk menghubungi Muhammad Afriza Hanif.",
    url: "https://afrizahanif.com/contact",
    mainEntity: {
      "@type": "Person",
      name: "Muhammad Afriza Hanif",
      url: "https://afrizahanif.com",
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Hubungi Saya"
        description="Punya pertanyaan atau ingin bekerja sama? Silakan isi form di bawah ini."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* Content */}
      <div className="row justify-content-center g-3" role="main">
        {/* Accordion */}
        <div className="col-12 col-lg-4">
          <div className="sticky-lg-top" style={{ top: "1rem" }}>
            <Accordion
              id="my-new-accordion"
              items={contactAccordionItems}
              openItemIndex={0}
            />
          </div>
        </div>
        {/* Form */}
        <section className="col-12 col-lg-8" aria-label="Contact Form">
          <ContactForm />
        </section>
      </div>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Terima Kasih!"
          buttonItem={nextPageHeroesButtonItem}
          icon="signpost-split-fill"
        >
          Terima kasih telah menghubungi saya! Sementara itu, silakan jelajahi
          portofolio saya atau kembali ke beranda
        </Heroes>
      </section>

      {/* Error Toast Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
