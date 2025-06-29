import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";
import Auth from "./components/Auth";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingRedirect, setCheckingRedirect] = useState(true);

  useEffect(() => {
    // First: check if there's a redirect sign-in result
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect error:", error);
      })
      .finally(() => {
        setCheckingRedirect(false); // Done checking redirect result
      });
  }, []);

  useEffect(() => {
    // After redirect check is done, subscribe to auth changes
    if (checkingRedirect) return;

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [checkingRedirect]);

  if (checkingRedirect) {
    // Show loading while processing redirect result
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100">
        <h1 className="text-2xl font-semibold">טוען...</h1>
      </div>
    );
  }

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/select" />} />
        <Route path="/select" element={<GameSelection />} />
        <Route path="/wordle" element={<ProtectedRoute><WordleGame user={user} /></ProtectedRoute>} />
        <Route path="/meduyeket" element={<ProtectedRoute><MeduyeketGame user={user} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
