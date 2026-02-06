import { AllowedSize } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type OffcanvasProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title: string;
  scrollable?: boolean;
  backdrop?: "disable" | "static";
  responsive?: AllowedSize;
  position?: "start" | "end" | "top" | "bottom";
  children: ReactNode;
};

export default function Offcanvas({
  id,
  title,
  scrollable = false,
  backdrop,
  responsive,
  position = "start",
  children,
  className,
  ...props
}: OffcanvasProps) {
  const classes = clsx(
    "offcanvas",
    responsive && `offcanvas-${responsive}`,
    position && `offcanvas-${position}`,
    className,
  );

  return (
    <div
      className={classes}
      tabIndex={-1}
      id={id}
      aria-labelledby="offcanvasExampleLabel"
      data-bs-scroll={scrollable}
      data-bs-backdrop={backdrop}
      {...props}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          {title}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">{children}</div>
    </div>
  );
}
