import { AIBreachChecker } from "@/components/features/AIBreachChecker";
import { Database } from "lucide-react";

export const metadata = {
    title: "AI Breach Checker | Passify",
    description: "Check if your email or passwords have appeared in public data breaches using advanced AI threat intelligence.",
};

export default function BreachCheckerPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-destructive/10 rounded-2xl mb-4 sm:mb-6 shadow-sm border border-destructive/20 relative group">
                    <div className="absolute inset-0 bg-destructive/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <Database className="w-8 h-8 sm:w-12 sm:h-12 text-destructive relative z-10" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-destructive to-red-600 drop-shadow-sm">
                    AI Breach Checker
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-medium px-4">
                    Scan historical data logs through our multi-provider intelligence models. <br className="hidden sm:block" /> No inputs are saved to our servers.
                </p>
            </div>

            <AIBreachChecker />
        </div>
    );
}
