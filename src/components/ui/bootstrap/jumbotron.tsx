"use client";

import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import type { AllowedColors } from "@/types/common";
import styles from "./jumbotron.module.css";
import placeholderImage from "../../../assets/images/placeholder/placeholder-image.png";

type JumbotronProps = ComponentPropsWithoutRef<"div"> & {
  img?: string;
  backgroundColor?: AllowedColors;
  textColor?: AllowedColors;
  fullWidth?: boolean;
  imgClassName?: string;
  children: ReactNode;
};

function BackgroundElement({
  img,
  isLoaded,
  onLoad,
}: {
  img?: string;
  isLoaded: boolean;
  onLoad: () => void;
}) {
  if (!img) return null;
  return (
    <>
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${placeholderImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <Image
        src={img}
        alt="Jumbotron Background"
        fill
        className={clsx("object-fit-cover fade", isLoaded && "show")}
        onLoad={onLoad}
        style={{ zIndex: 0 }}
        priority
      />
      <div
        className={clsx(
          "position-absolute top-0 start-0 w-100 h-100",
          styles.jumbotronOverlay,
        )}
        style={{ zIndex: 0 }}
      />
    </>
  );
}

export default function Jumbotron({
  img,
  backgroundColor = "tertiary",
  textColor,
  fullWidth,
  children,
  className,
  style,
  // imgClassName,
  ...props
}: JumbotronProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (img) setIsLoaded(false);
  }, [img]);

  const commonClasses = `p-5 ${img ? `` : `bg-body-${backgroundColor}`} ${
    textColor ? `text-bg-${textColor}` : undefined
  }`;

  if (fullWidth) {
    const fullWidthClasses = clsx(commonClasses, className);
    return (
      <div className={fullWidthClasses} style={style} {...props}>
        <Container className={clsx("py-5 position-relative overflow-hidden")}>
          <BackgroundElement
            img={img}
            isLoaded={isLoaded}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="position-relative" style={{ zIndex: 1 }}>
            {children}
          </div>
        </Container>
      </div>
    );
  } else {
    const containedClasses = clsx(
      commonClasses,
      "rounded-3 position-relative overflow-hidden",
      className,
    );
    return (
      <Container className={containedClasses} {...props} style={style}>
        <BackgroundElement
          img={img}
          isLoaded={isLoaded}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="position-relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </Container>
    );
  }
}
