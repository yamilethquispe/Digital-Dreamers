// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto (copiada desde Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAkALoqnH9haoyExBTjgNji42urZQU4TmQ",
  authDomain: "mi-proyecto-336a0.firebaseapp.com",
  projectId: "mi-proyecto-336a0",
  storageBucket: "mi-proyecto-336a0.appspot.com",
  messagingSenderId: "820500491445",
  appId: "1:820500491445:web:072c097cd5d09dbae362fc",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore (base de datos)
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };
