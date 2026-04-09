// ── Shared types for the lesson generator ──

export interface LessonContext {
    course: string;
    module: string;
    chapter: string;
    lesson: string;
    objectives: string[];
}

/**
 * Dependency-injection contract that every LLM provider must satisfy.
 * The orchestrator (generateLesson.ts) calls these methods and never
 * imports an SDK directly.
 */
export interface LLMProvider {
    /** Human-readable name shown in console output, e.g. "GPT-5.2" or "Gemini 2.5 Pro" */
    name: string;

    /**
     * Call the LLM and return the raw JSON string for a lesson.
     * @param systemPrompt  The developer / system instruction prompt
     * @param userPrompt    The per-lesson user turn
     */
    generateLesson(systemPrompt: string, userPrompt: string): Promise<string>;

    /**
     * Generate an image and return its local public path (e.g. /images/lessons/…).
     * Return null if the provider does not support image generation.
     */
    generateImage(prompt: string, destPath: string): Promise<string | null>;
}
