import AppLayout from "@/components/layouts/layout";
import Jumbotron from "@/components/ui/bootstrap/jumbotron";
import NextImage from "@/components/ui/next/next-image";
import myPhoto from "@/assets/images/profile.jpg";
import CardGroup from "@/components/ui/bootstrap/card-group";
import Card from "@/components/ui/bootstrap/card";
import Feature from "@/components/ui/bootstrap/feature";
import { hobbyItems, profileItem, skillItems } from "@/lib/data/profileData";
import { Metadata } from "next";
import jumbotronImage from "../../../../assets/images/jumbotron/home.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Tentang Saya",
  description:
    "Pelajari tentang saya beserta keterampilan, filosofi, dan hobi yang saya miliki",
};

// Get Data from JSON (Single)
const userProfile = profileItem[0];

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

export default function Profile() {
  console.log("Profile data:", userProfile);
  console.log("Detailed Profile:", profileDetails);

  return (
    <AppLayout>
      {/* Jumbotron */}
      <JumbotronTitle
        title="Profil"
        description={`${userProfile.status} | ${userProfile.tagline}`}
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* My Profile */}
      <div className="row g-3 pb-3">
        {/* Profile Image */}
        <div className="col-12 col-lg-4">
          <div
            className="border rounded-3 position-relative h-100"
            style={{ minHeight: "300px" }}
          >
            <NextImage
              src={myPhoto}
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
