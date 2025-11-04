import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import SeccionTestimonios from "./components/Testimonios.jsx";

// Páginas
import Inicio from "./pages/inicio.jsx";
import Nosotras from "./pages/nosotras.jsx";
import Contacto from "./pages/contacto.jsx";
import Valores from "./pages/valores.jsx";
import Confianza from "./pages/confianza.jsx";

// Autenticación
import { AuthProvider } from "./auth/AuthProvider.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/nosotras" element={<Nosotras />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/valores" element={<Valores />} />
              <Route path="/confianza" element={<Confianza />} />

              {/* Nueva ruta para iniciar sesión */}
              <Route path="/login" element={<Login />} />

              {/* Ejemplo de ruta protegida */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Página 404 */}
              <Route path="*" element={<div className="p-6">404 - Página no encontrada</div>} />
            </Routes>
          </main>

        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
