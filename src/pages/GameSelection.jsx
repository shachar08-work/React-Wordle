import React from "react";
import { useNavigate } from "react-router-dom";

export default function GameSelection() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center bg-slate-100 gap-6">
      <h1 className="text-3xl font-bold mb-4">בחר משחק</h1>
      <button
        onClick={() => navigate("/wordle")}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
      >
        וורדעל
      </button>
      <button
        onClick={() => navigate("/meduyeket")}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
      >
        מדויקת
      </button>
    </div>
  );
}
