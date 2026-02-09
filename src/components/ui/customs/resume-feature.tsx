import { ComponentPropsWithoutRef } from "react";
import "../bootstrap/feature.css";
import Button from "../bootstrap/button";
import ResumeDataItem from "./resume-data-item"; // Import the new component
import { ResumeFeatureItem } from "@/lib/customs/custom-types";

type FeatureProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title?: string;
  type: "columns" | "hanging";
  itemPerRow?: number;
  items: ResumeFeatureItem[];
};

export default function ResumeFeature({
  id,
  title,
  type,
  itemPerRow = 3,
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
                <svg className="bi" width="1em" height="1em" aria-hidden="true">
                  <use href={`#${item.icon}`}></use>
                </svg>
              </div>
              <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
              {/* Data Area */}
              {item.data?.map(
                (
                  dataItem,
                  index, // Use the new component
                ) => (
                  <ResumeDataItem key={index} dataItem={dataItem} />
                ),
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
                  <svg className="bi" aria-hidden="true">
                    <use href="#chevron-right"></use>
                  </svg>
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
                <svg className="bi" width="1em" height="1em" aria-hidden="true">
                  <use href={`#${item.icon}`}></use>
                </svg>
              </div>
              <div>
                <h3 className="fs-2 text-body-emphasis">{item.title}</h3>
                {item.data?.map(
                  (
                    dataItem,
                    index, // Use the new component
                  ) => (
                    <ResumeDataItem key={index} dataItem={dataItem} />
                  ),
                )}
                {item.buttonLabel && (
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
