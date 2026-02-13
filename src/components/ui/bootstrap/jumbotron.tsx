import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Container } from "react-bootstrap";
import type { AllowedColors } from "@/types/common";

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
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.3) 100%), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  if (fullWidth) {
    const fullWidthClasses = clsx(commonClasses, className);
    return (
      <div className={fullWidthClasses} style={style} {...props}>
        <Container className="py-5" style={img ? backgroundStyle : undefined}>
          {children}
        </Container>
      </div>
    );
  } else {
    const containedClasses = clsx(commonClasses, "rounded-3", className);
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
