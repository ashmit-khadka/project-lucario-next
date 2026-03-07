/**
 * Course structure types and interfaces
 */

import type { DifficultyLevel } from './lesson';

// Lesson metadata (lightweight reference)
export interface LessonReference {
  id: string;
  slug: string;
  title: string;
  chapterId: string;
  order: number;
  duration: number;
  difficulty: DifficultyLevel;
}

// Chapter structure
export interface Chapter {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessonIds: string[]; // References to lesson IDs
}

// Full course structure
export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: DifficultyLevel;
  icon?: string;
  totalLessons: number;
  totalDuration: number; // Total minutes
  chapters: Chapter[];
  lessons: LessonReference[]; // Flat list for quick lookup
}

// ============================================================
// INPUT CONFIGURATION (JSON format for course generation)
// ============================================================

/**
 * Course input configuration - JSON structure
 */
export interface CourseInput {
  course: CourseInfo;
  content: ContentItem[];
}

/**
 * Course metadata
 */
export interface CourseInfo {
  name: string;           // Unique identifier (kebab-case): "full-stack-foundations"
  title: string;          // Display name: "Full-Stack Foundations"
  description: string;    // Course description (required)
  difficulty: DifficultyLevel;
  icon?: string;          // Optional icon path
  author?: string;        // Course author
  version?: string;       // Course version (e.g., "1.0.0")
}

/**
 * Base interface for all content items
 */
interface BaseContentItem {
  type: 'chapter' | 'lesson';
  name: string;           // Unique identifier (kebab-case)
  title: string;          // Display title
  description: string;    // Description (required for all content)
}

/**
 * Chapter/Sub-chapter - container for other content
 */
export interface ChapterItem extends BaseContentItem {
  type: 'chapter';
  content: ContentItem[]; // Nested chapters or lessons
}

/**
 * Lesson - individual learning unit
 */
export interface LessonItem extends BaseContentItem {
  type: 'lesson';
  topics: string[];       // Topics to cover (required)
  difficulty?: DifficultyLevel; // Optional override of course difficulty
}

/**
 * Union type for all content items
 */
export type ContentItem = ChapterItem | LessonItem;

// ============================================================
// LEGACY INTERFACES (deprecated)
// ============================================================

/**
 * @deprecated Use CourseInput instead
 */
export interface CourseConfig {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  icon?: string;
  chapters: ChapterConfig[];
}

/**
 * @deprecated Use ChapterItem instead
 */
export interface ChapterConfig {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: LessonConfig[];
}

/**
 * @deprecated Use LessonItem instead
 */
export interface LessonConfig {
  title: string;
  topics: string[];
  duration?: number;
}

// Generation result
export interface GenerationResult {
  course: Course;
  lessonFiles: string[]; // Paths to generated lesson files
  success: boolean;
  errors?: string[];
}
