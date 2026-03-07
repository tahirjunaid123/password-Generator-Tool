import { Check, Shield, Zap, Lock } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-20 pb-32">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                    Simple, transparent pricing
                </h1>
                <p className="text-xl text-muted-foreground">
                    Choose the plan that's right for you. Upgrade to Pro for advanced security features.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Tier */}
                <div className="relative p-8 rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm flex flex-col transition-all hover:border-primary/20">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Basic</h2>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-extrabold">$0</span>
                            <span className="text-muted-foreground">/forever</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Perfect for individuals who need quick, secure passwords on the go.
                        </p>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {[
                            "Unlimited password generation",
                            "Basic strength analysis",
                            "Customizable length & characters",
                            "No account required",
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-primary shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/"
                        className="w-full py-3 px-4 rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-center font-medium"
                    >
                        Generate Now
                    </Link>
                </div>

                {/* Pro Tier */}
                <div className="relative p-8 rounded-3xl border border-primary bg-primary/5 backdrop-blur-sm flex flex-col overflow-hidden shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-bl-xl">
                        Most Popular
                    </div>

                    <div className="mb-8 mt-2">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            Pro <Zap className="w-5 h-5 text-primary fill-primary" />
                        </h2>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-extrabold">$2.99</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            For security-conscious users who need advanced AI analysis and syncing.
                        </p>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {[
                            "Everything in Basic",
                            "Advanced AI Strength Analysis",
                            "Dark Web Monitoring alerts",
                            "Password History & Cloud Sync",
                            "Bulk Generation & Export",
                            "Priority Support",
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                                <Check className="w-5 h-5 text-primary shrink-0" />
                                <span className={i === 0 ? "font-medium" : ""}>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/signup?plan=pro"
                        className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-center font-medium shadow-lg hover:shadow-primary/25"
                    >
                        Upgrade to Pro
                    </Link>
                </div>
            </div>

            <div className="mt-20 max-w-3xl mx-auto text-center">
                <Shield className="w-12 h-12 text-primary/50 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Bank-level Security</h3>
                <p className="text-muted-foreground">
                    All generated passwords are created locally in your browser. We never store or transmit your unencrypted passwords. Pro users enjoy end-to-end encrypted syncing.
                </p>
            </div>
        </div>
    );
}
