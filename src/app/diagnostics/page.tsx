/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { fetchLaravel } from "@/lib/laravel";

export default function DiagnosticsPage() {
  const [results, setResults] = useState<{
    envLoaded: boolean;
    backendUrl: string;
    csrfTokenFound: boolean;
    connectionStatus: "pending" | "success" | "error";
    errorMessage: string;
    apiData: any;
  }>({
    envLoaded: false,
    backendUrl: "",
    csrfTokenFound: false,
    connectionStatus: "pending",
    errorMessage: "",
    apiData: null,
  });

  const runDiagnostics = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "Not Defined";

    // 1. Check Cookies for XSRF-TOKEN (Sanctum Check)
    const hasCsrf = document.cookie.includes("XSRF-TOKEN");

    try {
      // 2. Attempt to fetch a simple endpoint (CORS Check)
      // We use a relative path as fetchLaravel prepends the backend URL
      const data = await fetchLaravel<any>("api/profiles", {
        cache: "no-store",
      });

      setResults({
        envLoaded: !!process.env.NEXT_PUBLIC_BACKEND_URL,
        backendUrl,
        csrfTokenFound: hasCsrf,
        connectionStatus: "success",
        errorMessage: "",
        apiData: data,
      });
    } catch (err: any) {
      let msg = err.message;
      if (err.message.includes("Failed to fetch")) {
        msg = "CORS Error or Backend Offline. Check Laravel's CORS config.";
      }

      setResults({
        envLoaded: !!process.env.NEXT_PUBLIC_BACKEND_URL,
        backendUrl,
        csrfTokenFound: hasCsrf,
        connectionStatus: "error",
        errorMessage: msg,
        apiData: null,
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runDiagnostics();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Backend Connectivity Diagnostics</h1>
      <hr />

      <section>
        <p>
          <strong>1. Environment Variable:</strong>{" "}
          {results.envLoaded
            ? "✅ Loaded"
            : "❌ Missing NEXT_PUBLIC_BACKEND_URL"}
        </p>
        <p>
          <strong>2. Backend URL:</strong> <code>{results.backendUrl}</code>
        </p>
        <p>
          <strong>3. Sanctum CSRF Cookie:</strong>{" "}
          {results.csrfTokenFound
            ? "✅ Found (XSRF-TOKEN)"
            : "⚠️ Not Found (Run Sanctum initialization?)"}
        </p>
        <p>
          <strong>4. API Connection (CORS Test):</strong>{" "}
          {results.connectionStatus === "pending" && "⏳ Testing..."}
          {results.connectionStatus === "success" &&
            "✅ Connected successfully!"}
          {results.connectionStatus === "error" && "❌ Failed"}
        </p>
      </section>

      {results.errorMessage && (
        <div
          style={{
            backgroundColor: "#fee",
            padding: "1rem",
            border: "1px solid red",
            marginTop: "1rem",
          }}
        >
          <strong>Error Detail:</strong> {results.errorMessage}
          <p>
            <small>
              Hint: If it&apos;s a CORS error, ensure Laravel{" "}
              <code>config/cors.php</code> allows{" "}
              <code>
                {typeof window !== "undefined"
                  ? window.location.origin
                  : "your frontend url"}
              </code>
            </small>
          </p>
        </div>
      )}

      {results.apiData && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Received Data Preview:</strong>
          <pre style={{ background: "#f4f4f4", padding: "1rem" }}>
            {JSON.stringify(results.apiData, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={runDiagnostics}
        style={{ marginTop: "2rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Re-run Test
      </button>
    </div>
  );
}
