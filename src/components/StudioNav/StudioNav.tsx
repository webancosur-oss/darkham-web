"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./StudioNav.module.css";

const navItems = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
  },
  {
    label: "Estudio",
    href: "/estudio",
  },
  {
    label: "Servicios",
    href: "/servicios",
  },
  {
    label: "Proceso",
    href: "/proceso",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
];

export default function StudioNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((value) => !value);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* LOGO */}
        <Link
          href="/"
          className={styles.logo}
          aria-label="Darkham - Inicio"
          onClick={closeMenu}
        >
          <Image
            src="/brand/darkham-logo.svg"
            alt="Darkham"
            width={150}
            height={50}
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className={styles.desktopNavigation}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* IDIOMAS */}
        <div className={styles.languages}>
          <button
            type="button"
            className={styles.languageActive}
          >
            ESP
          </button>

          <span className={styles.languageDivider}>
            -
          </span>

          <button
            type="button"
            className={styles.languageInactive}
          >
            ENG
          </button>
        </div>

        {/* MOBILE */}
        <button
          type="button"
          className={`${styles.mobileMenuButton} ${
            isOpen ? styles.mobileMenuOpen : ""
          }`}
          onClick={toggleMenu}
          aria-label={
            isOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={isOpen}
          aria-controls="darkham-mobile-menu"
        >
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="darkham-mobile-menu"
        className={`${styles.mobilePanel} ${
          isOpen
            ? styles.mobilePanelOpen
            : ""
        }`}
      >
        <nav
          className={styles.mobileNavigation}
          aria-label="Navegación móvil"
        >
          {navItems.map(
            (item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  styles.mobileNavLink
                }
                onClick={closeMenu}
                tabIndex={
                  isOpen ? 0 : -1
                }
              >
                <span>
                  {item.label}
                </span>

                <small>
                  0{index + 1}
                </small>
              </Link>
            ),
          )}
        </nav>

        <div
          className={
            styles.mobileLanguages
          }
        >
          <span
            className={
              styles.languageActive
            }
          >
            ESP
          </span>

          <span
            className={
              styles.languageDivider
            }
          >
            -
          </span>

          <span>ENG</span>
        </div>
      </div>
    </header>
  );
}