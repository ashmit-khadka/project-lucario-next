import { writeFileSync } from 'fs';
import OpenAI from 'openai';
import https from 'https';
import http from 'http';
import type { LLMProvider } from '../types';

// ── Image style prompt prepended to every image generation request ──
const IMAGE_STYLE_PROMPT = `Create a horizontal hand-drawn illustration in a soft sketchbook style with a transparent background. The artwork should feel like a lightly painted pencil-and-ink concept sketch: loose hand-drawn outlines, slightly imperfect strokes, soft textured shading, and muted storybook colours. Do not use a monochrome palette. Use several different colours, but keep them all desaturated, earthy, and understated, such as dusty mustard, sage green, muted teal, faded terracotta, warm beige, soft brown, and smoky blue. Avoid bright or neon colours.

The illustration should be a rich, engaging scene or metaphorical visual that captures the core idea of the concept being taught. Think editorially: like a beautiful illustration you would find in a premium textbook, a New Yorker article, or a thoughtful blog post. Use visual metaphors, allegories, and storytelling rather than diagrams, flowcharts, or infographics. For example, if the concept is about fragile systems, show a delicate house of cards on a wobbly table; if it is about trust, show hands reaching across a gap. The image should make a reader pause and think.

The composition should be horizontal, balanced, and visually interesting with a clear focal point. Use depth, layering, and small narrative details to reward closer inspection. Include environmental context when it helps the metaphor — a workshop, a landscape, a room, objects on a desk — but keep the background transparent so the illustration floats cleanly on any page.

Visual style requirements: transparent background only, hand-drawn sketch style, pencil and ink outlines, soft watercolor or gouache-like fills, muted multicolour palette, slightly whimsical storybook feeling, subtle texture, light shading, rich detail and texture in the subjects themselves, no glossy rendering, no photorealism, no 3D, no corporate vector look, no sharp digital gradients, no poster design, no dark vignette, no box panels or UI cards, no heavy shadows, no polished template look.

Do NOT create infographics, flowcharts, diagrams, process arrows, labeled icon sequences, or any chart-like layout. This must be a scene-based illustration, not an information graphic.

Text treatment: no title, no subtitle, no paragraph text, no labels, no captions baked into the image. The illustration must stand entirely on its own visually.

Subject matter for this specific image: `;

function downloadFile(url: string, dest: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const file = require('fs').createWriteStream(dest);
        const get = url.startsWith('https') ? https.get : http.get;
        get(url, (response: any) => {
            if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                file.close();
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => { file.close(resolve); });
        }).on('error', (err: Error) => {
            file.close();
            reject(err);
        });
    });
}

export class OpenAIProvider implements LLMProvider {
    readonly name = 'GPT-5.2 (OpenAI)';
    private client: OpenAI;

    constructor(apiKey: string) {
        this.client = new OpenAI({ apiKey });
    }

    async generateLesson(systemPrompt: string, userPrompt: string): Promise<string> {
        const response = await this.client.responses.create({
            model: 'gpt-5.2',
            input: [
                { role: 'developer', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            max_output_tokens: 32000,
            reasoning: { effort: 'high' },
            text: { format: { type: 'json_object' } },
        });

        const raw = response.output_text;
        if (!raw) throw new Error('No content returned from OpenAI.');
        return raw;
    }

    async generateImage(prompt: string, destPath: string): Promise<string | null> {
        const fullPrompt = IMAGE_STYLE_PROMPT + prompt;

        const response = await this.client.images.generate({
            model: 'gpt-image-1.5',
            prompt: fullPrompt,
            n: 1,
            size: '1536x1024',
            quality: 'high',
            background: 'transparent',
            output_format: 'png',
        });

        const imageData = response.data?.[0];

        if (imageData?.b64_json) {
            const buffer = Buffer.from(imageData.b64_json, 'base64');
            writeFileSync(destPath, buffer);
            return destPath;
        }

        if (imageData?.url) {
            await downloadFile(imageData.url, destPath);
            return destPath;
        }

        return null;
    }
}
