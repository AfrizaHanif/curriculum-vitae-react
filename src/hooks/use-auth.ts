"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchLaravel, LaravelError } from "@/lib/laravel";

// Define your User type
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

interface UseAuthOptions {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
}

interface LoginParams {
  email: string;
  password: string;
  remember?: boolean;
  setErrors?: (errors: Record<string, string[]>) => void;
  setStatus?: (status: string | null) => void;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated = "/dashboard",
}: UseAuthOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the authenticated user
  const getUser = async () => {
    try {
      const data = await fetchLaravel<User>("api/user");
      setUser(data);
      return data;
    } catch (err) {
      // 401 (Unauthorized) or 419 (Session Expired) means the user is not logged in.
      // We swallow these errors to set user = null, but re-throw others.
      const status = (err as LaravelError).status;
      if (status !== 401 && status !== 409) {
        console.error(err);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginParams) => {
    setErrors?.({});
    setStatus?.(null);
    setError(null);

    try {
      // 1. Initialize CSRF protection (Sanctum)
      await fetchLaravel("sanctum/csrf-cookie");

      // 2. Perform Login Request
      await fetchLaravel("login", {
        method: "POST",
        body: JSON.stringify(props),
      });

      // 3. Re-fetch user to update state
      await getUser();
    } catch (err: unknown) {
      const error = err as LaravelError;

      if (error.status === 422 && error.data?.errors && setErrors) {
        // Handle Validation Errors (e.g. "The email has already been taken")
        setErrors(error.data.errors);
      } else {
        // Handle Generic Errors
        setError(error.message);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetchLaravel("logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (err) {
      const error = err as LaravelError;
      setError(error.message);
    }
  };

  // Initial load
  useEffect(() => {
    if (!user && isLoading) {
      getUser();
    }
  }, [isLoading, user]);

  // Handle Middleware Redirects
  useEffect(() => {
    if (isLoading) return;

    // If "guest" middleware (e.g., Login page) and user exists -> redirect to dashboard
    if (middleware === "guest" && user && redirectIfAuthenticated) {
      router.replace(redirectIfAuthenticated);
    }

    // If "auth" middleware (e.g., Dashboard) and no user -> redirect to login
    if (middleware === "auth" && !user) {
      // Prevent infinite redirect loop if already on login
      if (pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [user, middleware, redirectIfAuthenticated, router, isLoading, pathname]);

  return {
    user,
    login,
    logout,
    isLoading,
    error,
    refreshUser: getUser,
  };
};
