"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./pdf-thumbnail.css";
import NextImage from "../next/next-image";

// Set up the worker from a CDN. This is required for react-pdf to work.
if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

// Global cache for PDF thumbnails
const thumbnailCache = new Map<string, string>();

interface PdfThumbnailProps {
  file: string;
  alt: string;
  className?: string;
  pageNumber?: number;
}

export default function PdfThumbnail({
  file,
  alt,
  className,
  pageNumber = 1,
}: PdfThumbnailProps) {
  const cacheKey = `${file}-${pageNumber}`;
  const [prevCacheKey, setPrevCacheKey] = useState(cacheKey);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [cachedSrc, setCachedSrc] = useState<string | undefined>(() =>
    thumbnailCache.get(cacheKey),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  if (prevCacheKey !== cacheKey) {
    setPrevCacheKey(cacheKey);
    setCachedSrc(thumbnailCache.get(cacheKey));
    setHasError(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading slightly before it comes into view
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleRenderSuccess = useCallback(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        try {
          const dataUrl = canvas.toDataURL();
          thumbnailCache.set(cacheKey, dataUrl);
          setCachedSrc(dataUrl);
        } catch (e) {
          console.warn("Error caching PDF thumbnail:", e);
        }
      }
    }
  }, [cacheKey]);

  const handleLoadError = useCallback(
    (error: Error) => {
      if (!error.message.includes("worker")) {
        console.error(
          `Error while loading PDF preview (${file}): ${error.message}`,
        );
      }
      setHasError(true);
    },
    [file],
  );

  const fallbackErrorUI = useMemo(
    () => (
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <i className="bi bi-file-earmark-pdf display-1 text-body-secondary"></i>
      </div>
    ),
    [],
  );

  const loadingUI = useMemo(
    () => (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading thumbnail...</span>
      </div>
    ),
    [],
  );

  if (cachedSrc) {
    return (
      <div className={className} style={{ overflow: "hidden" }}>
        <NextImage
          src={cachedSrc}
          alt={alt}
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "top" }}
          width={100}
          height={100}
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={className} style={{ overflow: "hidden" }}>
        {fallbackErrorUI}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
      }}
    >
      {isVisible ? (
        <Document
          file={file}
          onLoadError={handleLoadError}
          loading={loadingUI}
          error={fallbackErrorUI}
        >
          <Page
            pageNumber={pageNumber}
            width={400}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-thumbnail-page"
            onRenderSuccess={handleRenderSuccess}
          />
        </Document>
      ) : (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          {loadingUI}
        </div>
      )}
    </div>
  );
}

