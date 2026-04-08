"use client";

import { useEffect, useState } from "react";
import Toast from "@/components/ui/bootstrap/toast";

export default function ErrorToast({ message }: { message?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090 }}
    >
      <Toast
        id="api-error-toast"
        title="Info Sistem"
        show={show}
        onClose={() => setShow(false)}
      >
        <div className="text-danger">{message}</div>
      </Toast>
    </div>
  );
}
