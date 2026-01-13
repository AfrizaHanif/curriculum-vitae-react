"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "@/components/ui/form";
import FormInput from "@/components/ui/form/form-input";
import FormSelect from "@/components/ui/form/form-select";
import { CheckItem, SelectItem } from "@/lib/bootstrap-types";
import FormCheck from "@/components/ui/form/form-check";
import Toast from "@/components/ui/bootstrap/toast";

export default function ContactForm() {
  // const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  // const [state, handleSubmit] = useForm(
  //   // Ensure we extract just the ID if the full URL was provided in the env var
  //   (process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "").split("/").pop() || ""
  // );
  // Initialize from env but allow runtime override via /site-config.json
  const [siteKey, setSiteKey] = useState<string>(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
  );
  const initialFormId =
    (process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "").split("/").pop() || "";
  const [formId, setFormId] = useState<string>(initialFormId);
  const [state, handleSubmit] = useForm(formId);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [messageLength, setMessageLength] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [otherSubject, setOtherSubject] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Items of selectbox
  const subjectItems: SelectItem[] = [
    { label: "Penawaran Proyek", value: "Penawaran Proyek" },
    { label: "Pertanyaan Umum", value: "Pertanyaan Umum" },
    { label: "Apresiasi", value: "Apresiasi" },
    { label: "Kritik dan Saran", value: "Kritik dan Saran" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  // Items of checkbox
  const checkItems: CheckItem[] = [
    {
      label: "Saya telah mengisi form ini sesuai dengan yang saya butuhkan",
      value: "confirm",
      id: "confirm-check",
      required: true,
    },
  ];

  // Handle for reset every input
  const handleReset = useCallback(() => {
    formRef.current?.reset();
    recaptchaRef.current?.reset();
    setRecaptchaToken("");
    setMessageLength(0);
    setSubject("");
    setOtherSubject("");
  }, []);

  useEffect(() => {
    // Defer the reset to the next tick to avoid synchronous setState in effect
    // This prevents a warning about cascading renders when state.succeeded changes
    const timer = setTimeout(() => {
      if (state.succeeded) {
        setShowToast(true);
        handleReset();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [state.succeeded, handleReset]);

  useEffect(() => {
    // Only load runtime config in production to avoid overriding dev envs
    if (process.env.NODE_ENV !== "production") {
      // console.debug("Skipping /site-config.json load in development");
      return;
    }

    fetch("/site-config.json")
      .then((res) => {
        if (!res.ok) throw new Error("no site config");
        return res.json();
      })
      .then((data) => {
        if (data && data.siteKey) {
          // console.debug("Loaded site-config.siteKey from runtime config");
          setSiteKey(data.siteKey);
        }
        if (data && data.formId) {
          setFormId((data.formId || "").split("/").pop() || initialFormId);
        }
      })
      .catch((err) => {
        console.debug("No site-config.json found or failed to load", err);
      });
  }, [initialFormId]);

  return (
    <>
      <Form
        ref={formRef}
        labelSubmit="Submit"
        onSubmit={handleSubmit}
        submitting={state.submitting}
        disabled={
          (!!siteKey && !recaptchaToken) ||
          (subject === "Lainnya" && !otherSubject)
        }
        onReset={handleReset}
        labelReset="Reset"
      >
        <div className="row">
          <div className="col">
            <FormInput id="name" name="name" type="text" required>
              Nama Lengkap
            </FormInput>
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-danger small"
            />
          </div>
          <div className="col">
            <FormInput id="email" name="email" type="email" required>
              E-Mail
            </FormInput>
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-danger small"
            />
          </div>
        </div>
        <div className="row">
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
              <ValidationError
                prefix="Other Subject"
                field="otherSubject"
                errors={state.errors}
                className="text-danger small"
              />
            </div>
          )}
        </div>
        <input
          type="hidden"
          name="_subject"
          value={subject === "Lainnya" ? otherSubject : subject}
        />
        <ValidationError
          prefix="Subject"
          field="subject"
          errors={state.errors}
          className="text-danger small"
        />
        <FormInput id="url" name="url" type="url">
          Link Terkait (Optional)
        </FormInput>
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
        {/* <div className="text-end mb-2">
          <small className="text-muted">{messageLength} / 1000</small>
        </div> */}
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-danger small"
        />
        <FormCheck
          id={"confirm"}
          type={"checkbox"}
          items={checkItems}
        ></FormCheck>
        {siteKey && (
          <>
            <div className="mb-3 mt-3">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={(token) => setRecaptchaToken(token || "")}
                theme="dark"
              />
            </div>
          </>
        )}
      </Form>
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast
          id="success-toast"
          title="Terima kasih!"
          show={showToast}
          onClose={() => setShowToast(false)}
        >
          Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda
          kembali.
        </Toast>
      </div>
    </>
  );
}
