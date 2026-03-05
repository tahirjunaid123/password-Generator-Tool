export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh] max-w-2xl">
            <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>
            <p className="text-muted-foreground mb-8">
                Have questions about our security, feature requests, or enterprise support? Reach out below.
            </p>

            <form className="space-y-6 bg-secondary/20 p-8 rounded-xl border border-border">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input type="text" className="w-full bg-background border border-border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" className="w-full bg-background border border-border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea className="w-full bg-background border border-border rounded-md p-2 h-32 focus:ring-2 focus:ring-primary focus:outline-none resize-none" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-md hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                    Send Message
                </button>
            </form>
        </div>
    );
}
