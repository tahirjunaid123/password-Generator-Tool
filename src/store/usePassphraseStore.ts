import { create } from "zustand";
import { generatePassphrase } from "@/lib/crypto";

interface PassphraseState {
    passphrase: string;
    numWords: number;
    separator: string;
    options: {
        capitalize: boolean;
        includeNumber: boolean;
    };
    setNumWords: (words: number) => void;
    setSeparator: (sep: string) => void;
    toggleOption: (option: keyof PassphraseState["options"]) => void;
    generatePassphrase: () => void;
}

export const usePassphraseStore = create<PassphraseState>((set, get) => ({
    passphrase: "",
    numWords: 4,
    separator: "-",
    options: {
        capitalize: true,
        includeNumber: true,
    },

    setNumWords: (numWords) => {
        set({ numWords });
        get().generatePassphrase();
    },

    setSeparator: (separator) => {
        set({ separator });
        get().generatePassphrase();
    },

    toggleOption: (option) => {
        set((state) => ({
            options: { ...state.options, [option]: !state.options[option] }
        }));
        get().generatePassphrase();
    },

    generatePassphrase: () => {
        const { numWords, separator, options } = get();
        const newPassphrase = generatePassphrase(
            numWords,
            separator,
            options.capitalize,
            options.includeNumber
        );
        set({ passphrase: newPassphrase });
    },
}));
