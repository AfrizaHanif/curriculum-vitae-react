import { ComponentPropsWithoutRef, ReactNode } from "react";
import "./heroes.css";
import { HeroesButtonItem } from "@/lib/bootstrap-types";
import Button from "./button";
import Link from "next/link";
import NextImage from "../next/next-image";

type HeroesProps = ComponentPropsWithoutRef<"div"> & {
  type?: "center" | "screenshot" | "responsive" | "border";
  title?: string;
  buttonItem?: HeroesButtonItem[];
  img?: string;
  children: ReactNode;
};

export default function Heroes({
  type = "center",
  title,
  buttonItem,
  img,
  children,
  ...props
}: HeroesProps) {
  if (type === "center") {
    return (
      <div className="px-4 py-5 my-5 text-center" {...props}>
        <h1 className="display-5 fw-bold text-body-emphasis">{title}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{children}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {buttonItem?.map((item, index) => (
              <Link href={item.href ?? "#"} key={index}>
                <Button
                  as="button"
                  color={item.color}
                  size="lg"
                  className={`px-4 ${
                    index === (buttonItem?.length ?? 0) - 1 ? "" : "gap-3"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (type === "screenshot") {
    if (!img) return null;
    return (
      <div className="px-4 pt-5 my-5 text-center border-bottom" {...props}>
        <h1 className="display-4 fw-bold text-body-emphasis">{title}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{children}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            {buttonItem?.map((item, index) => (
              <Link href={item.href ?? "#"} key={index}>
                <Button
                  as="button"
                  color={item.color}
                  size="lg"
                  className={`px-4 ${
                    index === (buttonItem?.length ?? 0) - 1 ? "" : "me-sm-3"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <NextImage
              src={img}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt={title ?? ""}
              width={700}
              height={500}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  } else if (type === "responsive") {
    if (!img) return null;
    return (
      <div className="container col-xxl-8 px-4 py-5" {...props}>
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <NextImage
              src={img}
              className="d-block mx-lg-auto img-fluid rounded-3"
              alt={title ?? ""}
              width={700}
              height={500}
              loading="lazy"
              style={{
                aspectRatio: "16 / 9",
                objectFit: "cover",
                objectPosition: "top",
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              {title}
            </h1>
            <p className="lead">{children}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              {buttonItem?.map((item, index) => (
                <Link href={item.href ?? "#"} key={index}>
                  <Button
                    as="button"
                    color={item.color}
                    size="lg"
                    className={`px-4 ${
                      index === (buttonItem?.length ?? 0) - 1 ? "" : "me-md-2"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "border") {
    if (!img) return null;
    return (
      <div className="container my-5" {...props}>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
              {title}
            </h1>
            <p className="lead">{children}</p>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <NextImage
              className="rounded-lg-3"
              src={img}
              alt={title ?? ""}
              width={720}
              height={480}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
