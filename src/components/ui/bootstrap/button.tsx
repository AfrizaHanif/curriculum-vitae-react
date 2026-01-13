import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import type { AllowedColors, AllowedSize } from "../../../types/common"; // Adjust the import path

type BaseButtonProps = {
  dataToggle?:
    | "modal"
    | "tooltip"
    | "popover"
    | "dropdown"
    | "offcanvas"
    | "collapse";
  dataTarget?: string;
  dataTitle?: string;
  dataContent?: string;
  children: ReactNode;
  color: AllowedColors; // Or you can use string instead
  size?: AllowedSize; // Optional parameter
  outline?: boolean;
  disabled?: boolean;
  stretchedLink?: boolean;
};

type ButtonAsButton = BaseButtonProps &
  ComponentPropsWithoutRef<"button"> & { as?: "button" };

type ButtonAsLink = BaseButtonProps &
  ComponentPropsWithoutRef<"a"> & { as?: "a" };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  color,
  size,
  dataToggle,
  dataTarget,
  dataTitle,
  dataContent,
  outline,
  disabled = false,
  stretchedLink = false,
  children,
  as = "button",
  className,
  ...props
}: ButtonProps) {
  // Classes
  const classes = clsx(
    "btn",
    `btn-${outline ? "outline-" : ""}${color}`,
    size && `btn-${size}`,
    stretchedLink && "stretched-link",
    className
  );

  // Check if this component uses Button or A tag
  if (as === "button") {
    return (
      <button
        className={classes}
        data-bs-toggle={dataToggle}
        data-bs-target={`#${dataTarget}`}
        data-bs-title={dataTitle}
        data-bs-content={dataContent}
        disabled={disabled}
        {...(props as ComponentPropsWithoutRef<"button">)}
      >
        {children}
      </button>
    );
  } else {
    return (
      <a
        className={`${classes} ${disabled && "disabled"}`}
        data-bs-toggle={dataToggle}
        data-bs-target={`#${dataTarget}`}
        data-bs-title={dataTitle}
        {...(props as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }
}
