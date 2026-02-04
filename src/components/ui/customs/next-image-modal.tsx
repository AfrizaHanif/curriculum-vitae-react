"use client";
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { ComponentProps, useEffect, useState, useId } from "react";
import placeholderImage from "../../../assets/images/placeholder/placeholder-image.png";
import Modal from "../bootstrap/modal";

// By inheriting props from `next/image`, we get `src`, `alt`, `width`, `height`, etc. for free.
// We don't need to redeclare `src` or `alt`, which ensures we can use static imports
// and that `alt` text is correctly required for accessibility.
type NextImageModalProps = ComponentProps<typeof Image> & {
  id?: string;
  modalId?: string;
  type?: "fluid" | "thumbnail";
  zoom?: boolean;
  caption?: string;
};

const FALLBACK_SRC = placeholderImage;

export default function NextImageModal({
  id,
  modalId,
  type,
  zoom,
  className,
  caption,
  src,
  ...props
}: NextImageModalProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const uniqueId = useId();
  // Generate a safe ID if one isn't provided. We remove colons because they can interfere with Bootstrap's query selectors.
  const modalTargetId = modalId
    ? modalId
    : id
      ? `image-modal-${id}`
      : `image-modal-${uniqueId.replace(/:/g, "")}`;

  // Combine the bootstrap class from `type` with any other classes passed in.
  // The `|| ''` and `.trim()` make it robust against undefined values.
  const combinedClassName = `${type ? `img-${type}` : ""} ${
    className || ""
  }`.trim();

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div>
      {/* Image */}
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
        data-bs-toggle={zoom ? "modal" : undefined}
        data-bs-target={zoom ? `#${modalTargetId}` : undefined}
        style={zoom ? { cursor: "pointer", ...props.style } : props.style}
      />

      {/* Modal for Full Image */}
      {zoom && (
        <Modal
          id={modalTargetId}
          size="xl"
          buttonItems={[
            {
              label: "Tutup",
              type: "button",
              color: "secondary",
              dismiss: true,
            },
          ]}
          fullscreen
        >
          <Image
            src={imgSrc}
            alt={props.alt || "Full size image"}
            width={0}
            height={0}
            sizes="100vw"
            className="img-fluid w-100 h-auto"
          />
          {caption && (
            <div className="text-center mt-2 fst-italic text-body-secondary">
              {caption}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
