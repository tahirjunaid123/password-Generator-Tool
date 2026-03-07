"use client";

import { useState } from "react";
import { BrainCircuit, KeyRound, ShieldAlert, CheckCircle2, AlertTriangle, ChevronRight, Lock, Loader2, Sparkles, Cpu } from "lucide-react";

type AIResult = {
  password: string;
  score: number;
  strength: "Weak" | "Medium" | "Strong" | "Ultra Strong";
  summary: string;
  warnings: string[];
  suggestions: string[];
  bulkAlternatives: string[];
};

type Provider = "openai" | "gemini" | "huggingface";

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

export function AIAnalyzer() {
  const [activeProvider, setActiveProvider] = useState<Provider>("openai");
  const [passwordsInput, setPasswordsInput] = useState("");
  const [apiKeys, setApiKeys] = useState<Record<Provider, string>>({
    openai: "",
    gemini: "",
    huggingface: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AIResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const provider = PROVIDERS[activeProvider];

  const handleApiKeyChange = (val: string) => {
    setApiKeys(prev => ({ ...prev, [activeProvider]: val }));
  };

  const getSystemPrompt = () => {
    return `You are a strict, expert cybersecurity password analyzer. You must respond ONLY with valid JSON. Do not include markdown blocks like \`\`\`json. Return an object with a "results" array.`;
  };

  const getUserPrompt = (passwords: string[]) => {
    return `Analyze the following array of passwords: ${JSON.stringify(passwords)}

For each password, provide:
1. "password" (the exact string provided)
2. "score" (integer 0-100 indicating strength)
3. "strength" (string: exactly one of "Weak", "Medium", "Strong", or "Ultra Strong")
4. "summary" (A humanized, conversational 2-3 sentence explanation acting as a cybersecurity expert explaining why the password is good or bad and how it could be exploited.)
5. "warnings" (array of strings, e.g., patterns detected, common words, sequential characters)
6. "suggestions" (array of strings, actionable advice to fix the weaknesses)
7. "bulkAlternatives" (array of 5 generated highly-secure, completely different bulk alternative passwords that the user could use instead)

Return ONLY JSON in this exact format:
{
  "results": [
    {
      "password": "...",
      "score": 0,
      "strength": "...",
      "summary": "...",
      "warnings": ["..."],
      "suggestions": ["..."],
      "bulkAlternatives": ["...", "...", "...", "...", "..."]
    }
  ]
}`;
  };

  const cleanJsonResponse = (content: string) => {
    let clean = content.trim();
    // Remove markdown code block syntax if the AI returned it
    clean = clean.replace(/^```(json)?/im, "");
    clean = clean.replace(/```$/im, "");
    return clean.trim();
  };

  const fetchOpenAI = async (key: string, passwords: string[]) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: PROVIDERS.openai.modelName,
        messages: [
          { role: "system", content: getSystemPrompt() },
          { role: "user", content: getUserPrompt(passwords) }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || (response.status === 401 ? "Invalid API Key or unauthorized." : `API Error: ${response.status}`));
    }
    const data = await response.json();
    return cleanJsonResponse(data.choices[0].message.content.trim());
  };

  const fetchGemini = async (key: string, passwords: string[]) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDERS.gemini.modelName}:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${getSystemPrompt()}\n\n${getUserPrompt(passwords)}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        }
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || (response.status === 400 ? "Invalid API Key or Bad Request." : `API Error: ${response.status}`));
    }
    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response structure from Gemini API");
    }
    return cleanJsonResponse(data.candidates[0].content.parts[0].text.trim());
  };

  const fetchHuggingFace = async (key: string, passwords: string[]) => {
    // NOTE: Mixtral may struggle to output pure JSON without markdown, but we try standard prompt injection
    const prompt = `<s>[INST] ${getSystemPrompt()}\n\n${getUserPrompt(passwords)} [/INST]`;

    const response = await fetch(`https://api-inference.huggingface.co/models/${PROVIDERS.huggingface.modelName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          temperature: 0.1,
          max_new_tokens: 1000,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (errData?.error) throw new Error(`Hugging Face Error: ${errData.error}`);
      if (response.status === 401) throw new Error("Invalid Hugging Face Token");
      if (response.status === 503) throw new Error("Model is currently loading. Please try again in a few seconds.");
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return cleanJsonResponse(data[0].generated_text.trim());
  };


  const handleAnalyze = async () => {
    setError(null);
    setResults(null);

    const activeKey = apiKeys[activeProvider].trim();
    if (!activeKey) {
      setError(`Please enter your ${provider.name} API key.`);
      return;
    }

    const passwords = passwordsInput
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (passwords.length === 0) {
      setError("Please enter at least one password to analyze.");
      return;
    }

    if (passwords.length > 20) {
      setError("Please limit to a maximum of 20 passwords per batch.");
      return;
    }

    setIsAnalyzing(true);
    try {
      let jsonOutput = "";

      if (activeProvider === "openai") {
        jsonOutput = await fetchOpenAI(activeKey, passwords);
      } else if (activeProvider === "gemini") {
        jsonOutput = await fetchGemini(activeKey, passwords);
      } else if (activeProvider === "huggingface") {
        jsonOutput = await fetchHuggingFace(activeKey, passwords);
      }

      const parsed = JSON.parse(jsonOutput);

      if (!parsed.results || !Array.isArray(parsed.results)) {
        throw new Error("AI returned invalid data format.");
      }

      setResults(parsed.results);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Weak":
        return "text-destructive border-destructive/20 bg-destructive/10";
      case "Medium":
        return "text-yellow-500 border-yellow-500/20 bg-yellow-500/10";
      case "Strong":
        return "text-green-500 border-green-500/20 bg-green-500/10";
      case "Ultra Strong":
        return "text-purple-500 border-purple-500/20 bg-purple-500/10";
      default:
        return "text-muted-foreground border-border bg-secondary";
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return "bg-destructive";
    if (score < 70) return "bg-yellow-500";
    if (score < 90) return "bg-green-500";
    return "bg-purple-500";
  }

  // Dynamic Glow
  const glowColorMap: Record<Provider, string> = {
    openai: "bg-purple-500/10",
    gemini: "bg-blue-500/10",
    huggingface: "bg-yellow-500/10"
  };

  const borderFocusMap: Record<Provider, string> = {
    openai: "focus:ring-purple-500/50",
    gemini: "focus:ring-blue-500/50",
    huggingface: "focus:ring-yellow-500/50"
  };

  const iconColorMap: Record<Provider, string> = {
    openai: "text-purple-500",
    gemini: "text-blue-500",
    huggingface: "text-yellow-500"
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">

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

      <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-2xl space-y-6 relative overflow-hidden transition-all duration-700 hover:border-border/80 group">
        {/* Background dynamic glow */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 transition-colors duration-1000 ${glowColorMap[activeProvider]} opacity-40 group-hover:opacity-60`}></div>
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3 transition-colors duration-1000 ${glowColorMap[activeProvider]} opacity-30 group-hover:opacity-50`}></div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            Passwords to Analyze (One per line)
          </label>
          <textarea
            value={passwordsInput}
            onChange={(e) => setPasswordsInput(e.target.value)}
            placeholder="P@ssw0rd123&#10;admin2024&#10;correcthorsebatterystaple"
            className={`w-full h-32 bg-background border border-border/50 rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${borderFocusMap[activeProvider]} text-foreground resize-none font-mono transition-shadow`}
            disabled={isAnalyzing}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground flex justify-between items-center group">
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
          disabled={isAnalyzing || !passwordsInput.trim() || !apiKeys[activeProvider].trim()}
          className={`relative overflow-hidden w-full hover:opacity-100 text-primary-foreground font-extrabold text-lg rounded-2xl px-6 py-5 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-3 duration-500 cursor-pointer group/btn`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${provider.gradient} transition-all duration-700 opacity-90 group-hover/btn:opacity-100 group-hover/btn:scale-105`} />
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {provider.name} is Analyzing...
            </>
          ) : (
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover/btn:scale-125 transition-transform duration-500">{provider.icon}</span>
              Analyze Passwords with {provider.name}
            </span>
          )}
        </button>
      </div>

      {/* Results Section */}
      {results && results.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Analysis Results
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {results.map((res, idx) => (
              <div key={idx} className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 md:p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-secondary/20">
                  <div className="font-mono text-lg font-bold break-all">
                    {res.password}
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStrengthColor(res.strength)} whitespace-nowrap text-center`}>
                    {res.strength}
                  </div>
                </div>

                <div className="p-4 md:p-6 space-y-6">
                  {/* Humanized AI Summary */}
                  {res.summary && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
                      <div className="bg-primary/20 p-2 rounded-full mt-1 shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-1">AI Analysis</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{res.summary}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">AI Output Score</span>
                      <span className="font-bold">{res.score}/100</span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${getScoreColor(res.score)}`}
                        style={{ width: `${res.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {res.warnings && res.warnings.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold flex items-center gap-2 text-destructive">
                          <AlertTriangle className="w-4 h-4" /> Warnings
                        </h4>
                        <ul className="space-y-2">
                          {res.warnings.map((warn, wIdx) => (
                            <li key={wIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                              <span>{warn}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {res.suggestions && res.suggestions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold flex items-center gap-2 text-green-500">
                          <ShieldAlert className="w-4 h-4" /> Improvements
                        </h4>
                        <ul className="space-y-2">
                          {res.suggestions.map((sugg, sIdx) => (
                            <li key={sIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{sugg}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bulk Password Alternatives */}
                  {res.bulkAlternatives && res.bulkAlternatives.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <h4 className="text-sm font-bold flex items-center gap-2 text-primary mb-4">
                        <KeyRound className="w-4 h-4" /> Strong Bulk Alternatives
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {res.bulkAlternatives.map((alt, aIdx) => (
                          <div key={aIdx} className="flex items-center justify-between bg-secondary/30 border border-border/40 rounded-lg p-3 hover:bg-secondary/50 transition-colors group/alt">
                            <span className="font-mono text-sm break-all">{alt}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(alt)}
                              className="text-xs font-semibold px-2 py-1 rounded bg-background border border-border/50 opacity-0 group-hover/alt:opacity-100 transition-opacity whitespace-nowrap"
                            >
                              Copy
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
