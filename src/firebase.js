import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2U3wDGQFVgxAZyTf8SClm9J6GC6f89Vw",
  authDomain: "wordle-skorall.firebaseapp.com",
  projectId: "wordle-skorall",
  storageBucket: "wordle-skorall.firebasestorage.app",
  messagingSenderId: "943850374588",
  appId: "1:943850374588:web:e26553416bdce3f214d7b9",
  measurementId: "G-V243NPC761"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, storage, signInWithPopup };
export default db;