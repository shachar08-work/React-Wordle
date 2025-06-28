import words from "./words.json";

function reverseWord(word) {
  return word.split("").reverse().join("");
}

export function getMeduyeketWord() {
    const todayStr = new Date().toISOString().slice(0, 10); // e.g., "2025-06-27"

    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
        hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = (Math.abs(hash) + 1) % words.length;
    const chosenWord = reverseWord(words[index]);
  return chosenWord;
}

export function getWordleWord() {
    const todayStr = new Date().toISOString().slice(0, 10); // e.g., "2025-06-27"

    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
        hash = todayStr.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % words.length;
    const chosenWord = reverseWord(words[index]);
  return chosenWord;
}
