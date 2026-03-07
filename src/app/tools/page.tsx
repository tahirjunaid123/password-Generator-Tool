import Link from "next/link";

export default function ToolsPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-8">
                Security Tools
            </h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
                Explore our suite of advanced security tools designed to keep your digital life safe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/tools/ai-analyzer" className="p-6 rounded-xl border border-purple-500/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-purple-500 group-hover:underline">AI Analyzer</h2>
                    <p className="text-sm text-muted-foreground">Bring your own API key to let Open-Source or Premium AIs analyze password strengths deeply.</p>
                </Link>

                <Link href="/tools/passphrase" className="p-6 rounded-xl border border-primary/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-primary group-hover:underline">Passphrase Generator</h2>
                    <p className="text-sm text-muted-foreground">Generate memorable but highly secure multi-word passphrases.</p>
                </Link>

                <Link href="/tools/encryption" className="p-6 rounded-xl border border-emerald-500/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-emerald-500 group-hover:underline">Encryption Studio</h2>
                    <p className="text-sm text-muted-foreground">Encrypt and decrypt sensitive text using 4 different military-grade algorithms.</p>
                </Link>

                <Link href="/tools/breach-checker" className="p-6 rounded-xl border border-destructive/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-destructive group-hover:underline">Breach Checker</h2>
                    <p className="text-sm text-muted-foreground">Check if your email or passwords have appeared in public data breaches.</p>
                </Link>
            </div>
        </div>
    );
}
