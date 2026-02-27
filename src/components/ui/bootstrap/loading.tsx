import styles from "./loading.module.css";
import clsx from "clsx";

interface LoadingProps {
  text?: string;
  fading?: boolean;
}

export default function Loading({ text, fading }: LoadingProps) {
  return (
    <div className={clsx(styles.loadingOverlay, fading && styles.fadeOut)}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <div className="mt-3 fs-5 text-body-secondary">{text}</div>}
    </div>
  );
}
