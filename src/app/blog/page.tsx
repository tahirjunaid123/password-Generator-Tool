export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-4xl font-bold text-primary mb-8">Passify Blog</h1>
            <p className="text-muted-foreground mb-12">
                Latest news on cybersecurity, privacy, and development.
            </p>
            <div className="space-y-8">
                <article className="p-6 border border-border/50 rounded-lg max-w-3xl">
                    <h2 className="text-2xl font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">Why Client-Side Generation Matters</h2>
                    <p className="text-sm text-muted-foreground mb-4">Published: 2026-03-01</p>
                    <p className="text-foreground">Learn the technical architecture behind Passify&apos;s local-first secure generation engine and why you should never trust server-side password generation.</p>
                </article>
            </div>
        </div>
    );
}
