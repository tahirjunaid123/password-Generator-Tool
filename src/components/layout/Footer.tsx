import Link from "next/link";
import { Shield } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-border/40 bg-background pt-8 pb-4">
            <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center space-y-4">
                <div className="flex space-x-6 text-sm font-medium text-muted-foreground">
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <p className="text-xs text-muted-foreground max-w-md text-center bg-secondary/30 p-2 rounded-md border border-border/50">
                        <strong className="text-primary font-bold">Disclaimer:</strong> Passwords are generated locally on your device for complete privacy. Passify does not send or store any plain-text passwords remotely.
                    </p>
                </div>

                <div className="flex items-center justify-center pt-4 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 mr-1 text-primary/70" />
                    <span>© {new Date().getFullYear()} Passify. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};
