import { prompt } from "./prompt.js";

const characterArrayCreation = (length, start) => {
  let utfIndexes = Array.from(Array(length)).map((e, i) => i + start);
  return utfIndexes.map((x) => String.fromCharCode(x));
};

const characterInitialisation = (
  specials = false,
  numbers = false,
  capitals = false
) => {
  let characters = characterArrayCreation(26, 97);
  if (specials) {
    const specials = characterArrayCreation(15, 33);
    characters = [...characters, ...specials];
  }
  if (numbers) {
    const numbers = characterArrayCreation(10, 48);
    characters = [...characters, ...numbers];
  }
  if (capitals) {
    const capitals = characterArrayCreation(26, 65);
    characters = [...characters, ...capitals];
  }
  return characters;
};

const passwordGenerator = () => {
  //TODO: Add a check for every input and a recursivity if the input is not correct
  const length = prompt("🔢 Combien de caractères ? (8-36) ");
  const specials = prompt("🔣 Caractères spéciaux ? (y/n) ");
  const numbers = prompt("🔢 Chiffres ? (y/n) ");
  const capitals = prompt("⬆️ Majuscules ? (y/n) ");
  const characters = characterInitialisation(
    specials === "y",
    numbers === "y",
    capitals === "y"
  );
  let password = "";
  for (let i = 0; i < Number(length); i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  console.log("Votre mot de passe généré est :", password);
};

passwordGenerator();
