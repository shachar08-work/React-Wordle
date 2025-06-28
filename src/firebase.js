import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyA2U3wDGQFVgxAZyTf8SClm9J6GC6f89Vw",
  authDomain: "wordle-skorall.firebaseapp.com",
  projectId: "wordle-skorall",
  storageBucket: "wordle-skorall.firebasestorage.app",
  messagingSenderId: "943850374588",
  appId: "1:943850374588:web:e26553416bdce3f214d7b9",
  measurementId: "G-V243NPC761"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore

export { auth, provider, db };  // Export db along with auth and provider
