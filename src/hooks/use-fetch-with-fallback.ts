"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWithFallback } from "@/lib/fetch-with-fallback";

interface UseFetchResult<T> {
  data: T | undefined;
  error?: string;
  isLoading: boolean;
  refresh: () => void;
}

/**
 * A custom hook for client-side fetching that leverages the existing
 * fetchWithFallback utility for consistent error handling and fallback behavior.
 *
 * @param fetchFn - Function that returns a Promise (e.g. () => fetchLaravel(...))
 * @param fallbackValue - Static data to show initially or on error
 * @param errorMessage - Custom error message
 * @param validator - Optional validation function
 * @param deps - Dependency array to trigger re-fetch (similar to useEffect)
 */
export function useFetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackValue: T,
  errorMessage?: string,
  validator?: (data: T) => boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[],
): UseFetchResult<T> & { data: T };

export function useFetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackValue?: T,
  errorMessage?: string,
  validator?: (data: T) => boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[],
): UseFetchResult<T>;

export function useFetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackValue?: T,
  errorMessage: string = "Gagal memuat data.",
  validator?: (data: T) => boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
): UseFetchResult<T> {
  // Initialize with fallback to ensure data is always available immediately
  const [data, setData] = useState<T | undefined>(fallbackValue);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // Trigger state for manual refresh
  const [trigger, setTrigger] = useState(0);

  const refresh = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    // Reset error on new fetch attempt
    setError(undefined);

    const loadData = async () => {
      // Reuse the existing helper to handle the promise logic, validation, and error logging
      const result = await fetchWithFallback(
        fetchFn, // Pass the function itself so it can be retried
        fallbackValue,
        errorMessage,
        validator,
      );

      if (isMounted) {
        setData(result.data);
        setError(result.error);
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...deps]);

  return { data, error, isLoading, refresh };
}
