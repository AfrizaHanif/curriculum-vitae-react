import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardGroupProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
  subtitle?: string;
  type?: "group" | "grid";
  cardPerRow?: 1 | 2 | 3 | 4;
  children: ReactNode;
  as?: ElementType;
};

export default function CardGroup({
  title,
  subtitle,
  type = "grid",
  cardPerRow = 3,
  children,
  as: Tag = "div",
  style,
  className,
  ...props
}: CardGroupProps) {
  // Determine the number of columns for medium devices to prevent squeezing
  const mdCols = cardPerRow > 2 ? 2 : cardPerRow;

  // Check if card group's type are grid or group (Default)
  if (type === "grid") {
    return (
      <Tag className={`py-3 ${className || ""}`} style={style} {...props}>
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        {subtitle && (
          <div className="fs-5 text-body-secondary mb-5">{subtitle}</div>
        )}
        <div
          className={`row row-cols-1 row-cols-md-${mdCols} row-cols-lg-${cardPerRow} g-4`}
        >
          {children}
        </div>
      </Tag>
    );
  } else {
    return (
      <Tag className="card-group" style={style} {...props}>
        {children}
      </Tag>
    );
  }
}
