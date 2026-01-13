import { ComponentPropsWithoutRef, ReactNode } from "react";
import DropdownItemComponent from "./dropdown-items";
import { AllowedColors, AllowedSize } from "@/types/common";
import clsx from "clsx";
import "./dropdown.css";
import { DropdownItem } from "@/lib/bootstrap-types";

type DropdownProps = ComponentPropsWithoutRef<"div"> & {
  color: AllowedColors;
  split?: boolean;
  size?: AllowedSize;
  centered?: boolean;
  stretchedLink?: boolean;
  direction?: "dropdown" | "dropup" | "dropend" | "dropstart";
  newTab?: boolean;
  fullWidth?: boolean;
  items: DropdownItem[];
  children: ReactNode;
};

export default function Dropdown({
  color,
  items,
  split,
  size,
  centered = false,
  stretchedLink = false,
  direction = "dropdown",
  newTab = false,
  fullWidth = false,
  className,
  children,
  ...props
}: DropdownProps) {
  const wrapperClasses = clsx(
    split ? "btn-group" : direction,
    direction !== "dropdown" && split && direction,
    className
  );

  const buttonClasses = clsx(
    "btn",
    `btn-${color}`,
    size && `btn-${size}`,
    stretchedLink && "stretched-link",
    fullWidth && `w-100`
  );

  const dropdownMenuClasses = clsx(
    "dropdown-menu gap-1 p-2 rounded-3 mx-0 shadow w-220px",
    centered && "dropdown-menu-center"
  );

  return (
    <div className={wrapperClasses} {...props}>
      <button
        className={clsx(buttonClasses, !split && "dropdown-toggle")}
        type="button"
        data-bs-toggle={!split ? "dropdown" : undefined}
        aria-expanded="false"
      >
        {children}
      </button>
      {split && (
        <button
          type="button"
          className={clsx(
            buttonClasses,
            "dropdown-toggle dropdown-toggle-split"
          )}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
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
              newTab={newTab}
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
