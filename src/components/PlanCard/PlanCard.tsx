import StudioButton from "@/components/StudioButton/StudioButton";

import styles from "./PlanCard.module.css";

type PlanCardProps = {
  number: string;
  name: string;
  intro: string;
  sections: {
    title: string;
    items: string[];
  }[];
  purpose: string;
  variant?: "light" | "green" | "dark";
  buttonVariant?: "primary" | "dark" | "light" | "accent" | "outline";
};

export default function PlanCard({
  number,
  name,
  intro,
  sections,
  purpose,
  variant = "light",
  buttonVariant = "primary",
}: PlanCardProps) {
  return (
    <article
      className={[
        styles.card,
        styles[variant],
      ].join(" ")}
    >
      {/* =========================================
          HEADER
      ========================================== */}

      <div className={styles.name}>
        {name}
      </div>

      <span className={styles.headerLine} />

      {/* =========================================
          INTRO
      ========================================== */}

      <p className={styles.intro}>
        {intro}
      </p>

      {/* =========================================
          CONTENT
      ========================================== */}

      <div className={styles.sections}>
        {sections.map((section) => (
          <div
            key={section.title}
            className={styles.group}
          >
            <span className={styles.groupTitle}>
              {section.title}
            </span>

            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* =========================================
          PURPOSE
      ========================================== */}

      <div className={styles.purpose}>
        <span className={styles.purposeTitle}>
          PROPÓSITO
        </span>

        <p>{purpose}</p>
      </div>

      {/* =========================================
          ACTION
      ========================================== */}

      <div className={styles.action}>
        <StudioButton
          href="/contacto"
          variant={buttonVariant}
          size="sm"
          icon="arrow-diagonal"
          iconPosition="right"
        >
          CONSULTAR
        </StudioButton>
      </div>

      {/* =========================================
          CARD MARK
      ========================================== */}

      <span
        className={styles.cornerMark}
        aria-hidden="true"
      >
        <span />
        <span />
      </span>
    </article>
  );
}