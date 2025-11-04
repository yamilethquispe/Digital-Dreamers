import { useState } from "react";
import proyectosData from "./data/aproyectos.json";

function Portafolio() {
  const [filtro, setFiltro] = useState("Todos");

  const categorias = ["Todos", "Web", "Frontend", "Data Viz"];
  const proyectosFiltrados =
    filtro === "Todos"
      ? proyectosData
      : proyectosData.filter((p) => p.categoria === filtro);

  return (
    <section className="bg-gray-50 py-16" id="portafolio">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          🚀 Portafolio Digital Dreamers
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Proyectos que combinan creatividad, organización y tecnología para inspirar ✨
        </p>

        {/* Filtros */}
        <div className="flex justify-center space-x-4 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filtro === cat
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-600 border border-pink-600 hover:bg-pink-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((proyecto) => (
            <div
              key={proyecto.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={proyecto.imagen}
                alt={proyecto.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {proyecto.titulo}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {proyecto.descripcion}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {proyecto.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botones */}
                <div className="flex justify-between">
                  <a
                    href={proyecto.demo}
                    className="text-pink-600 font-medium hover:underline"
                  >
                    Ver Demo
                  </a>
                  <a
                    href={proyecto.codigo}
                    className="text-gray-600 font-medium hover:underline"
                  >
                    Ver Código
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Portafolio;
