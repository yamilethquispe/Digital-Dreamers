import { useState, useEffect } from "react";
import testimonios from "./data/testimonios.json";

function Testimonios() {

    const [Carrusel, setCarrusel] = useState(0);
    const imagenesCarrusel = [
        "/images/carrusel1.jpg",
        "/images/carrusel2.jpg",
        "/images/carrusel3.jpg"
    ];

    useEffect(() => {
        const intervalo = setInterval(() => 
            { setCarrusel((prev) => (prev + 1) % imagenesCarrusel.length) }, 3000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <section className="py-12" style={{ backgroundColor: "#FFF2AF" }}>

            <div className="max-w-6xl mx-auto px-4">

                <h2
                    className="text-4xl font-bold text-center mb-10"
                    style={{ color: "#493D9E" }}> Testimonios de nuestros clientes
                </h2>
                <p className="italic text-2xl font-sb text-center mb-10"
                    style={{ color: "#493D9E" }}>¡Te ayudamos a cumplir tus sueños!</p>

                {/* Carrusel de imágenes */}
                <div className="flex flex-col justify-center items-center p-4">
                    <div className="relative w-full h-64 overflow-hidden rounded-2xl shadow-md">
                        <img
                            src={imagenesCarrusel[Carrusel]}
                            alt="Carrusel de proyectos"
                            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                        />
                    </div>
                    <div className="flex mt-3 space-x-2">
                        {imagenesCarrusel.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCarrusel(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === Carrusel
                                        ? "bg-[#493D9E]"
                                        : "bg-[#B2A5FF]"
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {testimonios.map((testimonio) => {
                        const [abierto, setAbierto] = useState(false);
                        const [clickEnlace, setClickEnlace] = useState(false);

                        return (

                            <div
                                key={testimonio.id}
                                className={'rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'}
                                style={{ backgroundColor: "#FFFFFF" }}>

                                <div>

                                    {/* Testimonio principal */}
                                    <p className="italic mb-4 text-center"
                                        style={{ color: "#493D9E" }}>
                                        “{testimonio.testimonio}”
                                    </p>

                                    {/* Información del autor */}
                                    <div className="border-t pt-4 flex items-center gap-3">

                                        {testimonio.foto && (
                                            <img src={testimonio.foto}
                                                alt={`Foto de ${testimonio.nombre}`}
                                                className="w-12 h-12 rounded-full object-cover border-2"
                                                style={{ borderColor: "#B2A5FF" }} />
                                        )}

                                        <div>
                                            <h3
                                                className="font-semibold"
                                                style={{ color: "#493D9E" }}> {testimonio.nombre}
                                            </h3>
                                            <p
                                                className="text-sm"
                                                style={{ color: "#5a4fcf" }}> {testimonio.rol}
                                            </p>
                                            <p className="text-xs mt-1" style={{ color: "#7a73c4" }}>
                                                {new Date(`${testimonio.fecha}-01`).toLocaleString("es-ES", {
                                                    month: "long", year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Motivación */}
                                {abierto && (
                                    <div className="mt-4 fade-in">
                                        <p className="text-sm mb-1 text-justify"
                                            style={{ color: "#493D9E" }}>
                                            <span className="font-medium" style={{ color: "#5a4fcf" }}>
                                                Motivación:
                                            </span>{" "} {testimonio.motivacion}
                                        </p>

                                        {/* Enlace */}
                                        <a href={testimonio.enlaceProyecto}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setClickEnlace(true)}
                                            className={`rounded-full px-4 py-2 inline-block mt-3 text-sm font-semibold transform transition-all duration-200 hover:scale-105 ${clickEnlace
                                                    ? "bg-[#493D9E] text-white"
                                                    : "bg-[#DAD2FF] text-[#493D9E]" }`}>
                                            Ver proyecto </a>
                                    </div>
                                )}

                                {/* Botón desplegar */}
                                <button
                                    onClick={() => setAbierto(!abierto)}
                                    className="mt-4 text-sm font-medium text-[#493D9E] hover:text-[#B2A5FF] transition-colors duration-200 self-center">
                                    {abierto ? "Ver menos ▲" : "Ver más ▼"}
                                </button>

                            </div>
                        );
                    })}


                </div>

            </div>

        </section>
    );
}



export default Testimonios;