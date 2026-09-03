"use client";

import Image from "next/image";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import styles from "./ValuesSection.module.css";

const values = [
  {
    number: "01",
    title: "COHERENCIA Y PRECISIÓN",
    description:
      "Nos comprometemos a entregar la máxima calidad en cada diseño.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="10" y="10" width="28" height="28" />
        <path d="M16 31L22 25L26 29L33 19" />
        <path d="M28 19H33V24" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "INNOVACIÓN CONSTANTE",
    description:
      "Adaptación a nuevas metodologías (BIM), tecnologías y materiales.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="15" />
        <path d="M24 9V39" />
        <path d="M9 24H39" />
        <path d="M13 13L35 35" />
        <path d="M35 13L13 35" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "PASIÓN",
    description:
      "Dedicación y entusiasmo para superar expectativas.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M24 37C24 37 10 28.5 10 19C10 14.2 13.4 11 17.8 11C20.8 11 23 12.6 24 15C25 12.6 27.2 11 30.2 11C34.6 11 38 14.2 38 19C38 28.5 24 37 24 37Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "INTEGRIDAD",
    description:
      "Transparencia y cumplimiento de compromisos.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M24 8L37 13.5V23C37 31.5 31.8 37 24 40C16.2 37 11 31.5 11 23V13.5L24 8Z" />
        <path d="M17 24L22 29L31.5 19" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "SERVICIO",
    description:
      "Servicio cercano y adaptado a cada cliente.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="15" />
        <path d="M16 24L21.5 29L32 18.5" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  return (
    <section className={styles.section}>
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className={styles.background} aria-hidden="true">
        <Image
          src="/media/magnific.jpeg"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className={styles.wrapper}>
        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          duration={0.8}
          once
        >
          <header className={styles.heading}>
            <span className={styles.eyebrow}>
              NUESTROS VALORES
            </span>

            <h2 className={styles.title}>
              Lo que guía
              <br />
              <span>cada decisión.</span>
            </h2>
          </header>
        </ScrollAnimationTrigger>

        {/* =====================================
            CARDS
        ===================================== */}

        <div className={styles.cards}>
          {values.map((value, index) => (
            <ScrollAnimationTrigger
              key={value.number}
              effect="fade"
              threshold={0.12}
              duration={0.7}
              delay={index * 0.08}
              once
              className={styles.cardAnimation}
            >
              <article className={styles.card}>
                <div className={styles.cardIcon}>
                  <div className={styles.iconCircle}>
                    {value.icon}
                  </div>
                </div>

                <span className={styles.number}>
                  {value.number}
                </span>

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </article>
            </ScrollAnimationTrigger>
          ))}
        </div>
      </div>
    </section>
  );
}