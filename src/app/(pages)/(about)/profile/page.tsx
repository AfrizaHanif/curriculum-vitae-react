import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/react/next-image";
import myPhoto from "@/assets/images/profile.jpg";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import Feature from "@/components/ui/bootstrap/feature";
import { hobbyItems, profileItem, skillItems } from "@/lib/data/profileData";
import { Metadata } from "next";
import jumbotronImage from "../../../../assets/images/jumbotron/home.jpg";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Tentang Saya",
  description:
    "Pelajari tentang saya beserta keterampilan, filosofi, dan hobi yang saya miliki",
};

// Get Data from JSON (Single)
const userProfile = profileItem[0];

// --- Dynamic Date and Age Calculation ---
const birthDate = new Date(userProfile.birthday);
const today = new Date();

// 1. Format the birthday to be more readable (e.g., "8 April 1996")
const formattedBirthday = birthDate.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// 2. Calculate the age dynamically
let age = today.getFullYear() - birthDate.getFullYear();
const monthDifference = today.getMonth() - birthDate.getMonth();
if (
  monthDifference < 0 ||
  (monthDifference === 0 && today.getDate() < birthDate.getDate())
) {
  age--;
}

// Create a new object for the biodata table for better formatting
const profileDetails = {
  "Nama Lengkap": userProfile.fullname,
  "Tanggal Lahir": formattedBirthday,
  Umur: `${age} tahun`,
  Alamat: `${userProfile.current_city}, ${userProfile.current_province}`,
  Email: userProfile.email,
  Telepon: userProfile.phone,
};

export default function Profile() {
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
            <h1 className="display-5 fw-bold">Profil</h1>
            <p className="col-md-8 fs-4">
              {userProfile.status} | {userProfile.tagline}
            </p>
          </div>
        </div>
      </Jumbotron>

      {/* My Profile */}
      <div className="row g-0 pb-3 text-center">
        {/* Profile Image */}
        <div
          className="col-4 border rounded-3 position-relative"
          style={{ minHeight: "400px" }}
        >
          <NextImage
            src={myPhoto}
            alt="My Profile Photo"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-3" // Keep rounded corners
          />
        </div>
        {/* Detail of Profile */}
        <div className="col-8">
          <div
            className="ms-3 p-4 text-body border rounded-3 text-start bg-body"
            style={{ height: "400px" }}
          >
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
      </div>

      {/* Skills */}
      <CardGroup title="Keterampilan / Keahlian">
        {skillItems.map((item) => (
          <Card key={item.key} insideGroup>
            <h2 className="card-title text-center col">{item.name}</h2>
            <div className="text-center pb-1 text-body-secondary">
              <i>
                {item.level} sejak {item.since}
              </i>
            </div>
          </Card>
        ))}
      </CardGroup>

      {/* Philosophy */}
      <Jumbotron backgroundColor="tertiary" className="my-2">
        <h2>Filosofi Kerja Saya</h2>
        <p className="lead">{userProfile.philosophy}</p>
      </Jumbotron>

      {/* Hobbies */}
      <Feature
        id="hobby"
        items={hobbyItems}
        type="hanging"
        title="Hobi & Minat"
        itemPerRow={4}
      />
    </AppLayout>
  );
}
