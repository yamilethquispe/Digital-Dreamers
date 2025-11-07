import { useAuth } from "../auth/AuthProvider";
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Asegúrate de que tienes tu archivo firebase.js configurado
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Dashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Maneja cambios en los inputs
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear una nueva tarea en Firestore
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión para crear tareas");

    try {
      await addDoc(collection(db, "tasks"), {
        title: form.title,
        description: form.description,
        createdBy: user.uid,
        createdAt: new Date(),
      });

      setForm({ title: "", description: "" });
      fetchTasks(); // recarga la lista
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // Obtener tareas del usuario autenticado
  const fetchTasks = async () => {
    if (!user) return;
    setLoadingTasks(true);

    try {
      const q = query(collection(db, "tasks"), where("createdBy", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(userTasks);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  // Cargar tareas al iniciar sesión
  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Bienvenido, <b>{user?.displayName || user?.email}</b>
      </p>

      {user?.photoURL && (
        <div className="mt-2 mb-6">
          <img
            src={user.photoURL}
            alt="Avatar de usuario"
            className="w-16 h-16 rounded-full border"
          />
        </div>
      )}

      {/* 📌 Formulario para crear tareas propias */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Nueva tarea</h2>
        <p className="text-gray-600 text-sm mb-3">
          Cada tarea que registres quedará vinculada a tu usuario (
          <code>createdBy = user.uid</code>) y solo tú la verás en tu dashboard.
        </p>

        <form
          onSubmit={handleCreateTask}
          className="bg-white border rounded-xl p-4 space-y-3 shadow-sm"
        >
          <div>
            <label className="block text-sm mb-1">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Ej. Estudiar React"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Ej. Repasar hooks y useEffect"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-gray-900 text-white text-sm"
          >
            Agregar tarea
          </button>
        </form>
      </section>

      {/* 📊 Visualización de datos por usuario */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Mis tareas</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Solo se muestran las tareas asociadas a tu usuario (campo{" "}
          <code>createdBy = user.uid</code>).
        </p>

        {loadingTasks ? (
          <p className="text-gray-500">Cargando tareas…</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">
            No hay tareas registradas para tu cuenta. Crea una arriba.
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="border p-3 rounded-lg bg-white shadow-sm"
              >
                <h3 className="font-medium">{t.title}</h3>
                <p className="text-gray-600 text-sm">{t.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
