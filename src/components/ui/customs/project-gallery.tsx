"use client";

import { useState } from "react";
import NextImage from "../next/next-image";
import NextImageModal from "./next-image-modal";

interface ProjectGalleryProps {
  mainImage: string;
  images: string[];
  altText: string;
  thumbnailsPerRow?: number;
  modalId?: string;
}

export default function ProjectGallery({
  mainImage,
  images = [],
  altText,
  thumbnailsPerRow = 5, // Default to 5 thumbnails per row
  modalId,
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  // Combine the main image with the gallery images, ensuring no duplicates.
  const allImages = [mainImage, ...images.filter((img) => img !== mainImage)];

  // Calculate the width of each thumbnail based on the desired number per row and the gap.
  // The gap-2 class in Bootstrap corresponds to 0.5rem.
  const thumbnailWidth = `calc(${100 / thumbnailsPerRow}% - ${(
    ((thumbnailsPerRow - 1) * 0.5) /
    thumbnailsPerRow
  ).toPrecision(4)}rem)`;

  return (
    <div>
      {/* Main Image Display */}
      <div className="position-relative mb-3" style={{ aspectRatio: "16 / 9" }}>
        <NextImageModal
          src={selectedImage}
          alt={altText}
          className="rounded-3"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority={true} // Prioritize loading the main image
          zoom
          modalId={modalId}
          caption={altText}
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="d-flex flex-wrap gap-2">
          {allImages.map(
            (
              img,
              index, // Use flex-fill to make thumbnails occupy equal width
            ) => (
              <div
                key={index}
                className="position-relative"
                style={{
                  width: thumbnailWidth,
                  cursor: "pointer",
                  aspectRatio: "16 / 10",
                }}
                onClick={() => setSelectedImage(img)}
              >
                <NextImage
                  src={img}
                  alt={`Thumbnail ${index + 1} for ${altText}`}
                  className={`rounded-2 ${
                    selectedImage === img
                      ? "border border-primary border-3"
                      : ""
                  }`}
                  fill
                  style={{
                    objectFit: "cover", // The image will cover the available space
                  }}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
