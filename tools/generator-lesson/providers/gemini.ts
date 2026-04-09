import { GoogleGenAI } from '@google/genai';
import type { LLMProvider } from '../types';

export class GeminiProvider implements LLMProvider {
    readonly name = 'Gemini 2.5 Pro (Google)';
    private client: GoogleGenAI;

    constructor(apiKey: string) {
        this.client = new GoogleGenAI({ apiKey });
    }

    async generateLesson(systemPrompt: string, userPrompt: string): Promise<string> {
        const response = await this.client.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: [
                { role: 'user', parts: [{ text: userPrompt }] },
            ],
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: 'application/json',
                thinkingConfig: { thinkingBudget: 8000 },
            },
        });

        const raw = response.text;
        if (!raw) throw new Error('No content returned from Gemini.');
        return raw;
    }

    async generateImage(_prompt: string, _destPath: string): Promise<string | null> {
        // Gemini 2.5 Pro does not support image generation — return null so the
        // orchestrator can skip the image generation step gracefully.
        console.log('   ⚠  Gemini provider does not support image generation — skipping.');
        return null;
    }
}
