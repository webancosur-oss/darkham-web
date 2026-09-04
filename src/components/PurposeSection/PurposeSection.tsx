"use client";

import Image from "next/image";
import { useState } from "react";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import styles from "./PurposeSection.module.css";

const principles = [
  {
    number: "01",
    title: "PROFUNDIDAD",
    text: "Una mirada conceptual que revela la verdad de cada espacio.",
    image: "/media/depth.jpeg",
  },
  {
    number: "02",
    title: "PRECISIÓN",
    text: "Cada decisión responde con rigor técnico, intención y coherencia.",
    image: "/media/precision.jpeg",
  },
  {
    number: "03",
    title: "LUZ",
    text: "La arquitectura encuentra claridad al revelar el espacio a través de la luz.",
    image: "/media/luz.jpeg",
  },
];

export default function PurposeSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePrinciple = principles[activeIndex];

  const selectPrinciple = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.section}>
      {/* =====================================
          BACKGROUNDS
      ===================================== */}

      <div
        className={styles.backgrounds}
        aria-hidden="true"
      >
        {principles.map((principle, index) => (
          <div
            key={principle.image}
            className={`${styles.backgroundLayer} ${
              activeIndex === index
                ? styles.backgroundLayerActive
                : ""
            }`}
          >
            <Image
              src={principle.image}
              alt=""
              fill
              sizes="100vw"
              className={styles.backgroundImage}
              priority={index === 0}
            />
          </div>
        ))}

        <div
          className={styles.backgroundShade}
        />
      </div>

      <div className={styles.wrapper}>
        {/* =====================================
            MARCA
        ===================================== */}

        <div className={styles.brand}>
          <ScrollAnimationTrigger
            effect="fade"
            threshold={0.1}
            once
            duration={0.8}
          >
            <span>DARKHAM</span>
          </ScrollAnimationTrigger>
        </div>

        {/* =====================================
            TÍTULO
        ===================================== */}

        <div className={styles.titleWrapper}>
          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.1}
            once
            duration={0.9}
          >
            <h2 className={styles.title}>
              <span>
                La forma de
              </span>

              <em>
                hacer arquitectura.
              </em>
            </h2>
          </ScrollAnimationTrigger>
        </div>

        {/* =====================================
            CONTENIDO INFERIOR
        ===================================== */}

        <div className={styles.bottomContent}>
          {/* =================================
              CITA
          ================================= */}

          <div
            className={styles.quoteWrapper}
            aria-live="polite"
          >
            <div
              key={
                activePrinciple.number
              }
              className={styles.quote}
            >
              <span
                className={styles.quoteOpen}
                aria-hidden="true"
              >
                “
              </span>

              <p>
                {activePrinciple.text}
              </p>

              <span
                className={styles.quoteClose}
                aria-hidden="true"
              >
                ”
              </span>
            </div>
          </div>

          {/* =================================
              BOTONES DE PRINCIPIOS
          ================================= */}

          <nav
            className={styles.principles}
            aria-label="Seleccionar principio"
          >
            {principles.map(
              (principle, index) => {
                const isActive =
                  activeIndex === index;

                return (
                  <ScrollAnimationTrigger
                    key={
                      principle.number
                    }
                    effect="slide"
                    direction="left"
                    threshold={0.12}
                    once
                    duration={0.7}
                    delay={
                      index * 0.08
                    }
                    className={
                      styles.principleAnimation
                    }
                  >
                    <button
                      type="button"
                      className={`${styles.principle} ${
                        isActive
                          ? styles.principleActive
                          : ""
                      }`}
                      onClick={() =>
                        selectPrinciple(
                          index,
                        )
                      }
                      aria-pressed={
                        isActive
                      }
                    >
                      <span
                        className={
                          styles.principleNumber
                        }
                      >
                        {principle.number}
                      </span>

                      <span
                        className={
                          styles.principleText
                        }
                      >
                        <span
                          className={
                            styles.principleTitle
                          }
                        >
                          {
                            principle.title
                          }
                        </span>

                        <span
                          className={
                            styles.principleAction
                          }
                        >
                          {isActive
                            ? "SELECCIONADO"
                            : "VER PRINCIPIO"}
                        </span>
                      </span>

                      <span
                        className={
                          styles.principleArrow
                        }
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                      </span>
                    </button>
                  </ScrollAnimationTrigger>
                );
              },
            )}
          </nav>
        </div>

        {/* =====================================
            CONTADOR
        ===================================== */}

        <div
          className={styles.counter}
          aria-hidden="true"
        >
          <span>
            {String(
              activeIndex + 1,
            ).padStart(2, "0")}
          </span>

          <span className={styles.counterSlash}>
            /
          </span>

          <span>
            {String(
              principles.length,
            ).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}