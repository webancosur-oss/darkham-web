import Link from "next/link";

import styles from "./StudioButton.module.css";

type StudioButtonProps = {
  href: string;
  children: React.ReactNode;

  variant?:
    | "primary"
    | "dark"
    | "light"
    | "accent"
    | "outline"
    | "ghost";

  size?: "sm" | "md" | "lg";

  icon?:
    | "arrow"
    | "arrow-diagonal"
    | "plus"
    | "none";

  iconPosition?: "left" | "right";

  className?: string;
};

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {diagonal ? (
        <>
          <path
            d="M7 17L17 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            d="M9 7H17V15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            d="M14 7L19 12L14 17"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5V19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonIcon({
  icon,
}: {
  icon: "arrow" | "arrow-diagonal" | "plus" | "none";
}) {
  if (icon === "none") {
    return null;
  }

  if (icon === "plus") {
    return <PlusIcon />;
  }

  return (
    <ArrowIcon
      diagonal={icon === "arrow-diagonal"}
    />
  );
}

export default function StudioButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  iconPosition = "right",
  className = "",
}: StudioButtonProps) {
  return (
    <Link
      href={href}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        iconPosition === "left"
          ? styles.iconLeft
          : styles.iconRight,
        className,
      ].join(" ")}
    >
      <span className={styles.label}>
        {children}
      </span>

      {icon !== "none" && (
        <span className={styles.icon}>
          <ButtonIcon icon={icon} />
        </span>
      )}
    </Link>
  );
}