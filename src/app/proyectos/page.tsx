import Image from "next/image";
import Link from "next/link";

import styles from "./ProjectsPage.module.css";
import { projects } from "../../../data/projects";

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      {/* =====================================
          HEADER
      ===================================== */}

      <section className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.headerNumber}>00</span>

          <span className={styles.headerLabel}>
            PROYECTOS
          </span>
        </div>

        <div className={styles.headerContent}>
          <h1>
            Arquitectura que
            <span>responde.</span>
          </h1>

          <p>
            Una selección de proyectos desarrollados
            desde una mirada arquitectónica,
            técnica y conceptual.
          </p>
        </div>
      </section>

      {/* =====================================
          PROJECTS
      ===================================== */}

      <section className={styles.projects}>
        {projects.map((project, index) => {
          const reverse = index % 2 !== 0;

          return (
            <article
              key={project.slug}
              className={`${styles.project} ${
                reverse
                  ? styles.projectReverse
                  : ""
              }`}
            >
              <Link
                href={`/proyectos/${project.slug}`}
                className={styles.projectLink}
              >
                {/* =================================
                    IMAGE
                ================================= */}

                <div
                  className={
                    styles.projectImageWrapper
                  }
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 78vw"
                    className={styles.projectImage}
                  />

                  <div
                    className={
                      styles.projectImageOverlay
                    }
                  />

                  <span
                    className={
                      styles.projectView
                    }
                  >
                    VER PROYECTO
                  </span>
                </div>

                {/* =================================
                    INFO
                ================================= */}

                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <span
                      className={
                        styles.projectNumber
                      }
                    >
                      {project.number}
                    </span>

                    <span
                      className={
                        styles.projectYear
                      }
                    >
                      {project.year}
                    </span>
                  </div>

                  <div className={styles.projectMain}>
                    <h2>{project.title}</h2>

                    <span
                      className={
                        styles.projectType
                      }
                    >
                      {project.type}
                    </span>

                    <span
                      className={
                        styles.projectLocation
                      }
                    >
                      {project.location}
                    </span>
                  </div>

                  <span
                    className={
                      styles.projectArrow
                    }
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </section>

      {/* =====================================
          CLOSING
      ===================================== */}

      <section className={styles.closing}>
        <span className={styles.closingLine} />

        <p>
          PROFUNDIDAD · PRECISIÓN · LUZ
        </p>
      </section>
    </main>
  );
}