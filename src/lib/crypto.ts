/**
 * Client-side secure password generation using crypto.getRandomValues().
 */
export const generateSecurePassword = (
    length: number,
    options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): string => {
    const charSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
    };

    let availableChars = "";
    if (options.uppercase) availableChars += charSets.uppercase;
    if (options.lowercase) availableChars += charSets.lowercase;
    if (options.numbers) availableChars += charSets.numbers;
    if (options.symbols) availableChars += charSets.symbols;

    if (availableChars.length === 0) return "";

    const passwordChars: string[] = [];

    // Guarantee at least one character from each selected option
    if (options.uppercase) passwordChars.push(getRandomChar(charSets.uppercase));
    if (options.lowercase) passwordChars.push(getRandomChar(charSets.lowercase));
    if (options.numbers) passwordChars.push(getRandomChar(charSets.numbers));
    if (options.symbols) passwordChars.push(getRandomChar(charSets.symbols));

    // Fill the rest
    while (passwordChars.length < length) {
        passwordChars.push(getRandomChar(availableChars));
    }

    // Shuffle the array to avoid predictable first characters
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join("");
};

const getRandomChar = (charSet: string): string => {
    return charSet[getRandomInt(0, charSet.length - 1)];
};

const getRandomInt = (min: number, max: number): number => {
    const range = max - min + 1;
    const maxSafeVal = Math.floor(4294967295 / range) * range;

    let randomVal = new Uint32Array(1);
    do {
        window.crypto.getRandomValues(randomVal);
    } while (randomVal[0] >= maxSafeVal);

    return min + (randomVal[0] % range);
};

import { wordlist } from "./wordlist";

export const generatePassphrase = (
    numWords: number,
    separator: string,
    capitalize: boolean,
    includeNumber: boolean
): string => {
    if (!wordlist || wordlist.length === 0) return "";
    const words: string[] = [];

    for (let i = 0; i < numWords; i++) {
        let word = wordlist[getRandomInt(0, wordlist.length - 1)];
        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
    }

    if (includeNumber) {
        const num = getRandomInt(0, 99);
        const pos = getRandomInt(0, words.length - 1);
        words[pos] = words[pos] + num.toString();
    }

    return words.join(separator);
};
