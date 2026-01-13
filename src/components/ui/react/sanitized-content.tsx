"use client";
import { ElementType, HTMLAttributes, useEffect, useState } from "react";

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
  const [sanitized, setSanitized] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    // Dynamically import to ensure DOMPurify (and any server-only deps) are only loaded in the browser
    import("isomorphic-dompurify").then((mod) => {
      if (!mounted) return;
      const DOMPurify = mod.default;
      setSanitized(DOMPurify.sanitize(content));
    });
    return () => {
      mounted = false;
    };
  }, [content]);

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
      {...props}
    />
  );
}
