/**
 * A reusable helper to fetch data with a static fallback and error handling.
 *
 * @param fetchInput - A Promise or a function returning a Promise (required for retries)
 * @param fallbackValue - Optional static data to use if the fetch fails
 * @param errorMessage - The error message to return if the fetch fails
 * @param validator - Optional function to validate the fetched data (e.g., check for empty arrays)
 */
export async function fetchWithFallback<T>(
  fetchInput: Promise<T> | (() => Promise<T>),
  fallbackValue: T,
  errorMessage?: string,
  validator?: (data: T) => boolean,
): Promise<{ data: T; error?: string }>;

export async function fetchWithFallback<T>(
  fetchInput: Promise<T> | (() => Promise<T>),
  fallbackValue?: T,
  errorMessage?: string,
  validator?: (data: T) => boolean,
): Promise<{ data: T | undefined; error?: string }>;

export async function fetchWithFallback<T>(
  fetchInput: Promise<T> | (() => Promise<T>),
  fallbackValue?: T,
  errorMessage: string = "Gagal memuat data.",
  validator?: (data: T) => boolean,
): Promise<{ data: T | undefined; error?: string }> {
  const isDev = process.env.NODE_ENV !== "production";

  try {
    // Execute the function if it's a function, otherwise await the promise
    const promise =
      typeof fetchInput === "function" ? fetchInput() : fetchInput;
    const data = await promise;

    // Run custom validator if provided (e.g., ensure array is not empty)
    if (validator && !validator(data)) {
      //
      throw new Error("Data validation failed for fetched data.");
    }

    return { data };
  } catch (err) {
    const isStrictApiMode = process.env.NEXT_PUBLIC_STRICT_API === "true";

    if (isStrictApiMode) {
      console.error(`[Strict API Mode] Fetch failed for: ${errorMessage}`, err);
      throw err; // Re-throw the error to fail the build/request in strict mode
    }

    if (isDev) {
      console.warn(`Fetch failed (${errorMessage}). Using fallback.`);
      console.error(err);
    }

    return { data: fallbackValue, error: errorMessage };
  }
}
