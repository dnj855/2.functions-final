import { prompt } from "./prompt.js";

const characterArrayCreation = (length, start, arr = []) => {
  let utfIndexes = Array.from(Array(length)).map((e, i) => i + start);
  if (arr.length > 0) {
    return arrConcat(
      arr,
      utfIndexes.map((x) => String.fromCharCode(x))
    );
  } else {
    return utfIndexes.map((x) => String.fromCharCode(x));
  }
};

const arrConcat = (arr1, arr2) => {
  return [...arr1, ...arr2];
};

const characterInitialisation = (
  specials = false,
  numbers = false,
  capitals = false
) => {
  let characters = characterArrayCreation(26, 97);
  if (specials) {
    characters = characterArrayCreation(15, 33, characters);
  }
  if (numbers) {
    characters = characterArrayCreation(10, 48, characters);
  }
  if (capitals) {
    characters = characterArrayCreation(26, 65, characters);
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
