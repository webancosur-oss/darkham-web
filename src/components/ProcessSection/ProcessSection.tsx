"use client";

import { useState } from "react";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";

import styles from "./ProcessSection.module.css";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  items: string[];
  icon: "study" | "draft" | "specialties" | "project";
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "ESTUDIOS PRELIMINARES",
    description:
      "Intercambio de información y relatos iniciales del proyecto. Se interpreta el encargo y se construye la propuesta.",
    items: [
      "Datos de terreno",
      "Objetivos y encargo",
      "Programa arquitectónico",
      "Esquema, apuntes y concepto",
      "Ubicación, contexto, visuales y orientación",
    ],
    icon: "study",
  },
  {
    number: "02",
    title: "ANTEPROYECTO",
    description:
      "Primera etapa técnica del proyecto. Se desarrolla el diseño según ambientes, circulación, paquetes funcionales y parámetros técnico-municipales.",
    items: [
      "Esquemas de distribución",
      "Volumetría",
      "Maqueta virtual inicial",
      "Desarrollo de plantas",
      "Predimensionamiento",
      "Imágenes proyectuales",
    ],
    icon: "draft",
  },
  {
    number: "03",
    title: "ESPECIALIDADES",
    description:
      "Intercambio de información con especialistas e ingenieros para desarrollar y compatibilizar el proyecto.",
    items: [
      "Desarrollo técnico",
      "Información para ingenierías",
      "Reunión con ingenieros",
      "Informe técnico",
      "Compatibilización",
      "Desarrollo de interiores",
    ],
    icon: "specialties",
  },
  {
    number: "04",
    title: "PROYECTO",
    description:
      "Preparación de la información necesaria para la obra y el expediente municipal.",
    items: [
      "Planos de obra",
      "Materiales y acabados",
      "Detalles constructivos",
      "Datos para expediente",
      "Reunión con clientes",
      "Imágenes finales y maqueta virtual",
    ],
    icon: "project",
  },
];

function ProcessIcon({
  type,
}: {
  type: ProcessStep["icon"];
}) {
  if (type === "study") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M6 25L24 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M17 7H24V14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 11H13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M7 15H11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "draft") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M5 24L16 7L27 24H5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M10 24V18H22V24"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M16 7V14"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (type === "specialties") {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect
          x="5"
          y="6"
          width="8"
          height="8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="19"
          y="18"
          width="8"
          height="8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M13 10H22V18"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 14V22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect
        x="6"
        y="5"
        width="20"
        height="22"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M10 11H22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10 16H22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10 21H18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProcessSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(
    null
  );

  const [selectedStep, setSelectedStep] = useState<number | null>(
    null
  );

  const isOpen = (index: number) =>
    hoveredStep === index || selectedStep === index;

  const handleSelect = (index: number) => {
    setSelectedStep((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="proceso"
      className={styles.section}
    >
      <div className={styles.wrapper}>

        {/* =========================================
            CABECERA
        ========================================== */}

        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          once
          duration={0.8}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              PROCESO PROYECTAL
            </span>

            <h2 className={styles.title}>
              Del concepto
              <br />
              <span>a la obra.</span>
            </h2>

            <p className={styles.intro}>
              Cuatro etapas que estructuran el
              desarrollo del proyecto.
            </p>
          </div>
        </ScrollAnimationTrigger>

        {/* =========================================
            TIMELINE
        ========================================== */}

        <div className={styles.timeline}>

          {/* EJE HORIZONTAL */}

          <div
            className={styles.timelineAxis}
            aria-hidden="true"
          />

          {/* ETAPAS */}

          <div className={styles.steps}>
            {processSteps.map((step, index) => {
              const open = isOpen(index);

              return (
                <ScrollAnimationTrigger
                  key={step.number}
                  effect="fade"
                  threshold={0.12}
                  once
                  duration={0.7}
                  delay={index * 0.07}
                  className={styles.stepAnimation}
                >
                  <article
                    className={[
                      styles.step,
                      open ? styles.stepOpen : "",
                    ].join(" ")}
                    onMouseEnter={() =>
                      setHoveredStep(index)
                    }
                    onMouseLeave={() =>
                      setHoveredStep(null)
                    }
                  >

                    {/* =================================
                        NODO
                    ================================== */}

                    <button
                      type="button"
                      className={styles.nodeButton}
                      onClick={() =>
                        handleSelect(index)
                      }
                      aria-label={
                        open
                          ? `Ocultar ${step.title}`
                          : `Mostrar ${step.title}`
                      }
                      aria-expanded={open}
                    >
                      <span className={styles.node}>
                        <span
                          className={
                            styles.nodeInner
                          }
                        />
                      </span>
                    </button>

                    {/* =================================
                        CONECTOR
                    ================================== */}

                    <span
                      className={styles.connector}
                      aria-hidden="true"
                    />

                    {/* =================================
                        INFORMACIÓN PRINCIPAL
                    ================================== */}

                    <button
                      type="button"
                      className={styles.stepTrigger}
                      onClick={() =>
                        handleSelect(index)
                      }
                      aria-expanded={open}
                    >
                      <span className={styles.stepNumber}>
                        {step.number}
                      </span>

                      <span className={styles.stepTop}>
                        <span className={styles.icon}>
                          <ProcessIcon
                            type={step.icon}
                          />
                        </span>

                        <span
                          className={styles.stepTitle}
                        >
                          {step.title}
                        </span>
                      </span>
                    </button>

                    {/* =================================
                        CONTENIDO OCULTO
                    ================================== */}

                    <div
                      className={[
                        styles.content,
                        open
                          ? styles.contentOpen
                          : "",
                      ].join(" ")}
                    >
                      <div
                        className={
                          styles.contentInner
                        }
                      >
                        <p
                          className={
                            styles.description
                          }
                        >
                          {step.description}
                        </p>

                        <div
                          className={
                            styles.details
                          }
                        >
                          <span
                            className={
                              styles.detailsTitle
                            }
                          >
                            DESARROLLO
                          </span>

                          <ul>
                            {step.items.map(
                              (item) => (
                                <li key={item}>
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </article>
                </ScrollAnimationTrigger>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}