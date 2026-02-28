import {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  useCallback,
} from "react";

interface UseImageLoadingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  maxRetries?: number;
}

export function useImageLoading({
  src,
  onLoad,
  onError,
  maxRetries = 0,
}: UseImageLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isMounted = useRef(true);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset state synchronously when src changes to avoid flashing old content
  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Safety timeout to prevent infinite loading state
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (isMounted.current) setIsLoading(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      // Delay to ensure the fade-in transition is visible even for cached images
      setTimeout(() => {
        if (isMounted.current) setIsLoading(false);
      }, 150);
      onLoad?.(e);
    },
    [onLoad],
  );

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (retryCount < maxRetries) {
        // Exponential backoff: 0.5s, 1s, 2s...
        const delay = 500 * Math.pow(2, retryCount);
        setTimeout(() => {
          if (isMounted.current) {
            setRetryCount((prev) => prev + 1);
          }
        }, delay);
        return;
      }

      if (!hasError) {
        setHasError(true);
      }
      setIsLoading(false);
      onError?.(e);
    },
    [retryCount, maxRetries, hasError, onError],
  );

  return {
    isLoading,
    hasError,
    handleLoad,
    handleError,
    retryKey: retryCount,
  };
}
