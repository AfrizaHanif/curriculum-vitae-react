import { AllowedSizeButton } from "@/types/common";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type AllowedRole = "group" | "toolbar";

type ButtonGroupProps = ComponentPropsWithoutRef<"div"> & {
  arialabel: string;
  size?: AllowedSizeButton;
  role: AllowedRole;
  children: ReactNode;
};

export default function ButtonGroup({
  arialabel,
  size,
  role = "group",
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const classes = clsx(`btn-${role}`, size && `btn-group-${size}`, className);

  return (
    <div className={classes} role={role} aria-label={arialabel} {...props}>
      {children}
    </div>
  );
}

// HOW TO USE:
// Inside of this component, add more than two Button components to make the button group work
