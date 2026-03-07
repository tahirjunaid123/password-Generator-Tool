"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { Lock, Unlock, Copy, Check, Download, Shield, Settings2, KeyRound } from "lucide-react";

type Algorithm = "AES" | "TripleDES" | "Rabbit" | "RC4";

export function AdvancedEncryptionTool() {
    const [mode, setMode] = useState<"Encrypt" | "Decrypt">("Encrypt");
    const [algorithm, setAlgorithm] = useState<Algorithm>("AES");
    const [input, setInput] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const algorithms: Algorithm[] = ["AES", "TripleDES", "Rabbit", "RC4"];

    const handleProcess = () => {
        setError("");
        setOutput("");

        if (!input) {
            setError("Please enter text to process.");
            return;
        }

        if (!secretKey) {
            setError("Secret Key is required.");
            return;
        }

        try {
            let processedText = "";
            const cryptoAlgo = CryptoJS[algorithm as keyof typeof CryptoJS] as any;

            if (mode === "Encrypt") {
                processedText = cryptoAlgo.encrypt(input, secretKey).toString();
            } else {
                const bytes = cryptoAlgo.decrypt(input, secretKey);
                processedText = bytes.toString(CryptoJS.enc.Utf8);
                if (!processedText) {
                    throw new Error("Decryption failed. Invalid Secret Key or corrupted ciphertext.");
                }
            }

            setOutput(processedText);
        } catch (err: any) {
            setError(err.message || "An error occurred during processing.");
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `secure_${mode.toLowerCase()}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10 space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2 ring-1 ring-primary/30 shadow-[0_0_30px_rgba(255,0,255,0.3)]">
                    {mode === "Encrypt" ? (
                        <Lock className="w-8 h-8 text-primary" />
                    ) : (
                        <Unlock className="w-8 h-8 text-emerald-500" />
                    )}
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight">
                    Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Encryption Studio</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Military-grade client-side processing using industry-leading cryptographic algorithms. Your data never leaves your browser.
                </p>
            </div>

            {/* Main Interactive Card */}
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Mode Selector */}
                        <div className="bg-secondary/50 p-2 rounded-2xl flex relative">
                            <button
                                onClick={() => { setMode("Encrypt"); setOutput(""); setError(""); }}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${mode === "Encrypt" ? "text-primary-foreground shadow-lg scale-[1.02]" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <Lock className="w-4 h-4" /> Encrypt
                            </button>
                            <button
                                onClick={() => { setMode("Decrypt"); setOutput(""); setError(""); }}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${mode === "Decrypt" ? "text-emerald-foreground shadow-lg scale-[1.02]" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <Unlock className="w-4 h-4" /> Decrypt
                            </button>
                            {/* Animated Background Indicator */}
                            <div
                                className={`absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-xl transition-all duration-300 ease-out ${mode === "Encrypt" ? "bg-primary left-2" : "bg-emerald-500 left-[calc(50%+4px)]"}`}
                            ></div>
                        </div>

                        {/* Algorithm Selector */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Settings2 className="w-4 h-4 text-primary" />
                                Algorithm Standard
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {algorithms.map((algo) => (
                                    <button
                                        key={algo}
                                        onClick={() => { setAlgorithm(algo); setOutput(""); }}
                                        className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all border ${algorithm === algo ? 'bg-primary/20 border-primary text-primary shadow-sm' : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/70'}`}
                                    >
                                        {algo}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Secret Key Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                <KeyRound className="w-4 h-4 text-primary" />
                                Master Secret Key
                            </label>
                            <input
                                type="password"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                placeholder="Enter a highly secure key..."
                                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono transition-shadow"
                            />
                            <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                Do not lose this key. Without it, recovering encrypted data is mathematically impossible.
                            </p>
                        </div>
                    </div>

                    {/* I/O Section */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Input Area */}
                        <div className="flex-1 min-h-[160px] flex flex-col relative group/input">
                            <label className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-3 flex items-center justify-between">
                                <span>{mode === "Encrypt" ? "Plain Text Input" : "Cipher Text Input"}</span>
                            </label>
                            <textarea
                                value={input}
                                onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
                                placeholder={mode === "Encrypt" ? "Enter the sensitive information you want to secure..." : "Paste the encrypted ciphertext here..."}
                                className="flex-1 w-full bg-background/50 border border-border rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono text-sm leading-relaxed transition-all shadow-inner placeholder:text-muted-foreground/50"
                            />
                        </div>

                        {/* Central Action Button */}
                        <div className="flex justify-center -my-3 relative z-20">
                            <button
                                onClick={handleProcess}
                                className={`px-8 py-3 rounded-2xl font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${mode === "Encrypt" ? "bg-gradient-to-r from-primary to-purple-600 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"}`}
                            >
                                {mode === "Encrypt" ? (
                                    <><Lock className="w-5 h-5" /> Encrypt Data</>
                                ) : (
                                    <><Unlock className="w-5 h-5" /> Decrypt Data</>
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        {/* Output Area */}
                        <div className="flex-1 min-h-[160px] flex flex-col relative group/output">
                            <label className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-3 flex items-center justify-between">
                                <span>{mode === "Encrypt" ? "Encrypted Cipher Text" : "Decrypted Plain Text"}</span>

                                {output && (
                                    <div className="flex items-center gap-2 -mt-1 -mb-1">
                                        <button
                                            onClick={handleCopy}
                                            className="p-1.5 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 hover:bg-secondary rounded-lg flex items-center gap-1.5 text-xs font-semibold"
                                        >
                                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="p-1.5 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 hover:bg-secondary rounded-lg"
                                            title="Download as text file"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                            </label>

                            <div className={`flex-1 w-full bg-background/80 border rounded-2xl p-5 text-sm font-mono leading-relaxed overflow-y-auto break-all transition-colors ${output ? (mode === "Encrypt" ? "border-primary/50 text-primary/90 shadow-[inset_0_0_20px_rgba(255,0,255,0.05)]" : "border-emerald-500/50 text-emerald-500/90 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]") : "border-border text-muted-foreground/30 flex items-center justify-center"}`}>
                                {output ? (
                                    output
                                ) : (
                                    <span className="italic flex flex-col items-center gap-2">
                                        <Shield className="w-8 h-8 opacity-20" />
                                        Output will appear here...
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
