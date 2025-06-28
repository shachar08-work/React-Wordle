import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import Keyboard from "../components/Keyboard";
import { getMeduyeketWord } from "../wordManager";

export default function MeduyeketGame({ user }) {
  const [dailyWord, setDailyWord] = useState("");
  const [keyboardColors, setKeyboardColors] = useState({});
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);
  const [status, setStatus] = useState("טוען...");

  useEffect(() => {
    if (!user) return;
    const word = getMeduyeketWord();
    setDailyWord(word);
    setStatus("נחש את מילת היום!");
  }, [user]);

  return (
    <div dir="rtl" className="p-4 flex flex-col items-center min-h-screen bg-slate-100">
      <h1 className="text-4xl font-bold mb-4">מדויקת</h1>
      <div className="text-lg mb-4">{status}</div>

      <GameBoard
        dailyWord={dailyWord}
        user={user}
        keyboardColors={keyboardColors}
        setKeyboardColors={setKeyboardColors}
        locked={locked}
        won={won}
      />
    </div>
  );
}
