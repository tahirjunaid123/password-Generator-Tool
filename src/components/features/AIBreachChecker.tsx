"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronRight, Loader2, ShieldAlert, KeyRound, Mail, Globe, Database } from "lucide-react";

type BreachResult = {
    breachProbability: "Safe" | "Low" | "Medium" | "High" | "Critical";
    riskScore: number; // 0-100
    breachCount?: number; // For passwords and emails
    emailBreaches?: { name: string; date: string }[];
    targetInput: string;
    targetType: "Password" | "Email/Domain";
    summary: string;
    riskFactors: string[];
    recommendations: string[];
    knownIncidents?: string[];
};

type Provider = "openai" | "gemini" | "huggingface";
type TargetType = "Password" | "Email/Domain";

interface ProviderConfig {
    id: Provider;
    name: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    placeholder: string;
    description: string;
    modelName: string;
}

// --- Brand SVG Icons ---
const OpenAILogo = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.103 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805-4.7784 2.7582a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6115-1.4997z" />
    </svg>
);

const GeminiLogo = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <path d="M23.238 10.456a16.29 16.29 0 0 1-10.8-10.456 16.29 16.29 0 0 1-5.117 8.118A16.29 16.29 0 0 1 .536 10.456a16.29 16.29 0 0 1 10.8 10.457 16.29 16.29 0 0 1 5.378-8.324zM16.48 24a10 10 0 0 1-6.626-6.426A10 10 0 0 1 16.48 11.14a10 10 0 0 1 6.626 6.434A10 10 0 0 1 16.48 24z" />
    </svg>
);

const HuggingFaceLogo = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 9.05v-.1" /><path d="M16 9.05v-.1" /><path d="M16 14c-.5 1.5-1.79 3-4 3s-3.5-1.5-4-3" /><path d="M7 11c1.5 0 2.5-1 3-2" /><path d="M17 11c-1.5 0-2.5-1-3-2" />
    </svg>
);

const PROVIDERS: Record<Provider, ProviderConfig> = {
    openai: {
        id: "openai",
        name: "OpenAI",
        icon: <OpenAILogo className="w-6 h-6" />,
        color: "purple",
        gradient: "from-purple-500 via-indigo-500 to-purple-600",
        placeholder: "sk-...",
        description: "Uses gpt-4o-mini. Fast, accurate, and excellent at following strict JSON instructions.",
        modelName: "gpt-4o-mini"
    },
    gemini: {
        id: "gemini",
        name: "Google Gemini",
        icon: <GeminiLogo className="w-5 h-5 text-blue-500 drop-shadow-md" />,
        color: "blue",
        gradient: "from-blue-500 via-cyan-400 to-blue-600",
        placeholder: "AIzaSy...",
        description: "Uses gemini-2.5-flash. Deep context window and incredibly fast inference.",
        modelName: "gemini-2.5-flash"
    },
    huggingface: {
        id: "huggingface",
        name: "Hugging Face",
        icon: <HuggingFaceLogo className="w-6 h-6 text-yellow-500" />,
        color: "yellow",
        gradient: "from-yellow-400 via-orange-400 to-yellow-500",
        placeholder: "hf_...",
        description: "Uses open-source Mixtral models via Inference API. Free but may be rate-limited.",
        modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1"
    }
};

export function AIBreachChecker() {
    const [activeProvider, setActiveProvider] = useState<Provider>("openai");
    const [targetType, setTargetType] = useState<TargetType>("Password");
    const [apiKeys, setApiKeys] = useState<Record<Provider, string>>({
        openai: "",
        gemini: "",
        huggingface: ""
    });
    const [inputValue, setInputValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<BreachResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const provider = PROVIDERS[activeProvider];

    const handleApiKeyChange = (value: string) => {
        setApiKeys(prev => ({ ...prev, [activeProvider]: value }));
        if (error) setError(null);
    };

    const getPasswordSystemPrompt = () => {
        return `You are a Cybersecurity Threat Intelligence source. The user will provide a password length and the number of times it appeared in known data breaches.
Your goal is to assess its exposure risk and provide recommendations.
DO NOT use Markdown blocks. Return ONLY valid JSON in this exact structure:
{
  "breachProbability": "Safe" | "Low" | "Medium" | "High" | "Critical",
  "riskScore": 0, // Integer 0-100 where 100 means extreme critical risk and 0 means totally safe
  "summary": "A humanized, conversational 2-3 sentence explanation acting as an expert explaining the risk.",
  "knownIncidents": ["Detailed explanation of a genuine historical incident where a similar vulnerability was exploited"],
  "riskFactors": ["risk 1", "risk 2"],
  "recommendations": ["actionable suggestion 1", "actionable suggestion 2"]
}`;
    };

    const getEmailSystemPrompt = () => {
        return `You are a Cybersecurity Threat Intelligence source. The user will provide an email address, the number of database breaches it appeared in, and a list of specific company breaches it was part of.
Your goal is to assess its exposure risk based on this GENUINE data and provide recommendations.
DO NOT use Markdown blocks. Return ONLY valid JSON in this exact structure:
{
  "breachProbability": "Safe" | "Low" | "Medium" | "High" | "Critical",
  "riskScore": 0, // Integer 0-100 where 100 means extreme critical risk and 0 means totally safe
  "summary": "A humanized, conversational 2-3 sentence explanation acting as an expert explaining the risk of these specific breaches.",
  "riskFactors": ["risk 1", "risk 2"],
  "recommendations": ["actionable suggestion 1", "actionable suggestion 2"]
}`;
    };

    const getUserPrompt = (targetString: string, breachCount?: number, emailBreachDetails?: any[]) => {
        if (targetType === "Password") {
            return `Password Length: ${targetString.length} characters.
Breach Count: ${breachCount} times found in database.
Provide your JSON threat assessment.`;
        } else {
            return `Email Address: ${targetString}
Breach Count: ${breachCount} times found in known databases.
Specific Breaches: ${emailBreachDetails ? JSON.stringify(emailBreachDetails) : "None"}
Provide your JSON threat assessment for this exact email.`;
        }
    };

    // Utility to hash password securely for API
    const sha1 = async (str: string) => {
        const buffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    };

    // 1. OpenAI Fetcher
    const fetchOpenAI = async (apiKey: string, promptInfo: { system: string, user: string }): Promise<string> => {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: provider.modelName,
                messages: [
                    { role: "system", content: promptInfo.system },
                    { role: "user", content: promptInfo.user }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        if (!res.ok) {
            if (res.status === 401) throw new Error("Invalid OpenAI API Key.");
            if (res.status === 429) throw new Error("OpenAI Rate limit exceeded.");
            throw new Error("OpenAI API error.");
        }
        const data = await res.json();
        return data.choices[0].message.content;
    };

    // 2. Gemini Fetcher
    const fetchGemini = async (apiKey: string, promptInfo: { system: string, user: string }): Promise<string> => {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${provider.modelName}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: promptInfo.system }]
                },
                contents: [{
                    parts: [{ text: promptInfo.user }]
                }],
                generationConfig: {
                    temperature: 0.1,
                    responseMimeType: "application/json",
                }
            })
        });

        if (!res.ok) {
            if (res.status === 400) throw new Error("Invalid formulation or Gemini API Key.");
            throw new Error("Gemini API error.");
        }

        const data = await res.json();
        if (!data.candidates || data.candidates.length === 0) throw new Error("No response from Gemini.");
        return data.candidates[0].content.parts[0].text;
    };

    // 3. Hugging Face Fetcher
    const fetchHuggingFace = async (apiKey: string, promptInfo: { system: string, user: string }): Promise<string> => {
        const hfPrompt = `[INST] ${promptInfo.system}\n\n${promptInfo.user} [/INST]`;

        const res = await fetch(`https://api-inference.huggingface.co/models/${provider.modelName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputs: hfPrompt,
                parameters: {
                    temperature: 0.1,
                    max_new_tokens: 1000,
                    return_full_text: false
                }
            })
        });

        if (!res.ok) {
            if (res.status === 401) throw new Error("Invalid Hugging Face API Key.");
            if (res.status === 429) throw new Error("Hugging Face API Rate Limit.");
            if (res.status === 503) throw new Error("Hugging Face model is currently loading. Wait a few seconds.");
            throw new Error("Hugging Face API error.");
        }

        const data = await res.json();
        return data[0].generated_text;
    };

    const handleAnalyze = async () => {
        try {
            setError(null);
            setResult(null);

            const activeKey = apiKeys[activeProvider].trim();
            if (!activeKey) {
                setError(`Please enter your ${provider.name} API key.`);
                return;
            }

            const target = inputValue.trim();
            if (!target) {
                setError(`Please enter a target to check.`);
                return;
            }

            setIsAnalyzing(true);

            let breachCountVal = 0;
            let emailBreachesVal: { name: string; date: string }[] = [];
            let promptInfo = { system: "", user: "" };

            // Passwords use HIBP + Hash setup
            if (targetType === "Password") {
                const hash = await sha1(target);
                const prefix = hash.substring(0, 5);
                const suffix = hash.substring(5);

                const hibpRes = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
                if (!hibpRes.ok) throw new Error("Failed to contact HaveIBeenPwned API.");

                const hibpText = await hibpRes.text();
                const lines = hibpText.split('\n');
                for (const line of lines) {
                    const [lineSuffix, lineCount] = line.split(':');
                    if (lineSuffix.trim() === suffix) {
                        breachCountVal = parseInt(lineCount.trim(), 10);
                        break;
                    }
                }

                promptInfo = {
                    system: getPasswordSystemPrompt(),
                    user: getUserPrompt(target, breachCountVal)
                };
            }
            // Emails use the secure Next.js API Proxy to avoid CORS errors
            else {
                const leakRes = await fetch(`/api/leakcheck?email=${encodeURIComponent(target)}`);
                if (!leakRes.ok) throw new Error("Failed to contact secure email breach proxy.");
                const leakData = await leakRes.json();

                if (leakData && leakData.success && leakData.found > 0 && Array.isArray(leakData.sources)) {
                    breachCountVal = leakData.found;
                    emailBreachesVal = leakData.sources.map((s: any) => ({ name: s.name, date: s.date }));
                }

                promptInfo = {
                    system: getEmailSystemPrompt(),
                    user: getUserPrompt(target, breachCountVal, emailBreachesVal)
                };
            }

            // Execute AI
            let outputText = "";
            if (activeProvider === 'openai') {
                outputText = await fetchOpenAI(activeKey, promptInfo);
            } else if (activeProvider === 'gemini') {
                outputText = await fetchGemini(activeKey, promptInfo);
            } else if (activeProvider === 'huggingface') {
                outputText = await fetchHuggingFace(activeKey, promptInfo);
            }

            // Parse JSON Output
            let cleanJson = outputText.trim();
            if (cleanJson.startsWith("```json")) {
                cleanJson = cleanJson.substring(7);
                if (cleanJson.endsWith("```")) cleanJson = cleanJson.substring(0, cleanJson.length - 3);
            } else if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.substring(3);
                if (cleanJson.endsWith("```")) cleanJson = cleanJson.substring(0, cleanJson.length - 3);
            }

            const parsed = JSON.parse(cleanJson);

            if (!parsed.breachProbability || typeof parsed.riskScore !== "number" || !Array.isArray(parsed.riskFactors) || !parsed.summary) {
                throw new Error("Invalid AI Response format. Missing required summary, risk score, or risk factors.");
            }

            setResult({
                ...parsed,
                targetInput: target,
                targetType,
                breachCount: breachCountVal,
                ...(targetType === "Email/Domain" ? { emailBreaches: emailBreachesVal } : {})
            });

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred during analysis.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const borderFocusMap: Record<Provider, string> = {
        openai: "focus:border-purple-500 focus:ring-purple-500/20",
        gemini: "focus:border-blue-500 focus:ring-blue-500/20",
        huggingface: "focus:border-yellow-500 focus:ring-yellow-500/20"
    };

    const glowColorMap: Record<Provider, string> = {
        openai: "bg-purple-500/10",
        gemini: "bg-blue-500/10",
        huggingface: "bg-yellow-500/10"
    };

    const iconColorMap: Record<Provider, string> = {
        openai: "text-purple-500",
        gemini: "text-blue-500",
        huggingface: "text-yellow-500"
    };

    const getProbabilityColor = (prob: string) => {
        switch (prob) {
            case "Safe": return "text-green-500 border-green-500/30 bg-green-500/10";
            case "Low": return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
            case "Medium": return "text-orange-400 border-orange-400/30 bg-orange-400/10";
            case "High": return "text-orange-600 border-orange-600/30 bg-orange-600/10";
            case "Critical": return "text-destructive border-destructive/30 bg-destructive/10";
            default: return "border-border";
        }
    };

    const getScoreColorFill = (score: number) => {
        if (score < 20) return "bg-green-500";
        if (score < 40) return "bg-yellow-500";
        if (score < 70) return "bg-orange-500";
        return "bg-destructive";
    };

    return (
        <div className="space-y-8 w-full max-w-4xl mx-auto">

            {/* Input Type Selector Toggles */}
            <div className="flex p-1 bg-secondary rounded-2xl mx-auto max-w-md border border-border">
                <button
                    onClick={() => { setTargetType("Password"); setInputValue(""); setResult(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${targetType === "Password" ? "bg-card text-foreground shadow-md border border-border" : "text-muted-foreground hover:bg-card/50"
                        }`}
                >
                    <KeyRound className="w-4 h-4" /> Password
                </button>
                <button
                    onClick={() => { setTargetType("Email/Domain"); setInputValue(""); setResult(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${targetType === "Email/Domain" ? "bg-card text-foreground shadow-md border border-border" : "text-muted-foreground hover:bg-card/50"
                        }`}
                >
                    <Globe className="w-4 h-4" /> Email/Domain
                </button>
            </div>

            {/* Premium Provider Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mx-auto">
                {(Object.keys(PROVIDERS) as Provider[]).map((p) => {
                    const isActive = activeProvider === p;
                    return (
                        <button
                            key={p}
                            onClick={() => {
                                setActiveProvider(p);
                                setError(null);
                            }}
                            className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden ${isActive
                                ? `bg-secondary text-foreground shadow-lg border-2 ${borderFocusMap[p]}`
                                : 'bg-card text-muted-foreground border-2 border-transparent hover:border-border hover:bg-secondary/40 shadow-sm'
                                }`}
                        >
                            {isActive && (
                                <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${PROVIDERS[p].gradient}`} />
                            )}
                            <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 ' + iconColorMap[p] : 'scale-100 grayscale opacity-70'}`}>
                                {PROVIDERS[p].icon}
                            </span>
                            <span className="relative z-10">{PROVIDERS[p].name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="bg-card/80 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-border shadow-2xl space-y-6 relative overflow-hidden transition-all duration-700 hover:border-border/80 group">
                {/* Background dynamic glow */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 transition-colors duration-1000 ${glowColorMap[activeProvider]} opacity-40 group-hover:opacity-60`}></div>
                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3 transition-colors duration-1000 ${glowColorMap[activeProvider]} opacity-30 group-hover:opacity-50`}></div>

                {/* Input Target Rendering Based on Type */}
                <div className="space-y-4">
                    {targetType === "Password" ? (
                        <>
                            <label className="block text-sm font-medium text-foreground flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <KeyRound className="w-4 h-4 text-primary" />
                                    Password to Check
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter password..."
                                className={`w-full bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${borderFocusMap[activeProvider]} text-foreground font-mono transition-shadow`}
                                disabled={isAnalyzing}
                            />
                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                                <ShieldAlert className="w-3 h-3 text-green-500 shrink-0" />
                                Securely hashed in-browser via SHA-1. Only 5 characters are sent to the HaveIBeenPwned API (K-Anonymity model). Complete password never leaves your browser.
                            </p>
                        </>
                    ) : (
                        <>
                            <label className="block text-sm font-medium text-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email Address
                            </label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="e.g., test@gmail.com..."
                                className={`w-full bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${borderFocusMap[activeProvider]} text-foreground font-mono transition-shadow`}
                                disabled={isAnalyzing}
                            />
                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2 leading-relaxed">
                                <Database className="w-4 h-4 text-blue-500 shrink-0" />
                                Queries live, authentic data breach databases to find exactly how many times this email was compromised, then uses AI to provide expert remediation advice.
                            </p>
                        </>
                    )}
                </div>

                {/* API Key Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground flex justify-between items-center group/label">
                        <div className="flex items-center gap-2">
                            <KeyRound className={`w-4 h-4 ${iconColorMap[activeProvider]} transition-colors duration-500`} />
                            <span>{provider.name} API Key</span>
                        </div>
                    </label>
                    <input
                        type="password"
                        value={apiKeys[activeProvider]}
                        onChange={(e) => handleApiKeyChange(e.target.value)}
                        placeholder={provider.placeholder}
                        className={`w-full bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${borderFocusMap[activeProvider]} text-foreground font-mono transition-shadow`}
                        disabled={isAnalyzing}
                    />
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                        <div className="mt-0.5">{provider.icon}</div>
                        <p>
                            {provider.description} Your key is never stored and only sent directly to {provider.name}&apos;s API.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 text-destructive text-sm animate-in fade-in slide-in-from-top-2">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputValue.trim() || !apiKeys[activeProvider].trim()}
                    className={`relative overflow-hidden w-full hover:opacity-100 text-primary-foreground font-extrabold text-lg rounded-2xl px-6 py-5 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-3 duration-500 cursor-pointer group/btn`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r ${provider.gradient} transition-all duration-700 opacity-90 group-hover/btn:opacity-100 group-hover/btn:scale-105`} />
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                            <span className="relative z-10">{provider.name} is Analyzing...</span>
                        </>
                    ) : (
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="group-hover/btn:scale-125 transition-transform duration-500">{provider.icon}</span>
                            Analyze Threat Intelligence via {provider.name}
                        </span>
                    )}
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        Threat Intelligence Report
                    </h3>

                    <div className="bg-card/90 backdrop-blur-2xl border border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-4 md:p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/20">
                            <div className="font-mono text-lg font-bold flex items-center gap-2 break-all">
                                <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
                                {result.targetType === "Password" && !showPassword ? "••••••••••••" : result.targetInput}
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getProbabilityColor(result.breachProbability)} shadow-sm whitespace-nowrap text-center`}>
                                Exposure Level: {result.breachProbability}
                            </div>
                        </div>

                        <div className="p-4 md:p-8 space-y-8">
                            {/* Numerical Risk Score Bar */}
                            <div className="bg-secondary/40 border border-border/50 rounded-2xl p-5">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Risk Score</h4>
                                        <div className="text-3xl font-black">{result.riskScore}<span className="text-muted-foreground text-lg font-bold">/100</span></div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold text-muted-foreground">0 = Safe | 100 = Critical</span>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out ${getScoreColorFill(result.riskScore)}`}
                                        style={{ width: `${result.riskScore}%` }}
                                    />
                                </div>
                            </div>

                            {/* Humanized AI Summary */}
                            {result.summary && (
                                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start">
                                    <div className="bg-primary/20 p-2.5 rounded-full mt-0.5 shrink-0 shadow-sm border border-primary/30">
                                        <AlertTriangle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                                            Expert Analysis
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
                                    </div>
                                </div>
                            )}

                            {/* Specifics for Passwords (HIBP Context) */}
                            {result.targetType === "Password" && (
                                <div className="space-y-4">
                                    <h4 className={`text-lg font-bold flex items-center gap-2 ${result.breachCount! > 0 ? 'text-destructive' : 'text-green-500'}`}>
                                        {result.breachCount! > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                                        HaveIBeenPwned Database
                                    </h4>
                                    <div className={`${result.breachCount! > 0 ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-green-500/10 border-green-500/20 text-green-500'} border rounded-xl p-4 text-[15px] font-medium`}>
                                        {result.breachCount! > 0 ? (
                                            <>This password has been seen <strong className="text-xl mx-1">{result.breachCount!.toLocaleString()}</strong> times in previous data breaches. You should never use it.</>
                                        ) : (
                                            <>Good news! This password was not found in any known public data breaches.</>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Specifics for Emails (LeakCheck Context) */}
                            {result.targetType === "Email/Domain" && (
                                <div className="space-y-4">
                                    <h4 className={`text-lg font-bold flex items-center gap-2 ${result.breachCount! > 0 ? 'text-destructive' : 'text-green-500'}`}>
                                        {result.breachCount! > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                                        Live Email Breach Database
                                    </h4>

                                    <div className={`${result.breachCount! > 0 ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-green-500/10 border-green-500/20 text-green-500'} border rounded-xl p-4 text-[15px] font-medium`}>
                                        {result.breachCount! > 0 ? (
                                            <>This email address was found in <strong className="text-xl mx-1">{result.breachCount!.toLocaleString()}</strong> known data breaches.</>
                                        ) : (
                                            <>Excellent! This email address was not found in any known public data breaches.</>
                                        )}
                                    </div>

                                    {result.emailBreaches && result.emailBreaches.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                            {result.emailBreaches.map((breach, i) => (
                                                <div key={i} className="flex justify-between items-center bg-secondary/30 border border-border/50 rounded-lg p-3">
                                                    <span className="font-bold text-sm truncate" title={breach.name}>{breach.name}</span>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{breach.date || "Unknown"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Risk Factors */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Risk Factors</h4>
                                    <ul className="space-y-3">
                                        {result.riskFactors.map((risk, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-secondary/30 p-3 rounded-lg border border-border/50">
                                                <span className="mt-0.5 text-orange-500 shrink-0">
                                                    <ShieldAlert className="w-4 h-4" />
                                                </span>
                                                <span className="text-sm">{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommendations */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Security Recommendations</h4>
                                    <ul className="space-y-3">
                                        {result.recommendations.map((rec, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-secondary/30 p-3 rounded-lg border border-border/50">
                                                <span className="mt-0.5 text-green-500 shrink-0">
                                                    <ChevronRight className="w-4 h-4" />
                                                </span>
                                                <span className="text-sm">{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
