import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // Importa tu contexto de autenticación

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtiene usuario y función logout

  return (
    <div className="bg-[#493D9E] flex justify-evenly items-center px-10 py-6 sticky top-0 z-10">
      <nav className="grid grid-cols-[1.7fr_4fr_2fr] gap-3 w-full items-center">

        {/* LOGO */}
        <div className="text-white text-2xl font-bold self-center">
          Digital Dreamers
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <div className="flex justify-center items-center gap-4 text-white text-lg font-semibold">
          <Link
            to="/"
            className="menu-boton border-none px-3 py-2 rounded-full bg-[#493D9E] transition-transform duration-300 ease-in-out hover:bg-[#DAD2FF] hover:text-[#493D9E] hover:shadow-md hover:-translate-y-1 active:bg-[#493D9E] active:text-[#FFF2AF]">
            Inicio
          </Link>

          <Link
            to="/nosotras"
            className="menu-boton border-none px-3 py-2 rounded-full bg-[#493D9E] transition-transform duration-300 ease-in-out hover:bg-[#DAD2FF] hover:text-[#493D9E] hover:shadow-md hover:-translate-y-1 active:bg-[#493D9E] active:text-[#FFF2AF]">
            Sobre nosotras
          </Link>

          <Link
            to="/valores"
            className="menu-boton border-none px-3 py-2 rounded-full bg-[#493D9E] transition-transform duration-300 ease-in-out hover:bg-[#DAD2FF] hover:text-[#493D9E] hover:shadow-md hover:-translate-y-1 active:bg-[#493D9E] active:text-[#FFF2AF]">
            Nuestros valores
          </Link>

          <Link
            to="/contacto"
            className="menu-boton border-none px-3 py-2 rounded-full bg-[#493D9E] transition-transform duration-300 ease-in-out hover:bg-[#DAD2FF] hover:text-[#493D9E] hover:shadow-md hover:-translate-y-1 active:bg-[#493D9E] active:text-[#FFF2AF]">
            Contacto
          </Link>

          <Link
            to="/confianza"
            className="menu-boton border-none px-3 py-2 rounded-full bg-[#493D9E] transition-transform duration-300 ease-in-out hover:bg-[#DAD2FF] hover:text-[#493D9E] hover:shadow-md hover:-translate-y-1 active:bg-[#493D9E] active:text-[#FFF2AF]">
            Confianza
          </Link>
        </div>

        {/* DERECHA: BUSCADOR + LOGIN/USUARIO */}
        <div className="flex justify-center items-center gap-4">

          {/* BUSCADOR */}
          <div className="flex justify-center items-center gap-2 bg-[#FFF2AF] px-3 py-2 rounded-2xl shadow-md max-w-[60%]">
            <input
              type="text"
              placeholder="Buscar"
              className="border-none bg-transparent text-[#493D9E] text-base focus:outline-none w-[60%]"
            />
            <button
              type="submit"
              className="bg-none border-none text-[#493D9E] rounded-full cursor-pointer transition duration-300 hover:bg-[#B2A5FF] px-2">
              🔍
            </button>
          </div>

          {/* 🔒 SECCIÓN DE AUTENTICACIÓN */}
          <div className="flex items-center gap-3 text-white text-sm">
            {user ? (
              <>
                <span className="text-[#FFF2AF]">
                  Hola, {user.displayName || user.email}
                </span>

                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 rounded bg-[#FFF2AF] text-[#493D9E] font-semibold transition duration-300 hover:bg-[#B2A5FF]">
                  Dashboard
                </Link>

                <Link
                  to="/perfil"
                  className="px-3 py-1.5 rounded border border-[#FFF2AF] font-semibold hover:bg-[#DAD2FF] hover:text-[#493D9E] transition">
                  Perfil
                </Link>

                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded border border-[#FFF2AF] font-semibold hover:bg-[#DAD2FF] hover:text-[#493D9E] transition">
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded bg-[#FFF2AF] text-[#493D9E] font-semibold hover:bg-[#DAD2FF] transition">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
