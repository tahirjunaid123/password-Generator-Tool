"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, Zap, Clock } from "lucide-react";
import { usePasswordStore } from "@/store/usePasswordStore";
import { analyzePasswordStrength, StrengthAnalysis } from "@/lib/analyze";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const StrengthAnalyzer = () => {
    const { password } = usePasswordStore();
    const [analysis, setAnalysis] = useState<StrengthAnalysis | null>(null);

    useEffect(() => {
        if (password) {
            setAnalysis(analyzePasswordStrength(password));
        } else {
            setAnalysis(null);
        }
    }, [password]);

    if (!analysis) return null;

    const isStrong = analysis.score > 70;

    return (
        <Card className="w-full max-w-lg mx-auto border-secondary dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-background/90 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    {isStrong ? (
                        <ShieldCheck className="text-green-400 h-6 w-6 shadow-[0_0_10px_rgba(34,197,94,0.5)] rounded-full" />
                    ) : (
                        <ShieldAlert className="text-orange-400 h-6 w-6 shadow-[0_0_10px_rgba(249,115,22,0.5)] rounded-full" />
                    )}
                    Advanced Analysis (Pro)
                </CardTitle>
                <CardDescription>Real-time entropy and vulnerability scanning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/40 p-3 rounded-lg border border-border flex flex-col items-center justify-center text-center">
                        <Zap className="h-5 w-5 text-yellow-400 mb-1" />
                        <span className="text-xs text-muted-foreground">Entropy</span>
                        <span className="text-lg font-bold">{Math.round(analysis.entropy)} bits</span>
                    </div>
                    <div className="bg-secondary/40 p-3 rounded-lg border border-border flex flex-col items-center justify-center text-center">
                        <Clock className="h-5 w-5 text-blue-400 mb-1" />
                        <span className="text-xs text-muted-foreground">Est. Time to Crack</span>
                        <span className="text-lg font-bold">{analysis.timeToCrack}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Security Score</h4>
                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${isStrong ? 'bg-green-500' : 'bg-orange-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.score}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {analysis.feedback.warning && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 bg-destructive/20 border border-destructive/50 text-destructive-foreground rounded-md text-sm"
                        >
                            <strong>Warning:</strong> {analysis.feedback.warning}
                        </motion.div>
                    )}
                </AnimatePresence>

                {analysis.feedback.suggestions.length > 0 && (
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Suggestions</p>
                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            {analysis.feedback.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="text-[0.8rem]">{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
