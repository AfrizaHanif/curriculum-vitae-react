import { CheckItem } from "@/lib/bootstrap-types";
import { ComponentPropsWithoutRef } from "react";

type CheckProps = ComponentPropsWithoutRef<"input"> & {
  // label: string;
  id: string;
  type: "checkbox" | "radio";
  items: CheckItem[];
  caption?: boolean;
  captionValue?: string;
};

export default function FormCheck({
  id,
  type,
  items,
  caption = false,
  captionValue,
  children,
  ...props
}: CheckProps) {
  return (
    <div className="mb-3" {...props}>
      {/* Label input */}
      <label htmlFor={id} className="form-label">
        {children}
      </label>
      {/* Items */}
      {items.map((item) => (
        <div key={item.id} className="form-check">
          {/* Input area */}
          <input
            className="form-check-input"
            type={type}
            value={item.value}
            id={item.id}
            name={item.name}
            {...(item.required && { required: true })}
          />
          {/* Label of item */}
          <label className="form-check-label" htmlFor={item.id}>
            {item.label}
          </label>
        </div>
      ))}
      {caption ? (
        <div id={`${id}-caption`} className="form-text">
          {captionValue}
        </div>
      ) : null}
    </div>
  );
}
