"use client";

import {
  ArrowLeftIcon,
  CheckIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react";

import type { FormEvent } from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./FloatingActions.module.css";

type Interest =
  | "proyecto"
  | "diseno"
  | "consultoria"
  | "contacto";

type ChatStep =
  | "welcome"
  | "phone"
  | "success";

const WHATSAPP_NUMBER = "51966253873";

const optionLabels: Record<
  Interest,
  string
> = {
  proyecto:
    "Desarrollar un proyecto arquitectónico",

  diseno:
    "Diseño y arquitectura",

  consultoria:
    "Consultoría arquitectónica",

  contacto:
    "Hablar con Darkham",
};

const options: {
  id: Interest;
  title: string;
}[] = [
  {
    id: "proyecto",
    title: "Desarrollar un proyecto",
  },
  {
    id: "diseno",
    title: "Diseño y arquitectura",
  },
  {
    id: "consultoria",
    title: "Consultoría arquitectónica",
  },
  {
    id: "contacto",
    title: "Hablar con Darkham",
  },
];

export default function FloatingActions() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [step, setStep] =
    useState<ChatStep>("welcome");

  const [interest, setInterest] =
    useState<Interest | null>(null);

  const [phone, setPhone] =
    useState("");

  const [phoneError, setPhoneError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* =====================================
     ESC
  ===================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  /* =====================================
     FOCUS
  ===================================== */

  useEffect(() => {
    if (
      isOpen &&
      step === "phone"
    ) {
      const timer =
        window.setTimeout(() => {
          inputRef.current?.focus();
        }, 220);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [isOpen, step]);

  /* =====================================
     SELECT INTEREST
  ===================================== */

  const handleInterest = (
    selectedInterest: Interest,
  ) => {
    setInterest(selectedInterest);
    setPhone("");
    setPhoneError("");
    setStep("phone");
  };

  /* =====================================
     BACK
  ===================================== */

  const handleBack = () => {
    if (isSubmitting) {
      return;
    }

    setPhone("");
    setPhoneError("");
    setStep("welcome");
  };

  /* =====================================
     PHONE
  ===================================== */

  const handlePhoneChange = (
    value: string,
  ) => {
    const digits = value
      .replace(/\D/g, "")
      .slice(0, 9);

    setPhone(digits);
    setPhoneError("");
  };

  const validatePhone = () => {
    if (!/^\d{9}$/.test(phone)) {
      setPhoneError(
        "Ingresa un número celular válido.",
      );

      return false;
    }

    return true;
  };

  /* =====================================
     SUBMIT
  ===================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !interest ||
      !validatePhone()
    ) {
      return;
    }

    try {
      setIsSubmitting(true);

      const message = [
        "Hola, Darkham.",
        "",
        `Estoy interesado(a) en: ${
          optionLabels[interest]
        }.`,
        `Mi número celular es: ${phone}.`,
        "",
        "Quisiera conversar sobre mi proyecto.",
      ].join("\n");

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message,
        )}`;

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      setStep("success");
    } catch (error) {
      console.error(
        "Error abriendo WhatsApp:",
        error,
      );

      setPhoneError(
        "No pudimos abrir WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================
     RESET
  ===================================== */

  const resetChat = () => {
    if (isSubmitting) {
      return;
    }

    setStep("welcome");
    setInterest(null);
    setPhone("");
    setPhoneError("");
  };

  /* =====================================
     CLOSE
  ===================================== */

  const closeChat = () => {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {/* =====================================
          PANEL
      ===================================== */}

      <section
        className={`${styles.panel} ${
          isOpen
            ? styles.panelOpen
            : ""
        }`}
        role="dialog"
        aria-label="Contacto Darkham"
        aria-modal="false"
      >
        {/* =================================
            HEADER
        ================================= */}

        <header className={styles.header}>
          <div className={styles.brand}>
            <span>DARKHAM</span>

            <small>
              ESTUDIO DE ARQUITECTURA
            </small>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeChat}
            aria-label="Cerrar"
          >
            <XIcon
              size={18}
              weight="regular"
            />
          </button>
        </header>

        {/* =================================
            CONTENT
        ================================= */}

        <div className={styles.content}>
          {/* =================================
              WELCOME
          ================================= */}

          {step === "welcome" && (
            <div className={styles.step}>
              <div className={styles.heading}>
                <span
                  className={
                    styles.numberLarge
                  }
                >
                  01
                </span>

                <div>
                  <span
                    className={
                      styles.eyebrow
                    }
                  >
                    INICIAR CONVERSACIÓN
                  </span>

                  <h2>
                    Cuéntanos sobre
                    <span>
                      tu proyecto.
                    </span>
                  </h2>
                </div>
              </div>

              <p
                className={
                  styles.description
                }
              >
                Selecciona una opción para
                comenzar.
              </p>

              <div className={styles.options}>
                {options.map(
                  (
                    option,
                    index,
                  ) => (
                    <button
                      key={option.id}
                      type="button"
                      className={
                        styles.option
                      }
                      onClick={() =>
                        handleInterest(
                          option.id,
                        )
                      }
                    >
                      <span
                        className={
                          styles.optionNumber
                        }
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <span
                        className={
                          styles.optionTitle
                        }
                      >
                        {option.title}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* =================================
              PHONE
          ================================= */}

          {step === "phone" &&
            interest && (
              <div className={styles.step}>
                <div className={styles.topMeta}>
                  <button
                    type="button"
                    className={
                      styles.backButton
                    }
                    onClick={
                      handleBack
                    }
                  >
                    <ArrowLeftIcon
                      size={13}
                      weight="regular"
                    />

                    <span>
                      RETROCEDER
                    </span>
                  </button>

                  <span>
                    02 / 02
                  </span>
                </div>

                <div
                  className={
                    styles.headingPhone
                  }
                >
                  <span
                    className={
                      styles.eyebrow
                    }
                  >
                    CONTACTO
                  </span>

                  <h2>
                    Hablemos sobre
                    <span>
                      tu proyecto.
                    </span>
                  </h2>

                  <p>
                    Déjanos tu número y
                    continuaremos por WhatsApp.
                  </p>
                </div>

                <div
                  className={
                    styles.service
                  }
                >
                  <span>
                    TU INTERÉS
                  </span>

                  <strong>
                    {
                      optionLabels[
                        interest
                      ]
                    }
                  </strong>
                </div>

                <form
                  className={
                    styles.form
                  }
                  onSubmit={
                    handleSubmit
                  }
                >
                  <label
                    htmlFor="darkham-phone"
                    className={
                      styles.label
                    }
                  >
                    NÚMERO CELULAR
                  </label>

                  <div
                    className={`${styles.phoneField} ${
                      phoneError
                        ? styles.phoneFieldError
                        : ""
                    }`}
                  >
                    <span
                      className={
                        styles.country
                      }
                    >
                      +51
                    </span>

                    <span
                      className={
                        styles.fieldDivider
                      }
                    />

                    <input
                      ref={inputRef}
                      id="darkham-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) =>
                        handlePhoneChange(
                          event.target
                            .value,
                        )
                      }
                      placeholder="999 999 999"
                      maxLength={9}
                      aria-invalid={Boolean(
                        phoneError,
                      )}
                    />
                  </div>

                  {phoneError && (
                    <span
                      className={
                        styles.error
                      }
                    >
                      {phoneError}
                    </span>
                  )}

                  <button
                    type="submit"
                    className={
                      styles.submit
                    }
                    disabled={
                      isSubmitting
                    }
                  >
                    <span>
                      {isSubmitting
                        ? "ABRIENDO WHATSAPP..."
                        : "CONTINUAR POR WHATSAPP"}
                    </span>

                    {!isSubmitting && (
                      <WhatsappLogoIcon
                        size={20}
                        weight="fill"
                        className={
                          styles.whatsappIcon
                        }
                      />
                    )}
                  </button>
                </form>
              </div>
            )}

          {/* =================================
              SUCCESS
          ================================= */}

          {step === "success" && (
            <div
              className={
                styles.success
              }
            >
              <div
                className={
                  styles.successMark
                }
              >
                <WhatsappLogoIcon
                  size={19}
                  weight="fill"
                />
              </div>

              <span
                className={
                  styles.eyebrow
                }
              >
                WHATSAPP
              </span>

              <h2>
                Estamos listos
                <span>
                  para conversar.
                </span>
              </h2>

              <p>
                Continúa la conversación
                con nosotros por WhatsApp.
              </p>

              <button
                type="button"
                className={
                  styles.restart
                }
                onClick={
                  resetChat
                }
              >
                NUEVA CONSULTA
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          FLOATING BUTTON
      ===================================== */}

      <button
        type="button"
        className={`${styles.floatingButton} ${
          isOpen
            ? styles.floatingButtonOpen
            : ""
        }`}
        onClick={() => {
          if (isOpen) {
            closeChat();
          } else {
            setIsOpen(true);
          }
        }}
        aria-label={
          isOpen
            ? "Cerrar contacto"
            : "Contactar con Darkham"
        }
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XIcon
            size={18}
            weight="regular"
          />
        ) : (
          <>
            <span
              className={
                styles.floatingLabel
              }
            >
              CONTACTO
            </span>

            <span
              className={
                styles.floatingTitle
              }
            >
              HABLEMOS
            </span>
          </>
        )}
      </button>
    </div>
  );
}