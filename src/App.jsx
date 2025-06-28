import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./firebase";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";
import Auth from "./components/Auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
      } else {
        try {
          const result = await getRedirectResult(auth);
          if (result?.user) {
            setUser(result.user);
          }
        } catch (err) {
          console.error("Redirect error:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
