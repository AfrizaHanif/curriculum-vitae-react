import { AllowedColorsStatus } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AlertProps = ComponentPropsWithoutRef<"div"> & {
  color: AllowedColorsStatus; // Or you can use string instead
  dismissible?: boolean;
  withIcon?: boolean;
  labelled?: boolean;
  customLabel?: string;
  customIcon?: string;
  children: ReactNode;
  as?: ElementType;
};

export default function Alert({
  color,
  dismissible,
  withIcon,
  labelled,
  customLabel,
  customIcon,
  children,
  className,
  as: Tag = "div",
  ...props
}: AlertProps) {
  // Classes
  const classes = clsx(
    "alert",
    `alert-${color}`,
    { "alert-dismissible fade show": dismissible },
    className,
  );

  const iconTemplate = (
    <i
      className={`bi bi-${customIcon || (color === "secondary" ? "question-square-fill" : color === "info" ? "info-circle-fill" : color === "warning" ? "exclamation-triangle-fill" : color === "success" ? "check-square-fill" : color === "danger" ? "x-circle-fill" : "info-lg")} me-2`}
    ></i>
  );

  return (
    <Tag {...props} className={classes} role="alert">
      {/* Label */}
      {labelled && (
        <h4 className="alert-heading">
          {withIcon && iconTemplate}
          {customLabel || "Alert!"}
        </h4>
      )}
      {/* Content */}
      {withIcon && !labelled && iconTemplate}
      {children}
      {/* Close button for dismiss */}
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      )}
    </Tag>
  );
}
