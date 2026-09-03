"use client";

import { useRef } from "react";

import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const nextSection = heroRef.current?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
      {/* VIDEO */}
      <video
        className={styles.video}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label="Presentación audiovisual de Darkham"
      >
        <source
          src="/media/secuencia.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* SCROLL MOUSE */}
      <button
        type="button"
        className={styles.scrollButton}
        onClick={handleScroll}
        aria-label="Hacer scroll hacia la siguiente sección"
      >
        <span className={styles.scrollMouse}>
          <span className={styles.scrollWheel} />
        </span>

        <span className={styles.scrollText}>
          HACER SCROLL
        </span>
      </button>
    </section>
  );
}