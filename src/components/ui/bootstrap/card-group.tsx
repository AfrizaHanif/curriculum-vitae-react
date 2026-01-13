import { ComponentPropsWithoutRef, ReactNode } from "react";

type CardGroupProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
  subtitle?: string;
  type?: "group" | "grid";
  cardPerRow?: 1 | 2 | 3 | 4;
  children: ReactNode;
};

export default function CardGroup({
  title,
  subtitle,
  type = "grid",
  cardPerRow = 3,
  children,
  className,
  ...props
}: CardGroupProps) {
  // Check if card group's type are grid or group (Default)
  if (type === "grid") {
    return (
      <div className={`py-3 ${className || ""}`} {...props}>
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        {subtitle && (
          <div className="fs-5 text-body-secondary mb-5">{subtitle}</div>
        )}
        <div className={`row row-cols-1 row-cols-md-${cardPerRow} g-4`}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-group" {...props}>
        {children}
      </div>
    );
  }
}
