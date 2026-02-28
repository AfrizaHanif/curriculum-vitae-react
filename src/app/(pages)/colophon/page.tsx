"use client";

import AppLayout from "@/components/layouts/layout";
import JumbotronTitle from "@/components/ui/customs/jumbotron-title";
// Reusing the portfolio image, or you can add a specific image for this page
import jumbotronImage from "../../../assets/images/jumbotron/colophon.jpg";
import Alert from "@/components/ui/bootstrap/alert";
import Button from "@/components/ui/bootstrap/button";

export default function Colophon() {
  return (
    <AppLayout>
      {/* Jumbotron */}
      <JumbotronTitle
        title="Spesifikasi Website"
        description="Detail teknis, teknologi, dan alat bantu di balik pembuatan website ini."
        backgroundImg={jumbotronImage.src}
        className="my-3"
      />

      <main className="row g-5">
        {/* Main Content */}
        <div className="col-lg-8">
          <article className="blog-post">
            {/* Overview */}
            <h2 className="blog-post-title mb-1">Overview</h2>
            <p className="blog-post-meta text-body-secondary">
              Tentang pengembangan portfolio ini
            </p>
            <p>
              Website ini dirancang sebagai etalase digital untuk menampilkan
              perjalanan karir dan proyek saya. Dibangun dengan pendekatan{" "}
              <em>modern web development</em>, situs ini mengutamakan performa,
              aksesibilitas, dan kode yang bersih (clean code).
            </p>
            <hr />

            {/* Technologies */}
            <h3>Teknologi Utama</h3>
            <p>Berikut adalah stack teknologi yang digunakan:</p>
            <ul>
              <li>
                <strong>Framework:</strong> Next.js 14 (App Router)
              </li>
              <li>
                <strong>Language:</strong> TypeScript
              </li>
              <li>
                <strong>UI/Styling:</strong> Bootstrap 5, CSS Modules, SASS
              </li>
              <li>
                <strong>Icons:</strong> Bootstrap Icons
              </li>
              <li>
                <strong>Linting:</strong> ESLint & Prettier
              </li>
              <li>
                <strong>Hosting:</strong> Hostinger
              </li>
              <li>
                <strong>Tools:</strong> Visual Studio Code
              </li>
            </ul>

            {/* AI Assistant */}
            <h3>Penggunaan AI Assistant</h3>
            <p>
              Sebagai pengembang yang adaptif, saya memanfaatkan teknologi AI
              untuk meningkatkan efisiensi kerja:
            </p>
            <ul>
              <li>
                <strong>Gemini Code Assist:</strong> Digunakan sebagai mitra{" "}
                <em>brainstorming</em> untuk struktur komponen, refactoring
                kode, dan pemecahan masalah (debugging) yang kompleks.
              </li>
              <li>
                <strong>GitHub Copilot:</strong> Membantu mempercepat penulisan
                kode boilerplate.
              </li>
            </ul>
            <Alert color={"info"}>
              <i className="bi bi-info-circle-fill me-2"></i>
              Meskipun menggunakan AI, seluruh arsitektur, logika bisnis, dan
              keputusan desain dikendalikan penuh oleh saya untuk memastikan
              kualitas dan keamanan kode.
            </Alert>

            {/* Features */}
            <h3>Fitur Unggulan</h3>
            <dl className="row">
              <dt className="col-sm-4">Responsive Design</dt>
              <dd className="col-sm-8">
                Layout adaptif untuk Mobile, Tablet, dan Desktop.
              </dd>
              <dt className="col-sm-4">Dark Mode</dt>
              <dd className="col-sm-8">
                Mendukung tema gelap/terang yang tersinkronisasi dengan
                preferensi sistem.
              </dd>
              <dt className="col-sm-4">SEO Friendly</dt>
              <dd className="col-sm-8">
                Implementasi Metadata API Next.js untuk optimasi mesin pencari.
              </dd>
            </dl>

            {/* Credits */}
            <h3>Kredit & Sumber Daya</h3>
            <p>
              Meskipun tidak diwajibkan, saya ingin memberikan apresiasi kepada
              sumber daya yang mendukung visual website ini:
            </p>
            <ul>
              <li>
                Foto ilustrasi oleh para kreator di{" "}
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>
                .
              </li>
            </ul>
          </article>
        </div>

        {/* Source Code */}
        <aside className="col-lg-4">
          <div className="sticky-lg-top" style={{ top: "2rem" }}>
            <div className="p-4 mb-3 bg-body-tertiary rounded">
              <h4 className="fst-italic">Source Code</h4>
              <p className="mb-0">
                Kode sumber website ini bersifat terbuka (open-source). Anda
                dapat melihat struktur kode dan riwayat commit di GitHub.
              </p>
              <Button
                as="a"
                color="primary"
                className="mt-3"
                href="https://github.com/AfrizaHanif/curriculum-vitae-react"
                outline
                fullWidth
                newTab
              >
                <i className="bi bi-github me-2"></i>
                Lihat Repository
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </AppLayout>
  );
}
