import AppLayout from "@/components/layouts/layout";
import Button from "@/components/ui/bootstrap/button";
import Feature from "@/components/ui/bootstrap/feature";
import Modal from "@/components/ui/bootstrap/modal";
import { expertiseItems } from "@/lib/data/expertiseData";
import { portfolioItems } from "@/lib/data/portfolioData";
import { ModalButtonItem } from "@/lib/bootstrap-types";
import { Metadata } from "next";
import Link from "next/link";
import jumbotronImage from "../../../../assets/images/jumbotron/expertise.jpg";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";

// Title and Description of Page (Metadata)
export const metadata: Metadata = {
  title: "Kehalian",
  description:
    "Pelajari keahlian yang saya miliki beserta proyek yang terlibat",
};

export default function Expertise() {
  // Items of button for modal
  const modalButtonItems: ModalButtonItem[] = [
    {
      label: "Tutup",
      type: "button",
      color: "secondary",
      dismiss: true,
    },
  ];

  return (
    <AppLayout>
      {/* Jumbotron */}
      <JumbotronTitle
        title="Keahlian"
        description="Saya mengubah ide kompleks menjadi solusi web yang fungsional, intuitif, dan berbasis data."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      {/* List of Expertise */}
      {/* Feature */}
      <Feature
        items={expertiseItems}
        id="expertise"
        type="columns"
        itemPerRow={2}
        chevron
      />
      {/* Modal */}
      {expertiseItems
        .filter((item) => item.dataTarget)
        .map((item) => {
          const linkedProjects = item.projects
            ? portfolioItems.filter((project) =>
                item.projects!.includes(project.id),
              )
            : [];

          return (
            <Modal
              key={item.key}
              id={item.dataTarget!}
              buttonItems={modalButtonItems}
              title={item.title}
              size="lg"
            >
              {/* Check if linked projects are available */}
              {linkedProjects.length > 0 ? (
                <>
                  <p className="lead">
                    Keahlian ini telah dibuktikan pada proyek sebagai berikut:
                  </p>
                  <ul className="list-unstyled">
                    {linkedProjects.map((project) => (
                      <li key={project.id} className="mb-2">
                        <div className="row justify-content-center align-items-center g-2">
                          <div className="col-8 fw-medium">{project.title}</div>
                          <div className="col-4">
                            <Link href={`/portfolio/${project.slug}`}>
                              <div className="d-grid" data-bs-dismiss="modal">
                                <Button color="primary">Lihat Proyek</Button>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="lead">
                  Saat ini belum ada proyek yang dapat ditampilkan untuk
                  keahlian ini.
                </p>
              )}
            </Modal>
          );
        })}
    </AppLayout>
  );
}
