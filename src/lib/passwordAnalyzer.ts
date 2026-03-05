export interface AnalysisResult {
    score: number;
    insights: string[];
    suggestions: string[];
}

export function analyzePassword(password: string): AnalysisResult {
    if (!password) {
        return { score: 0, insights: [], suggestions: ["Enter a password to analyze."] };
    }

    let score = 100;
    const insights: string[] = [];
    const suggestions: string[] = [];

    // Length check
    if (password.length < 8) {
        score -= 40;
        insights.push("Password is too short.");
        suggestions.push("Increase length to at least 12 characters.");
    } else if (password.length < 12) {
        score -= 20;
        suggestions.push("Aim for 12+ characters for better security.");
    }

    // Common passwords check
    const top100Common = ["123456", "password", "12345678", "qwerty", "12345", "123456789", "iloveyou", "111111", "123123", "admin", "welcome"];
    const lowerPass = password.toLowerCase();

    if (top100Common.some(p => lowerPass.includes(p))) {
        score -= 60;
        insights.push("Detected extremely common password patterns.");
        suggestions.push("Avoid the most common breached passwords.");
    }

    // Repeated characters (e.g., aaa, 111)
    if (/(.)\1{2,}/.test(password)) {
        score -= 20;
        insights.push("Detected repeated characters (e.g., 'aaa').");
        suggestions.push("Avoid repeating the same character.");
    }

    // Sequential characters (e.g., 1234, abcd)
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/i.test(password)) {
        score -= 20;
        insights.push("Detected ascending sequences (e.g., '123' or 'abc').");
        suggestions.push("Avoid obvious sequential patterns.");
    }
    if (/(cba|dcb|edc|fed|gfe|hgf|ihg|jih|kji|lkj|mlk|nml|onm|pon|qpo|rqp|srq|tsr|uts|vut|wvu|xwv|yxw|zyx|321|432|543|654|765|876|987|098)/i.test(password)) {
        score -= 20;
        insights.push("Detected descending sequences (e.g., '321' or 'cba').");
        suggestions.push("Avoid obvious sequential patterns.");
    }

    // Keyboard patterns (e.g., qwerty, asdf)
    if (/(qwe|wer|ert|rty|tyu|yui|uio|iop|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vnm)/i.test(password)) {
        score -= 20;
        insights.push("Detected physical keyboard walk patterns (e.g., 'qwe' or 'asd').");
        suggestions.push("Avoid picking keys strictly based on physical layout.");
    }

    // Date/Year patterns (19xx, 20xx)
    if (/(19[0-9]{2}|20[0-2][0-9])/.test(password)) {
        score -= 15;
        insights.push("Detected a likely year pattern (e.g., 1999, 2024).");
        suggestions.push("Avoid using potentially identifiable years.");
    }

    // Character Variety Check
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const typesCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

    if (typesCount <= 2 && password.length < 15) {
        score -= 15;
        if (!hasSymbol) suggestions.push("Add symbols (e.g., @, #, $).");
        if (!hasNumber) suggestions.push("Add numbers.");
        if (!hasUpper) suggestions.push("Add uppercase letters.");
    }

    // Bound Score
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Fallbacks
    if (insights.length === 0 && score > 80) {
        insights.push("No common heuristic patterns detected. Looks secure.");
    }
    if (score < 50 && suggestions.length === 0) {
        suggestions.push("Consider using a completely randomly generated passphrase.");
    } else if (suggestions.length === 0) {
        suggestions.push("Keep it secure, avoid reusing it elsewhere.");
    }

    // Deduplicate strings just in case
    const uniqueInsights = Array.from(new Set(insights));
    const uniqueSuggestions = Array.from(new Set(suggestions));

    return {
        score,
        insights: uniqueInsights,
        suggestions: uniqueSuggestions
    };
}
