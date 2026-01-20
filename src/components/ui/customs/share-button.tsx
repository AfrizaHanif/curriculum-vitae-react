"use client";

import { useState, useEffect } from "react";
import Button from "../bootstrap/button";

interface ShareButtonProps {
  title: string;
  text: string;
  children: React.ReactNode;
}

export default function ShareButton({
  title,
  text,
  children,
}: ShareButtonProps) {
  // Check for navigator.share support directly during render
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button color="secondary" outline onClick={handleShare}>
      {isSupported ? children : "Copy Link"}
    </Button>
  );
}
