import Image from "next/image";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import StudioButton from "@/components/StudioButton/StudioButton";

import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section
      id="estudio"
      className={styles.section}
    >
      <div className={styles.wrapper}>

        {/* =========================================
            IMAGEN
        ========================================== */}

        <div className={styles.imageColumn}>
          <ScrollAnimationTrigger
            effect="scale"
            threshold={0.2}
            once
            duration={1}
            fromScale={0.92}
            toScale={1}
            className={styles.animationFull}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/media/about.jpeg"
                alt="Arquitectura Darkham"
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  42vw
                "
                className={styles.image}
                priority={false}
              />

              <div
                className={styles.imageOverlay}
                aria-hidden="true"
              />

              <span className={styles.imageLabel}>
                DARKHAM / 01
              </span>
            </div>
          </ScrollAnimationTrigger>
        </div>

        {/* =========================================
            CONTENIDO
        ========================================== */}

        <div className={styles.contentColumn}>

          {/* EYEBROW */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.15}
            once
            duration={0.8}
            delay={0.05}
          >
            <div className={styles.eyebrow}>
              QUIÉNES SOMOS
            </div>
          </ScrollAnimationTrigger>

          {/* TITULO */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.15}
            once
            duration={0.9}
            delay={0.12}
          >
            <h2 className={styles.title}>
              Arquitectura
              <br />
              con
              <span> propósito.</span>
            </h2>
          </ScrollAnimationTrigger>

          {/* INTRO */}

          <ScrollAnimationTrigger
            effect="fade"
            threshold={0.15}
            once
            duration={0.9}
            delay={0.2}
          >
            <div className={styles.introduction}>
              <p className={styles.lead}>
                Somos un estudio de arquitectura
                especializado en el desarrollo
                inmobiliario y residencial,
                enfocado en la creación de
                viviendas y edificios con
                identidad, precisión y una mirada
                conceptual relevante.
              </p>
            </div>
          </ScrollAnimationTrigger>

          {/* TEXTO */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.15}
            once
            duration={0.85}
            delay={0.28}
          >
            <div className={styles.textBlock}>
              <p>
                Nuestro trabajo parte de entender
                el espacio, la luz, la proporción y
                la materia como elementos
                fundamentales del habitar.
              </p>

              <p>
                Desarrollamos arquitectura que
                busca expresar con claridad y
                coherencia su propósito,
                equilibrando técnica, emoción y
                funcionalidad.
              </p>
            </div>
          </ScrollAnimationTrigger>

          {/* PRINCIPIOS */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            threshold={0.12}
            once
            duration={0.8}
            delay={0.36}
          >
            <div className={styles.principles}>

              <div className={styles.principle}>
                <span className={styles.principleNumber}>
                  01
                </span>

                <span className={styles.principleText}>
                  PROFUNDIDAD
                </span>
              </div>

              <div className={styles.principle}>
                <span className={styles.principleNumber}>
                  02
                </span>

                <span className={styles.principleText}>
                  PRECISIÓN
                </span>
              </div>

              <div className={styles.principle}>
                <span className={styles.principleNumber}>
                  03
                </span>

                <span className={styles.principleText}>
                  LUZ
                </span>
              </div>

            </div>
          </ScrollAnimationTrigger>

          {/* BOTÓN */}

          <ScrollAnimationTrigger
            effect="fade"
            threshold={0.1}
            once
            duration={0.8}
            delay={0.45}
          >
            <StudioButton
              href="/estudio"
              iconPosition="right"
              className={styles.aboutButton}
            >
              CONOCE EL ESTUDIO
            </StudioButton>
          </ScrollAnimationTrigger>

        </div>
      </div>

      {/* =========================================
          NUMERO GIGANTE
      ========================================== */}

      <ScrollAnimationTrigger
        effect="scale"
        threshold={0.05}
        once
        duration={1.2}
        fromScale={0.9}
        toScale={1}
        className={styles.backgroundNumberAnimation}
      >
        <div
          className={styles.backgroundNumber}
          aria-hidden="true"
        >
          01
        </div>
      </ScrollAnimationTrigger>

      {/* =========================================
          LINEA INFERIOR
      ========================================== */}

      <div
        className={styles.bottomLine}
        aria-hidden="true"
      >
        <span />
      </div>
    </section>
  );
}