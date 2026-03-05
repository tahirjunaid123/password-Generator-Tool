export default function ToolsPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-8">
                Security Tools
            </h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">
                Explore our suite of advanced security tools designed to keep your digital life safe.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Passphrase Generator Tool */}
                <a href="/tools/passphrase" className="p-6 rounded-xl border border-primary/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-primary group-hover:underline">Passphrase Generator</h2>
                    <p className="text-sm text-muted-foreground">Generate memorable but highly secure multi-word passphrases.</p>
                </a>
                <a href="/tools/pattern-checker" className="p-6 rounded-xl border border-blue-500/20 bg-card hover:bg-secondary/40 transition-colors cursor-pointer block group">
                    <h2 className="text-xl font-semibold mb-2 text-blue-400 group-hover:underline">Pattern Checker</h2>
                    <p className="text-sm text-muted-foreground">Analyze your passwords for common, easily hackable patterns with AI.</p>
                </a>
                <div className="p-6 rounded-xl border border-primary/20 bg-card hover:bg-secondary/40 transition-colors">
                    <h2 className="text-xl font-semibold mb-2 text-destructive">Breach Checker</h2>
                    <p className="text-sm text-muted-foreground">Check if your email or passwords have appeared in public data breaches.</p>
                </div>
            </div>
        </div>
    );
}
