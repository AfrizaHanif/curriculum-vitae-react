"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const [cachedSrc, setCachedSrc] = useState<string | undefined>(
    thumbnailCache.get(cacheKey),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCachedSrc(thumbnailCache.get(cacheKey));
  }, [cacheKey]);

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

  const handleRenderSuccess = () => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        try {
          const dataUrl = canvas.toDataURL();
          thumbnailCache.set(cacheKey, dataUrl);
        } catch (e) {
          console.warn("Error caching PDF thumbnail:", e);
        }
      }
    }
  };

  if (cachedSrc) {
    return (
      <div className={className} style={{ overflow: "hidden" }}>
        {/* <img
          src={cachedSrc}
          alt={alt}
          className="w-100 h-100"
          style={{ objectFit: "cover", objectPosition: "top" }}
        /> */}
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
          onLoadError={(error) => {
            // We can ignore worker errors since we are showing a fallback icon.
            if (!error.message.includes("worker")) {
              console.error(
                `Error while loading PDF preview: ${error.message}`,
              );
            }
          }}
          loading={
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading thumbnail...</span>
            </div>
          }
          error={
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
              <i className="bi bi-file-earmark-pdf display-1 text-body-secondary"></i>
            </div>
          }
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading thumbnail...</span>
          </div>
        </div>
      )}
    </div>
  );
}
