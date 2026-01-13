import AppLayout from "@/components/layouts/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "The requested page could not be found",
};

export default function NotFound() {
  return (
    <AppLayout showBreadcrumb={false}>
      <div className="container py-5 text-center">
        <h1 className="display-4">404 — Page not found</h1>
        <p className="lead">The page you are looking for could not be found.</p>
      </div>
    </AppLayout>
  );
}
