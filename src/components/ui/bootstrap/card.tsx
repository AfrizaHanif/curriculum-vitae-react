/* eslint-disable @next/next/no-img-element */
import { AllowedColors } from "@/types/common";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import Button from "./button";
import NextImage from "../react/next-image";
import { DropdownItem } from "@/lib/bootstrap-types";
import Dropdown from "./dropdown";

type BaseCardProps = ComponentPropsWithoutRef<"div"> & {
  color?: AllowedColors;
  borderColor?: AllowedColors;
  header?: string;
  title?: string;
  footer?: string;
  image?: string;
  imgPosition?: "top" | "bottom";
  url?: string;
  buttonName?: string;
  clickable?: boolean;
  newTab?: boolean;
  overlay?: boolean;
  vertical?: boolean;
  fullHeight?: boolean;
  insideGroup?: boolean;
  children: ReactNode;
};

type CardLinkProps = {
  urlType?: "link";
  urlTarget?: string; // Optional
  urlItems?: DropdownItem[];
};

type CardInteractiveProps = {
  urlType: "modal" | "offcanvas";
  urlTarget: string;
  urlItems?: DropdownItem[];
};

type CardDropdownProps = {
  urlType: "dropdown";
  urlTarget?: string; // Optional because the button of dropdown doesn't require data-bs-target
  urlItems: DropdownItem[];
};

type CardsProps = BaseCardProps &
  (CardLinkProps | CardInteractiveProps | CardDropdownProps);

export default function Card({
  color,
  borderColor,
  header,
  title,
  footer,
  image,
  imgPosition = "top",
  url,
  urlType = "link",
  urlTarget,
  urlItems,
  buttonName = "Kunjungi",
  newTab = false,
  clickable = false,
  overlay = false,
  vertical = false,
  fullHeight = false,
  insideGroup = false,
  children,
  className,
  ...props
}: CardsProps) {
  // New Tab Classes
  const newTabClasses = { target: "_blank", rel: "noopener noreferrer" };

  // Classes for horizontal card
  const horClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    overlay && "card-img-overlay",
    className
  );
  // Classes for vertical card
  const verClasses = clsx(
    "card",
    fullHeight && "h-100",
    `text-bg-${color}`,
    `border-${borderColor}`,
    // "mb-3",
    className
  );

  let cardComponent;

  // Check orientation of card
  if (vertical) {
    // Vertical Layout
    cardComponent = (
      <div className={verClasses} {...props}>
        <div className="row g-0">
          <div className="col-md-4">
            {/* Image */}
            {image && (
              <img
                src={image}
                className="img-fluid rounded-start"
                alt={title}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {/* Content */}
              {/* {title && <h5 className="card-title">{title}</h5>} */}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Horizontal Layout
    cardComponent = (
      <div className={horClasses} {...props}>
        {/* Header */}
        {header && (
          <div className="card-header text-uppercase small fw-semibold text-body-secondary">
            {header}
          </div>
        )}
        {/* Overlay */}
        {overlay && <img src="..." className="card-img" alt="..."></img>}
        {/* Image (Top) */}
        {imgPosition === "top" && image && (
          // <img src={image} className="card-img-top" alt={title} />
          <NextImage
            src={image}
            alt={title || ""}
            className={`card-img-top ${header && "rounded-0"}`}
            width={500}
            height={300}
            style={{
              aspectRatio: "16 / 9",
              objectFit: "cover",
              height: "auto",
              objectPosition: "top",
            }}
          />
        )}
        {/* Content */}
        <div className="card-body">
          {/* {title && <h5 className="card-title">{title}</h5>} */}
          {children}
        </div>
        {/* Image (Bottom) */}
        {imgPosition === "bottom" && image && (
          // <img src={image} className="card-img-bottom" alt={title} />
          <NextImage
            src={image}
            alt={title || ""}
            className={`card-img-bottom ${header && "rounded-0"}`}
            width={500}
            height={300}
            style={{
              aspectRatio: "16 / 9",
              objectFit: "cover",
              height: "auto",
              objectPosition: "top",
            }}
          />
        )}
        {/* Footer */}
        {footer && (
          <div className="card-footer text-body-secondary">
            <div className="row justify-content-center align-items-center g-2">
              <div className="col-8 small">{footer}</div>
              <div className="col-4 text-end">
                {buttonName &&
                  (urlType === "link" ? (
                    <Link href={`${url}`}>
                      <Button
                        color="primary"
                        size="sm"
                        stretchedLink={clickable}
                        {...(newTab && newTabClasses)}
                      >
                        {buttonName}
                      </Button>
                    </Link>
                  ) : urlType === "dropdown" ? (
                    <Dropdown
                      color="primary"
                      size="sm"
                      items={urlItems || []}
                      fullWidth
                    >
                      {buttonName}
                    </Dropdown>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      stretchedLink={clickable}
                      dataToggle={urlType}
                      dataTarget={urlTarget}
                    >
                      {buttonName}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (insideGroup) {
    return <div className="col">{cardComponent}</div>;
  }

  return cardComponent;
}
