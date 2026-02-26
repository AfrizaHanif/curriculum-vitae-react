import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode, CSSProperties } from "react";
import { Container } from "react-bootstrap";
import type { AllowedColors } from "@/types/common";
import styles from "./jumbotron.module.css";

type JumbotronProps = ComponentPropsWithoutRef<"div"> & {
  img?: string;
  backgroundColor?: AllowedColors;
  textColor?: AllowedColors;
  fullWidth?: boolean;
  imgClassName?: string;
  children: ReactNode;
};

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
  const commonClasses = `p-5 ${img ? `` : `bg-body-${backgroundColor}`} ${
    textColor ? `text-bg-${textColor}` : undefined
  }`;
  const backgroundStyle = img
    ? ({
        "--bg-img": `url(${img})`,
      } as CSSProperties)
    : {};

  if (fullWidth) {
    const fullWidthClasses = clsx(commonClasses, className);
    return (
      <div className={fullWidthClasses} style={style} {...props}>
        <Container
          className={clsx("py-5", img && styles.jumbotronBackground)}
          style={img ? backgroundStyle : undefined}
        >
          {children}
        </Container>
      </div>
    );
  } else {
    const containedClasses = clsx(
      commonClasses,
      "rounded-3",
      className,
      img && styles.jumbotronBackground,
    );
    return (
      <Container
        className={containedClasses}
        {...props}
        style={img ? { ...backgroundStyle, ...style } : style}
      >
        {/* {img ? (
          <div className="row align-items-center">
            <div className="col-6">{children}</div>
            <div className="col-6">
              <Image src={img} alt="" type="fluid" className={imgClassName} />
            </div>
          </div>
        ) : (
          children
        )} */}
        {children}
      </Container>
    );
  }
}
