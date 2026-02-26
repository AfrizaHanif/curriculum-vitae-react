import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { NavTabItem } from "@/lib/bootstrap-types";

type NavTabProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  variant?: "tabs" | "pills";
  items: NavTabItem[];
  defaultActiveId?: string;
  vertical?: boolean;
  fill?: boolean;
  navSize?: 1 | 2 | 3 | 4;
};

export default function NavTab({
  id,
  variant = "tabs",
  items,
  defaultActiveId,
  className,
  vertical = false,
  fill = false,
  navSize = 3,
  ...props
}: NavTabProps) {
  const activeTabId = defaultActiveId ?? (items.length > 0 ? items[0].id : "");

  // If there are no items, we can return null to render nothing,
  // or return some placeholder JSX.
  if (vertical) {
    return (
      <div className={`d-flex align-items-start ${className}`} {...props}>
        <div
          className={`nav flex-column nav-pills col-${navSize} pe-3`}
          id={`v-${id}-tab`}
          role="tablist"
          aria-orientation="vertical"
        >
          {items.map((item) => (
            <button
              key={item.id}
              className={clsx("nav-link", {
                active: activeTabId === item.id,
              })}
              id={`v-pills-${item.id}-tab`}
              data-bs-toggle="pill"
              data-bs-target={`#v-pills-${item.id}`}
              type="button"
              role="tab"
              aria-controls={`v-pills-${item.id}`}
              aria-selected={activeTabId === item.id}
              disabled={item.disabled}
              tabIndex={activeTabId === item.id ? 0 : -1}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div
          className={`tab-content col-${12 - navSize}`}
          id={`v-${id}-tabContent`}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={clsx("tab-pane", "fade", {
                "show active": activeTabId === item.id,
              })}
              id={`v-pills-${item.id}`}
              role="tabpanel"
              aria-labelledby={`v-pills-${item.id}-tab`}
              tabIndex={0}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={className} {...props}>
        <ul
          className={`nav nav-${variant} ${fill && "nav-fill"}`}
          id={`${id}-tab`}
          role="tablist"
        >
          {items.map((item) => (
            <li key={item.id} className="nav-item" role="presentation">
              <button
                className={clsx("nav-link", {
                  active: activeTabId === item.id,
                })}
                id={`${item.id}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#${item.id}-tab-pane`}
                type="button"
                role="tab"
                aria-controls={`${item.id}-tab-pane`}
                aria-selected={activeTabId === item.id}
                disabled={item.disabled}
                tabIndex={activeTabId === item.id ? 0 : -1}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id={`${id}-tabContent`}>
          {items.map((item) => (
            <div
              key={item.id}
              className={clsx("tab-pane", "fade", {
                "show active": activeTabId === item.id,
              })}
              id={`${item.id}-tab-pane`}
              role="tabpanel"
              aria-labelledby={`${item.id}-tab`}
              tabIndex={0}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
