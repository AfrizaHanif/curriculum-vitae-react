import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type OffcanvasProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title: string;
  children: ReactNode;
};

export default function Offcanvas({
  id,
  title,
  children,
  className,
  ...props
}: OffcanvasProps) {
  const classes = clsx("offcanvas", "offcanvas-start", className);

  return (
    <div
      className={classes}
      tabIndex={-1}
      id={id}
      aria-labelledby="offcanvasExampleLabel"
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
