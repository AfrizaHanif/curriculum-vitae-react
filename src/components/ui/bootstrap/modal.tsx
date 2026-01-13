import { ModalButtonItem } from "@/lib/bootstrap-types";
import { AllowedSize } from "@/types/common";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ModalProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  buttonItems: ModalButtonItem[]; // This is for buttons on modal';'s footer
  title?: string;
  subtitle?: string;
  scrollable?: boolean; // Renamed from 'static' to 'isStatic'
  isStatic?: boolean;
  size?: AllowedSize;
  fullscreen?: boolean;
  children: ReactNode;
};

export default function Modal({
  id,
  buttonItems,
  title,
  subtitle,
  scrollable, // Renamed from 'static' to 'isStatic'
  isStatic,
  size,
  fullscreen,
  children,
  ...props
}: ModalProps) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop={isStatic && "static"}
      {...props}
    >
      <div
        className={`modal-dialog ${scrollable && "modal-dialog-scrollable"} ${
          fullscreen ? "modal-fullscreen" : `modal-${size}`
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <h6 className="text-body-secondary fw-normal mb-0">{subtitle}</h6>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {buttonItems.map((item) => (
              <button
                key={item.label}
                type={item.type}
                className={`btn btn-${item.color}`}
                {...(item.dismiss && { "data-bs-dismiss": "modal" })}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
