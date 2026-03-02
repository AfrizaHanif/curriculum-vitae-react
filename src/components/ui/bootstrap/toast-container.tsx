import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ToastContainerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  as?: ElementType;
};

export default function ToastContainer({
  children,
  as: Tag = "div",
  ...props
}: ToastContainerProps) {
  return (
    <Tag
      className="toast-container position-fixed bottom-0 end-0 p-3"
      {...props}
    >
      {children}
    </Tag>
  );
}
