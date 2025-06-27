import React, { useEffect, useState } from "react";
import axios from "axios";
import Keyboard from "./Keyboard";
import { getWord } from "./wordManager";

const USER_ID = "user12"; // Change as needed

function getTodayDateString() {
  const now = new Date();
  console.log(now)
  now.setHours(now.getHours() + 3); // UTC+3 Israel time
  return now.toISOString().slice(0, 10); // yyyy-mm-dd
}

// function getDailyWord(words) {
//   const dateStr = getTodayDateString();
//   const idx = [...dateStr].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % words.length;
//   return words[idx];
// }

export default function App() {
  const [rows, setRows] = useState(Array(6).fill(null).map(() => Array(5).fill("")));
  const [results, setResults] = useState(Array(6).fill(null));
  const [attempt, setAttempt] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const [status, setStatus] = useState("טוען...");
  const [dailyWord, setDailyWord] = useState("");
  const [keyboardColors, setKeyboardColors] = useState({}); // key: letter, value: "green" | "yellow" | "gray"

  useEffect(() => {
    const playedDate = localStorage.getItem(`played_${USER_ID}`);
    const today = getTodayDateString();

    if (playedDate === today) {
      setLocked(true);
      setStatus("שיחקת כבר היום! נסה שוב מחר");
    } else {
      setStatus("נחש את מילת היום!");
      const word = getWord();
      console.log("!!!!!!")
      console.log(word)
      setDailyWord(word);
    }
  }, []);

  const currentGuess = rows[attempt].filter((l) => l !== "").join("");

  const handleKeyClick = (letter) => {
    if (locked || won) return;

    if (letter === "ENTER") {
      submitGuess();
      return;
    }
    if (letter === "DELETE") {
      handleBackspace();
      return;
    }

    setRows((prev) => {
      const newRows = prev.map((r) => [...r]);
      for (let i = 0; i < 5; i++) {
        if (newRows[attempt][i] === "") {
          newRows[attempt][i] = letter;
          break;
        }
      }
      return newRows;
    });
  };

  const handleBackspace = () => {
    setRows((prev) => {
      const newRows = prev.map((r) => [...r]);
      for (let i = 4; i >= 0; i--) {
        if (newRows[attempt][i] !== "") {
          newRows[attempt][i] = "";
          break;
        }
      }
      return newRows;
    });
  };

  const updateKeyboardColors = (guess, result) => {
  setKeyboardColors((prev) => {
    const newColors = { ...prev };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const color = result[i];

      // Priority order: green > yellow > gray
      if (color === "green") {
        newColors[letter] = "green";
      } else if (color === "yellow" && newColors[letter] !== "green") {
        newColors[letter] = "yellow";
      } else if (!newColors[letter]) {
        newColors[letter] = "gray";
      }
    }
    return newColors;
  });
};

  const submitGuess = () => {
    if (currentGuess.length < 5) {
      alert("אנא מלא את כל חמש האותיות");
      return;
    }

    // if (!VALID_WORDS.includes(currentGuess)) {
    //   alert("המילה לא תקינה");
    //   return;
    // }

    let result = Array(5).fill("gray");
    const guessLetters = currentGuess.split("");
    const targetLetters = dailyWord.split("");

    // Mark greens
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = "green";
        targetLetters[i] = null;
        guessLetters[i] = null;
      }
    }
    // Mark yellows
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] !== null && targetLetters.includes(guessLetters[i])) {
        result[i] = "yellow";
        targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
      }
    }

    const newResults = [...results];
    newResults[attempt] = result;
    setResults(newResults);
    updateKeyboardColors(currentGuess, result);

    if (result.every((c) => c === "green")) {
      setWon(true);
      setLocked(true);
      setStatus("ניצחת! 🎉");
      localStorage.setItem(`played_${USER_ID}`, getTodayDateString());
    } else if (attempt >= 5) {
      setLocked(true);
      setStatus(`המשחק נגמר 😢, המילה הייתה: ${dailyWord}`);
      localStorage.setItem(`played_${USER_ID}`, getTodayDateString());
    } else {
      setAttempt(attempt + 1);
    }
  };

  const getColor = (rowIdx, letterIdx) => {
    if (!results[rowIdx]) return "bg-white border-gray-400";
    const color = results[rowIdx][letterIdx];
    if (color === "green") return "bg-[#538d4e] border-[#538d4e]";
    if (color === "yellow") return "bg-[#b59f3b] border-[#b59f3b]";
    return "bg-[#787c7e] border-[#787c7e]";
  };

  return (
    <div dir="rtl" className="p-4 flex flex-col items-center min-h-screen bg-slate-100">
      <h1 className="text-4xl font-bold mb-4">וורדעל</h1>
      <div className="text-lg mb-4">{status}</div>

      <div className="grid grid-rows-6 gap-3 max-w-md w-full">
        {rows.map((wordArr, i) => (
          <div key={i} className="flex gap-3 justify-center" aria-label={`שורה ${i + 1}`}>
            {wordArr.map((letter, j) => (
              <div
                key={j}
                className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 rounded-md font-bold text-3xl md:text-4xl ${getColor(i, j)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Keyboard onKeyClick={handleKeyClick} disabled={locked || won} colors={keyboardColors} />
    </div>
  );
}
