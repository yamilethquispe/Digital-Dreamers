
import React, { useState } from "react";

function Portfolio() {
  const PROJECTS = [
    {
      id: 1,
      title: "Digital Dreamers - Landing Page",
      category: "Diseño Web",
      description:
        "Landing responsive que presenta nuestra marca, el equipo y nuestros valores.",
      details:
        "Creada con React, Tailwind CSS y Javascript, incluye secciones como Inicio, Sobre Nosotras, Valores y Contacto, reflejando la esencia del equipo.",
      image: "https://i.ibb.co/FbJZhKJ/inspiracion.jpg",
      screenshots: ["https://i.ibb.co/HFmpPyB/inspiracion2.jpg"],
      link: "https://yamilethquispe.github.io/Digital-Dreamers/"
    },

    {
      id: 2,
      title: "Calculadora Profesional",
      category: "App",
      description:
        "Aplicación funcional que realiza operaciones básicas y avanzadas con una interfaz moderna.",
      details:
        "Desarrollada en React con diseño responsive y cálculos en tiempo real. Ideal para mostrar lógica y manejo de estados en React.",
      image: "https://i.ibb.co/fY0HQt4/calculadora.jpg",
      screenshots: ["https://i.ibb.co/4Yr9ktF/calculadora2.jpg"],
      link: "https://sancharrimacassi-dev.github.io/CT-Digital-Dreamers/calculadora.html",
    },
    {
      id: 3,
      title: "Página Inspiradora - Código Rosa",
      category: "Web",
      description:
        "Proyecto de referencia que nos inspira por su estructura limpia y moderna.",
      details:
        "Sitio web con animaciones sutiles, excelente uso del color y diseño minimalista, que sirve como guía para futuros proyectos del equipo.",
      image: "https://i.ibb.co/fY0HQt4/calculadora.jpg",
      screenshots: ["https://i.ibb.co/4Yr9ktF/calculadora2.jpg"],
      link: "https://codigo-rosa-u4.vercel.app/"
    },
  ];


  const [filter, setFilter] = useState("All");
  const [openProject, setOpenProject] = useState(null);

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-600/70 mb-4">Portafolio del equipo</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Aquí mostramos nuestros proyectos. Haz click en "Ver proyecto" para abrir la demo/repositorio o en "Más" para ver detalles.
        </p>

        {/* filtros */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border transition ${filter === cat
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-200 hover:shadow"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-3 top-3 bg-white/70 text-sm px-3 py-1 rounded-full backdrop-blur">
                  {project.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>

                <div className="mt-4 flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg bg-purple-500/70 text-white font-medium hover:bg-purple-600 transition"
                  >
                    Ver proyecto
                  </a>

                  <button
                    onClick={() => setOpenProject(project)}
                    className="inline-block px-4 py-2 rounded-lg border border-gray-200 hover:shadow transition"
                  >
                    Más
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal de proyecto (cuando openProject != null) */}
      {openProject && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenProject(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-pink-600">{openProject.title}</h3>
                <button
                  onClick={() => setOpenProject(null)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Cerrar ✕
                </button>
              </div>

              <p className="text-gray-700 mt-3">{openProject.details}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {openProject.screenshots.map((s, i) => (
                  <img key={i} src={s} alt={`${openProject.title} ${i + 1}`} className="w-full h-40 object-cover rounded" />
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={openProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-pink-500 text-white"
                >
                  Abrir proyecto
                </a>
                <button onClick={() => setOpenProject(null)} className="px-4 py-2 rounded-lg border">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;