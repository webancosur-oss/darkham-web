"use client";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import styles from "./MissionVisionSection.module.css";

export default function MissionVisionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* =====================================
            CONTENT
        ===================================== */}

        <div className={styles.content}>
          {/* =================================
              MISIÓN
          ================================= */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="left"
            threshold={0.15}
            duration={0.9}
            once
            className={styles.columnAnimation}
          >
            <article className={`${styles.block} ${styles.mission}`}>
              <div className={styles.blockTop}>
                <span className={styles.number}>01</span>
                <span className={styles.label}>MISIÓN</span>
              </div>

              <div className={styles.accentLine} />

              <h2 className={styles.text}>
                Crear arquitectura que revele la verdad de los espacios con
                profundidad, precisión y luz.
              </h2>
            </article>
          </ScrollAnimationTrigger>

          <div className={styles.divider} aria-hidden="true" />

          {/* =================================
              VISIÓN
          ================================= */}

          <ScrollAnimationTrigger
            effect="slide"
            direction="right"
            threshold={0.15}
            duration={0.9}
            once
            className={styles.columnAnimation}
          >
            <article className={`${styles.block} ${styles.vision}`}>
              <div className={styles.blockTop}>
                <span className={styles.number}>02</span>
                <span className={styles.label}>VISIÓN</span>
              </div>

              <div className={styles.accentLine} />

              <h2 className={styles.text}>
                Diseñar proyectos residenciales e inmobiliarios honestos,
                eficientes y minimalistas, guiados por intención, técnica y
                sostenibilidad.
              </h2>
            </article>
          </ScrollAnimationTrigger>
        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          duration={0.8}
          delay={0.2}
          once
        >
          <div className={styles.bottom}>
            <span className={styles.bottomText}>
              DARKHAM ARQUITECTURA
            </span>

            <span className={styles.bottomLine} />
          </div>
        </ScrollAnimationTrigger>
      </div>
    </section>
  );
}