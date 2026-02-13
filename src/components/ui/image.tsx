"use client";
/* eslint-disable @next/next/no-img-element */
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import placeholderImage from "../../assets/images/placeholder/placeholder-image.png";

type ImageProps = ComponentPropsWithoutRef<"img"> & {
  src: string;
  alt?: string;
  type?: "fluid" | "thumbnail";
};

const FALLBACK_SRC = placeholderImage.src;

export default function Image({
  src,
  alt,
  type,
  className,
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      className={`${type ? `img-${type}` : ""} ${className || ""}`.trim()}
      alt={alt}
      onError={() => {
        if (imgSrc !== FALLBACK_SRC) {
          setImgSrc(FALLBACK_SRC);
        }
      }}
      {...props}
    />
  );
}
