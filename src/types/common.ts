// Allowed colors
// Global (Include: Navbar, Toast, Popover, Tooltip)
export type AllowedColors =
  | "body"
  | "tertiary"
  | "emphasis"
  | "border"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Alert, Button, Card, List Group, Placeholder, Progress, Spinner only
export type AllowedColorsStatus =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Allowed size
// Global (Include: Offcanvas, Modal (Fullscreen))
export type AllowedSize = "sm" | "md" | "lg" | "xl" | "xxl";

// Spinner only
export type AllowedSizeSpinner = "sm";

// Button and Button Group only
export type AllowedSizeButton = "sm" | "lg";

// Modal only
export type AllowedSizeModal = "sm" | "lg" | "xl";
