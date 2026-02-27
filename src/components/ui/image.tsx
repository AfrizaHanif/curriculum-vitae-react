"use client";
/* eslint-disable @next/next/no-img-element */
import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import placeholderImage from "../../assets/images/placeholder/placeholder-image.png";
import { useImageLoading } from "@/hooks/use-image-loading";

type ImageProps = ComponentPropsWithoutRef<"img"> & {
  src: string;
  alt?: string;
  type?: "fluid" | "thumbnail";
  disableSpinner?: boolean;
  maxRetries?: number;
};

const FALLBACK_SRC = placeholderImage.src;

export default function Image({
  src,
  alt,
  type,
  className,
  onLoad,
  onError,
  disableSpinner = false,
  maxRetries = 3,
  ...props
}: ImageProps) {
  const { isLoading, hasError, handleLoad, handleError, retryKey } =
    useImageLoading({
      src,
      onLoad,
      onError,
      maxRetries,
    });

  const baseClassName =
    `${type ? `img-${type}` : ""} ${className || ""}`.trim();

  return (
    <div className="position-relative d-inline-block">
      {isLoading && !disableSpinner && (
        <div className="position-absolute top-50 start-50 translate-middle z-1">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={hasError ? FALLBACK_SRC : src}
        key={retryKey} // Force re-mount on retry
        className={clsx(baseClassName, !disableSpinner && "fade", {
          show: !isLoading || disableSpinner,
        })}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
