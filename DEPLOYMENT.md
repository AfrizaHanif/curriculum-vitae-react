# 🚀 Hostinger Deployment Guide

This project uses GitHub Actions to build the Next.js static export and sync it to Hostinger via SFTP (lftp).

## 1. GitHub Environments

Create two environments in **Settings > Environments**:

- `production` (linked to `main` or `master` branch)
- `staging` (for all other branches)

## 2. Secrets (Settings > Secrets and variables > Actions)

| Secret Name                | Description                              | Example                   |
| :------------------------- | :--------------------------------------- | :------------------------ |
| `FTP_HOST`                 | Your Hostinger server IP or Domain       | `access123.hosting.com`   |
| `FTP_USERNAME`             | Your SSH/FTP username                    | `u123456789`              |
| `FTP_PASSWORD`             | Your SSH/FTP password (used as fallback) | `YourSecurePassword`      |
| `SSH_PRIVATE_KEY`          | The private key generated for deployment | `-----BEGIN OPENSSH...`   |
| `SSH_HOST_KEY`             | Server fingerprint (via `ssh-keyscan`)   | `host.com ssh-rsa AAA...` |
| `MAINTENANCE_BYPASS_TOKEN` | A custom secret string you create        | `any-random-string-123`   |

> **Note:** To get the `SSH_HOST_KEY`, run:  
> `ssh-keyscan -p 65002 -t rsa <YOUR_FTP_HOST>`

> **⚠️ Security Warning:** Since this repository is **PUBLIC**, never commit SSH key files (like `id_rsa`) directly to the repository. Only store them in GitHub Secrets. If you accidentally push a private key, delete it from the server and generate a new one immediately.

## 3. Generating the Maintenance Bypass Token

You can create any random string for `MAINTENANCE_BYPASS_TOKEN`. This acts as a "secret handshake." The GitHub Action sends this token in the `X-Maintenance-Bypass` header to verify the site is up while the maintenance screen is active for the public.

## 4. Variables (Settings > Secrets and variables > Actions)

| Variable Name             | Description                           | Example                    |
| :------------------------ | :------------------------------------ | :------------------------- |
| `NEXT_PUBLIC_BACKEND_URL` | Your API URL                          | `https://api.yoursite.com` |
| `NEXT_PUBLIC_APP_URL`     | Your live website URL                 | `https://yoursite.com`     |
| `REMOTE_PATH`             | The folder on the server to deploy to | `public_html/`             |

## 4. How the Workflow Works

1. **Confirmation:** The workflow requires a manual trigger (`workflow_dispatch`) with a boolean checkbox to prevent accidental deployments.
2. **Backup:** It creates a timestamped backup of your current server files before touching anything.
3. **Maintenance Mode:**
   - Uploads a `maintenance.html`.
   - Replaces `.htaccess` to redirect all traffic (except your `MAINTENANCE_BYPASS_TOKEN`) to the maintenance page.
4. **Sync:** Uses `lftp mirror` to upload the `out/` folder. It uses the SSH Key first and falls back to the Password automatically if needed.
5. **Smoke Test:**
   - It pings `version.json` on your live site using the bypass token.
   - It compares the remote Git SHA with the current build SHA.
6. **Rollback:** If the smoke test fails, it automatically restores the backup and brings the old site back online.
7. **Cleanup:** If successful, it deletes the remote backup to save disk space.

## 5. Testing & Bypassing Maintenance Mode

While the site is deploying, you can view the progress on the live URL by adding the header or using a specific URL structure if your `.htaccess` supports it, but the primary method in this workflow is via the `X-Maintenance-Bypass` header used by the Smoke Test.

### How to test the bypass in your browser

1. Install a browser extension like **ModHeader**.
2. Add a new Request Header:
   - **Name:** `X-Maintenance-Bypass`
   - **Value:** `<Your Token>`
3. Navigate to your site. You should see the content while others see the maintenance page.

## 6. Troubleshooting

- **SSH Key Failures:** If the "Bootstrap" step fails, check if Hostinger has SSH enabled in the panel.
- **Account Locking:** If Hostinger blocks your connection, it is likely due to too many failed attempts. Ensure your `FTP_PASSWORD` is correct and SSH is enabled in hPanel. The "Bootstrap" step is only meant to run once; after the first successful run, it will be skipped automatically.
- **Timeout:** If the sync times out, check if your `REMOTE_PATH` is correct and writable.
- **Version Mismatch:** If the smoke test fails but files look correct, ensure your Hostinger account isn't behind a heavy Nginx cache (Hostinger "Enhanced Cache").
