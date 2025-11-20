import { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestimoniumCarrusel() {

    const [testimonios, setTestimonios] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef();


    // Traer testimonios de Firestore
    useEffect(() => {
        const q = query(
            collection(db, "testimonios"),
            where("destacado", "==", true),
            orderBy("fecha", "desc") // ordena por fecha
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setTestimonios(data);
        });

        return unsubscribe;
    }, []);


    // Auto-scroll cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonios.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonios]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonios.length);
    };

    if (!testimonios.length) return <p className="text-center py-10 text-gray-500">Cargando testimonios...</p>;


    return (
        <div className="bg-white py-12 px-4 md:px-12 relative">

            <h2 className="text-3xl md:text-4xl font-[Merienda] text-[#493D9E] text-center mb-8">
                Testimonios 💜
            </h2>

            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonios.map((t) => (
                        <div
                            key={t.id}
                            className="flex-none w-full md:w-1/2 lg:w-1/3 px-3"
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between border-t-4 border-[#B2A5FF] hover:shadow-xl transition-shadow duration-300">
                                <p className="text-[#493D9E] text-lg font-medium leading-relaxed mb-4">
                                    {t.texto}
                                </p>
                                <span className="self-end text-gray-500 font-semibold text-sm">
                                    — {t.autor}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botones */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#DAD2FF] text-[#493D9E] rounded-full p-2 shadow hover:bg-[#B2A5FF] transition"
                >
                    <FaChevronLeft />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#DAD2FF] text-[#493D9E] rounded-full p-2 shadow hover:bg-[#B2A5FF] transition"
                >
                    <FaChevronRight />
                </button>

            </div>
        </div>
    );
}
