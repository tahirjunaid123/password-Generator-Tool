"use client";

import { PasswordGenerator } from "@/components/features/PasswordGenerator";
import { StrengthAnalyzer } from "@/components/features/StrengthAnalyzer";
import { Shield, Key, Database, BrainCircuit, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center justify-start overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      {/* Background neon grid effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ff00ff22_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ff00ff11_100%)]"></div>

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center text-center pt-24 pb-16 px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
            AI-Powered Password & <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]">
              Security Suite
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Create strong passwords, analyze their strength, detect breaches, generate passphrases, and encrypt your data.
          </p>
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-center items-stretch w-full max-w-7xl mx-auto">
            <button
              onClick={scrollToGenerator}
              className="text-sm font-bold bg-primary text-primary-foreground py-3 px-3 rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,255,0.5)] w-full flex items-center justify-center gap-2 h-full min-h-[56px]"
            >
              <Shield className="w-5 h-5 shrink-0" />
              <span className="text-center leading-tight">Generate Password</span>
            </button>
            <Link
              href="/tools/encryption"
              className="text-sm font-bold bg-emerald-600 text-white py-3 px-3 rounded-xl hover:bg-emerald-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] w-full flex items-center justify-center gap-2 h-full min-h-[56px]"
            >
              <Lock className="w-5 h-5 shrink-0" />
              <span className="text-center leading-tight">Encryption Studio</span>
            </Link>
            <Link
              href="/tools/ai-analyzer"
              className="text-sm font-bold bg-purple-600 text-white py-3 px-3 rounded-xl hover:bg-purple-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] w-full flex items-center justify-center gap-2 h-full min-h-[56px]"
            >
              <BrainCircuit className="w-5 h-5 shrink-0" />
              <span className="text-center leading-tight">AI Analyzer</span>
            </Link>
            <Link
              href="/tools/passphrase"
              className="text-sm font-bold bg-secondary text-foreground py-3 px-3 rounded-xl hover:bg-secondary/80 hover:scale-105 transition-all shadow-sm w-full flex items-center justify-center gap-2 h-full min-h-[56px]"
            >
              <Key className="w-5 h-5 shrink-0" />
              <span className="text-center leading-tight">Passphrase Generator</span>
            </Link>
            <Link
              href="/tools/breach-checker"
              className="text-sm font-bold bg-destructive text-destructive-foreground py-3 px-3 rounded-xl hover:bg-destructive/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] w-full flex items-center justify-center gap-2 h-full min-h-[56px]"
            >
              <Database className="w-5 h-5 shrink-0" />
              <span className="text-center leading-tight">Breach Checker</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AD PLACEMENT PLACEHOLDER (Top) */}
      <div className="w-full max-w-4xl mx-auto h-24 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground mb-16 shadow-sm">
        <span className="text-sm border border-dashed border-muted-foreground/30 p-2 rounded">Ad Placement Slot</span>
      </div>

      {/* TOOLS SECTION */}
      <section id="generator" className="w-full max-w-7xl mx-auto space-y-12 px-4 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
          {/* Main Password Generator */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-8">
            <PasswordGenerator />
          </div>

          {/* Pro Tools */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            <StrengthAnalyzer />
          </div>
        </div>
      </section>

      {/* MORE TOOLS GRID */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">More Security Tools</h2>
          <p className="text-muted-foreground">Everything you need to stay safe online.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/tools/passphrase" className="group p-6 rounded-2xl border border-blue-500/20 bg-card/80 backdrop-blur-md hover:bg-secondary/60 transition-all hover:-translate-y-1 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <Key className="h-10 w-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Passphrase Generator</h3>
            <p className="text-sm text-muted-foreground">Generate memorable multiple-word passphrases instead of random characters.</p>
          </Link>

          <Link href="/tools/encryption" className="group p-6 rounded-2xl border border-emerald-500/20 bg-card/80 backdrop-blur-md hover:bg-secondary/60 transition-all hover:-translate-y-1 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <Lock className="h-10 w-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Encryption Studio</h3>
            <p className="text-sm text-muted-foreground">Encrypt and decrypt sensitive text using 4 different military-grade algorithms.</p>
          </Link>

          <Link href="/tools/ai-analyzer" className="group p-6 rounded-2xl border border-purple-500/20 bg-card/80 backdrop-blur-md hover:bg-secondary/60 transition-all hover:-translate-y-1 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <BrainCircuit className="h-10 w-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">AI Analyzer</h3>
            <p className="text-sm text-muted-foreground">Bring your own API key to let OpenAI analyze password strengths deeply.</p>
          </Link>

          <Link href="/tools/breach-checker" className="group p-6 rounded-2xl border border-destructive/20 bg-card/80 backdrop-blur-md hover:bg-secondary/60 transition-all hover:-translate-y-1 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <Database className="h-10 w-10 text-destructive mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Breach Checker</h3>
            <p className="text-sm text-muted-foreground">Cross-reference your email against the latest database breaches to ensure safety.</p>
          </Link>
        </div>
      </section>

      {/* USER REVIEWS SECTION */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Worldwide</h2>
          <p className="text-muted-foreground text-lg">Join thousands of users generating secure passwords every day.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Review 1 */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] min-w-[300px] flex-grow md:flex-grow-0 bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative hover:-translate-y-1 transition-transform group">
            <div className="absolute top-4 right-4 overflow-hidden rounded-sm border border-border/50 shadow-sm" title="United States">
              <Image src="https://flagcdn.com/w40/us.png" alt="USA Flag" width={24} height={18} className="block object-contain" />
            </div>
            <div className="flex text-yellow-500 mb-4 text-lg">
              ★★★★★
            </div>
            <p className="text-muted-foreground mb-6 italic">&quot;The AI Analyzer is a literal life saver. It didn&apos;t just tell me my password was weak, it explained why and gave me bulk alternatives that I actually use now.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <Image src="/avatars/sarah.jpg" alt="Sarah J." fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground cursor-default relative h-5 flex items-center group/name overflow-visible" title="Sarah Jenkins">
                  <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:-translate-y-2">Sarah J.</span>
                  <span className="absolute left-0 opacity-0 transition-all duration-300 translate-y-2 group-hover/name:opacity-100 group-hover/name:translate-y-0 text-primary whitespace-nowrap">Sarah Jenkins</span>
                </div>
                <div className="text-xs text-muted-foreground">Cybersecurity Analyst • USA</div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] min-w-[300px] flex-grow md:flex-grow-0 bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative hover:-translate-y-1 transition-transform group">
            <div className="absolute top-4 right-4 overflow-hidden rounded-sm border border-border/50 shadow-sm" title="Germany">
              <Image src="https://flagcdn.com/w40/de.png" alt="Germany Flag" width={24} height={18} className="block object-contain" />
            </div>
            <div className="flex text-yellow-500 mb-4 text-lg">
              ★★★★★
            </div>
            <p className="text-muted-foreground mb-6 italic">&quot;I love that everything happens locally in the browser. Knowing my passwords never touch a server gives me total peace of mind.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/20">
                <Image src="/avatars/markus.jpg" alt="Markus T." fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground cursor-default relative h-5 flex items-center group/name overflow-visible" title="Markus Thierbach">
                  <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:-translate-y-2">Markus T.</span>
                  <span className="absolute left-0 opacity-0 transition-all duration-300 translate-y-2 group-hover/name:opacity-100 group-hover/name:translate-y-0 text-blue-400 whitespace-nowrap">Markus Thierbach</span>
                </div>
                <div className="text-xs text-muted-foreground">Software Engineer • Germany</div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] min-w-[300px] flex-grow md:flex-grow-0 bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative hover:-translate-y-1 transition-transform group">
            <div className="absolute top-4 right-4 overflow-hidden rounded-sm border border-border/50 shadow-sm" title="Canada">
              <Image src="https://flagcdn.com/w40/ca.png" alt="Canada Flag" width={24} height={18} className="block object-contain" />
            </div>
            <div className="flex text-yellow-500 mb-4 text-lg">
              ★★★★★
            </div>
            <p className="text-muted-foreground mb-6 italic">&quot;The Passphrase Generator is phenomenal. It creates phrases that are actually memorable but mathematically impossible to guess.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/20">
                <Image src="/avatars/emily.jpg" alt="Emily R." fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground cursor-default relative h-5 flex items-center group/name overflow-visible" title="Emily Richardson">
                  <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:-translate-y-2">Emily R.</span>
                  <span className="absolute left-0 opacity-0 transition-all duration-300 translate-y-2 group-hover/name:opacity-100 group-hover/name:translate-y-0 text-purple-400 whitespace-nowrap">Emily Richardson</span>
                </div>
                <div className="text-xs text-muted-foreground">Writer • Canada</div>
              </div>
            </div>
          </div>

          {/* Review 4 */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] min-w-[300px] flex-grow md:flex-grow-0 bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative hover:-translate-y-1 transition-transform group">
            <div className="absolute top-4 right-4 overflow-hidden rounded-sm border border-border/50 shadow-sm" title="United Kingdom">
              <Image src="https://flagcdn.com/w40/gb.png" alt="UK Flag" width={24} height={18} className="block object-contain" />
            </div>
            <div className="flex text-yellow-500 mb-4 text-lg">
              ★★★★★
            </div>
            <p className="text-muted-foreground mb-6 italic">&quot;Clean design, lightning fast, and no dark patterns. This is exactly what a modern security tool should look and feel like.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-destructive/20">
                <Image src="/avatars/james.jpg" alt="James W." fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground cursor-default relative h-5 flex items-center group/name overflow-visible" title="James Worthington">
                  <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:-translate-y-2">James W.</span>
                  <span className="absolute left-0 opacity-0 transition-all duration-300 translate-y-2 group-hover/name:opacity-100 group-hover/name:translate-y-0 text-destructive whitespace-nowrap">James Worthington</span>
                </div>
                <div className="text-xs text-muted-foreground">IT Consultant • UK</div>
              </div>
            </div>
          </div>

          {/* Review 5 - Warda Amjad */}
          <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] min-w-[300px] flex-grow md:flex-grow-0 bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative hover:-translate-y-1 transition-transform group">
            <div className="absolute top-4 right-4 overflow-hidden rounded-sm border border-border/50 shadow-sm" title="Pakistan">
              <Image src="https://flagcdn.com/w40/pk.png" alt="Pakistan Flag" width={24} height={18} className="block object-contain" />
            </div>
            <div className="flex text-yellow-500 mb-4 text-lg">
              ★★★★★
            </div>
            <p className="text-muted-foreground mb-6 italic">&quot;The AI Breach Checker is incredibly trustworthy! It gives exact historical breach records and real risk scores. I feel so much safer knowing my accounts are protected by such an advanced tool.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500/20">
                <Image src="/avatars/warda.jpg" alt="Warda A." fill className="object-cover" />
              </div>
              <div>
                <div className="font-semibold text-foreground cursor-default relative h-5 flex items-center group/name overflow-visible" title="Warda Amjad">
                  <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:-translate-y-2">Warda A.</span>
                  <span className="absolute left-0 opacity-0 transition-all duration-300 translate-y-2 group-hover/name:opacity-100 group-hover/name:translate-y-0 text-emerald-500 whitespace-nowrap">Warda Amjad</span>
                </div>
                <div className="text-xs text-muted-foreground">Cybersecurity Enthusiast • Pakistan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD PLACEMENT PLACEHOLDER (Bottom) */}
      <div className="w-full max-w-4xl mx-auto h-24 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground mb-16 shadow-sm">
        <span className="text-sm border border-dashed border-muted-foreground/30 p-2 rounded">Ad Placement Slot</span>
      </div>

    </div>
  );
}
