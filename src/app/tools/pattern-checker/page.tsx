import { PatternChecker } from "@/components/features/PatternChecker";
import { Brain, Crosshair, Eye } from "lucide-react";
export default function PatternCheckerPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center">
            <div className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    AI Pattern Checker
                </h1>
                <p className="text-muted-foreground">
                    Instantly detect weak keyboard layouts, dates, sequences, and compromised patterns within your passwords. All analysis happens securely in your browser—nothing is ever sent to a server.
                </p>
            </div>

            <div className="w-full">
                <PatternChecker />
            </div>

            {/* Educational Content Section */}
            <div className="mt-24 w-full max-w-4xl space-y-12 text-left">
                <section>
                    <h2 className="text-3xl font-extrabold mb-8 text-foreground tracking-tight text-center md:text-left">
                        Why You <span className="text-blue-500">Need</span> a Pattern Checker
                    </h2>
                    <div className="bg-card p-8 md:p-10 rounded-3xl border border-blue-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] space-y-10 relative overflow-hidden">
                        {/* Background glow decoration */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-primary">
                                <span className="bg-primary/10 p-2.5 rounded-xl border border-primary/20"><Brain className="w-6 h-6" /></span>
                                1. The Human Flaw: Predictability
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Humans are remarkably predictable creatures. When asked to create a &quot;complex&quot; password, we subconsciously lean toward patterns that make physical keyboard typing easier (like <code className="bg-secondary/80 px-2 py-1 rounded text-primary font-mono text-sm border border-border/50 shadow-sm">qweasd</code> or <code className="bg-secondary/80 px-2 py-1 rounded text-primary font-mono text-sm border border-border/50 shadow-sm">123456</code>), or we use dates and names that hold personal significance. We think we are being clever, but hackers know exactly how we think.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-destructive">
                                <span className="bg-destructive/10 p-2.5 rounded-xl border border-destructive/20"><Crosshair className="w-6 h-6 text-destructive" /></span>
                                2. How Hackers Exploit Sequences
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Modern cyber attacks don&apos;t just guess random characters. They use powerful hardware and massive dictionaries designed to detect keyboard walks, ascending numbers, and repeated letters instantaneously. A password like <code className="bg-secondary/80 px-2 py-1 rounded text-destructive font-mono text-sm border border-destructive/30 shadow-sm">Password2024!</code> might meet a website&apos;s length criteria, but it holds zero true security. A dictionary attack will crack it in milliseconds.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-green-500">
                                <span className="bg-green-500/10 p-2.5 rounded-xl border border-green-500/20"><Eye className="w-6 h-6 text-green-500" /></span>
                                3. Uncover Your Blind Spots
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                A Pattern Checker acts as a mirror for your cybersecurity. By instantly analyzing your passwords <strong>locally in your browser</strong>, it detects the hidden sequences and layout patterns that make your credentials vulnerable. It doesn&apos;t just grade your password; it gives you the exact insights you need to eliminate predictability and craft a defense that is mathematically unbreakable.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
