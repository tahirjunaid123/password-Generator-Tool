"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Check } from "lucide-react";
import { usePasswordStore } from "@/store/usePasswordStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const PasswordGenerator = () => {
    const { password, length, options, strength, setLength, toggleOption, generatePassword } = usePasswordStore();
    const [copied, setCopied] = useState(false);

    // Initial generation on mount
    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const handleCopy = async () => {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrengthColor = () => {
        switch (strength) {
            case "Strong": return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]";
            case "Good": return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]";
            case "Fair": return "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]";
            default: return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]";
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto border-primary/30 dark:shadow-[0_0_30px_rgba(255,0,255,0.15)] shadow-[0_0_30px_rgba(255,0,255,0.05)] bg-background/80 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                    Secure Password Generator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Password Display */}
                <div className="relative">
                    <div className="bg-secondary/50 border border-border p-4 rounded-lg flex items-center justify-between min-h-[4rem] group overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={password}
                                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                transition={{ duration: 0.2 }}
                                className="font-mono text-xl sm:text-2xl text-foreground break-all mr-4"
                            >
                                {password}
                            </motion.span>
                        </AnimatePresence>
                        <div className="flex gap-2 absolute right-2 top-1/2 -translate-y-1/2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopy}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                title="Copy Password"
                            >
                                {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Strength Meter */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-muted-foreground">Strength</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-black ${strength === "Strong" ? "bg-green-400" :
                            strength === "Good" ? "bg-yellow-400" :
                                strength === "Fair" ? "bg-orange-400" : "bg-red-400"
                            }`}>
                            {strength.toUpperCase()}
                        </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex gap-1">
                        <motion.div
                            className={`h-full rounded-full ${getStrengthColor()}`}
                            initial={{ width: "25%" }}
                            animate={{
                                width: strength === "Weak" ? "25%" : strength === "Fair" ? "50%" : strength === "Good" ? "75%" : "100%"
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    {/* Length Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span>Password Length</span>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-md">{length}</span>
                        </div>
                        <Slider
                            value={length}
                            min={6}
                            max={60}
                            onChange={(val) => setLength(val)}
                        />
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        {[
                            { id: 'uppercase', label: 'Uppercase (A-Z)' },
                            { id: 'lowercase', label: 'Lowercase (a-z)' },
                            { id: 'numbers', label: 'Numbers (0-9)' },
                            { id: 'symbols', label: 'Symbols (!@#)' },
                        ].map((opt) => (
                            <div key={opt.id} className="flex items-center justify-between bg-secondary/30 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                                <span className="text-sm font-medium">{opt.label}</span>
                                <Switch
                                    checked={options[opt.id as keyof typeof options]}
                                    onChange={() => toggleOption(opt.id as keyof typeof options)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    className="w-full text-lg h-12 gap-2 mt-4 font-bold tracking-wide"
                    onClick={() => generatePassword()}
                >
                    <RefreshCw className="h-5 w-5" />
                    GENERATE NEW
                </Button>
            </CardContent>
        </Card>
    );
};
