import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";

export default function TasksManager() {
    const { user } = useAuth();
    const [form, setForm] = useState({ title: "", description: "" });
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const [editingId, setEditingId] = useState(null); // <-- ID de la tarea que se está editando
    const [editForm, setEditForm] = useState({ title: "", description: "" });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onChangeEdit = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const fetchTasks = async () => {
        if (!user) return;

        setLoadingTasks(true);

        const q = query(collection(db, "tasks"), where("createdBy", "==", user.uid));
        const snapshot = await getDocs(q);

        setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoadingTasks(false);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!user) return alert("Debes iniciar sesión");

        if (!form.title.trim()) return alert("El título es obligatorio");

        await addDoc(collection(db, "tasks"), {
            title: form.title,
            description: form.description,
            createdBy: user.uid,
            createdAt: new Date(),
        });

        setForm({ title: "", description: "" });
        fetchTasks();
    };

    const startEditing = (task) => {
        setEditingId(task.id);
        setEditForm({ title: task.title, description: task.description || "" });
    };

    const saveEdit = async () => {
        if (!editingId) return;

        const taskRef = doc(db, "tasks", editingId);

        await updateDoc(taskRef, {
            title: editForm.title,
            description: editForm.description,
        });

        setEditingId(null);
        fetchTasks();
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const deleteTask = async (id) => {
        if (!confirm("¿Eliminar esta tarea?")) return;

        await deleteDoc(doc(db, "tasks", id));
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, [user]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Mis tareas</h2>

            {/* FORMULARIO CREAR */}
            <form
                onSubmit={handleCreateTask}
                className="mb-6 bg-gray-50 p-4 rounded-lg shadow"
            >
                <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Título"
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Descripción"
                />

                <button className="bg-purple-300 text-white px-4 py-2 rounded">
                    Agregar tarea
                </button>
            </form>

            {/* LISTA DE TAREAS */}
            {loadingTasks ? (
                <p>Cargando tareas...</p>
            ) : tasks.length === 0 ? (
                <p>No tienes tareas aún.</p>
            ) : (
                <ul className="space-y-2">
                    {tasks.map((t) => (
                        <li key={t.id} className="p-3 bg-white border rounded shadow-sm">
                            {editingId === t.id ? (
                                // ✏️ MODO EDICIÓN
                                <div>
                                    <input
                                        name="title"
                                        className="w-full border p-2 rounded mb-2"
                                        value={editForm.title}
                                        onChange={onChangeEdit}
                                    />

                                    <textarea
                                        name="description"
                                        className="w-full border p-2 rounded mb-2"
                                        value={editForm.description}
                                        onChange={onChangeEdit}
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={saveEdit}
                                            className="bg-purple-600 text-white px-3 py-1 rounded"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-500 text-white px-3 py-1 rounded"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // 👀 MODO VISUALIZAR
                                <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{t.title}</h3>
                                        {t.description && (
                                            <p className="text-sm text-gray-600">{t.description}</p>
                                        )}
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => startEditing(t)}
                                        className="bg-purple-500 text-white px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteTask(t.id)}
                                        className="bg-purple-300 text-white px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
