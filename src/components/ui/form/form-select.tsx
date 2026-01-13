import { SelectItem } from "@/lib/bootstrap-types";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  message: string;
  // label: string;
  id: string;
  items: SelectItem[];
  caption?: boolean;
  captionValue?: string;
  children: ReactNode;
};

export default function FormSelect({
  message,
  // label,
  id,
  items,
  children,
  caption = false,
  captionValue,
  ...props
}: SelectProps) {
  return (
    <div className="mb-3">
      {/* Label */}
      <label htmlFor={id} className="form-label">
        {children}
      </label>
      {/* Select area */}
      <select
        id={id}
        className="form-select"
        aria-label="Default select example"
        defaultValue={message}
        {...props}
      >
        {/* Items */}
        <option disabled>{message}</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {/* Caption */}
      {caption ? (
        <div id={`${id}-caption`} className="form-text">
          {captionValue}
        </div>
      ) : null}
    </div>
  );
}
