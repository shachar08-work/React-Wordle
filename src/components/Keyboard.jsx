
import React from "react";

const row1 = ["ק", "ר", "א", "ט", "ו", "פ"];
const row2 = ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל"];
const row3 = ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת"];

export default function Keyboard({ onKeyClick, disabled, colors = {} }) {

  const getKeyClass = (letter) => {
  const color = colors[letter];
  if (color === "green") return "bg-[#538d4e] text-white";
  if (color === "yellow") return "bg-[#b59f3b] text-white";
  if (color === "gray") return "bg-[#787c7e] text-white";
  return "bg-gray-300 hover:bg-gray-400 text-black";
};

  return (
    <div className="flex flex-col max-w-md w-full mt-6 gap-2 select-none">
      {/* Row 1 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onKeyClick("DELETE")}
          disabled={disabled}
          className="bg-gray-600 text-white rounded-md px-4 py-2 max-w-[80px] font-semibold hover:bg-gray-700 disabled:opacity-50"
          aria-label="מחק"
          type="button"
        >
          מחק
        </button>
        {[...row1].reverse().map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyClick(letter)}
            disabled={disabled}
            className={`${getKeyClass(letter)} rounded-md px-3 py-2 font-semibold`}
            type="button"
            aria-label={`אות ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex justify-center gap-2">
        {[...row2].reverse().map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyClick(letter)}
            disabled={disabled}
            className={`${getKeyClass(letter)} rounded-md px-3 py-2 font-semibold`}
            type="button"
            aria-label={`אות ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onKeyClick("ENTER")}
          disabled={disabled}
          className="bg-green-600 text-white rounded-md px-4 py-2 max-w-[80px] font-semibold hover:bg-green-700 disabled:opacity-50"
          aria-label="אישור"
          type="button"
        >
          אישור
        </button>
        {[...row3].reverse().map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyClick(letter)}
            disabled={disabled}
            className={`${getKeyClass(letter)} rounded-md px-3 py-2 font-semibold`}
            type="button"
            aria-label={`אות ${letter}`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
