import { PassphraseGenerator } from "@/components/features/PassphraseGenerator";

export default function PassphrasePage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center">
            <div className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-4">
                    Secure Passphrase Generator
                </h1>
                <p className="text-muted-foreground">
                    Passphrases are often more secure and easier to remember than standard complex passwords. Create multiple random words combined securely entirely in your browser.
                </p>
            </div>

            <div className="w-full">
                <PassphraseGenerator />
            </div>

            {/* Educational Content Section */}
            <div className="mt-24 w-full max-w-4xl space-y-12 text-left">
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-foreground">Why Are Passphrases the New Gold Standard?</h2>
                    <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/50 to-blue-500/50">
                        <div className="bg-card p-8 rounded-xl space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                For years, we were told that a strong password had to look like a chaotic mess of characters—something like <code className="bg-secondary px-2 py-1 rounded text-primary">T7!q$9z#Kp2</code>. While that might fool a human, to a modern computer running a brute-force attack, it&apos;s just another short string to guess.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Enter the <strong className="text-foreground">Passphrase</strong>. A passphrase is a sequence of random, unrelated words—like <code className="bg-secondary px-2 py-1 rounded text-primary">battery-horse-staple-correct</code>.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                The math behind it is simple but devastating to hackers: <strong>length beats complexity</strong>. Because each word is pulled from a massive dictionary of thousands of words, adding just one more word increases the total possible combinations exponentially. A 5-word passphrase can literally take billions of years to crack, while a complex 8-character password can be broken in mere hours.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-secondary/30 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-bold mb-3 flex items-center"><span className="text-primary mr-2">✓</span> Easier for Humans</h3>
                        <p className="text-muted-foreground">The human brain is wired for language and stories, not abstract symbols. Remembering &quot;purple dinosaur dancing slowly&quot; is significantly easier than remembering a random string of 15 symbols, letters, and numbers.</p>
                    </div>

                    <div className="bg-secondary/30 p-6 rounded-xl border border-blue-500/20">
                        <h3 className="text-xl font-bold mb-3 flex items-center"><span className="text-blue-400 mr-2">✓</span> Harder for Machines</h3>
                        <p className="text-muted-foreground">Machines excel at cycling through every single character combination on a keyboard. But when faced with sentences made of distinct words, the &quot;entropy&quot; (randomness) skyrockets beyond their computing capacity.</p>
                    </div>
                </div>

                <section className="bg-background border border-border/50 p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mt-24 -mr-24 pointer-events-none"></div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">Best Practices for Your New Passphrase</h2>
                    <ul className="space-y-4 text-muted-foreground relative z-10 list-disc list-inside">
                        <li><strong>Use at least 4 words:</strong> Anything less defeats the mathematical advantage of the system.</li>
                        <li><strong>Avoid common phrases:</strong> &quot;To be or not to be&quot; is a phrase, but it is not <i>random</i>. A passphrase must be made of completely unrelated words.</li>
                        <li><strong>Let a generator do it:</strong> Humans are terrible at choosing true randomness. Always use a secure generator like the one above to pick the words for you.</li>
                        <li><strong>Add numbers and symbols:</strong> Even with a strong 5-word passphrase, some legacy websites still mandate a symbol or a number. Use the options above to seamlessly integrate them.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
