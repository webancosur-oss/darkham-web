export type Project = {
  slug: string;
  number: string;
  title: string;
  type: string;
  location: string;
  year: string;
  image: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "moro-416",
    number: "01",
    title: "MORO 416",
    type: "VIVIENDA MULTIFAMILIAR",
    location: "HUANCAYO · PERÚ",
    year: "2026",
    image: "/media/projects/moro-416.jpg",
    description:
      "Proyecto de vivienda multifamiliar desarrollado desde una mirada contemporánea, buscando equilibrio entre identidad, funcionalidad y relación con el entorno.",
  },
  {
    slug: "neo-rivera",
    number: "02",
    title: "NEO RIVERA",
    type: "VIVIENDA MULTIFAMILIAR",
    location: "HUANCAYO · PERÚ",
    year: "2026",
    image: "/media/projects/neo-rivera.jpg",
    description:
      "Proyecto residencial concebido desde una visión orientada al bienestar, la habitabilidad y la integración de los espacios.",
  },
  {
    slug: "neo-balto",
    number: "03",
    title: "NEO BALTO",
    type: "ARQUITECTURA RESIDENCIAL",
    location: "HUANCAYO · PERÚ",
    year: "2026",
    image: "/media/projects/neo-balto.jpg",
    description:
      "Proyecto residencial desarrollado con una búsqueda de equilibrio entre expresión arquitectónica, funcionalidad y experiencia espacial.",
  },
  {
    slug: "neo-eterna",
    number: "04",
    title: "NEO ETERNA",
    type: "VIVIENDA MULTIFAMILIAR",
    location: "HUANCAYO · PERÚ",
    year: "2026",
    image: "/media/projects/neo-eterna.jpg",
    description:
      "Proyecto de vivienda multifamiliar planteado desde una arquitectura contemporánea, con énfasis en proporción, luz y permanencia.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}