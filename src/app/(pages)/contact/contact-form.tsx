"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "@/components/ui/form";
import FormInput from "@/components/ui/form/form-input";
import FormSelect from "@/components/ui/form/form-select";
import { CheckItem, SelectItem } from "@/lib/bootstrap-types";
import FormCheck from "@/components/ui/form/form-check";
import Toast from "@/components/ui/bootstrap/toast";

// NOTE: This is a form component without Formspree. Even it's functional, it will return error that Formspree ID are not to be configured

// Dynamically import the form that uses Formspree so it never runs during SSR
const ContactFormWithFormspree = dynamic(
  () => import("./contact-form-with-formspree"),
  {
    ssr: false,
  },
);

export default function ContactForm() {
  // Initialize from env but allow runtime override via /site-config.json
  const [siteKey, setSiteKey] = useState<string>(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  );
  const initialFormId =
    (process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "").split("/").pop() || "";
  const [formId, setFormId] = useState<string>(initialFormId);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only load runtime config in production to avoid overriding dev envs
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    fetch("/site-config.json")
      .then((res) => {
        if (!res.ok) throw new Error("no site config");
        return res.json();
      })
      .then((data) => {
        if (data && data.siteKey) {
          setSiteKey(data.siteKey);
        }
        if (data && data.formId) {
          setFormId((data.formId || "").split("/").pop() || initialFormId);
        }
      })
      .catch(() => {
        /* ignore */
      });
  }, [initialFormId]);

  // Render the Formspree-backed form only on the client and only when we have a formId
  if (!isMounted) {
    // During SSR return a lightweight placeholder to avoid calling Formspree hooks
    return <div style={{ minHeight: "10rem" }} />;
  }

  if (!formId) {
    // If no form ID is configured, render a local fallback form that doesn't call Formspree
    console.log("Formspree is not ready for this form (ID not found)");
    return <ContactFormFallback siteKey={siteKey} />;
  }

  console.log("Formspree is ready for this form (", formId, ")");

  return <ContactFormWithFormspree siteKey={siteKey} formId={formId} />;
}

function ContactFormFallback({ siteKey }: { siteKey: string }) {
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [messageLength, setMessageLength] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [otherSubject, setOtherSubject] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const subjectItems: SelectItem[] = [
    { label: "Penawaran Proyek", value: "Penawaran Proyek" },
    { label: "Pertanyaan Umum", value: "Pertanyaan Umum" },
    { label: "Apresiasi", value: "Apresiasi" },
    { label: "Kritik dan Saran", value: "Kritik dan Saran" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  const checkItems: CheckItem[] = [
    {
      label: "Saya telah mengisi form ini sesuai dengan yang saya butuhkan",
      value: "confirm",
      id: "confirm-check",
      required: true,
    },
  ];

  const handleReset = useCallback(() => {
    formRef.current?.reset();
    recaptchaRef.current?.reset();
    setRecaptchaToken("");
    setMessageLength(0);
    setSubject("");
    setOtherSubject("");
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Show a toast explaining the form isn't wired in this build
    setShowToast(true);
    handleReset();
  };

  return (
    <>
      {/* Form */}
      <Form
        ref={formRef}
        labelSubmit="Submit"
        onSubmit={handleSubmit}
        submitting={false}
        disabled={!!siteKey && !recaptchaToken}
        onReset={handleReset}
        labelReset="Reset"
      >
        <div className="row">
          {/* Full Name */}
          <div className="col">
            <FormInput id="name" name="name" type="text" required>
              Nama Lengkap
            </FormInput>
          </div>
          {/* E-Mail */}
          <div className="col">
            <FormInput id="email" name="email" type="email" required>
              E-Mail
            </FormInput>
          </div>
        </div>
        <div className="row">
          {/* Subject */}
          <div className="col">
            <FormSelect
              id="subject"
              name="subject"
              message="Pilih Subjek..."
              items={subjectItems}
              required
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSubject(e.target.value);
                if (e.target.value !== "Lainnya") {
                  setOtherSubject("");
                }
              }}
            >
              Subjek
            </FormSelect>
          </div>
          {/* Other Subject if selected */}
          {subject === "Lainnya" && (
            <div className="col">
              <FormInput
                id="otherSubject"
                name="otherSubject"
                type="text"
                required
                maxLength={100}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setOtherSubject(e.target.value)
                }
              >
                Subjek Lainnya
                <span className="badge text-bg-secondary ms-1">
                  {otherSubject.length} / 100
                </span>
              </FormInput>
            </div>
          )}
        </div>
        {/* Link (Optional) */}
        <FormInput id="url" name="url" type="url">
          Link Terkait (Optional)
        </FormInput>
        {/* Message */}
        <FormInput
          id="message"
          name="message"
          textarea
          required
          maxLength={1000}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessageLength(e.target.value.length)
          }
        >
          Pesan
          <span className="badge text-bg-secondary ms-1">
            {messageLength} / 200
          </span>
        </FormInput>
        {/* Confirm Box */}
        <FormCheck id={"confirm"} type={"checkbox"} items={checkItems} />
        {/* ReCAPTCHA */}
        {siteKey && (
          <div className="mb-3 mt-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={siteKey}
              onChange={(token) => setRecaptchaToken(token || "")}
              theme="dark"
            />
          </div>
        )}
      </Form>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast
          id="success-toast"
          title="Perhatian"
          show={showToast}
          onClose={() => setShowToast(false)}
        >
          Form ini belum dikonfigurasi di build saat ini. Silakan periksa
          konfigurasi `NEXT_PUBLIC_FORMSPREE_FORM_ID` atau `site-config.json`.
        </Toast>
      </div>
    </>
  );
}
