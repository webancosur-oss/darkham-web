import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";



import styles from "./ProjectDetailPage.module.css";
import { getProjectBySlug, projects } from "../../../../data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado — Darkham",
    };
  }

  return {
    title: `${project.title} — Darkham`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      {/* =====================================
          HERO
      ===================================== */}

      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />

          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            <span>{project.number}</span>

            <span>{project.year}</span>
          </div>

          <div className={styles.heroMain}>
            <span className={styles.heroType}>
              {project.type}
            </span>

            <h1>{project.title}</h1>

            <span className={styles.heroLocation}>
              {project.location}
            </span>
          </div>

          <div className={styles.heroBottom}>
            <span className={styles.heroScroll}>
              EXPLORAR PROYECTO
            </span>

            <span className={styles.heroScrollLine} />
          </div>
        </div>
      </section>

      {/* =====================================
          INFORMATION
      ===================================== */}

      <section className={styles.introduction}>
        <div className={styles.introNumber}>
          {project.number}
        </div>

        <div className={styles.introContent}>
          <span className={styles.introLabel}>
            SOBRE EL PROYECTO
          </span>

          <h2>
            Una arquitectura pensada
            para permanecer.
          </h2>

          <p>{project.description}</p>
        </div>
      </section>

      {/* =====================================
          PROJECT DATA
      ===================================== */}

      <section className={styles.data}>
        <div className={styles.dataItem}>
          <span>PROYECTO</span>
          <strong>{project.title}</strong>
        </div>

        <div className={styles.dataItem}>
          <span>TIPO</span>
          <strong>{project.type}</strong>
        </div>

        <div className={styles.dataItem}>
          <span>UBICACIÓN</span>
          <strong>{project.location}</strong>
        </div>

        <div className={styles.dataItem}>
          <span>AÑO</span>
          <strong>{project.year}</strong>
        </div>
      </section>

      {/* =====================================
          BACK
      ===================================== */}

      <section className={styles.backSection}>
        <Link
          href="/proyectos"
          className={styles.backLink}
        >
          <span>←</span>
          <span>VOLVER A PROYECTOS</span>
        </Link>
      </section>
    </main>
  );
}