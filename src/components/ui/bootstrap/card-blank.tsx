import { AllowedColorsStatus } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import NextImage from "../next/next-image";

// This component are similar with card.tsx, but with blank card. Visit Bootstrap's Documentation for insertion of content inside card

type CardsProps = ComponentPropsWithoutRef<"div"> & {
  color?: AllowedColorsStatus;
  borderColor?: AllowedColorsStatus;
  image?: string;
  overlay?: boolean;
  horizontal?: boolean;
  fullHeight?: boolean;
  insideGroup?: boolean;
  asGroup?: boolean;
  children: ReactNode;
};

export default function CardBlank({
  color,
  borderColor,
  image,
  overlay = false,
  horizontal = false,
  fullHeight = false,
  insideGroup = false,
  asGroup = false,
  children,
  style,
  className,
  ...props
}: CardsProps) {
  const verClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    // overlay && "card-img-overlay",
    className,
  );
  const horClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    // "mb-3",
    className,
  );

  let cardComponent;

  const imageOverlay = (
    <NextImage
      src={image ?? ""}
      className="card-img"
      alt="..."
      style={{ objectFit: "cover", height: "100%", width: "100%" }}
    ></NextImage>
  );

  if (horizontal) {
    // Horizontal Layout
    cardComponent = (
      <div className={horClasses} style={style} {...props}>
        {image && overlay && imageOverlay}
        {children}
      </div>
    );
  } else {
    // Vertical Layout (Default)
    cardComponent = (
      <div className={verClasses} style={style} {...props}>
        {image && overlay && imageOverlay}
        {/* <div className={overlay ? "card-img-overlay" : ""}>{children}</div> */}
        {children}
      </div>
    );
  }

  if (insideGroup && !asGroup) {
    return <div className="col">{cardComponent}</div>;
  }

  return cardComponent;
}

// NOTE:
// This card component are suppose for heavy customized card-body
