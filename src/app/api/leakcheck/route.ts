import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://leakcheck.io/api/public?check=${encodeURIComponent(email)}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Passify-Security-App'
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: `API responded with status ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("LeakCheck Proxy Error:", error);
        return NextResponse.json({ error: 'Failed to fetch breach data' }, { status: 500 });
    }
}
