import words from "./words.json";

function reverseWord(word) {
  return word.split("").reverse().join("");
}

export function getWord() {
    const chosenWord = reverseWord(words[Math.floor(Math.random() * words.length)]);
    console.log(chosenWord)
  return chosenWord;
}