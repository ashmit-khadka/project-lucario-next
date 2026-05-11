// ── Shared LLM provider interface ──

export interface LessonContext {
    course: string;
    module: string;
    chapter: string;
    lesson: string;
    objectives: string[];
}

/**
 * Dependency-injection contract that every LLM provider must satisfy.
 */
export interface LLMProvider {
    /** Human-readable name shown in console output */
    name: string;

    /**
     * Call the LLM and return the raw JSON string for a lesson.
     */
    generateLesson(systemPrompt: string, userPrompt: string): Promise<string>;

    /**
     * Generate an image and write it to destPath.
     * Return null if the provider does not support image generation.
     */
    generateImage(prompt: string, destPath: string): Promise<string | null>;
}
