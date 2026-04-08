![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deskripsi Proyek

Proyek ini adalah website curriculum vitae (CV) atau resume yang responsif dan interaktif. Didesain untuk menampilkan pengalaman profesional, keahlian, dan proyek portofolio dalam format web modern.

## Teknologi yang Digunakan

| Teknologi       | Deskripsi          |
| --------------- | ------------------ |
| Next.js         | React Framework    |
| React           | UI Library         |
| Laravel (API)   | Backend API        |
| React Leaflet   | Peta (Maps)        |
| Bootstrap       | CSS Framework      |
| React Bootstrap | Komponen Bootstrap |
| TypeScript      | Static Typing      |
| Sass            | CSS Preprocessor   |

## Memulai

### Prasyarat

- **Node.js**: Versi 18.x atau terbaru.
- **Laravel Backend**: Pastikan API Laravel sudah berjalan dan dapat diakses.
- **Package Manager**: npm, yarn, pnpm, atau bun.

Pertama, jalankan server pengembangan:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

Anda dapat mulai mengedit halaman dengan memodifikasi `app/page.tsx`. Halaman akan diperbarui secara otomatis saat Anda mengedit file tersebut.

---

## Konfigurasi API

Proyek ini dikonfigurasi untuk mengambil data secara dinamis dari API Laravel.

### Environment Variables

Proyek ini mendukung hierarki file environment Next.js. Secara default, variabel dimuat dengan urutan prioritas berikut:

1. `.env.local` (Prioritas tertinggi, tidak di-commit)
2. `.env.development` (Pengaturan khusus development)
3. `.env` (Nilai default)

**Saran penggunaan:**

- Gunakan `.env.development` untuk URL API standar tim/lokal yang umum.
- Gunakan `.env.local` untuk menimpa pengaturan tersebut secara spesifik di komputer Anda atau untuk menyimpan kunci rahasia.

Tambahkan konfigurasi berikut pada file `.env` pilihan Anda:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 # URL API Laravel Anda
NEXT_PUBLIC_APP_URL=http://localhost:3000     # URL aplikasi Next.js Anda (untuk Sanctum)
```

### Endpoint API

Aplikasi ini memiliki beberapa endpoint utama dari Laravel:

| Method | Endpoint          | Deskripsi                                       |
| :----- | :---------------- | :---------------------------------------------- |
| `GET`  | `/api/profile`    | Mengambil data profil dan ringkasan pribadi.    |
| `GET`  | `/api/resume`     | Mengambil data pendidikan dan pengalaman kerja. |
| `GET`  | `/api/portfolios` | Mengambil daftar lengkap item portfolio.        |
| `GET`  | `/api/projects`   | Mengambil daftar proyek sampingan/personal.     |
| `GET`  | `/api/blogs`      | Mengambil daftar artikel / postingan blog.      |

### Struktur Data JSON

Sesuai dengan implementasi di `src/lib/laravel.ts`, aplikasi ini mengharapkan data dikumpulkan dalam properti data (standar Laravel API Resources).

**Contoh Response (Portfolios):**

```json
{
  "data": [
    {
      "id": "POR-001",
      "title": "Judul Proyek",
      "slug": "judul-proyek",
      "category": "Proyek Akademik",
      "image": "/images/portfolios/POR-001.png",
      "technology": ["Laravel", "React"],
      "description": "Deskripsi singkat proyek..."
    }
  ]
}
```

**Catatan Implementasi:**

- Jika API Laravel mengembalikan error (Selain 200 (non-200)), sistem akan mencatat error di console dan melempar `Error`
- Fungsi fetchLaravel secara otomatis melakukan unwrapping pada properti `data`, sehingga di komponen Anda bisa langsung mengakses array atau objek utamanya.
- Pastikan Laravel Anda sudah mengizinkan CORS dari domain frontend.

### Mekanisme Fallback (Data Lokal)

Aplikasi ini menggunakan sistem fetch dengan fitur fallback. Jika API tidak dapat dijangkau atau URL tidak diatur, aplikasi akan secara otomatis menggunakan data lokal yang tersedia di `src/lib/data/` untuk memastikan website tetap berjalan.

## Konfigurasi Produksi (Analytics, reCAPTCHA & Formspree) 🔧

Proyek ini mendukung dua cara untuk menyediakan nilai produksi untuk Google Analytics, reCAPTCHA, dan Formspree:

1. Menggunakan environment variables (.env) saat build (direkomendasikan jika Anda bisa mengatur env di host)
2. File JSON runtime di `public/` (berguna di shared hosting di mana Anda tidak bisa mengatur env)

### 1) Build-time env vars

- Dev: atur kunci dev anda di `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_dev_site_key
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_dev_form_id_or_url
```

- Prod: atur `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` dan `NEXT_PUBLIC_FORMSPREE_FORM_ID` di .env Anda (`.env.production`) dan jalankan `npm run build`.

> Catatan: Next.js menyisipkan nilai `NEXT_PUBLIC_*` pada saat build — mengubah nilai tersebut memerlukan build ulang.

### 2) Konfigurasi Runtime (`public/site-config.json`) — tanpa build ulang

Buat file `public/site-config.json` (upload melalui FTP or Hostinger File Manager) dengan struktur berikut:

```json
{
  "formId": "REPLACE_WITH_PROD_FORMSPREE_FORM_ID_OR_URL",
  "siteKey": "REPLACE_WITH_PROD_RECAPTCHA_SITE_KEY",
  "googleAnalyticsId": "G-XXXXXXXXXX"
}
```

- Klien dapat mengambil file tersebut saat runtime dan menimpa pengaturan default berbasis env. Secara default, aplikasi hanya memuat file runtime di lingkungan produksi sehingga pengembangan menggunakan nilai `.env.local` Anda. Ini bermanfaat untuk shared hosting (tidak ada kemampuan untuk mengatur .env Node) karena Anda dapat mengganti file tanpa membangun ulang aplikasi.

- Contoh kodingan sisi klien (Sebagai contoh, pada komponen formulir kontak):

```ts
useEffect(() => {
  fetch("/site-config.json")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data) return;
      if (data.siteKey) setSiteKey(data.siteKey);
      if (data.formId)
        setFormId((data.formId || "").split("/").pop() || initialFormId);
    })
    .catch(() => {});
}, []);
```

**Catatan:** `googleAnalyticsId` dimuat saat proses build melalui `layout.tsx`. Jika Anda mengubah ID ini di `site-config.json`, Anda harus **membangun ulang** aplikasi agar perubahan tersebut berlaku.

### Setup Hostinger (shared hosting)

- Upload `public/site-config.json` ke folder `public/` (document root) pada situs anda menggunakan Hostinger File Manager atau FTP.
- Tidak perlu melakukan rebuild (Build ulang) — client akan mengambil file tersebut saat runtime.
- Untuk memperbarui kunci produksi di kemudian hari, ganti file `site-config.json` yang telah diunggah.

### Catatan Penting ⚠️

- reCAPTCHA site keys adalah kunci yang dapat dilihat oleh publik (Aman di client), tetapi **wajib simpan kunci rahasia (secret key) di server** dan jangan pernah mengeksposnya di kode client-side.
- Pastikan setiap kunci situs reCAPTCHA dikonfigurasi untuk menerima domain yang sesuai (localhost untuk development (local), domain asli untuk production (live site)).
- ID Formspree dapat diberikan sebagai URL lengkap — klien dapat mengekstrak ID dengan `.split('/').pop()`.

---

## Struktur Folder Utama 📂

- `src/app/`: Routing dan halaman aplikasi (Next.js App Router).
- `src/lib/laravel.ts`: Wrapper API Fetch untuk komunikasi dengan backend Laravel.
- `src/lib/data/`: Data statis (fallback) jika API tidak tersedia.
- `src/types/`: Definisi interface TypeScript untuk data API.
- `public/`: Asset statis (gambar, favicon) dan konfigurasi runtime.

## Script Tersedia

| Command         | Deskripsi                                         |
| :-------------- | :------------------------------------------------ |
| `npm run dev`   | Menjalankan server pengembangan.                  |
| `npm run build` | Membuat build produksi yang dioptimalkan.         |
| `npm run start` | Menjalankan aplikasi hasil build produksi.        |
| `npm run lint`  | Memeriksa kesalahan pengetikan atau standar kode. |

---

## Dokumentasi Teknis: Mekanisme Fetch with Fallback 🛡️

Proyek ini mengimplementasikan strategi "Hybrid Data Source" untuk memastikan website selalu dapat diakses oleh pengunjung, baik saat backend sedang aktif maupun tidak.

### 1. Arsitektur Helper `fetchLaravel`

Fungsi utama berada di `src/lib/laravel.ts`. Helper ini adalah wrapper di atas standar `fetch` API dengan fitur:

- **Otentikasi Otomatis**: Mendukung Laravel Sanctum dengan meneruskan cookie di sisi server (SSR) dan header `X-XSRF-TOKEN` di sisi klien.
- **Retry Mechanism**: Mencoba kembali permintaan hingga 3 kali jika terjadi kegagalan jaringan sebelum benar-benar menyerah.
- **Auto-Unwrapping**: Secara otomatis mengambil properti `.data` dari respon Laravel API Resource.
- **Server & Client Ready**: Berjalan lancar di Server Components maupun Client Components.

### 2. Logika Fallback

Aplikasi ini menggunakan helper `fetchWithFallback` untuk menangani logika percobaan fetch dan transisi ke data statis secara otomatis.

**Contoh Implementasi:**

```typescript
import { fetchWithFallback } from "@/lib/fetch-with-fallback";
import { fetchLaravel } from "@/lib/laravel";
import { blogItems } from "@/lib/data/blogData";

const { data, error } = await fetchWithFallback<BlogItem[]>(
  fetchLaravel<BlogItem[]>("api/blogs"),
  blogItems, // Fallback bersifat opsional
  "Pesan error kustom",
);
```

### 3. Keunggulan Tipe Data (Overloading)

Helper ini mendukung _function overloading_ di TypeScript:

- **Jika fallback diberikan**: Tipe data hasil (`data`) dijamin sesuai dengan tipe data yang diminta (`T`).
- **Jika fallback tidak diberikan**: Tipe data hasil (`data`) akan menjadi `T | undefined`.

Hal ini memungkinkan komponen untuk tetap aman secara tipe data tanpa perlu pengecekan manual yang berulang jika data statis sudah disediakan sebagai cadangan.

### 4. Keuntungan Strategi Ini

- **Zero Downtime**: Website tidak akan menampilkan halaman error jika backend Laravel Anda sedang maintenance atau mati.
- **Performa Cepat**: Saat fase pengembangan atau jika API lambat, data lokal memberikan respon instan.
- **SEO Optimal**: Karena Next.js mencoba melakukan fetch di sisi server, crawler mesin pencari tetap mendapatkan konten lengkap meskipun API sedang tidak stabil (menggunakan fallback).

### 5. Penanganan Error

Sistem menggunakan class `LaravelError` khusus untuk menangkap:

- Status kode HTTP (404, 500, dsb).
- Pesan error spesifik dari Laravel (Validation errors).
- Data tambahan yang dikirimkan oleh API untuk keperluan debugging.
