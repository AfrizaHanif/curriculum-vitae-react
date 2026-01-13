import { ComponentPropsWithoutRef } from "react";
import AccordionItemNew from "./accordion-item";
import clsx from "clsx";
import { AccordionItem } from "@/lib/bootstrap-types";

type AccordionProps = ComponentPropsWithoutRef<"div"> & {
  id: string;
  flush?: boolean;
  alwaysOpen?: boolean;
  items: AccordionItem[];
  openItemIndex?: number;
};

export default function Accordion({
  id,
  items,
  flush = false,
  alwaysOpen = false,
  openItemIndex,
  className,
  ...props
}: AccordionProps) {
  const classes = clsx("accordion", { "accordion-flush": flush }, className);

  return (
    <div className={classes} id={id} {...props}>
      {/* Item loop */}
      {items.map((item, index) => (
        <AccordionItemNew
          key={`${id}-${index}`}
          title={item.title}
          parentId={id}
          itemId={`${id}-item-${index}`}
          alwaysOpen={alwaysOpen}
          isOpen={index === openItemIndex}
        >
          {item.content}
        </AccordionItemNew>
      ))}
    </div>
  );
}
