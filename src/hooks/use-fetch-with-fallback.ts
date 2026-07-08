"use client";

import { useState, useEffect, useCallback, DependencyList, useRef } from "react";
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
  deps?: DependencyList,
): UseFetchResult<T> & { data: T };

export function useFetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackValue?: T,
  errorMessage?: string,
  validator?: (data: T) => boolean,
  deps?: DependencyList,
): UseFetchResult<T>;

export function useFetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallbackValue?: T,
  errorMessage: string = "Gagal memuat data.",
  validator?: (data: T) => boolean,
  deps: DependencyList = [],
): UseFetchResult<T> {
  // Initialize with fallback to ensure data is always available immediately
  const [data, setData] = useState<T | undefined>(fallbackValue);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // Track previous dependencies to trigger refetch on change
  const [prevDeps, setPrevDeps] = useState<DependencyList>(deps);
  const [trigger, setTrigger] = useState(0);

  const depsChanged =
    deps.length !== prevDeps.length ||
    deps.some((dep, i) => !Object.is(dep, prevDeps[i]));

  if (depsChanged) {
    setPrevDeps(deps);
    setTrigger((prev) => prev + 1);
  }

  const refresh = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  // Store callbacks/configs in refs inside useEffect to avoid accessing refs during render
  const latestFetchFn = useRef(fetchFn);
  const latestFallbackValue = useRef(fallbackValue);
  const latestErrorMessage = useRef(errorMessage);
  const latestValidator = useRef(validator);

  useEffect(() => {
    latestFetchFn.current = fetchFn;
    latestFallbackValue.current = fallbackValue;
    latestErrorMessage.current = errorMessage;
    latestValidator.current = validator;
  }, [fetchFn, fallbackValue, errorMessage, validator]);

  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => {
      if (isMounted) {
        setIsLoading(true);
        // Reset error on new fetch attempt
        setError(undefined);
      }
    });

    const loadData = async () => {
      // Reuse the existing helper to handle the promise logic, validation, and error logging
      const result = await fetchWithFallback(
        latestFetchFn.current, // Pass the function itself so it can be retried
        latestFallbackValue.current,
        latestErrorMessage.current,
        latestValidator.current,
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
  }, [trigger]);

  return { data, error, isLoading, refresh };
}
