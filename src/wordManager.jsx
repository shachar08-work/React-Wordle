import words from "./words.json";

function reverseWord(word) {
  return word.split("").reverse().join("");
}

function getTodayIsraelDateString() {
  const israelDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Jerusalem", // Official tz for Israel
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // Format output: "2025-06-29"
  return israelDate.replace(/\./g, "-");
}

export function getMeduyeketWord() {
  const todayStr = getTodayIsraelDateString(); // fixes the time issue

  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = (Math.abs(hash) + 1) % words.length;
  const chosenWord = reverseWord(words[index]);
  return chosenWord;
}

export function getWordleWord() {
  const todayStr = getTodayIsraelDateString(); // fixes the time issue
  console.log(todayStr)
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  console.log(hash)
  const index = Math.abs(hash) % words.length;
  const chosenWord = reverseWord(words[index]);
  console.log(index)
  return chosenWord;
}

