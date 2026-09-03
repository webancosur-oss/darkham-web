"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./StudioLoader.module.css";

type StudioLoaderProps = {
  duration?: number;
};

export default function StudioLoader({
  duration = 3000,
}: StudioLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let animationFrame = 0;
    let startTime: number | null = null;
    let exitTimer = 0;
    let removeTimer = 0;

    const updateProgress = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const ratio = Math.min(
        elapsed / duration,
        1,
      );

      const currentProgress = Math.min(
        100,
        Math.round(ratio * 100),
      );

      setProgress(currentProgress);

      if (ratio < 1) {
        animationFrame =
          window.requestAnimationFrame(
            updateProgress,
          );
      }
    };

    animationFrame =
      window.requestAnimationFrame(
        updateProgress,
      );

    exitTimer = window.setTimeout(() => {
      setProgress(100);
      setIsLeaving(true);
    }, duration);

    removeTimer = window.setTimeout(() => {
      setProgress(100);
      setIsVisible(false);
    }, duration + 800);

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [duration]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.loader} ${
        isLeaving ? styles.loaderLeaving : ""
      }`}
      role="status"
      aria-label={`Cargando Darkham ${progress}%`}
      aria-live="polite"
    >
      {/* =====================================
          GRID
      ===================================== */}

      <div
        className={styles.grid}
        aria-hidden="true"
      >
        <span className={styles.gridVerticalOne} />
        <span className={styles.gridVerticalTwo} />
        <span className={styles.gridHorizontalOne} />
        <span className={styles.gridHorizontalTwo} />
      </div>

      {/* =====================================
          ESQUINAS
      ===================================== */}

      <span
        className={`${styles.corner} ${styles.cornerTopLeft}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.corner} ${styles.cornerTopRight}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.corner} ${styles.cornerBottomLeft}`}
        aria-hidden="true"
      />

      <span
        className={`${styles.corner} ${styles.cornerBottomRight}`}
        aria-hidden="true"
      />

      {/* =====================================
          LOGO
      ===================================== */}

      <div className={styles.center}>
        <div className={styles.logoWrapper}>
          <span
            className={styles.logoFlash}
            aria-hidden="true"
          />

          <div className={styles.logoReveal}>
            <Image
              src="/brand/darkham-logo.svg"
              alt="Darkham"
              width={300}
              height={120}
              priority
              className={styles.logo}
            />
          </div>
        </div>
      </div>

      {/* =====================================
          TEXTO VERTICAL
      ===================================== */}

      <div
        className={styles.verticalLabel}
        aria-hidden="true"
      >
        PROFUNDIDAD · PRECISIÓN · LUZ
      </div>

     

      {/* =====================================
          LOADING
      ===================================== */}

      <div className={styles.loaderProgress}>
        <div className={styles.progressHeader}>
          <span>LOADING</span>

          <span>
            {String(progress).padStart(2, "0")}%
          </span>
        </div>

        <div className={styles.progressTrack}>
          <span
            className={styles.progressValue}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}