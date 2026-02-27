/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ValidationError } from "@formspree/react";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "@/components/ui/form";
import FormInput from "@/components/ui/form/form-input";
import FormSelect from "@/components/ui/form/form-select";
import { CheckItem, SelectItem } from "@/lib/bootstrap-types";
import FormCheck from "@/components/ui/form/form-check";
import Toast from "@/components/ui/bootstrap/toast";

interface Props {
  siteKey: string;
  formId: string;
}

export default function ContactFormWithFormspree({ siteKey, formId }: Props) {
  // const [state, handleSubmit] = useForm(formId);
  const [serverErrors, setServerErrors] = useState<any>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [messageLength, setMessageLength] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
  const [otherSubject, setOtherSubject] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    isLoading,
    submit,
    reset: resetSubmission,
  } = useFormSubmission(
    async (data: any) => {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw json;
      }
      return json;
    },
    {
      onSuccess: () => {
        setShowToast(true);
        handleReset();
      },
      onError: (err: any) => {
        if (err && err.errors) {
          setServerErrors(err.errors);
        }
      },
    },
  );

  // Item of subject selection
  const subjectItems: SelectItem[] = [
    { label: "Penawaran Proyek", value: "Penawaran Proyek" },
    { label: "Pertanyaan Umum", value: "Pertanyaan Umum" },
    { label: "Apresiasi", value: "Apresiasi" },
    { label: "Kritik dan Saran", value: "Kritik dan Saran" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  // Item of checkbox item
  const checkItems: CheckItem[] = [
    {
      label: "Saya telah mengisi form ini sesuai dengan yang saya butuhkan",
      value: "confirm",
      id: "confirm-check",
      required: true,
    },
  ];

  // Handle if reset button has been pressed
  const handleReset = useCallback(() => {
    formRef.current?.reset();
    recaptchaRef.current?.reset();
    setRecaptchaToken("");
    setMessageLength(0);
    setSubject("");
    setOtherSubject("");
    setServerErrors(null);
    resetSubmission();
  }, [resetSubmission]);

  //
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (recaptchaToken) {
      data["g-recaptcha-response"] = recaptchaToken;
    }

    await submit(data);
  };

  return (
    <>
      <Form
        ref={formRef}
        labelSubmit="Submit"
        onSubmit={onSubmit}
        submitting={isLoading}
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
              errors={serverErrors}
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
              errors={serverErrors}
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
              onChange={(e) => {
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
                onChange={(e) => setOtherSubject(e.target.value)}
              >
                Subjek Lainnya
                <span className="badge text-bg-secondary ms-1">
                  {otherSubject.length} / 100
                </span>
              </FormInput>
              <ValidationError
                prefix="Other Subject"
                field="otherSubject"
                errors={serverErrors}
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
          errors={serverErrors}
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
          onChange={(e) => setMessageLength(e.target.value.length)}
        >
          Pesan
          <span className="badge text-bg-secondary ms-1">
            {messageLength} / 200
          </span>
        </FormInput>
        <ValidationError
          prefix="Message"
          field="message"
          errors={serverErrors}
          className="text-danger small"
        />

        <FormCheck id="confirm" type="checkbox" items={checkItems} />

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
