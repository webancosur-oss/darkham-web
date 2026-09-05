"use client";

import { FormEvent, useState } from "react";

import styles from "./page.module.css";

const interests = [
  "Desarrollar un proyecto",
  "Diseño y arquitectura",
  "Consultoría arquitectónica",
  "Otro",
];

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 900),
    );

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className={styles.page}>
      {/* =====================================
          HERO
      ====================================== */}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span className={styles.heroLine} />

            <span>CONTACTO</span>
          </div>

          <div className={styles.heroContent}>
            <h1>
              Hablemos de
              <br />
              <span>arquitectura.</span>
            </h1>

            <p>
              Cuéntanos sobre tu proyecto,
              <br />
              idea o espacio.
            </p>
          </div>

          <div className={styles.heroBottom}>
            <span>01</span>

            <span>
              DARKHAM
              <br />
              ARQUITECTURA
            </span>
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACTO
      ====================================== */}

      <section className={styles.contact}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {/* INFORMACIÓN */}

            <aside className={styles.info}>
              <div className={styles.infoHeader}>
                <span>02</span>

                <h2>INICIEMOS</h2>
              </div>

              <p className={styles.infoDescription}>
                Cada proyecto comienza con una
                conversación. Queremos conocer tu
                idea, entenderla y descubrir cómo
                podemos desarrollarla.
              </p>

              <div className={styles.details}>
                <div className={styles.detail}>
                  <span>EMAIL</span>

                  <a href="mailto:hola@darkham.pe">
                    hola@darkham.pe
                  </a>
                </div>

                <div className={styles.detail}>
                  <span>TELÉFONO</span>

                  <a href="tel:+51966253873">
                    +51 966 253 873
                  </a>
                </div>

                <div className={styles.detail}>
                  <span>UBICACIÓN</span>

                  <p>Huancayo · Perú</p>
                </div>
              </div>
            </aside>

            {/* FORMULARIO */}

            <div className={styles.formArea}>
              {submitted ? (
                <div className={styles.success}>
                  <span>03</span>

                  <h2>
                    CONSULTA
                    <br />
                    ENVIADA.
                  </h2>

                  <p>
                    Gracias por contactarnos.
                    <br />
                    Nos pondremos en contacto
                    contigo próximamente.
                  </p>

                  <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => setSubmitted(false)}
                  >
                    ENVIAR OTRA CONSULTA
                  </button>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span>NOMBRE *</span>

                      <input
                        type="text"
                        name="name"
                        placeholder="Tu nombre"
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label className={styles.field}>
                      <span>
                        CORREO ELECTRÓNICO *
                      </span>

                      <input
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        autoComplete="email"
                        required
                      />
                    </label>

                    <label className={styles.field}>
                      <span>TELÉFONO</span>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="+51"
                        autoComplete="tel"
                      />
                    </label>

                    <label
                      className={`${styles.field} ${styles.full}`}
                    >
                      <span>
                        ¿QUÉ NECESITAS? *
                      </span>

                      <select
                        name="interest"
                        defaultValue=""
                        required
                      >
                        <option
                          value=""
                          disabled
                        >
                          Selecciona una opción
                        </option>

                        {interests.map(
                          (interest) => (
                            <option
                              key={interest}
                              value={interest}
                            >
                              {interest}
                            </option>
                          ),
                        )}
                      </select>
                    </label>

                    <label
                      className={`${styles.field} ${styles.full}`}
                    >
                      <span>
                        CUÉNTANOS SOBRE TU PROYECTO *
                      </span>

                      <textarea
                        name="message"
                        placeholder="Cuéntanos brevemente sobre tu proyecto..."
                        rows={5}
                        required
                      />
                    </label>
                  </div>

                  <div className={styles.formBottom}>
                    <p>
                      Al enviar este formulario
                      aceptas ser contactado por
                      Darkham respecto a tu consulta.
                    </p>

                    <button
                      type="submit"
                      className={styles.submit}
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting
                          ? "ENVIANDO..."
                          : "ENVIAR CONSULTA"}
                      </span>

                      <span
                        className={styles.arrow}
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <footer className={styles.bottom}>
            <span>DARKHAM</span>

            <span>
              ARQUITECTURA · HUANCAYO · PERÚ
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}