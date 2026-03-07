"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import { Lock, Unlock, Copy, Check, Download, Shield, Settings2, KeyRound, FileText, FileBox, UploadCloud, File, X } from "lucide-react";

type Algorithm = "AES" | "TripleDES" | "Rabbit" | "RC4";

export function AdvancedEncryptionTool() {
    const [userMode, setUserMode] = useState<"Simple" | "Pro">("Simple");
    const [inputType, setInputType] = useState<"Text" | "File">("Text");
    const [mode, setMode] = useState<"Encrypt" | "Decrypt">("Encrypt");
    const [algorithm, setAlgorithm] = useState<Algorithm>("AES");

    // Text State
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    // File State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isFileDragging, setIsFileDragging] = useState(false);

    // Shared State
    const [secretKey, setSecretKey] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

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
                if (!processedText) throw new Error("Encryption failed.");
            } else {
                let bytes;
                try {
                    bytes = cryptoAlgo.decrypt(input, secretKey);
                    processedText = bytes.toString(CryptoJS.enc.Utf8);
                } catch (e) {
                    throw new Error("Decryption failed. The ciphertext is invalid or corrupted.");
                }

                if (!processedText) {
                    throw new Error("Decryption failed. Incorrect password or corrupted data.");
                }
            }

            setOutput(processedText);
        } catch (err: any) {
            let msg = err.message || "An error occurred during processing.";
            if (msg.includes("Malformed UTF-8")) {
                msg = "Decryption failed. Incorrect password or corrupted data.";
            }
            setError(msg);
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

        if (inputType === "Text") {
            const blob = new Blob([output], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `secure_${mode.toLowerCase()}_${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            // File Mode Download
            if (mode === "Encrypt") {
                // Download the encrypted string as a .enc file
                const originalName = selectedFile!.name;
                const blob = new Blob([output], { type: "application/octet-stream" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${originalName}.enc`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else {
                // Download the decrypted file using its original dataURL and name
                try {
                    const parsed = JSON.parse(output);
                    const a = document.createElement("a");
                    a.href = parsed.data; // The Base64 DataURL
                    a.download = parsed.name; // The exact original file name
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } catch (e) {
                    setError("Failed to reconstruct the decrypted file.");
                }
            }
        }
    };

    // Drag and Drop Handlers
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsFileDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsFileDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsFileDragging(false);
        setError("");
        setOutput("");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setOutput("");
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
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

                <div className="relative z-10">
                    {/* User Mode Toggle (Simple / Pro) */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-secondary/50 p-1 rounded-full flex relative shadow-inner border border-border/50 max-w-[240px] w-full">
                            <button
                                onClick={() => { setUserMode("Simple"); setAlgorithm("AES"); setError(""); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-300 z-10 flex items-center justify-center gap-1.5 ${userMode === "Simple" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <span className={userMode === "Simple" ? "text-primary" : ""}>Simple</span>
                            </button>
                            <button
                                onClick={() => { setUserMode("Pro"); setError(""); }}
                                className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-300 z-10 flex items-center justify-center gap-1.5 ${userMode === "Pro" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <span className={userMode === "Pro" ? "text-blue-500" : ""}>Pro</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Controls Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Input Type Toggle (Text / File) */}
                            <div className="bg-secondary/50 p-2 rounded-2xl flex relative max-w-sm mx-auto lg:mx-0 mb-6">
                                <button
                                    onClick={() => { setInputType("Text"); setOutput(""); setError(""); }}
                                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${inputType === "Text" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <FileText className="w-4 h-4" /> Text
                                </button>
                                <button
                                    onClick={() => { setInputType("File"); setOutput(""); setError(""); }}
                                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${inputType === "File" ? "bg-background text-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <FileBox className={`w-4 h-4 ${inputType === "File" ? "text-blue-500" : ""}`} /> File
                                </button>
                            </div>

                            {/* Mode Selector */}
                            <div className="bg-secondary/50 p-2 rounded-2xl flex relative">
                                <button
                                    onClick={() => { setMode("Encrypt"); setOutput(""); setError(""); }}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${mode === "Encrypt" ? "text-primary-foreground shadow-lg scale-[1.02]" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <Lock className="w-4 h-4" /> {inputType === "Text" ? "Encrypt Text" : "Encrypt File"}
                                </button>
                                <button
                                    onClick={() => { setMode("Decrypt"); setOutput(""); setError(""); }}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10 flex items-center justify-center gap-2 ${mode === "Decrypt" ? "text-emerald-foreground shadow-lg scale-[1.02]" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    <Unlock className="w-4 h-4" /> {inputType === "Text" ? "Decrypt Text" : "Decrypt File"}
                                </button>
                                {/* Animated Background Indicator */}
                                <div
                                    className={`absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-xl transition-all duration-300 ease-out ${mode === "Encrypt" ? "bg-primary left-2" : "bg-emerald-500 left-[calc(50%+4px)]"}`}
                                ></div>
                            </div>

                            {/* Algorithm Selector (Pro Mode Only) */}
                            {userMode === "Pro" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
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
                            )}

                            {/* Secret Key Input */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <KeyRound className="w-4 h-4 text-primary" />
                                    {userMode === "Simple" ? "Password" : "Master Secret Key"}
                                </label>
                                <input
                                    type="password"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    placeholder={userMode === "Simple" ? "Enter a strong password..." : "Enter a highly secure key..."}
                                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono transition-shadow"
                                />
                                {userMode === "Pro" ? (
                                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                        Do not lose this key. Without it, recovering encrypted data is mathematically impossible.
                                    </p>
                                ) : (
                                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                        Keep this password safe. You will need it later to decrypt your message.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* I/O Section */}
                        <div className="lg:col-span-8 flex flex-col gap-6">

                            {/* Input Area (Text or File Zone) */}
                            <div className="flex-1 min-h-[160px] flex flex-col relative group/input">
                                <label className="text-sm font-bold text-muted-foreground tracking-wider uppercase mb-3 flex items-center justify-between">
                                    <span>{mode === "Encrypt" ? (inputType === "Text" ? "Plain Text Input" : "File Input") : (inputType === "Text" ? "Cipher Text Input" : "Encrypted File (.enc) Input")}</span>
                                    {inputType === "File" && selectedFile && (
                                        <button
                                            onClick={() => { setSelectedFile(null); setOutput(""); }}
                                            className="text-xs text-destructive hover:underline flex items-center gap-1"
                                        >
                                            <X className="w-3 h-3" /> Clear File
                                        </button>
                                    )}
                                </label>

                                {inputType === "Text" ? (
                                    <textarea
                                        value={input}
                                        onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
                                        placeholder={mode === "Encrypt" ? "Enter the sensitive information you want to secure..." : "Paste the encrypted ciphertext here..."}
                                        className="flex-1 w-full bg-background/50 border border-border rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono text-sm leading-relaxed transition-all shadow-inner placeholder:text-muted-foreground/50"
                                    />
                                ) : (
                                    <div
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                        className={`flex-1 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors cursor-pointer relative overflow-hidden group/dropzone ${isFileDragging ? (mode === "Encrypt" ? "border-primary bg-primary/5" : "border-emerald-500 bg-emerald-500/5") : "border-border hover:border-border/80 bg-background/30 hover:bg-background/50"}`}
                                    >
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handleFileChange}
                                            accept={mode === "Decrypt" ? ".enc" : "*"}
                                        />

                                        {selectedFile ? (
                                            <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 duration-300">
                                                <div className={`p-4 rounded-full ${mode === "Encrypt" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-500"}`}>
                                                    <File className="w-10 h-10" />
                                                </div>
                                                <div className="text-center z-20">
                                                    <p className="font-bold text-foreground text-lg max-w-xs truncate" title={selectedFile.name}>{selectedFile.name}</p>
                                                    <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
                                                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${mode === "Encrypt" ? "bg-primary/5 text-primary group-hover/dropzone:bg-primary/10 group-hover/dropzone:scale-110" : "bg-emerald-500/5 text-emerald-500 group-hover/dropzone:bg-emerald-500/10 group-hover/dropzone:scale-110"} transition-all duration-300`}>
                                                    <UploadCloud className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground text-lg mb-1">Drag & Drop your file here</p>
                                                    <p className="text-sm text-muted-foreground max-w-[250px]">
                                                        {mode === "Encrypt" ? "Any file type supported. Encryption happens entirely in your browser." : "Drop your secure .enc file here to recover the original."}
                                                    </p>
                                                </div>
                                                <div className={`px-4 py-2 mt-2 rounded-lg text-sm font-semibold border ${mode === "Encrypt" ? "border-primary/20 text-primary bg-primary/5" : "border-emerald-500/20 text-emerald-500 bg-emerald-500/5"}`}>
                                                    Browse Files
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Central Action Button */}
                            <div className="flex justify-center -my-3 relative z-20">
                                <button
                                    onClick={handleProcess}
                                    disabled={isProcessing}
                                    className={`px-8 py-3 rounded-2xl font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${isProcessing ? "opacity-50 cursor-not-allowed scale-100" : ""} ${mode === "Encrypt" ? "bg-gradient-to-r from-primary to-purple-600 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"}`}
                                >
                                    {isProcessing ? (
                                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                                    ) : mode === "Encrypt" ? (
                                        <><Lock className="w-5 h-5" /> {inputType === "Text" ? "Encrypt Data" : "Encrypt File"}</>
                                    ) : (
                                        <><Unlock className="w-5 h-5" /> {inputType === "Text" ? "Decrypt Data" : "Decrypt File"}</>
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
                                    <span>{mode === "Encrypt" ? (inputType === "Text" ? "Encrypted Cipher Text" : "Encrypted File (.enc) Ready") : (inputType === "Text" ? "Decrypted Plain Text" : "Original File Ready")}</span>

                                    {output && (
                                        <div className="flex items-center gap-2 -mt-1 -mb-1">
                                            {inputType === "Text" && (
                                                <button
                                                    onClick={handleCopy}
                                                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 hover:bg-secondary rounded-lg flex items-center gap-1.5 text-xs font-semibold"
                                                >
                                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                    {copied ? "Copied" : "Copy"}
                                                </button>
                                            )}
                                            <button
                                                onClick={handleDownload}
                                                className={`p-1.5 transition-colors bg-secondary/50 hover:bg-secondary rounded-lg flex items-center gap-1.5 text-xs font-semibold ${mode === "Encrypt" ? "text-primary hover:text-primary" : "text-emerald-500 hover:text-emerald-500"}`}
                                                title="Download secure file"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                Download
                                            </button>
                                        </div>
                                    )}
                                </label>

                                <div className={`flex-1 w-full bg-background/80 border rounded-2xl p-5 text-sm leading-relaxed overflow-y-auto break-all transition-colors ${output ? (mode === "Encrypt" ? "border-primary/50 text-primary/90 shadow-[inset_0_0_20px_rgba(255,0,255,0.05)]" : "border-emerald-500/50 text-emerald-500/90 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]") : "border-border text-muted-foreground/30 flex items-center justify-center"}`}>
                                    {output ? (
                                        inputType === "Text" ? (
                                            <span className="font-mono">{output}</span>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full gap-4 py-8 animate-in zoom-in-95 duration-500">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-current blur-xl opacity-20 rounded-full"></div>
                                                    <div className={`p-5 rounded-full relative bg-background border-2 ${mode === "Encrypt" ? "border-primary" : "border-emerald-500"} shadow-xl`}>
                                                        <Check className="w-12 h-12" />
                                                    </div>
                                                </div>
                                                <div className="text-center font-sans">
                                                    <p className="font-bold text-foreground text-xl mb-1">{mode === "Encrypt" ? "Encryption Successful" : "Decryption Successful"}</p>
                                                    <p className="text-muted-foreground text-current/80 font-medium">Click Download above to save your file.</p>
                                                </div>
                                            </div>
                                        )
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
        </div>
    );
}
