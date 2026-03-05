export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] max-w-4xl">
            <h1 className="text-4xl font-bold text-primary mb-8">About Passify</h1>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                    Passify was built with a single mission: to provide the fastest, most secure password generation and management tools available on the web without compromising privacy.
                </p>
                <p>
                    Unlike traditional password tools that process your data on a server, <strong className="text-foreground">every single operation in Passify happens directly in your browser</strong>. By leveraging the Web Crypto API&apos;s `crypto.getRandomValues()`, we ensure that your generated passwords are mathematically secure and truly random.
                </p>
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Technology</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Next.js 14 App Router</strong> for blazing fast Edge delivery.</li>
                    <li><strong>Client-Side Encryption</strong> enforcing a zero-knowledge architecture.</li>
                    <li><strong>Zustand</strong> for lightning-fast memory state management.</li>
                </ul>
            </div>
        </div>
    );
}
