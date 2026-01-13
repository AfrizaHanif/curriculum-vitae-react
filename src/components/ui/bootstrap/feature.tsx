import { ComponentPropsWithoutRef } from "react";
import "./feature.css";
import Button from "./button";
import { FeatureItem } from "@/lib/bootstrap-types";

type FeatureProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title?: string;
  type: "columns" | "hanging";
  itemPerRow?: number;
  items: FeatureItem[];
  chevron?: boolean;
};

export default function Feature({
  id,
  title,
  type,
  itemPerRow = 3,
  chevron = false,
  items,
  className,
  ...props
}: FeatureProps) {
  if (type === "columns") {
    return (
      <div className={`px-0 py-3 ${className || ""}`} id={id} {...props}>
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        <div className={`row g-4 py-5 row-cols-1 row-cols-lg-${itemPerRow}`}>
          {items.map((item) => (
            <div key={item.key} className="feature col">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                {/* <svg className="bi" width="1em" height="1em" aria-hidden="true">
                  <use href={`#${item.icon}`}></use>
                </svg> */}
                <i className={`bi bi-${item.icon}`}></i>
              </div>
              <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
              {item.description && (
                <div
                  className="pb-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              {item.buttonLabel && (
                <Button
                  as="a"
                  href={item.href}
                  color="primary"
                  className="icon-link"
                  dataToggle={item.dataToggle}
                  dataTarget={item.dataTarget}
                  dataTitle={item.dataTitle}
                >
                  {item.buttonLabel || "Learn more"}
                  {chevron && (
                    <svg className="bi" aria-hidden="true">
                      <use href="#chevron-right"></use>
                    </svg>
                  )}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (type === "hanging") {
    return (
      <div
        className={`container px-0 py-3 ${className || ""}`}
        id={id}
        {...props}
      >
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        <div className={`row g-4 py-5 row-cols-1 row-cols-lg-${itemPerRow}`}>
          {items.map((item) => (
            <div key={item.key} className="col d-flex align-items-start">
              <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                {/* <svg className="bi" width="1em" height="1em" aria-hidden="true">
                  <use href={`#${item.icon}`}></use>
                </svg> */}
                <i className={`bi bi-${item.icon}`}></i>
              </div>
              <div>
                <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
                {item.description && (
                  <div
                    className="pb-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                {item.buttonLabel && (
                  // <a href={item.href} className="btn btn-primary">
                  //   {item.buttonLabel || "Primary button"}
                  // </a>
                  <Button
                    as="a"
                    href={item.href}
                    color="primary"
                    dataToggle={item.dataToggle}
                    dataTarget={item.dataTarget}
                    dataTitle={item.dataTitle}
                  >
                    {item.buttonLabel || "Primary button"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
