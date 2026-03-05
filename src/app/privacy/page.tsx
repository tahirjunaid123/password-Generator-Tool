export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] max-w-3xl text-sm text-muted-foreground space-y-6">
            <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Local Processing First</h2>
                <p>Passify is designed around absolute privacy. Our core features—including the Password Generator and Strength Analyzer—operate entirely within your local browser. No passwords are transmitted to our servers during generation or analysis.</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Data Collection</h2>
                <p>We do not collect personal usage metrics without consent. For users utilizing the &quot;Secure Notes&quot; Pro feature, data is encrypted via Web Crypto API locally before being synced with our database infrastructure (managed by Supabase).</p>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Analytics and Advertising</h2>
                <p>We may use lightweight embedded advertisements (e.g., Google AdSense) on free tiers which may use cookies to serve personalized ads based on your browsing history.</p>
            </section>
        </div>
    );
}
