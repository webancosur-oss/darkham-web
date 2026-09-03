import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import PlanCard from "@/components/PlanCard/PlanCard";

import styles from "./PlansSection.module.css";

const plans = [
  {
    number: "01",
    name: "UMBRA",

    intro:
      "La respuesta inmediata que tu inversión requiere. Diseñado para la toma de decisiones bajo presión. Este paquete prioriza la velocidad en el análisis normativo y la cabida para asegurar que ninguna oportunidad de negocio se escape.",

    sections: [
      {
        title: "ARQUITECTURA",
        items: [
          "Estudio de cabida de alta velocidad y optimización de área vendible.",
        ],
      },
      {
        title: "ACTIVOS",
        items: [
          "Modelado 3D conceptual y 02 Renders Express de fachada para validación inmediata.",
        ],
      },
    ],

    purpose:
      "Obtener viabilidad técnica en tiempo récord para asegurar el terreno o la inversión.",

    variant: "light" as const,
    buttonVariant: "dark" as const,
  },

  {
    number: "02",
    name: "SHADOW",

    intro:
      "El motor visual para el éxito en preventa. Este paquete transforma el proyecto en un producto comercial irresistible. Nos enfocamos en la estética que vende y en los insumos digitales que su equipo de marketing necesita hoy.",

    sections: [
      {
        title: "ARQUITECTURA",
        items: [
          "Diseño de áreas comunes de tendencia y optimización de departamentos tipo.",
        ],
      },
      {
        title: "HERRAMIENTAS DE MERCADO",
        items: [
          "Renders Premium: perspectivas fotorrealistas de alta fidelidad.",
          "Planos Comerciales: planimetría ambientada y estética para catálogos.",
          "Vistas 360°: inmersión digital para showrooms y portales inmobiliarios.",
        ],
      },
    ],

    purpose:
      "Generar flujo de caja acelerado mediante una imagen de proyecto ganadora.",

    variant: "green" as const,
    buttonVariant: "light" as const,
  },

  {
    number: "03",
    name: "DARK",

    intro:
      "La solución técnica definitiva coordinada con marketing digital. Es nuestra propuesta más robusta. Unimos la ingeniería completa del proyecto arquitectónico con la potencia de una estrategia publicitaria masiva.",

    sections: [
      {
        title: "ARQUITECTURA E INGENIERÍA",
        items: [
          "Proyecto arquitectónico integral.",
          "Licencia de proyecto.",
          "Planos para obra.",
        ],
      },
      {
        title: "CONTENIDO DE ALTO IMPACTO",
        items: [
          "Galería Holística: set completo de renders de todos los ambientes del edificio.",
          "Tour Virtual Navegable: recorrido interactivo de alta experiencia de usuario.",
          "Sinergia Estratégica: gestión directa con nuestra Agencia de Marketing para el lanzamiento y pauta publicitaria (Ads).",
        ],
      },
    ],

    purpose:
      "Garantizar una ejecución técnica sin errores y una comercialización líder en el sector.",

    variant: "dark" as const,
    buttonVariant: "accent" as const,
  },
];

export default function PlansSection() {
  return (
    <section
      id="planes"
      className={styles.section}
    >
      <div className={styles.wrapper}>

        {/* =========================================
            HEADER
        ========================================== */}

        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          once
          duration={0.8}
        >
          <div className={styles.header}>
            <span className={styles.sectionNumber}>
              04
            </span>

            <span className={styles.headerLine} />

            <span className={styles.headerLabel}>
              PLANES DARKHAM
            </span>

            <span className={styles.headerRight}>
              ELIGE TU PLAN
            </span>
          </div>
        </ScrollAnimationTrigger>

        {/* =========================================
            TITLE
        ========================================== */}

        <div className={styles.heading}>
          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.15}
            once
            duration={0.9}
            delay={0.08}
          >
            <div>
              <span className={styles.eyebrow}>
                PROPUESTA
              </span>

              <h2 className={styles.title}>
                Elige el nivel
                <br />
                <span>de desarrollo.</span>
              </h2>
            </div>
          </ScrollAnimationTrigger>

          <ScrollAnimationTrigger
            effect="fade"
            threshold={0.15}
            once
            duration={0.9}
            delay={0.18}
          >
            <p className={styles.headingText}>
              Una propuesta escalable para
              cada etapa de decisión,
              desarrollo y comercialización.
            </p>
          </ScrollAnimationTrigger>
        </div>

        {/* =========================================
            CARDS
        ========================================== */}

        <div className={styles.cards}>
          {plans.map((plan, index) => (
            <ScrollAnimationTrigger
              key={plan.number}
              effect="slide"
              direction="up"
              threshold={0.12}
              once
              duration={0.8}
              delay={
                0.08 + index * 0.1
              }
              className={styles.cardAnimation}
            >
              <PlanCard
                number={plan.number}
                name={plan.name}
                intro={plan.intro}
                sections={plan.sections}
                purpose={plan.purpose}
                variant={plan.variant}
                buttonVariant={
                  plan.buttonVariant
                }
              />
            </ScrollAnimationTrigger>
          ))}
        </div>

        {/* =========================================
            FOOTER
        ========================================== */}

        <div className={styles.footer}>
          <span className={styles.footerNumber}>
            DARKHAM / 04
          </span>

          <span className={styles.footerLine} />

          <span className={styles.footerText}>
            PROFUNDIDAD · PRECISIÓN · LUZ
          </span>
        </div>

      </div>

      <div
        className={styles.backgroundNumber}
        aria-hidden="true"
      >
        04
      </div>
    </section>
  );
}