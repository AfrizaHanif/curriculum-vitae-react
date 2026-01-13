import { ComponentPropsWithoutRef, ReactNode } from "react";

type AccordionItemProps = ComponentPropsWithoutRef<"div"> & {
  title: ReactNode;
  itemId: string;
  parentId: string;
  alwaysOpen?: boolean;
  isOpen?: boolean;
};

export default function AccordionItem({
  title,
  children,
  itemId,
  parentId,
  alwaysOpen = false,
  isOpen = false,
  ...props
}: AccordionItemProps) {
  const collapseId = `collapse-${itemId}`;
  const headerId = `header-${itemId}`;

  return (
    <div className="accordion-item" {...props}>
      {/* Header */}
      <h2 className="accordion-header" id={headerId}>
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-controls={collapseId}
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </h2>
      {/* Content */}
      <div
        id={collapseId}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={headerId}
        {...(!alwaysOpen && { "data-bs-parent": `#${parentId}` })}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
