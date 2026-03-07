import { AIAnalyzer } from "@/components/features/AIAnalyzer";
import { Brain, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
    title: "AI Password Analyzer | Passify",
    description: "Leverage the power of AI to analyze your passwords for vulnerabilities, predictability, and patterns locally in your browser.",
};

export default function AIAnalyzerPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center">
            <div className="text-center mb-12 max-w-3xl">
                <div className="inline-flex py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 items-center gap-2 shadow-sm">
                    <Zap className="w-4 h-4" />
                    <span>Powered by OpenAI, Gemini & Hugging Face</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-primary mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    Multi-Provider AI Analyzer
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Provide your own API key to have advanced LLMs analyze your passwords. Choose between OpenAI&apos;s GPT-4, Google Gemini, or Open-Source Hugging Face models to detect human predictability, sequences, dates, and common weaknesses.
                    <br /><br />
                    <strong>Privacy First:</strong> Your API key and passwords are never tracked or saved by Passify. They are sent directly from your browser to your chosen AI provider.
                </p>
            </div>

            <div className="w-full max-w-4xl">
                <AIAnalyzer />
            </div>

            {/* Educational Content Section */}
            <div className="mt-24 w-full max-w-4xl space-y-12 text-left">
                <section>
                    <h2 className="text-3xl font-extrabold mb-8 text-foreground tracking-tight text-center md:text-left">
                        How AI <span className="text-purple-500">Revolutionizes</span> Password Security
                    </h2>
                    <div className="bg-card p-8 md:p-10 rounded-3xl border border-purple-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] space-y-10 relative overflow-hidden">
                        {/* Background glow decoration */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-purple-500">
                                <span className="bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20"><Brain className="w-6 h-6" /></span>
                                Contextual Analysis
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Traditional password strength meters rely solely on length and character sets (e.g., checking for uppercase, lowercase, numbers). AI goes deeper. It understands context, meaning it knows that <code className="bg-secondary/80 px-2 py-1 rounded text-purple-400 font-mono text-sm border border-border/50 shadow-sm">P@ssw0rd2024!</code> is a terrible password even though it contains every character type, because it leverages predictable substitutions and a recent year.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-primary">
                                <span className="bg-primary/10 p-2.5 rounded-xl border border-primary/20"><ShieldCheck className="w-6 h-6" /></span>
                                Deep Pattern Inference
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Using vast datasets of known breached passwords, large language models can spot obscure patterns. They recognize dates of birth, common dictionary sequences, pop-culture references, and non-obvious keyboard layout walks that static mathematical models easily miss.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
