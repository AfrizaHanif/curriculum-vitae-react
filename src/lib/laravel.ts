// Define the base URL from environment variables or default to localhost
const getBackendUrl = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  if (
    process.env.NODE_ENV === "development" &&
    !process.env.NEXT_PUBLIC_BACKEND_URL
  ) {
    console.warn(
      "[Laravel Lib] NEXT_PUBLIC_BACKEND_URL is not defined, defaulting to localhost:8000",
    );
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[Laravel Lib] Connecting to backend at: ${url}`);
  }

  // Ensure no trailing slash to prevent double-slash issues later
  return url.replace(/\/$/, "");
};

interface FetchLaravelOptions extends RequestInit {
  skipAuth?: boolean;
  retries?: number;
  retryDelay?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export class LaravelError extends Error {
  constructor(
    public message: string,
    public status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any,
  ) {
    super(message);
    this.name = "LaravelError";
  }
}

/**
 * Helper to fetch data from Laravel API in Server Components.
 * Automatically forwards cookies for Sanctum authentication.
 */
export async function fetchLaravel<T>(
  path: string,
  options: FetchLaravelOptions = {},
): Promise<T> {
  const { skipAuth, retries = 3, retryDelay = 2000, ...fetchOptions } = options;

  // Prepare headers
  const headers = new Headers(fetchOptions.headers);

  // Standard headers for Laravel
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  // Check if running on server
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Required for Sanctum to authorize the request origin (server-to-server)
    headers.set(
      "Referer",
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    );

    // Forward cookies from the client request to the Laravel API request
    if (!skipAuth) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      if (cookieStore.size > 0) {
        headers.set("Cookie", cookieStore.toString());
      }
    }
  } else {
    // Client-side: Retrieve XSRF-TOKEN from cookies and set the header
    // Laravel Sanctum sets this cookie (not HttpOnly) so it can be read by JS
    const match = document.cookie.match(
      new RegExp("(^|;\\s*)XSRF-TOKEN=([^;]*)"),
    );
    const token = match ? decodeURIComponent(match[2]) : null;

    if (token) {
      headers.set("X-XSRF-TOKEN", token);
    }
  }

  // const method = fetchOptions.method || "GET";

  // Construct full URL
  const endpoint = path.startsWith("/") ? path : `/${path}`;
  const url = `${getBackendUrl()}${endpoint}`;

  // console.log(`[Laravel] ${method} ${url}`);

  let response: Response | undefined;
  let lastError: unknown;

  // Retry loop for unstable connections
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Default to 'no-store' unless revalidate is specified to avoid Next.js warning
      const cache =
        fetchOptions.next?.revalidate !== undefined ? undefined : "no-store";

      response = await fetch(url, {
        credentials: "include", // Ensure cookies are sent on client-side requests
        cache,
        ...fetchOptions,
        headers,
      });
      break; // Success, exit loop
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  if (!response) {
    console.error(
      `[Laravel API] Network request failed for ${url} after ${retries + 1} attempts`,
      lastError,
    );
    throw lastError || new Error("Network request failed");
  }

  if (!response.ok) {
    let errorMessage = response.statusText;
    let errorData = null;
    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fallback to status text if JSON parsing fails
    }

    console.error(
      `[Laravel API] Error ${response.status} on ${path}: ${errorMessage}`,
    );
    throw new LaravelError(errorMessage, response.status, errorData);
  }

  // Handle 204 No Content or empty responses
  if (response.status === 204) return {} as T;

  const jsonResponse = await response.json();

  // Automatically unwrap Laravel's 'data' property if it exists
  if (
    jsonResponse &&
    typeof jsonResponse === "object" &&
    "data" in jsonResponse
  ) {
    return jsonResponse.data as T;
  }

  // Otherwise, return the full response
  return jsonResponse as T;
}
