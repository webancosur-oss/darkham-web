"use client";

import Image from "next/image";

import { ScrollAnimationTrigger } from "@/components/ui/scroll-animation-trigger";
import styles from "./MissionVisionSection.module.css";

export default function MissionVisionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/media/mission.jpeg"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.wrapper}>
        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          duration={0.8}
          once
        >
          <p className={styles.eyebrow}>NUESTRA DIRECCIÓN</p>
        </ScrollAnimationTrigger>

        <div className={styles.content}>
          <ScrollAnimationTrigger
            effect="slide"
            direction="left"
            threshold={0.15}
            duration={0.9}
            once
          >
            <article className={styles.block}>
              <span className={styles.label}>MISIÓN</span>

              <div className={styles.line} />

              <h2 className={styles.text}>
                Crear arquitectura que revele la verdad de los espacios con
                profundidad, precisión y luz.
              </h2>
            </article>
          </ScrollAnimationTrigger>

          <div className={styles.divider} aria-hidden="true" />

          <ScrollAnimationTrigger
            effect="slide"
            direction="right"
            threshold={0.15}
            duration={0.9}
            once
          >
            <article className={styles.block}>
              <span className={styles.label}>VISIÓN</span>

              <div className={styles.line} />

              <h2 className={styles.text}>
                Diseñar proyectos residenciales e inmobiliarios honestos,
                eficientes y minimalistas, guiados por intención, técnica y
                sostenibilidad.
              </h2>
            </article>
          </ScrollAnimationTrigger>
        </div>

        <ScrollAnimationTrigger
          effect="fade"
          threshold={0.15}
          duration={0.8}
          delay={0.2}
          once
        >
          <div className={styles.bottom}>
            <span className={styles.bottomLine} />
            <span className={styles.bottomText}>DARKHAM ARQUITECTURA</span>
          </div>
        </ScrollAnimationTrigger>
      </div>
    </section>
  );
}