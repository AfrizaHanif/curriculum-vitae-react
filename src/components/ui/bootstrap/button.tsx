import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import type {
  AllowedColorsStatus,
  AllowedSizeButton,
} from "../../../types/common"; // Adjust the import path

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
  color: AllowedColorsStatus; // Or you can use string instead
  size?: AllowedSizeButton; // Optional parameter
  outline?: boolean;
  disabled?: boolean;
  stretchedLink?: boolean;
  fullWidth?: boolean;
  newTab?: boolean;
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
  fullWidth = false,
  newTab = false,
  children,
  as = "button",
  className,
  ...props
}: ButtonProps) {
  // Base Classes
  const classes = clsx(
    "btn",
    `btn-${outline ? "outline-" : ""}${color}`,
    size && `btn-${size}`,
    stretchedLink && "stretched-link",
    fullWidth && "w-100",
    className,
  );

  // New Tab Classes
  const newTabClasses = { target: "_blank", rel: "noopener noreferrer" };

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
        {...(newTab && newTabClasses)}
        {...(props as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </a>
    );
  }
}
