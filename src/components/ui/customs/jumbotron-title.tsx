import { ComponentPropsWithoutRef, ReactNode } from "react";
import Jumbotron from "../bootstrap/jumbotron";
import { AllowedColors } from "@/types/common";
import Link from "next/link";
import Button from "../bootstrap/button";
import NextImage from "../next/next-image";
import styles from "./jumbotron-title.module.css";

type JumbotronTitleProps = ComponentPropsWithoutRef<"div"> & {
  backgroundImg?: string;
  backgroundColor?: AllowedColors;
  title: string;
  description: ReactNode;
  urlButton?: string;
  labelButton?: string;
  iconImg?: string;
  // children: ReactNode;
};

export default function JumbotronTitle({
  backgroundImg,
  backgroundColor,
  title,
  description,
  urlButton,
  labelButton,
  iconImg,
  className,
}: JumbotronTitleProps) {
  return (
    <Jumbotron
      backgroundColor={backgroundColor || "secondary"}
      textColor={backgroundImg ? "dark" : undefined}
      img={backgroundImg}
      className={className}
    >
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          <div
            className={`col-12 ${iconImg ? "col-lg-8" : "col-lg-12"} order-2 order-lg-1 text-center text-lg-start`}
          >
            <h1 className="display-5 fw-bold">{title}</h1>
            <p className="col-md-8 fs-4 mx-auto ms-lg-0">{description}</p>
            {urlButton && (
              <Link href={urlButton || "#"}>
                <Button color="primary" size="lg">
                  {labelButton || "Label"}
                </Button>
              </Link>
            )}
          </div>
          {iconImg && (
            <div className="col-12 col-lg-4 order-1 order-lg-2 mb-3 mb-lg-0 text-center text-lg-start">
              <NextImage
                src={iconImg}
                alt=""
                type="fluid"
                className={`rounded-circle ${styles.jumbotronImage}`}
                width={250}
                height={250}
                style={{
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Jumbotron>
  );
}
