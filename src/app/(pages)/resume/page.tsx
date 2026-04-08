import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import {
  certificateItems,
  educationItems,
  experienceItems,
} from "@/lib/data/resumeData";
import { profileItem } from "@/lib/data/profileData";
import jumbotronImage from "../../../assets/images/jumbotron/resume.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import ResumeContent from "./resume-content";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import ErrorToast from "@/components/home/error-toast";
import {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  ProfileItem,
} from "@/types/customs/data-type";

export default async function Resume() {
  const [certResult, eduResult, expResult, profileResult] = await Promise.all([
    fetchWithFallback<CertificateItem[]>(
      fetchLaravel<CertificateItem[]>("api/certificates", {
        next: { revalidate: 3600, tags: ["certificate"] },
        skipAuth: true,
      }),
      certificateItems,
      "Gagal memuat data Sertifikat terbaru.",
      (data) => Array.isArray(data) && data.length > 0,
    ),
    fetchWithFallback<EducationItem[]>(
      fetchLaravel<EducationItem[]>("api/educations", {
        next: { revalidate: 3600, tags: ["education"] },
        skipAuth: true,
      }),
      educationItems,
      "Gagal memuat data Pendidikan terbaru.",
      (data) => Array.isArray(data) && data.length > 0,
    ),
    fetchWithFallback<ExperienceItem[]>(
      fetchLaravel<ExperienceItem[]>("api/experiences", {
        next: { revalidate: 3600, tags: ["experience"] },
        skipAuth: true,
      }),
      experienceItems,
      "Gagal memuat data Pengalaman terbaru.",
      (data) => Array.isArray(data) && data.length > 0,
    ),
    fetchWithFallback<ProfileItem[]>(
      fetchLaravel<ProfileItem[]>("api/profiles", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      profileItem,
      "Gagal memuat data Profil terbaru.",
      (data) => Array.isArray(data) && data.length > 0,
    ),
  ]);

  const userProfile = profileResult.data[0];
  const fetchErrorMessage =
    certResult.error ||
    eduResult.error ||
    expResult.error ||
    profileResult.error;

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
      <JsonLd data={jsonLd} />

      <JumbotronTitle
        title="Resume"
        description="Ringkasan latar belakang profesional saya."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      <section aria-label="Overview">
        <Jumbotron backgroundColor="tertiary" className="my-2">
          <h2 className="pb-2 border-bottom">Overview</h2>
          <p className="lead">{userProfile.description}</p>
        </Jumbotron>
      </section>

      <ResumeContent
        certificates={certResult.data}
        educations={eduResult.data}
        experiences={expResult.data}
      />

      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
