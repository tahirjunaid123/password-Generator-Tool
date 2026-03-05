import { create } from "zustand";
import { generateSecurePassword } from "@/lib/crypto";

export type PasswordStrength = "Weak" | "Fair" | "Good" | "Strong";

interface PasswordState {
    password: string;
    length: number;
    options: {
        uppercase: boolean;
        lowercase: boolean;
        numbers: boolean;
        symbols: boolean;
    };
    strength: PasswordStrength;
    setLength: (length: number) => void;
    toggleOption: (option: keyof PasswordState["options"]) => void;
    generatePassword: () => void;
}

export const usePasswordStore = create<PasswordState>((set, get) => ({
    password: "",
    length: 16,
    options: {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    },
    strength: "Fair",

    setLength: (length) => {
        set({ length });
        get().generatePassword();
    },

    toggleOption: (option) => {
        set((state) => {
            const newOptions = { ...state.options, [option]: !state.options[option] };
            // Prevent unchecking all options
            if (!Object.values(newOptions).some(Boolean)) {
                return state;
            }
            return { options: newOptions };
        });
        get().generatePassword();
    },

    generatePassword: () => {
        const { length, options } = get();
        const newPassword = generateSecurePassword(length, options);

        // Basic strength calculation
        let strengthScore = 0;
        if (length > 8) strengthScore++;
        if (length >= 14) strengthScore++;
        if (options.uppercase) strengthScore++;
        if (options.numbers) strengthScore++;
        if (options.symbols) strengthScore++;

        let strength: PasswordStrength = "Weak";
        if (strengthScore >= 5) strength = "Strong";
        else if (strengthScore >= 4) strength = "Good";
        else if (strengthScore >= 3) strength = "Fair";

        set({ password: newPassword, strength });
    },
}));
