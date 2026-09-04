"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChatCircleDotsIcon,
  CompassIcon,
  HouseLineIcon,
  XIcon,
} from "@phosphor-icons/react";

import {
  FormEvent,
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

const WHATSAPP_NUMBER =
  "51966253873";

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
        }, 140);

      return () =>
        window.clearTimeout(timer);
    }
  }, [isOpen, step]);

  /* =====================================
     INTEREST
  ===================================== */

  const handleInterest = (
    selectedInterest: Interest,
  ) => {
    setInterest(
      selectedInterest,
    );

    setPhone("");
    setPhoneError("");

    setStep("phone");
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
        "Ingresa un número celular válido de 9 dígitos.",
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
        "Quisiera conversar sobre mi proyecto y conocer cómo puede ayudarme Darkham.",
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
        "No pudimos abrir WhatsApp. Inténtalo nuevamente.",
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

  return (
    <div className={styles.wrapper}>
      {/* =====================================
          WINDOW
      ===================================== */}

      {isOpen && (
        <section
          className={styles.chatWindow}
          role="dialog"
          aria-label="Contacto Darkham Studio"
          aria-modal="false"
        >
          {/* =================================
              HEADER
          ================================= */}

          <header
            className={
              styles.chatHeader
            }
          >
            <div
              className={
                styles.chatIdentity
              }
            >
              <div
                className={
                  styles.chatAvatar
                }
              >
                <span />
              </div>

              <div
                className={
                  styles.chatIdentityText
                }
              >
                <strong>
                  DARKHAM
                </strong>

                <span>
                  Studio de arquitectura
                </span>
              </div>
            </div>

            <button
              type="button"
              className={
                styles.closeButton
              }
              onClick={() =>
                setIsOpen(false)
              }
              aria-label="Cerrar contacto"
            >
              <XIcon
                size={17}
                weight="regular"
              />
            </button>
          </header>

          {/* =================================
              BODY
          ================================= */}

          <div
            className={
              styles.chatBody
            }
          >
            {/* ===============================
                WELCOME
            =============================== */}

            {step === "welcome" && (
              <>
                <div
                  className={
                    styles.introBlock
                  }
                >
                  <span
                    className={
                      styles.introNumber
                    }
                  >
                    01
                  </span>

                  <div>
                    <span
                      className={
                        styles.introEyebrow
                      }
                    >
                      INICIAR CONVERSACIÓN
                    </span>

                    <h2>
                      Cuéntanos sobre
                      tu proyecto.
                    </h2>

                    <p>
                      Selecciona el tipo de
                      servicio que necesitas
                      y conversemos.
                    </p>
                  </div>
                </div>

                <div
                  className={
                    styles.optionList
                  }
                >
                  <button
                    type="button"
                    className={
                      styles.optionButton
                    }
                    onClick={() =>
                      handleInterest(
                        "proyecto",
                      )
                    }
                  >
                    <div
                      className={
                        styles.optionIndex
                      }
                    >
                      01
                    </div>

                    <div
                      className={
                        styles.optionIcon
                      }
                    >
                      <HouseLineIcon
                        size={18}
                        weight="regular"
                      />
                    </div>

                    <span>
                      Desarrollar un
                      proyecto
                    </span>

                    <ArrowRightIcon
                      size={16}
                      weight="regular"
                    />
                  </button>

                  <button
                    type="button"
                    className={
                      styles.optionButton
                    }
                    onClick={() =>
                      handleInterest(
                        "diseno",
                      )
                    }
                  >
                    <div
                      className={
                        styles.optionIndex
                      }
                    >
                      02
                    </div>

                    <div
                      className={
                        styles.optionIcon
                      }
                    >
                      <CompassIcon
                        size={18}
                        weight="regular"
                      />
                    </div>

                    <span>
                      Diseño y
                      arquitectura
                    </span>

                    <ArrowRightIcon
                      size={16}
                      weight="regular"
                    />
                  </button>

                  <button
                    type="button"
                    className={
                      styles.optionButton
                    }
                    onClick={() =>
                      handleInterest(
                        "consultoria",
                      )
                    }
                  >
                    <div
                      className={
                        styles.optionIndex
                      }
                    >
                      03
                    </div>

                    <div
                      className={
                        styles.optionIcon
                      }
                    >
                      <CompassIcon
                        size={18}
                        weight="regular"
                      />
                    </div>

                    <span>
                      Consultoría
                      arquitectónica
                    </span>

                    <ArrowRightIcon
                      size={16}
                      weight="regular"
                    />
                  </button>

                  <button
                    type="button"
                    className={
                      styles.optionButton
                    }
                    onClick={() =>
                      handleInterest(
                        "contacto",
                      )
                    }
                  >
                    <div
                      className={
                        styles.optionIndex
                      }
                    >
                      04
                    </div>

                    <div
                      className={
                        styles.optionIcon
                      }
                    >
                      <ChatCircleDotsIcon
                        size={18}
                        weight="regular"
                      />
                    </div>

                    <span>
                      Hablar con Darkham
                    </span>

                    <ArrowRightIcon
                      size={16}
                      weight="regular"
                    />
                  </button>
                </div>
              </>
            )}

            {/* ===============================
                PHONE
            =============================== */}

            {step === "phone" &&
              interest && (
                <>
                  <div
                    className={
                      styles.selectionHeader
                    }
                  >
                    <span>
                      {optionLabels[
                        interest
                      ]}
                    </span>

                    <button
                      type="button"
                      onClick={
                        resetChat
                      }
                    >
                      Cambiar
                    </button>
                  </div>

                  <div
                    className={
                      styles.messageGroup
                    }
                  >
                    <span
                      className={
                        styles.messageBubble
                      }
                    >
                      Para continuar,
                      déjanos tu número
                      celular. Nos pondremos
                      en contacto contigo por
                      WhatsApp.
                    </span>
                  </div>

                  <form
                    className={
                      styles.phoneForm
                    }
                    onSubmit={
                      handleSubmit
                    }
                  >
                    <label
                      htmlFor="darkham-phone"
                      className={
                        styles.phoneLabel
                      }
                    >
                      Número celular
                    </label>

                    <div
                      className={`${styles.phoneInputWrap} ${
                        phoneError
                          ? styles.phoneInputError
                          : ""
                      }`}
                    >
                      <span
                        className={
                          styles.countryPrefix
                        }
                      >
                        +51
                      </span>

                      <input
                        ref={inputRef}
                        id="darkham-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={phone}
                        onChange={(
                          event,
                        ) =>
                          handlePhoneChange(
                            event.target
                              .value,
                          )
                        }
                        placeholder="999 999 999"
                        maxLength={9}
                        aria-invalid={
                          Boolean(
                            phoneError,
                          )
                        }
                      />
                    </div>

                    {phoneError && (
                      <span
                        className={
                          styles.errorMessage
                        }
                      >
                        {phoneError}
                      </span>
                    )}

                    <button
                      type="submit"
                      className={
                        styles.submitButton
                      }
                      disabled={
                        isSubmitting
                      }
                    >
                      <span>
                        {isSubmitting
                          ? "Abriendo WhatsApp..."
                          : "Continuar por WhatsApp"}
                      </span>

                      {!isSubmitting && (
                        <ArrowRightIcon
                          size={16}
                          weight="regular"
                        />
                      )}
                    </button>
                  </form>
                </>
              )}

            {/* ===============================
                SUCCESS
            =============================== */}

            {step === "success" && (
              <div
                className={
                  styles.successState
                }
              >
                <div
                  className={
                    styles.successIcon
                  }
                >
                  <CheckCircleIcon
                    size={31}
                    weight="regular"
                  />
                </div>

                <span
                  className={
                    styles.successEyebrow
                  }
                >
                  DARKHAM STUDIO
                </span>

                <strong>
                  Conversación preparada
                </strong>

                <p>
                  Continúa la conversación
                  con nosotros por
                  WhatsApp.
                </p>

                <button
                  type="button"
                  className={
                    styles.restartButton
                  }
                  onClick={
                    resetChat
                  }
                >
                  Nueva consulta
                </button>
              </div>
            )}
          </div>

          {/* =================================
              FOOTER
          ================================= */}

          <footer
            className={
              styles.chatFooter
            }
          >
            PROFUNDIDAD · PRECISIÓN · LUZ
          </footer>
        </section>
      )}

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
        onClick={() =>
          setIsOpen(
            (previous) => !previous,
          )
        }
        aria-label={
          isOpen
            ? "Cerrar contacto"
            : "Contactar con Darkham"
        }
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <XIcon
            size={20}
            weight="regular"
          />
        ) : (
          <>
            <div
              className={
                styles.floatingIcon
              }
            >
              <ChatCircleDotsIcon
                size={20}
                weight="regular"
              />
            </div>

            <span
              className={
                styles.floatingText
              }
            >
              <small>
                ¿Tienes un proyecto?
              </small>

              <strong>
                HABLEMOS
              </strong>
            </span>
          </>
        )}
      </button>
    </div>
  );
}