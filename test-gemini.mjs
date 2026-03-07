const apiKey = "AIzaSyAxMk1gujdcQK9_KjzeDXfG33ku3dKGmok";

async function runTest() {
    try {
        const testModel = "gemini-2.5-flash";

        console.log(`Testing ${testModel}...`);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent?key=${apiKey}`;
        const genRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Respond ONLY with the JSON: { \"success\": true }" }] }],
                generationConfig: {
                    temperature: 0.1,
                    responseMimeType: "application/json",
                }
            })
        });

        console.log("Status:", genRes.status);
        const data = await genRes.json();
        console.log("Output:", data.candidates[0].content.parts[0].text);
    } catch (e) {
        console.error(e);
    }
}
runTest();
