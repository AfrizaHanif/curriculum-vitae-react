import Link from "next/link";
import { ComponentPropsWithoutRef, ElementType } from "react";
import Button from "../bootstrap/button";
import ButtonGroup from "../bootstrap/button-group";

type NavigationItem = {
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type SlugNavigationProps = ComponentPropsWithoutRef<"div"> & {
  items: NavigationItem[];
  item: NavigationItem;
  backURL: string;
  as?: ElementType;
};

export default function SlugNavigation({
  items,
  item,
  backURL,
  as: Tag = "nav",
  className,
  ...props
}: SlugNavigationProps) {
  // Navigation's Function
  const currentIndex = items.findIndex((p) => p.slug === item.slug);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  return (
    <Tag
      className={`pb-3 ${className || ""}`}
      aria-label="Item navigation"
      {...props}
    >
      <div className="row justify-content-center g-2">
        {/* Back to list */}
        <div className="col">
          <Link href={`/${backURL}`}>
            <Button color="secondary" outline>
              <i className="bi bi-arrow-return-left pe-2"></i>
              Kembali
            </Button>
          </Link>
        </div>
        {/* Navigation */}
        <div className="col text-end">
          <ButtonGroup role={"group"} arialabel={"port-nav"}>
            {/* Prev Item */}
            {prevItem ? (
              <Link href={`/portfolio/${prevItem.slug}`}>
                <Button
                  color="secondary"
                  style={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  outline
                >
                  <i className="bi bi-arrow-left pe-2"></i>
                  Prev
                </Button>
              </Link>
            ) : (
              <Button color="secondary" outline disabled>
                <i className="bi bi-arrow-left pe-2"></i>
                Prev
              </Button>
            )}
            {/* Next Item */}
            {nextItem ? (
              <Link href={`/portfolio/${nextItem.slug}`}>
                <Button
                  color="secondary"
                  style={{
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                  outline
                >
                  Next
                  <i className="bi bi-arrow-right ps-2"></i>
                </Button>
              </Link>
            ) : (
              <Button color="secondary" outline disabled>
                Next
                <i className="bi bi-arrow-right ps-2"></i>
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
    </Tag>
  );
}
