import { ComponentPropsWithoutRef, ElementType } from "react";
import "./feature.css";
import Button from "./button";
import { FeatureItem } from "@/types/bootstrap-types";

type FeatureProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title?: string;
  type: "columns" | "hanging";
  itemPerRow?: number;
  items: FeatureItem[];
  iconType: "svg" | "bi";
  chevron?: boolean;
  as?: ElementType;
};

export default function Feature({
  id,
  title,
  type,
  itemPerRow = 3,
  chevron = false,
  items,
  iconType = "svg",
  className,
  as: Tag = "div",
  ...props
}: FeatureProps) {
  if (type === "columns") {
    return (
      <Tag className={`px-0 py-3 ${className || ""}`} id={id} {...props}>
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        <div className={`row g-4 py-5 row-cols-1 row-cols-lg-${itemPerRow}`}>
          {items.map((item) => (
            <div key={item.id} className="feature col">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                {iconType === "svg" ? (
                  <svg
                    className="bi"
                    width="1em"
                    height="1em"
                    aria-hidden="true"
                  >
                    <use href={`#${item.icon}`}></use>
                  </svg>
                ) : (
                  <i className={`bi bi-${item.icon}`}></i>
                )}
              </div>
              <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
              {item.description && (
                <div className="pb-3">{item.description}</div>
              )}
              {item.button && (
                <Button
                  as="a"
                  href={item.button.href}
                  color="primary"
                  className="icon-link"
                  dataToggle={item.button.dataToggle}
                  dataTarget={item.button.dataTarget}
                  dataTitle={item.button.dataTitle}
                >
                  {item.button.label}
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
      </Tag>
    );
  } else if (type === "hanging") {
    return (
      <Tag
        className={`container px-0 py-3 ${className || ""}`}
        id={id}
        {...props}
      >
        {title && <h2 className="pb-2 border-bottom">{title}</h2>}
        <div className={`row g-4 py-5 row-cols-1 row-cols-lg-${itemPerRow}`}>
          {items.map((item) => (
            <div key={item.id} className="col d-flex align-items-start">
              <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                {iconType == "svg" ? (
                  <svg
                    className="bi"
                    width="1em"
                    height="1em"
                    aria-hidden="true"
                  >
                    <use href={`#${item.icon}`}></use>
                  </svg>
                ) : (
                  <i className={`bi bi-${item.icon}`}></i>
                )}
              </div>
              <div>
                <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
                {item.description && (
                  <div className="pb-3">{item.description}</div>
                )}
                {item.button && (
                  <Button
                    as="a"
                    href={item.button.href}
                    color="primary"
                    dataToggle={item.button.dataToggle}
                    dataTarget={item.button.dataTarget}
                    dataTitle={item.button.dataTitle}
                  >
                    {item.button.label}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Tag>
    );
  }
}
