import { resolveAssetUrl } from "@/lib/assets";
import { CarouselItem } from "@/types/bootstrap-types";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */

type CarouselProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  items: CarouselItem[];
  indicator?: boolean;
  fade?: boolean;
  children: ReactNode;
  as?: ElementType;
};

export default function Carousel({
  id,
  items,
  indicator = false,
  fade = false,
  className,
  as: Tag = "div",
  ...props
}: CarouselProps) {
  const classes = clsx("carousel", "slide", fade && "carousel-fade", className);

  return (
    <Tag id={id} className={classes} {...props}>
      {/* Indicator */}
      {indicator && (
        <div className="carousel-indicators">
          {items.map((item) => (
            <button
              key={item.title}
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide-to={items.indexOf(item)}
              className={items.indexOf(item) === 0 ? "active" : ""}
              aria-current={items.indexOf(item) === 0 ? "true" : undefined}
              aria-label={`Slide ${items.indexOf(item) + 1}`}
            ></button>
          ))}
        </div>
      )}
      {/* Contents */}
      <div className="carousel-inner">
        {items.map((item) => (
          <div
            className={`carousel-item ${
              items.indexOf(item) === 0 ? "active" : ""
            }`}
            key={item.title}
          >
            <img
              src={resolveAssetUrl(item.image)}
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Controller */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </Tag>
  );
}
