import { GoogleGenAI } from '@google/genai';
import { Agent, setGlobalDispatcher } from 'undici';
import type { LLMProvider } from './types';

// Set global fetch timeout to 10 minutes to prevent HeadersTimeoutError on massive prompts
setGlobalDispatcher(new Agent({ headersTimeout: 600000 }));

export class GeminiProvider implements LLMProvider {
    readonly name = 'Gemini 2.5 Flash (Google)';
    private client: GoogleGenAI;

    constructor(apiKey: string) {
        this.client = new GoogleGenAI({ 
            apiKey,
            httpOptions: { timeout: 600000 } // 10 minutes timeout for large manifests
        });
    }

    async generateLesson(systemPrompt: string, userPrompt: string): Promise<string> {
        const responseStream = await this.client.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: userPrompt }] },
            ],
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: 'application/json',
                maxOutputTokens: 65536,
            },
        });

        let raw = '';
        process.stdout.write('\n'); // Start streaming on a new line
        for await (const chunk of responseStream) {
            if (chunk.text) {
                raw += chunk.text;
                process.stdout.write(chunk.text);
            }
        }
        process.stdout.write('\n');

        if (!raw) throw new Error('No content returned from Gemini.');
        return raw;
    }

    async generateImage(_prompt: string, _destPath: string): Promise<string | null> {
        console.log('   ⚠  Gemini provider does not support image generation — skipping.');
        return null;
    }
}
