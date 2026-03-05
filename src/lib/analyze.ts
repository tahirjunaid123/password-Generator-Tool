/**
 * Advanced password strength estimation utility.
 * Calculates entropy and estimates time to crack.
 */

export interface StrengthAnalysis {
    score: number; // 0 to 100
    entropy: number;
    timeToCrack: string;
    feedback: {
        warning: string;
        suggestions: string[];
    };
}

export const analyzePasswordStrength = (password: string): StrengthAnalysis => {
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) poolSize += 32;

    const entropy = password.length > 0 ? password.length * Math.log2(poolSize || 1) : 0;

    let score = Math.min(100, Math.floor((entropy / 120) * 100));

    // Penalize for patterns
    const suggestions: string[] = [];
    let warning = "";

    if (password.length < 12) {
        score = Math.min(score, 40);
        suggestions.push("Increase password length to at least 12 characters.");
    }
    if (!/[A-Z]/.test(password)) {
        suggestions.push("Add uppercase letters.");
    }
    if (!/[0-9]/.test(password)) {
        suggestions.push("Add numbers.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        suggestions.push("Add special characters (symbols).");
    }

    // Time to crack estimation (assuming 10 billion guesses/second)
    const guessesPerSecond = 10_000_000_000;
    const totalPossibleGuesses = Math.pow(2, entropy);
    const secondsToCrack = totalPossibleGuesses / guessesPerSecond;

    let timeToCrack = "";
    if (secondsToCrack < 1) timeToCrack = "Instantly";
    else if (secondsToCrack < 60) timeToCrack = `${Math.round(secondsToCrack)} seconds`;
    else if (secondsToCrack < 3600) timeToCrack = `${Math.round(secondsToCrack / 60)} minutes`;
    else if (secondsToCrack < 86400) timeToCrack = `${Math.round(secondsToCrack / 3600)} hours`;
    else if (secondsToCrack < 31536000) timeToCrack = `${Math.round(secondsToCrack / 86400)} days`;
    else if (secondsToCrack < 3153600000) timeToCrack = `${Math.round(secondsToCrack / 31536000)} years`;
    else timeToCrack = "Centuries";

    if (entropy < 40) warning = "Very weak password. Highly vulnerable to cracking.";
    else if (entropy < 60) warning = "Weak password. Can be cracked relatively quickly.";
    else if (entropy < 80) warning = "Reasonable password, but could be stronger.";

    return { score, entropy, timeToCrack, feedback: { warning, suggestions } };
};
