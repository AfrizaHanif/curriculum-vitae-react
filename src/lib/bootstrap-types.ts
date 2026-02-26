import { AllowedColors } from "@/types/common";
import { ReactNode } from "react";

// Accordion
export interface AccordionItem {
  title: string;
  content?: ReactNode;
}

// Header
export interface HeaderItem {
  label: string;
  icon: string;
  href?: string;
  newTab?: boolean;
  subItems?: HeaderItem[]; // Recursive definition for sub-menus
}

// Carousel
export interface CarouselItem {
  image: string;
  title: string;
  desc?: string;
}

// Dropdown
export interface DropdownItem {
  label: string;
  icon?: string;
  href?: string;
  newTab?: boolean;
  type?: "divider" | "item";
  dataToggle?: "modal" | "offcanvas";
  dataTarget?: string;
}

// Button for Modal
export interface ModalButtonItem {
  label: string;
  type?: "button" | "submit" | "reset";
  color: AllowedColors;
  dismiss?: boolean;
}

// Nav and Tab
export interface NavTabItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

// (Form) Checkbox and Radio Button
export interface CheckItem {
  label: string;
  value: string;
  id: string;
  name?: string;
  required?: boolean;
}

// (Form) Select Box
export interface SelectItem {
  label: string;
  value: string;
}

// Feature
export interface FeatureItem {
  key: string;
  icon: string;
  title?: string;
  description?: ReactNode;
  href?: string;
  newTab?: boolean;
  buttonLabel?: string;
  dataToggle?: "modal" | "offcanvas";
  dataTarget?: string;
  dataTitle?: string;
}

// Buttons for Heroes
export interface HeroesButtonItem {
  label: string;
  color: AllowedColors;
  href?: string;
  newTab?: boolean;
}

// Breadcrumb
export interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent?: boolean;
}
