import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function NavBar() {
  const auth = useAuth();
  if (!auth) return null;
  const { user, logout } = auth;

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    
    e.preventDefault();

    if (searchTerm.trim()) {
      console.log("Buscar:", searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false); // cerrar menú en móvil
    }

  };

  return (

    <header className="bg-[#493D9E] sticky top-0 z-20 shadow-md">
     
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


        {/* LOGO */}
        <div className="text-white text-2xl font-bold">Digital Dreamers</div>


        {/* BOTÓN HAMBURGUESA (para pantallas pequeñas) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            ☰
          </button>
        </div>


        {/* MENÚ */}
        <nav
          className={`flex-1 md:flex md:items-center md:justify-between transition-all duration-500 ease-in-out
            ${menuOpen ? "block" : "hidden"} md:block`}
        >

          {/* 1: MENÚ PRINCIPAL */}
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 text-white font-semibold text-lg">
            {[
              { label: "Inicio", to: "/" },
              { label: "Sobre nosotras", to: "/nosotras" },
              { label: "Nuestros valores", to: "/valores" },
              { label: "Contacto", to: "/contacto" },
              { label: "Confianza", to: "/confianza" },
            ].map((link) => (
              <li key={link.to} className="md:my-0 my-2 transform transition-transform duration-300 hover:scale-110">
                <Link
                  to={link.to}
                  className="block px-3 py-2 rounded-full hover:bg-[#DAD2FF] hover:text-[#493D9E] transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>


          {/* 2: BUSCADOR + AUTENTICACIÓN */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">

            {/* BUSCADOR */}
            <form onSubmit={handleSearch} className="flex items-center bg-[#FFF2AF] rounded-2xl px-3 py-1 mb-2 md:mb-0 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none text-[#493D9E] px-2 w-full"
              />
              <button type="submit" className="text-[#493D9E] px-2 rounded hover:bg-[#B2A5FF] transition">
                🔍
              </button>
            </form>

            {/* AUTENTICACIÓN */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 text-sm">
              {user ? (
                <>

                  <span className="text-[#FFF2AF] mb-1 md:mb-0">
                    Hola, {user.displayName || user.email}
                  </span>

                  <Link
                    to="/dashboard"
                    className="px-3 py-1.5 rounded bg-[#FFF2AF] text-[#493D9E] font-semibold hover:bg-[#B2A5FF] transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/perfil"
                    className="px-3 py-1.5 rounded border border-[#FFF2AF] font-semibold hover:bg-[#DAD2FF] hover:text-[#493D9E] transition"
                  >
                    Perfil
                  </Link>

                  <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded border border-[#FFF2AF] font-semibold hover:bg-[#DAD2FF] hover:text-[#493D9E] transition"
                  >
                    Salir
                  </button>

                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded bg-[#FFF2AF] text-[#493D9E] font-semibold hover:bg-[#DAD2FF] transition"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>

          </div>

        </nav>

      </div>

    </header>
  );
}
