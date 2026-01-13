import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  labelSubmit: string;
  submitting?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onReset?: () => void;
  labelReset?: string;
};

const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      labelSubmit,
      className,
      submitting,
      disabled,
      children,
      onReset,
      labelReset,
      ...props
    },
    ref
  ) => {
    return (
      <form ref={ref} className={className} {...props} onReset={onReset}>
        {children}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || disabled}
          >
            {submitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="ms-2">Submitting...</span>
              </>
            ) : (
              labelSubmit
            )}
          </button>
          {labelReset && (
            <button type="reset" className="btn btn-secondary">
              {labelReset}
            </button>
          )}
        </div>
      </form>
    );
  }
);
Form.displayName = "Form";

export default Form;
