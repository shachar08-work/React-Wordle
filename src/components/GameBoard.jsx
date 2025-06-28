import React, { useState } from "react";
import Keyboard from "./Keyboard";

const FINAL_HEBREW_MAP = { כ: "ך", מ: "ם", נ: "ן", פ: "ף", צ: "ץ" };

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function GameBoard({ dailyWord, user, keyboardColors, setKeyboardColors, locked, won }) {
  const [rows, setRows] = useState(Array(6).fill(null).map(() => Array(5).fill("")));
  const [results, setResults] = useState(Array(6).fill(null));
  const [attempt, setAttempt] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  // ...handleKeyClick, handleBackspace here, or passed as props

  

  const updateKeyboardColors = (guess, result) => {
    setKeyboardColors((prev) => {
      const newColors = { ...prev };
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const color = result[i];
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

  const submitGuess = async () => {
    const currentGuess = rows[attempt].filter((l) => l !== "").join("");
    if (currentGuess.length < 5) {
      alert("אנא מלא את כל חמש האותיות");
      return;
    }

    let result = Array(5).fill("gray");
    const guessLetters = currentGuess.split("");
    const targetLetters = dailyWord.split("");

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = "green";
        targetLetters[i] = null;
        guessLetters[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] !== null && targetLetters.includes(guessLetters[i])) {
        result[i] = "yellow";
        targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
      }
    }

    setRevealedCount(0);

    for (let i = 0; i < 5; i++) {
      setResults((prev) => {
        const newResults = [...prev];
        if (!newResults[attempt]) newResults[attempt] = Array(5).fill(null);
        newResults[attempt][i] = result[i];
        return newResults;
      });

      setRevealedCount(i + 1);
      updateKeyboardColors(currentGuess.slice(0, i + 1), result.slice(0, i + 1));
      await delay(600);
    }

    if (result.every((c) => c === "green")) {
      // setWon, locked, status, localStorage updates here or lift these up via props/callbacks
    } else if (attempt >= 5) {
      // lock game, set status, etc.
    } else {
      setAttempt(attempt + 1);
      setRevealedCount(0);
    }
  };

  const getColor = (rowIdx, letterIdx) => {
    if (!results[rowIdx]) return "bg-white border-gray-400";
    const color = results[rowIdx][letterIdx];
    if (color === "green") return "bg-[#538d4e] border-[#538d4e]";
    if (color === "yellow") return "bg-[#b59f3b] border-[#b59f3b]";
    if (color === "gray") return "bg-[#787c7e] border-[#787c7e]";
    return "bg-white border-gray-400";
  };

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

return (
  <>
    <div className="grid grid-rows-6 gap-3 max-w-md w-full">
      {rows.map((wordArr, i) => (
        <div key={i} className="flex gap-3 justify-center" aria-label={`שורה ${i + 1}`}>
          {wordArr.map((letter, j) => {
            const isLastLetter = j === 4 && letter in FINAL_HEBREW_MAP;
            const displayLetter = isLastLetter ? FINAL_HEBREW_MAP[letter] : letter;
            const isRevealed = i === attempt && j < revealedCount;

            return (
              <div
                key={j}
                className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 rounded-md font-bold text-3xl md:text-4xl
                  ${getColor(i, j)} transition-colors duration-300 ease-in-out
                  ${isRevealed ? "animate-flip" : ""}
                `}
              >
                {displayLetter}
              </div>
            );
          })}
        </div>
      ))}
    </div>

    <Keyboard
      onKeyClick={handleKeyClick}
      disabled={locked || won}
      colors={keyboardColors}
    />
  </>
);
}


