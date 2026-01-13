import { ComponentPropsWithoutRef, ReactNode } from "react";

type ToastContainerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export default function ToastContainer({
  children,
  ...props
}: ToastContainerProps) {
  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      {...props}
    >
      {children}
    </div>
  );
}
