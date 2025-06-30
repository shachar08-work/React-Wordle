import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";
import Auth from "./components/Auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get result from Google redirect login (only needed for iOS)
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
        }
      } catch (err) {
        console.error("Error handling redirect login:", err);
      }

      // Track future auth changes
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    checkAuth();
  }, []);


  if (!user)
  {
    return <Auth setUser={setUser} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/select" />} />
        <Route path="/select" element={<GameSelection />} />
        <Route path="/wordle" element={<WordleGame user={user} />} />
        <Route path="/meduyeket" element={<MeduyeketGame user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}