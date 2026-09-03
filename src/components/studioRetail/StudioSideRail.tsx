"use client";

import Link from "next/link";

import styles from "./StudioSideRail.module.css";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.1v8h3.4Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15.3 4c.4 1.8 1.4 3 3.2 3.4v2.8c-1.4-.1-2.5-.5-3.5-1.3v5.8c0 3.6-2.4 5.3-5.1 5.3-2.5 0-4.4-1.7-4.4-4.3 0-2.8 2.1-4.6 5-4.6.4 0 .8 0 1.1.1v2.8c-.3-.1-.7-.2-1.1-.2-1.1 0-2.1.7-2.1 1.9 0 1.1.8 1.7 1.7 1.7 1 0 2-.6 2-2.3V4h3.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.2 8.5H3V21h3.2V8.5Zm.2-4A1.9 1.9 0 0 0 4.3 2.6a1.9 1.9 0 0 0-2 1.9c0 1 .8 1.9 2 1.9s2-.8 2.1-1.9ZM21 13.8c0-3.8-2-5.6-4.8-5.6-2.2 0-3.1 1.2-3.6 2v-1.7H9.4V21h3.2v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H21v-7.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export default function StudioSideRail() {
  return (
    <aside className={styles.rail}>
      <div className={styles.railTop}>
        <span className={styles.topLine} />
      </div>

      <div className={styles.projectsLabel}>
        <span>PROYECTOS</span>
      </div>

      <div className={styles.railMiddle}>
        <span />
      </div>

      <div className={styles.socials}>
        <Link
          href="#"
          aria-label="Instagram"
          className={styles.socialLink}
        >
          <InstagramIcon />
        </Link>

        <Link
          href="#"
          aria-label="Facebook"
          className={styles.socialLink}
        >
          <FacebookIcon />
        </Link>

        <Link
          href="#"
          aria-label="TikTok"
          className={styles.socialLink}
        >
          <TikTokIcon />
        </Link>

        <Link
          href="#"
          aria-label="LinkedIn"
          className={styles.socialLink}
        >
          <LinkedInIcon />
        </Link>
      </div>
    </aside>
  );
}