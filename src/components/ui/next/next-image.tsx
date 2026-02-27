"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { ComponentProps } from "react";
import clsx from "clsx";
import placeholderImage from "../../../assets/images/placeholder/placeholder-image.png";
import { useImageLoading } from "@/hooks/use-image-loading";

// By inheriting props from `next/image`, we get `src`, `alt`, `width`, `height`, etc. for free.
// We don't need to redeclare `src` or `alt`, which ensures we can use static imports
// and that `alt` text is correctly required for accessibility.
type NextImageProps = ComponentProps<typeof Image> & {
  type?: "fluid" | "thumbnail";
  disableSpinner?: boolean;
  maxRetries?: number;
};

const FALLBACK_SRC = placeholderImage;

export default function NextImage({
  type,
  className,
  src,
  onLoad,
  onError,
  disableSpinner = false,
  maxRetries = 3,
  ...props
}: NextImageProps) {
  const { isLoading, hasError, handleLoad, handleError, retryKey } =
    useImageLoading({
      src,
      onLoad,
      onError,
      maxRetries,
    });

  // Combine the bootstrap class from `type` with any other classes passed in.
  // The `|| ''` and `.trim()` make it robust against undefined values.
  const baseClassName = `${type ? `img-${type}` : ""} ${
    className || ""
  }`.trim();

  return (
    <div
      className={clsx(
        "position-relative",
        props.fill ? "w-100 h-100" : "d-inline-block",
      )}
    >
      {isLoading && !disableSpinner && (
        <div className="position-absolute top-50 start-50 translate-middle z-1">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Image
        {...props}
        key={retryKey} // Force re-mount on retry
        src={hasError ? FALLBACK_SRC : src}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(baseClassName, !disableSpinner && "fade", {
          show: !isLoading || disableSpinner,
        })}
        unoptimized={props.unoptimized}
      />
    </div>
  );
}
