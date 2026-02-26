import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { AllowedColors, AllowedSize } from "@/types/common";
import type { DropdownItem } from "../../../lib/bootstrap-types";
import Button from "./button";
import DropdownItemComponent from "./dropdown-items";
import "./dropdown.css";
import NextImage from "../next/next-image";

type BaseDropdownProps = ComponentPropsWithoutRef<"div"> & {
  color?: AllowedColors;
  size?: AllowedSize;
  centered?: boolean;
  stretchedLink?: boolean;
  direction?: "dropdown" | "dropup" | "dropend" | "dropstart";
  newTab?: boolean;
  fullWidth?: boolean;
  items: DropdownItem[];
  children: ReactNode;
};

type DropdownProps = BaseDropdownProps & {
  type?: "button" | "image";
  split?: boolean;
  img?: string;
  alt?: string;
};

export default function Dropdown({
  color = "primary",
  type = "button",
  items,
  size,
  centered = false,
  stretchedLink = false,
  direction = "dropdown",
  // newTab = false,
  fullWidth = false,
  className,
  children,
  split = false,
  img,
  alt,
  ...props
}: DropdownProps) {
  const wrapperClasses = clsx(
    split ? "btn-group" : direction,
    direction !== "dropdown" && split && direction,
    className,
  );

  const buttonClasses = clsx(
    "btn",
    // `btn-${color}`,
    size && `btn-${size}`,
    stretchedLink && "stretched-link",
    fullWidth && `w-100`,
  );

  const dropdownMenuClasses = clsx(
    "dropdown-menu rounded-3 w-220px mx-0 gap-1 p-2 shadow",
    centered && "dropdown-menu-center",
  );

  return (
    <div className={wrapperClasses} {...props}>
      {type === "button" ? (
        <>
          <Button
            className={clsx(buttonClasses, !split && "dropdown-toggle")}
            color={color}
            type="button"
            data-bs-toggle={!split ? "dropdown" : undefined}
            aria-expanded="false"
          >
            {children}
          </Button>
          {split && (
            <Button
              type="button"
              className={clsx(
                buttonClasses,
                "dropdown-toggle dropdown-toggle-split",
              )}
              color={color}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </Button>
          )}
        </>
      ) : (
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <NextImage
            src={img || "https://github.com/mdo.png"}
            alt={alt || ""}
            width="32"
            height="32"
            className="rounded-circle"
          />
        </a>
      )}
      <ul className={dropdownMenuClasses}>
        {items.map((item, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((item as any).type === "divider") {
            return (
              <li key={`divider-${index}`}>
                <hr className="dropdown-divider" />
              </li>
            );
          }
          return (
            <DropdownItemComponent
              key={item.label || index}
              href={item.href}
              newTab={item.newTab}
              dataToggle={item.dataToggle}
              dataTarget={item.dataTarget}
            >
              {item.icon && <i className={`bi bi-${item.icon} me-2`}></i>}
              {item.label}
            </DropdownItemComponent>
          );
        })}
      </ul>
    </div>
  );
}
