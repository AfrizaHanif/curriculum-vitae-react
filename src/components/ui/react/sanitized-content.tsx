import DOMPurify from "isomorphic-dompurify";
import { ElementType, HTMLAttributes } from "react";

interface SanitizedContentProps extends HTMLAttributes<HTMLElement> {
  content: string;
  tag?: ElementType;
}

export default function SanitizedContent({
  content,
  tag: Tag = "div",
  className,
  ...props
}: SanitizedContentProps) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      {...props}
    />
  );
}
