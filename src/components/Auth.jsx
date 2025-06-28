// src/components/Auth.jsx
import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";  // Import from SDK directly
import { auth, provider, db } from "../firebase";

export default function Auth({ setUser }) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      await setDoc(doc(db, "users", loggedInUser.uid), {
        email: loggedInUser.email,
        name: loggedInUser.displayName,
        lastLogin: new Date().toISOString(),
      });

      setUser(loggedInUser);
    } catch (error) {
      alert("שגיאה בכניסה עם גוגל");
      console.error(error);
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
      <h1 className="text-4xl font-bold mb-4">ברוכים הבאים לוורדעל</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
      >
        התחבר עם גוגל
      </button>
    </div>
  );
}
