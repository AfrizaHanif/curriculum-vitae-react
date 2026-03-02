import { AllowedColorsStatus } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AlertProps = ComponentPropsWithoutRef<"div"> & {
  color: AllowedColorsStatus; // Or you can use string instead
  dismissible?: boolean;
  children: ReactNode;
  as?: ElementType;
};

export default function Alert({
  color,
  dismissible,
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

  return (
    <Tag {...props} className={classes} role="alert">
      {/* Content */}
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
