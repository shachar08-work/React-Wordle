import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";

export default function App() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch {
      alert("שגיאה בכניסה עם גוגל");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/select" />} />
        <Route path="/select" element={<GameSelection />} />
        <Route path="/wordle" element={<WordleGame user={user} />} />
        <Route path="/meduyeket" element={<MeduyeketGame user={user} />} />
      </Routes>
    </Router>
  );
}
