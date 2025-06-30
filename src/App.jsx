import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GameSelection from "./pages/GameSelection";
import WordleGame from "./pages/WordleGame";
import MeduyeketGame from "./pages/MeduyeketGame";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for initial auth check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  if (loading) {
    return <div>טוען...</div>; // show while auth is being restored
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/select" />} />
        <Route path="/select" element={<GameSelection />} />
        <Route path="/wordle" element={
          <ProtectedRoute user={user}>
            <WordleGame user={user} />
          </ProtectedRoute>
        } />
        <Route path="/meduyeket" element={
          <ProtectedRoute user={user}>
            <MeduyeketGame user={user} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
