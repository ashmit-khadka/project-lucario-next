/**
 * Course structure types and interfaces
 */

import type { DifficultyLevel, UUID } from './lesson';

export type { UUID };

// ── DB Documents ──────────────────────────────────────────────

export interface CourseMeta {
  difficulty: DifficultyLevel;
  icon?: string;
  author?: string;
  tags?: string[];
}

export interface CourseStats {
  totalChapters: number;
  totalLessons: number;
  totalDuration: number; // minutes
}

export interface Course {
  _id: UUID;
  slug: string;
  version: string;
  title: string;
  description: string;
  meta: CourseMeta;
  chapterIds: UUID[];
  stats: CourseStats;
}

// ── Input / Generation Config ─────────────────────────────────

export interface LessonInput {
  name: string;        // kebab-case slug
  title: string;
  description: string;
  topics: string[];
  difficulty?: DifficultyLevel;
}

export interface ChapterInput {
  name: string;        // kebab-case slug
  title: string;
  description: string;
  lessons: LessonInput[];
}

export interface CourseInput {
  name: string;        // kebab-case slug
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  icon?: string;
  author?: string;
  tags?: string[];
  chapters: ChapterInput[];
}

// ── Generation Result ─────────────────────────────────────────

export interface GenerationResult {
  course: Course;
  lessonFiles: string[];
  success: boolean;
  errors?: string[];
}
