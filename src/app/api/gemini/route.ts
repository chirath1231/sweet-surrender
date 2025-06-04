import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cart } = body;
        const NEXT_PUBLIC_GEMINI_API_KEY="AIzaSyBEOYHqHQkpFtx5Nqs1P9ZFsJxtKvoXWtQ"
        const apiKey = NEXT_PUBLIC_GEMINI_API_KEY;

        const geminiRes = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{
                        text: `Recommend 3 bakery products based on this cart: ${JSON.stringify(cart)}. Return a valid JSON array with fields: id, name, price, image, category, stock.`,
                    }]
                }]
            }
        );

        return NextResponse.json(geminiRes.data);
    } catch (err: any) {
        console.error("Gemini API error:", err?.response?.data || err.message);
        return NextResponse.json({ error: 'Gemini API call failed' }, { status: 500 });
    }
}
