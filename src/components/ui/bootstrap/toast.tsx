import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import type { Toast as BsToast } from "bootstrap";

type ToastProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  show: boolean;
  onClose?: () => void;
};

export default function Toast({
  id,
  className,
  title,
  subtitle,
  show,
  onClose,
  children,
  ...props
}: ToastProps) {
  const classes = clsx("toast", className);
  const toastRef = useRef<HTMLDivElement>(null);
  const bsToastRef = useRef<BsToast | null>(null); // To store the Bootstrap Toast instance

  useEffect(() => {
    const toastElement = toastRef.current;
    if (!toastElement) return;

    // Initialize Bootstrap Toast instance and event listener once
    if (!bsToastRef.current) {
      import("bootstrap/js/dist/toast").then(({ default: ToastClass }) => {
        bsToastRef.current = ToastClass.getOrCreateInstance(toastElement);

        const handleHidden = () => {
          onClose?.(); // Notify parent that the toast is fully hidden
        };

        // Add event listener for when Bootstrap finishes hiding the toast
        toastElement.addEventListener("hidden.bs.toast", handleHidden);

        // Cleanup function for the event listener
        return () => {
          toastElement.removeEventListener("hidden.bs.toast", handleHidden);
        };
      });
    }
  }, [onClose]); // Dependency on onClose to ensure correct closure if it changes

  useEffect(() => {
    // This effect controls showing/hiding the Bootstrap toast instance
    if (bsToastRef.current) {
      if (show) {
        bsToastRef.current.show();
      } else {
        // Call hide() when the 'show' prop becomes false.
        // Bootstrap will handle the fade-out animation.
        bsToastRef.current.hide();
      }
    }
  }, [show]); // React to changes in the 'show' prop

  return (
    <div
      id={id}
      ref={toastRef}
      className={classes}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...props}
    >
      <div className="toast-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img src="..." className="rounded me-2" alt="..." /> */}
        <strong className="me-auto">{title}</strong>
        <small>{subtitle}</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{children}</div>
    </div>
  );
}
