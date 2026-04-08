import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/next/next-image";
// import myPhoto from "@/images/Profile.jpg";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import Feature from "@/components/ui/bootstrap/feature";
import {
  hobbyItems,
  profileItem,
  skillItems,
  socialItems,
} from "@/lib/data/profileData";
import { Metadata } from "next";
import jumbotronImage from "../../../../assets/images/jumbotron/home.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
import JsonLd from "@/components/json-ld";
import Heroes from "@/components/ui/bootstrap/heroes";
import { HeroesButtonItem, FeatureItem } from "@/types/bootstrap-types";
import { HobbyItem, ProfileItem, SkillItem } from "@/types/customs/data-type";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import ErrorToast from "@/components/home/error-toast";
import { normalizeData } from "@/lib/normalize";
import { resolveAssetUrl } from "@/lib/assets";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Tentang Saya",
  description:
    "Pelajari tentang saya beserta keterampilan, filosofi, dan hobi yang saya miliki",
};

export default async function Profile() {
  const [profileResult, skillResult, hobbyResult] = await Promise.all([
    fetchWithFallback<ProfileItem[]>(
      fetchLaravel<ProfileItem[]>("api/profiles", {
        next: { revalidate: 3600, tags: ["profile"] },
        skipAuth: true,
      }),
      profileItem, // Static Fallback
      "Gagal memuat data Profil terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
    fetchWithFallback<SkillItem[]>(
      fetchLaravel<SkillItem[]>("api/skills", {
        next: { revalidate: 3600, tags: ["skill"] },
        skipAuth: true,
      }),
      skillItems, // Static Fallback
      "Gagal memuat data Skill terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
    fetchWithFallback<HobbyItem[]>(
      fetchLaravel<HobbyItem[]>("api/hobbies", {
        next: { revalidate: 3600, tags: ["hobby"] },
        skipAuth: true,
      }),
      hobbyItems as unknown as HobbyItem[], // Static Fallback
      "Gagal memuat data Hobi terbaru.", // Error Message
      (data) => Array.isArray(data) && data.length > 0, // Validator
    ),
  ]);

  const userProfile = profileResult.data[0];

  // Normalize Skills Data: Ensure 'name' property exists (handling API 'title' vs 'name' mismatch)
  const formattedSkillItems = normalizeData(skillResult.data, {
    name: ["name", "title"], // Try 'name' first (API), fallback to 'title' (Static)
  });

  // The API returns 'name', but the Feature component expects 'title' and a non-optional 'icon'.
  const formattedHobbyItems: FeatureItem[] = normalizeData<FeatureItem>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hobbyResult.data as any,
    { title: ["name", "title"] },
    { icon: "star" }, // Provide default icon to satisfy FeatureItem interface via defaults parameter
  );

  // Consolidated Error Message
  const fetchErrorMessage =
    profileResult.error || skillResult.error || hobbyResult.error;

  // Birthday and Calculate Age Function
  const birthDate = new Date(userProfile.birthday); // Get data of birthday
  const today = new Date(); // Get date of today
  // Change format depend by local of format date
  const formattedBirthday = birthDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let age = today.getFullYear() - birthDate.getFullYear(); // Substract between today and birthday's year
  const monthDifference = today.getMonth() - birthDate.getMonth(); // Substract between today and birthday's month and year
  // Check if difference abnormal (less than 0)
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // Calculate if difference not abnormal
  }

  // Details of profile for better formatting
  const profileDetails = {
    "Nama Lengkap": userProfile.fullname,
    "Tanggal Lahir": formattedBirthday,
    Umur: `${age} tahun`,
    Alamat: `${userProfile.current_city}, ${userProfile.current_province}`,
    Email: userProfile.email,
    Telepon: userProfile.phone,
  };

  console.log("Profile data:", userProfile);
  console.log("Detailed Profile:", profileDetails);

  // Item of Next Page Navigation (Heroes)
  const nextPageHeroesButtonItem: HeroesButtonItem[] = [
    {
      label: "Buka Resume",
      color: "primary",
      href: `/resume`,
    },
  ];

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Tentang Saya | ${userProfile.fullname}`,
    description:
      "Informasi lengkap mengenai latar belakang, pendidikan, dan pengalaman saya.",
    url: "https://afrizahanif.com/profile", // Adjust if your route is /about
    mainEntity: {
      "@type": "Person",
      name: userProfile.fullname,
      jobTitle: userProfile.status,
      url: "https://afrizahanif.com",
      image: resolveAssetUrl(userProfile.photo),
      sameAs: socialItems.map((item) => item.url), // Links to your social media
    },
  };

  return (
    <AppLayout>
      {/* Structured Data */}
      <JsonLd data={jsonLd} />

      {/* Jumbotron */}
      <JumbotronTitle
        title="Tentang Saya"
        description={`${userProfile.status} | ${userProfile.tagline}`}
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* My Profile */}
      <section className="row g-3 pb-3" aria-label="Biodata">
        {/* Profile Image */}
        <div className="col-12 col-lg-4">
          <div
            className="border rounded-3 position-relative h-100"
            style={{ minHeight: "300px" }}
          >
            <NextImage
              src={resolveAssetUrl(userProfile.photo)}
              alt="My Profile Photo"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-3"
            />
          </div>
        </div>
        {/* Detail of Profile */}
        <div className="col-12 col-lg-8">
          <div className="p-4 text-body border rounded-3 text-start bg-body h-100">
            <h2 className="pb-2 border-bottom">Biodata</h2>
            <div className="table-responsive">
              <table className="table table-borderless pt-3 fs-5">
                <tbody>
                  {Object.entries(profileDetails).map(([key, value]) => (
                    <tr key={key}>
                      <th
                        style={{ width: "35%" }}
                        className="text-body-secondary fw-medium"
                      >
                        {key}
                      </th>
                      <td>: {value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section aria-label="Keterampilan">
        <CardGroup title="Keterampilan / Keahlian">
          {formattedSkillItems.map((item) => (
            <Card key={item.id} insideGroup>
              <h3 className="card-title text-center col">{item.name}</h3>
              <div className="text-center pb-1 text-body-secondary">
                <i>
                  {item.level} sejak {item.since}
                </i>
              </div>
            </Card>
          ))}
        </CardGroup>
      </section>

      {/* Philosophy */}
      <section aria-label="Filosofi Kerja">
        <Jumbotron backgroundColor="tertiary" className="my-2">
          <h2>Filosofi Kerja Saya</h2>
          <p className="lead">{userProfile.philosophy}</p>
        </Jumbotron>
      </section>

      {/* Hobbies */}
      <section aria-label="Hobi">
        <Feature
          id="hobby"
          items={formattedHobbyItems}
          type="hanging"
          title="Hobi & Minat"
          itemPerRow={4}
          iconType="bi"
        />
      </section>

      {/* Next Page Navigation */}
      <section aria-label="Next Page">
        <Heroes
          title="Lihat Resume"
          buttonItem={nextPageHeroesButtonItem}
          icon="resume"
        >
          Lihat resume untuk melihat pendidikan dan pengalaman kerja saya
        </Heroes>
      </section>

      {/* Error Toast Notification */}
      <ErrorToast message={fetchErrorMessage} />
    </AppLayout>
  );
}
