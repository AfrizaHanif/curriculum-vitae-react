import clsx from "clsx";

type LoadingProps = {
  fullscreen?: boolean;
  text?: string;
  className?: string;
  variant?: "spinner" | "skeleton";
};

export default function Loading({
  fullscreen = true,
  text = "Loading...",
  className,
  variant = "spinner",
}: LoadingProps) {
  if (variant === "skeleton") {
    return (
      <div
        className={clsx(
          "w-100",
          fullscreen && "vh-100 d-flex flex-column justify-content-center p-5",
          className
        )}
      >
        <div className="placeholder-glow" aria-hidden="true">
          <span className="placeholder col-7 d-block mb-2"></span>
          <span className="placeholder col-4 d-block mb-2"></span>
          <span className="placeholder col-4 d-block mb-2"></span>
          <span className="placeholder col-6 d-block mb-2"></span>
          <span className="placeholder col-8 d-block"></span>
        </div>
        <span className="visually-hidden">{text}</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "d-flex justify-content-center align-items-center",
        fullscreen ? "vh-100" : "w-100 py-5",
        className
      )}
    >
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        {text && <h5 className="mt-2">{text}</h5>}
      </div>
    </div>
  );
}
