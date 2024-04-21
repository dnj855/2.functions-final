import { prompt } from "./prompt.js";

/**
 * Creates an array of characters from a given Unicode start point.
 *
 * @param {number} length - The number of characters to create.
 * @param {number} start - The Unicode start point.
 * @param {Array} [arr=[]] - An optional array to which the characters will be appended.
 * @returns {Array} The array of characters.
 */
const characterArrayCreation = (length, start, arr = []) => {
  let utfIndexes = Array.from(Array(length)).map((e, i) => i + start);
  return arrConcat(
    arr,
    utfIndexes.map((x) => String.fromCharCode(x))
  );
};

/**
 * Concatenates two arrays.
 *
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {Array} The concatenated array.
 */
const arrConcat = (arr1, arr2) => {
  return [...arr1, ...arr2];
};

/**
 * Initializes an array of characters based on the given parameters.
 *
 * @param {boolean} [specials=false] - Whether to include special characters.
 * @param {boolean} [numbers=false] - Whether to include numbers.
 * @param {boolean} [capitals=false] - Whether to include capital letters.
 * @returns {Array} The array of characters.
 */
const characterInitialisation = (
  specials = false,
  numbers = false,
  capitals = false
) => {
  let characters = characterArrayCreation(26, 97);
  const characterTypes = [
    { include: specials, start: 33, length: 6 },
    { include: specials, start: 42, length: 2 },
    { include: specials, start: 45, length: 1 },
    { include: specials, start: 64, length: 1 },
    { include: numbers, start: 48, length: 10 },
    { include: capitals, start: 65, length: 26 },
  ];

  for (let type of characterTypes) {
    if (type.include) {
      characters = characterArrayCreation(type.length, type.start, characters);
    }
  }

  return characters;
};

/**
 * Prompts the user for a password length and validates the input.
 *
 * @returns {string} The validated password length.
 */
const lengthPrompt = () => {
  const length = prompt("🔢 Combien de caractères ? (8-36) ");
  if (isNaN(Number(length)) || Number(length) < 8 || Number(length) > 36) {
    console.log("❌ Merci de saisir un nombre compris entre 8 et 36.");
    return lengthPrompt();
  }
  return length;
};

/**
 * Prompts the user for a boolean value (y/n) and validates the input.
 *
 * @param {string} message - The prompt message.
 * @returns {boolean} The validated boolean value.
 */
const booleanPrompt = (message) => {
  const response = prompt(message);
  if (response.toLowerCase() !== "y" && response.toLowerCase() !== "n") {
    console.log("❌ Merci de répondre par y ou n.");
    return booleanPrompt(message);
  }
  return response === "y";
};

/**
 * Generates a password of a given length from a set of characters.
 *
 * @param {Array} [characters=characterInitialisation()] - The characters to use for the password.
 * @param {number} [length=8] - The length of the password.
 * @returns {string} The generated password.
 */
const passwordGenerator = (
  characters = characterInitialisation(),
  length = 8
) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

/**
 * Runs the password generator application.
 *
 * @returns {string} The generated password.
 */
const passwordGeneratorApp = () => {
  const length = lengthPrompt();
  const specials = booleanPrompt("🔣 Caractères spéciaux ? (y/n) ");
  const numbers = booleanPrompt("🔢 Chiffres ? (y/n) ");
  const capitals = booleanPrompt("⬆️ Majuscules ? (y/n) ");
  const characters = characterInitialisation(specials, numbers, capitals);
  let password = passwordGenerator(characters, Number(length));
  if (capitals) {
    while (!/[A-Z]/.test(password)) {
      password = passwordGenerator(characters, Number(length));
    }
  }
  return password;
};

console.log("Votre mot de passe généré est :", passwordGeneratorApp());
