import { AllowedColors } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

// This component are similar with card.tsx, but with blank card. Visit Bootstrap's Documentation for insertion of content inside card

type CardsProps = ComponentPropsWithoutRef<"div"> & {
  color?: AllowedColors;
  borderColor?: AllowedColors;
  overlay?: boolean;
  vertical?: boolean;
  fullHeight?: boolean;
  insideGroup?: boolean;
  children: ReactNode;
};

export default function CardBlank({
  color,
  borderColor,
  overlay = false,
  vertical = false,
  fullHeight = false,
  insideGroup = false,
  children,
  className,
  ...props
}: CardsProps) {
  const horClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    overlay && "card-img-overlay",
    className
  );
  const verClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    // "mb-3",
    className
  );

  let cardComponent;

  if (vertical) {
    // Vertical Layout
    cardComponent = (
      <div className={verClasses} {...props}>
        {children}
      </div>
    );
  } else {
    // Horizontal Layout
    cardComponent = (
      <div className={horClasses} {...props}>
        {children}
      </div>
    );
  }

  if (insideGroup) {
    return <div className="col">{cardComponent}</div>;
  }

  return cardComponent;
}

// NOTE:
// This card component are suppose for heavy customized card-body
