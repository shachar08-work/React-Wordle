import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { getRedirectResult } from "firebase/auth";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";
import Auth from "./components/Auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingRedirect, setCheckingRedirect] = useState(true);

  // On mount, check if the user is returning from redirect login
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect error:", err);
      })
      .finally(() => {
        setCheckingRedirect(false);
      });
  }, []);

  // Also listen for auth state changes (e.g., popup sign-in)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (checkingRedirect) {
    // Show a loading screen while checking redirect login result
    return (
      <div dir="rtl" className="flex items-center justify-center min-h-screen">
        <p>טוען...</p>
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
        <Route path="/wordle" element={<WordleGame user={user} />} />
        <Route path="/meduyeket" element={<MeduyeketGame user={user} />} />
      </Routes>
    </Router>
  );
}
