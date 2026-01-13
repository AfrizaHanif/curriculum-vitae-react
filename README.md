This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Production config (reCAPTCHA & Formspree) 🔧

This project supports two ways to provide production values for the reCAPTCHA site key and Formspree form id:

1. Environment variables at build time (recommended when you can set envs on the host)
2. A runtime JSON file in `public/` (useful on shared hosting where you can't set envs)

### 1) Build-time env vars

- Dev: set your dev keys in `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_dev_site_key
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_dev_form_id_or_url
```

- Prod: set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `NEXT_PUBLIC_FORMSPREE_FORM_ID` in your production environment or in a `.env.production` and run `npm run build` on the production host.

> Note: Next.js inlines `NEXT_PUBLIC_*` values at build time — changing those values requires a rebuild.

### 2) Runtime config (`public/site-config.json`) — no rebuild needed

Create a `public/site-config.json` file (upload via FTP or Hostinger File Manager) with this structure:

```json
{
  "siteKey": "REPLACE_WITH_PROD_RECAPTCHA_SITE_KEY",
  "formId": "REPLACE_WITH_PROD_FORMSPREE_FORM_ID_OR_URL"
}
```

- The client can fetch this file at runtime and override any env-based defaults. By default the app only loads the runtime file in production so development uses your `.env.local` values. This is ideal for shared hosting (no ability to set Node env vars) because you can replace the file without rebuilding the app.

- Example client-side snippet (e.g. in the contact form component):

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

### Hostinger (shared hosting) quick steps

- Upload `public/site-config.json` to your site's `public/` (document root) using Hostinger File Manager or FTP.
- No rebuild needed — the client will fetch the file at runtime.
- To update the production keys later, replace the uploaded `site-config.json` file.

### Important notes ⚠️

- reCAPTCHA site keys are public values (safe in client code), but **keep the reCAPTCHA secret key on a server** and never expose it in client-side code.
- Make sure each reCAPTCHA site key is configured to accept the corresponding domain (localhost for dev, your live domain for prod).
- Formspree IDs may be provided as full URLs — the client can extract the ID with `.split('/').pop()`.
