"use client";

import { useState, useEffect } from "react";
import { analyzePassword, AnalysisResult } from "@/lib/passwordAnalyzer";
import { Shield, AlertTriangle, CheckCircle2, Eye, EyeOff, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export const PatternChecker = () => {
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResult>({
        score: 0,
        insights: [],
        suggestions: ["Enter a password to analyze."],
    });

    useEffect(() => {
        setAnalysis(analyzePassword(input));
    }, [input]);

    const getColor = (score: number) => {
        if (score < 40) return "bg-destructive shadow-[0_0_15px_rgba(255,0,0,0.5)]";
        if (score < 80) return "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
        return "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]";
    };

    const getTextColor = (score: number) => {
        if (score < 40) return "text-destructive";
        if (score < 80) return "text-yellow-500";
        return "text-green-500";
    };

    const getLabel = (score: number) => {
        if (score === 0 && !input) return "Waiting...";
        if (score < 40) return "Weak";
        if (score < 60) return "Fair";
        if (score < 80) return "Good";
        if (score < 100) return "Strong";
        return "Exceptional";
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8 rounded-2xl bg-card border border-border/50 shadow-2xl relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative z-10 space-y-8">
                <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">AI Pattern Checker</h2>
                </div>

                {/* Input Area */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type or paste a password here..."
                        className="w-full bg-background border border-border/60 rounded-xl p-6 pr-14 text-xl md:text-2xl font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-muted-foreground/50 shadow-inner"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-2"
                    >
                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                </div>

                {/* Score & Progress */}
                <div className="space-y-3 bg-secondary/10 p-6 rounded-xl border border-border/30">
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Security Score</span>
                            <div className={`text-3xl font-black ${input ? getTextColor(analysis.score) : "text-muted-foreground"}`}>
                                {input ? analysis.score : 0}<span className="text-lg opacity-50">/100</span>
                            </div>
                        </div>
                        <div className={`font-bold uppercase tracking-widest text-sm px-3 py-1 rounded-full border ${input
                            ? (analysis.score < 40 ? "border-destructive/50 text-destructive bg-destructive/10" :
                                analysis.score < 80 ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10" :
                                    "border-green-500/50 text-green-500 bg-green-500/10")
                            : "border-border text-muted-foreground bg-secondary/50"
                            }`}>
                            {getLabel(analysis.score)}
                        </div>
                    </div>

                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border/50">
                        <motion.div
                            className={`h-full rounded-full ${input ? getColor(analysis.score) : "bg-transparent"}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${input ? analysis.score : 0}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Insights & Suggestions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Insights Box */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Detected Patterns
                        </h3>
                        <div className="bg-background border border-border/40 rounded-xl p-4 min-h-[120px] shadow-inner space-y-3">
                            {analysis.insights.length > 0 ? (
                                analysis.insights.map((insight, i) => (
                                    <div key={i} className="flex items-start space-x-2 text-sm">
                                        {analysis.score === 100 ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                                        )}
                                        <span className={analysis.score === 100 ? "text-green-400" : "text-foreground"}>{insight}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground/50 text-sm italic">No patterns detected yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Suggestions Box */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Actionable Advice
                        </h3>
                        <div className="bg-background border border-border/40 rounded-xl p-4 min-h-[120px] shadow-inner space-y-3">
                            {analysis.suggestions.length > 0 ? (
                                analysis.suggestions.map((suggestion, i) => (
                                    <div key={i} className="flex items-start space-x-2 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                        <span className="text-muted-foreground">{suggestion}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground/50 text-sm italic">Waiting for input.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
