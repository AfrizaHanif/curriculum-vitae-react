import { useState, useEffect } from "react";

let isFirstLoad = false;

export function useLoading(delay: number = 500) {
  const [isLoading, setIsLoading] = useState(isFirstLoad);

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        isFirstLoad = false;
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return isLoading;
}
