import { AllowedColors } from "@/types/bootstrap-allowed";
import { ComponentPropsWithoutRef, ElementType } from "react";

type ProgressBarProps = ComponentPropsWithoutRef<"div"> & {
  percentNow?: number;
  percentMin?: number;
  percentMax?: number;
  withLabel?: boolean;
  color?: AllowedColors;
  stripped?: boolean;
  animated?: boolean;
  as?: ElementType;
};

export default function ProgressBar({
  percentNow = 0,
  percentMin = 0,
  percentMax = 100,
  withLabel = false,
  color = "primary",
  stripped = false,
  animated = false,
  as: Component = "div",
}: ProgressBarProps) {
  const percent = Math.min(
    Math.max(((percentNow - percentMin) / (percentMax - percentMin)) * 100, 0),
    100,
  );

  return (
    <Component
      className="progress"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={percent}
      aria-valuemin={percentMin}
      aria-valuemax={percentMax}
    >
      <div
        className={`progress-bar ${stripped ? "progress-bar-striped" : ""} ${animated ? "progress-bar-animated" : ""} bg-${color}`}
        style={{ width: `${percent}%` }}
      >
        {withLabel && `${Math.round(percent)}%`}
      </div>
    </Component>
  );
}
