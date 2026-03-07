"use client";

import Link from "next/link";
import { Lock, Mail, User, Phone, Globe } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { countriesInfo } from "@/lib/countries";
import { SearchableSelect } from "@/components/ui/searchable-select";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const isPro = searchParams.get("plan") === "pro";
    const [isLoading, setIsLoading] = useState(false);

    // Select values State
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedPhonePrefix, setSelectedPhonePrefix] = useState("+1");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {isPro ? "Create your Pro account" : "Create an account"}
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your details below to get started
                    </p>
                </div>

                <div className="p-8 rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm py-10 shadow-xl relative overflow-hidden">
                    {/* Decorative blurred background */}
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob md:animation-delay-2000" />

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                                Full Name <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="name"
                                    type="text"
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="country">
                                Country
                            </label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <SearchableSelect
                                    options={countriesInfo.map(c => ({
                                        value: c.code,
                                        label: `${c.flag} ${c.name}`,
                                        searchLabel: c.name,
                                        flag: c.flag
                                    }))}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    placeholder="Select country"
                                    className="h-11 border-input bg-background/50 pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="phone">
                                Phone Number
                            </label>
                            <div className="flex gap-2">
                                <SearchableSelect
                                    options={countriesInfo.map(c => ({
                                        value: c.prefix,
                                        label: `${c.flag} ${c.prefix}`,
                                        searchLabel: c.name,
                                        flag: c.flag
                                    }))}
                                    value={selectedPhonePrefix}
                                    onChange={setSelectedPhonePrefix}
                                    className="w-[110px] h-11 border-input bg-background/50"
                                />
                                <div className="relative flex-1">
                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <input
                                        id="phone"
                                        type="tel"
                                        className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                        placeholder="(555) 000-0000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">
                                Password <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {isPro && (
                                <p className="text-xs text-primary/80 mt-2 font-medium">
                                    Include uppercase, lowercase, numbers, and symbols for a stronger Pro vault.
                                </p>
                            )}
                        </div>

                        <div className="flex items-start space-x-2 pt-1 pb-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-input bg-background/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                                I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-11 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isPro
                                ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:opacity-90"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                                }`}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                isPro ? "Sign Up for Pro" : "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-muted/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-2 text-muted-foreground font-medium">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setIsLoading(true);
                                setTimeout(() => setIsLoading(false), 1500);
                            }}
                            disabled={isLoading}
                            className="w-full mt-6 h-11 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
                        >
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
