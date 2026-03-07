import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react"; // Fallback if image fails

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-md">
                            <Image src="/logo.png" alt="Passify Logo" fill className="object-cover" />
                        </div>
                        <span className="font-bold text-xl inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                            Passify
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                        <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                        <Link href="/tools" className="transition-colors hover:text-primary">Tools</Link>
                        <Link href="/pricing" className="transition-colors hover:text-primary">Pricing</Link>
                        <Link href="/blog" className="transition-colors hover:text-primary">Blog</Link>
                        <Link href="/about" className="transition-colors hover:text-primary">About</Link>
                        <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                    </nav>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary hidden md:inline-flex">
                        Login
                    </Link>
                    <Link href="/signup" className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                        Sign Up Pro
                    </Link>
                </div>
            </div>
        </header>
    );
};
