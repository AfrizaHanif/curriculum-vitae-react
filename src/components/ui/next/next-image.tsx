"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import placeholderImage from "../../../assets/images/placeholder/placeholder-image.png";

// By inheriting props from `next/image`, we get `src`, `alt`, `width`, `height`, etc. for free.
// We don't need to redeclare `src` or `alt`, which ensures we can use static imports
// and that `alt` text is correctly required for accessibility.
type NextImageProps = ComponentProps<typeof Image> & {
  type?: "fluid" | "thumbnail";
};

const FALLBACK_SRC = placeholderImage;

export default function NextImage({
  type,
  className,
  src,
  ...props
}: NextImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // Combine the bootstrap class from `type` with any other classes passed in.
  // The `|| ''` and `.trim()` make it robust against undefined values.
  const combinedClassName = `${type ? `img-${type}` : ""} ${
    className || ""
  }`.trim();

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props} // Spread the rest of the props here
      src={imgSrc}
      onError={() => {
        if (imgSrc !== FALLBACK_SRC) {
          setImgSrc(FALLBACK_SRC);
        }
      }}
      className={combinedClassName}
      unoptimized={props.unoptimized}
    />
  );
}
