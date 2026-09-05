"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";

import styles from "./StudioSideRail.module.css";

const socials = [
  {
    label: "Instagram",
    href: "#",
    Icon: InstagramLogoIcon,
  },
  {
    label: "Facebook",
    href: "#",
    Icon: FacebookLogoIcon,
  },
  {
    label: "TikTok",
    href: "#",
    Icon: TiktokLogoIcon,
  },
  {
    label: "LinkedIn",
    href: "#",
    Icon: LinkedinLogoIcon,
  },
];

export default function StudioSideRail() {
  const pathname = usePathname();

  const isProjectsActive =
    pathname === "/proyectos" ||
    pathname.startsWith("/proyectos/");

  return (
    <aside className={styles.rail}>
      {/* =====================================
          TOP
      ===================================== */}

      <div className={styles.railTop}>
        <span className={styles.topLine} />
      </div>

      {/* =====================================
          PROJECTS
      ===================================== */}

      <Link
        href="/proyectos"
        className={`${styles.projectsLabel} ${
          isProjectsActive
            ? styles.projectsLabelActive
            : ""
        }`}
        aria-label="Ver proyectos"
        aria-current={
          isProjectsActive
            ? "page"
            : undefined
        }
      >
        <span>PROYECTOS</span>
      </Link>

      {/* =====================================
          MIDDLE
      ===================================== */}

      <div className={styles.railMiddle}>
        <span />
      </div>

      {/* =====================================
          SOCIALS
      ===================================== */}

      <div className={styles.socials}>
        {socials.map(
          ({
            label,
            href,
            Icon,
          }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={styles.socialLink}
              target="_blank"
              rel="noreferrer"
            >
              <Icon
                size={15}
                weight="regular"
              />
            </Link>
          ),
        )}
      </div>
    </aside>
  );
}