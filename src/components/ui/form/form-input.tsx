import { ComponentPropsWithoutRef, ReactNode } from "react";

// Base props (Available for every splitted props)
type BaseProps = {
  // label: string;
  id: string;
  name: string;
  caption?: boolean;
  captionValue?: string;
  floatLabel?: boolean;
  children: ReactNode;
};

// Input props
type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
  textarea?: false;
  type:
    | "email"
    | "password"
    | "checkbox"
    | "date"
    | "text"
    | "number"
    | "file"
    | "url";
};

// Text area props
type TextareaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  textarea: true;
};

// Combine props into one prop
type InputProps = BaseProps & (InputFieldProps | TextareaFieldProps);

export default function FormInput({
  id,
  name,
  // label,
  floatLabel,
  caption = false,
  captionValue,
  textarea = false,
  children,
  ...props
}: InputProps) {
  // Check if input are text area or input
  if (textarea) {
    return (
      <div className={`mb-3 ${floatLabel && "form-floating"}`}>
        {/* Label */}
        {!floatLabel && (
          <label htmlFor={id} className="form-label">
            {children}
          </label>
        )}
        {/* Input area */}
        <textarea
          className="form-control"
          id={id}
          name={name}
          rows={4}
          placeholder={floatLabel ? (children as string) : undefined}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        ></textarea>
        {floatLabel && <label htmlFor={id}>{children}</label>}
      </div>
    );
  } else {
    return (
      <div className={`mb-3 ${floatLabel && "form-floating"}`}>
        {/* Label */}
        {!floatLabel && (
          <label htmlFor={id} className="form-label">
            {children}
          </label>
        )}
        {/* Input area */}
        <input
          className="form-control"
          id={id}
          name={name}
          aria-describedby={caption ? `${id}-caption` : undefined}
          placeholder={floatLabel ? (children as string) : undefined}
          {...(props as ComponentPropsWithoutRef<"input">)}
        />
        {/* Caption */}
        {caption ? (
          <div id={`${id}-caption`} className="form-text">
            {captionValue}
          </div>
        ) : null}
        {floatLabel && <label htmlFor={id}>{children}</label>}
      </div>
    );
  }
}
