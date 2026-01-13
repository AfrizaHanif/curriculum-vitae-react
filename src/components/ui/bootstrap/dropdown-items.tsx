import { ComponentPropsWithoutRef } from "react";

type DropdownItemProps = ComponentPropsWithoutRef<"a"> & {
  dataToggle?: string;
  dataTarget?: string;
  newTab?: boolean;
};

export default function DropdownItem({
  dataToggle,
  dataTarget,
  href = "#",
  newTab,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <li>
      <a
        className="dropdown-item rounded-2"
        href={href}
        data-bs-toggle={dataToggle}
        data-bs-target={`#${dataTarget}`}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}
