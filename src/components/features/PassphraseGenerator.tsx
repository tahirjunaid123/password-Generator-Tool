"use client";

import { useEffect, useState } from "react";
import { usePassphraseStore } from "@/store/usePassphraseStore";
import { Copy, RefreshCw, Key } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export const PassphraseGenerator = () => {
    const {
        passphrase,
        numWords,
        separator,
        options,
        setNumWords,
        setSeparator,
        toggleOption,
        generatePassphrase,
    } = usePassphraseStore();

    const [copied, setCopied] = useState(false);

    // Generate on mount
    useEffect(() => {
        generatePassphrase();
    }, [generatePassphrase]);

    const handleCopy = async () => {
        if (!passphrase) return;
        await navigator.clipboard.writeText(passphrase);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Math: log2(2048 words) = 11 bits of entropy per word. Plus extra for numbers and capitalization.
    const bitsPerWord = 11;
    const rawEntropy = numWords * bitsPerWord;
    const extraEntropy = (options.capitalize ? numWords * 1 : 0) + (options.includeNumber ? 6.64 : 0);
    const totalEntropy = Math.floor(rawEntropy + extraEntropy);

    let strengthLabel = "Weak";
    let strengthColor = "text-destructive";
    if (totalEntropy >= 128) {
        strengthLabel = "Military Grade";
        strengthColor = "text-primary border-primary bg-primary/10";
    } else if (totalEntropy >= 80) {
        strengthLabel = "Very Strong";
        strengthColor = "text-green-500 border-green-500 bg-green-500/10";
    } else if (totalEntropy >= 60) {
        strengthLabel = "Strong";
        strengthColor = "text-yellow-500 border-yellow-500 bg-yellow-500/10";
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-card/80 backdrop-blur-3xl border border-border/50 shadow-2xl relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>

            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Key className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Passphrase Generator</h2>
                    </div>
                    {passphrase && (
                        <div className={`px-4 py-1.5 rounded-full border text-sm font-bold shadow-sm ${strengthColor}`}>
                            {strengthLabel} ({totalEntropy} bits)
                        </div>
                    )}
                </div>

                {/* Display Area */}
                <div className="relative group">
                    <div className="w-full bg-background border border-border/50 rounded-xl p-6 min-h-[100px] flex items-center justify-center break-all shadow-inner relative overflow-hidden transition-all group-hover:border-primary/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={passphrase}
                                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                                transition={{ duration: 0.2 }}
                                className="text-2xl md:text-3xl font-mono text-center tracking-tight text-foreground font-semibold"
                            >
                                {passphrase || "Generating..."}
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium shadow-lg transition-all ${copied
                                ? "bg-green-500/20 text-green-500 border border-green-500/50"
                                : "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:scale-105"
                                }`}
                        >
                            <Copy className="w-4 h-4" />
                            <span>{copied ? "Copied!" : "Copy"}</span>
                        </button>
                        <button
                            onClick={generatePassphrase}
                            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:bg-primary/90 hover:scale-105 transition-all"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>New</span>
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="pt-8 space-y-6">
                    <div className="space-y-4 bg-secondary/20 p-6 rounded-xl border border-border/40">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-muted-foreground flex items-center">
                                Word Count <span className="ml-2 px-2 py-0.5 rounded-md bg-secondary text-foreground text-xs">{numWords}</span>
                            </label>
                        </div>
                        <Slider
                            min={3}
                            max={12}
                            value={numWords}
                            onChange={(value) => setNumWords(value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => toggleOption('capitalize')}>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium cursor-pointer">Capitalize</label>
                                <p className="text-xs text-muted-foreground">e.g. Word</p>
                            </div>
                            <Switch
                                checked={options.capitalize}
                                onChange={() => toggleOption('capitalize')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => toggleOption('includeNumber')}>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium cursor-pointer">Include Number</label>
                                <p className="text-xs text-muted-foreground">e.g. Word42</p>
                            </div>
                            <Switch
                                checked={options.includeNumber}
                                onChange={() => toggleOption('includeNumber')}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Separator</label>
                        <div className="flex space-x-2">
                            {["-", "_", " ", ".", ","].map(sep => (
                                <button
                                    key={sep}
                                    onClick={() => setSeparator(sep)}
                                    className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg transition-colors border ${separator === sep ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:border-primary/50'}`}
                                >
                                    {sep === " " ? "SPC" : sep}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
