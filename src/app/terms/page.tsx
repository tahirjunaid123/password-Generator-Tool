export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] max-w-3xl text-sm text-muted-foreground space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p>By accessing and using Passify, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Limitation of Liability</h2>
                <p>Passify provides robust password generation facilities operating locally within your browser. However, we cannot be held liable for any damages, breaches, or losses of data that occur on your personal device or through external compromises.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Modifications</h2>
                <p>We reserve the right to modify these terms at any time. Your continued use of the secure tool suite constitutes your agreement to such modifications.</p>
            </section>
        </div>
    );
}
