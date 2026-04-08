/**
 * Resolves an asset path (Image or PDF) into a full URL.
 * Handles full URLs, base64 strings, relative API paths, and Next.js StaticImageData.
 */
export function resolveAssetUrl(
  path: string | { src: string } | null | undefined,
): string {
  if (!path) return "";

  // 1. Handle Next.js StaticImageData objects (from local imports)
  if (typeof path === "object" && path !== null && "src" in path) {
    return path.src;
  }

  if (typeof path !== "string") return "";

  // 2. If it's already a full URL or a base64 string, return it as is
  if (/^(http|https|data):/i.test(path)) {
    return path;
  }

  // 4. Resolve relative path from Laravel API
  let baseUrl =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fallback for development if Env Var is missing
  if (!baseUrl && process.env.NODE_ENV === "development") {
    // Dynamically detect the hostname being used to access the frontend
    if (typeof window !== "undefined") {
      const currentHostname = window.location.hostname;
      baseUrl = `http://${currentHostname}:8000`;
    } else {
      // SSR fallback
      baseUrl = "http://localhost:8000";
    }
  }

  if (!baseUrl) return path; // In production, return relative path if no base URL

  baseUrl = baseUrl.replace(/\/$/, "");

  // If the path already includes the storage prefix, just append the host
  if (path.startsWith("/storage/")) {
    return `${baseUrl}${path}`;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${baseUrl}/storage/${cleanPath}`;
}
