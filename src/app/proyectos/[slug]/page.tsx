type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  return (
    <main>
      <section className="section">
        <div className="container">
          <span className="eyebrow">
            Proyecto
          </span>

          <h1
            style={{
              marginTop: "24px",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 0.95,
            }}
          >
            {slug}
          </h1>
        </div>
      </section>
    </main>
  );
}