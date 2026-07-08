import { useState } from "react";

interface UseFormSubmissionOptions<TResponse> {
  onSuccess?: (response: TResponse) => void;
  onError?: (error: unknown) => void;
}

export function useFormSubmission<TResponse, TData = unknown>(
  submitFn: (data: TData) => Promise<TResponse>,
  options?: UseFormSubmissionOptions<TResponse>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (data: TData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await submitFn(data);
      setIsSuccess(true);
      options?.onSuccess?.(response);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  return { isLoading, error, isSuccess, submit, reset };
}
