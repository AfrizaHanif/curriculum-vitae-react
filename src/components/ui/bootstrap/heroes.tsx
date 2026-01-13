import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import "./heroes.css";

type HeroesProps = ComponentPropsWithoutRef<"img"> & {
  type?: "center" | "screenshot" | "responsive" | "border";
  img?: string;
};

export default function Heroes({
  type = "center",
  img,
  children,
  ...props
}: HeroesProps) {
  if (type === "center") {
    return (
      <div className="px-4 py-5 my-5 text-center" {...props}>
        {children}
      </div>
    );
  } else if (type === "screenshot") {
    if (!img) return null;
    return (
      <div className="px-4 pt-5 my-5 text-center border-bottom" {...props}>
        {children}
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <Image
              src={img}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width={700}
              height={500}
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
            <Image
              src={img}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width={700}
              height={500}
            />
          </div>
          <div className="col-lg-6">{children}</div>
        </div>
      </div>
    );
  } else if (type === "border") {
    if (!img) return null;
    return (
      <div className="container my-5" {...props}>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">{children}</div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <Image
              className="rounded-lg-3"
              src={img}
              alt=""
              width={720}
              height={480}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
