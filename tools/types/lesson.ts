/**
 * Lesson content types and interfaces
 */

export type ContentType = 
  | 'section'
  | 'text'
  | 'list'
  | 'heading'
  | 'code'
  | 'callout'
  | 'image'
  | 'table';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'danger' | 'note';

export type HeadingVariant = 'do' | 'dont' | 'default';

export interface LessonMeta {
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  prerequisites?: string[];
  tags: string[];
  author: string;
  lastUpdated: string; // ISO date string
}

// Base interface for all content items
interface BaseContentItem {
  id: string;
  type: ContentType;
}

// Specific content item types
export interface SectionContent extends BaseContentItem {
  type: 'section';
  title: string;
}

export interface TextContent extends BaseContentItem {
  type: 'text';
  text: string;
}

export interface ListContent extends BaseContentItem {
  type: 'list';
  items: string[];
  listType?: 'ordered' | 'unordered';
}

export interface HeadingContent extends BaseContentItem {
  type: 'heading';
  text: string;
  variant?: HeadingVariant;
}

export interface CodeContent extends BaseContentItem {
  type: 'code';
  language: string;
  code: string;
  filename?: string;
  highlight?: number[]; // line numbers to highlight
}

export interface CalloutContent extends BaseContentItem {
  type: 'callout';
  text: string;
  variant?: CalloutVariant;
}

export interface ImageContent extends BaseContentItem {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface TableContent extends BaseContentItem {
  type: 'table';
  headers: string[];
  rows: string[][];
}

// Union type for all content items
export type ContentItem = 
  | SectionContent
  | TextContent
  | ListContent
  | HeadingContent
  | CodeContent
  | CalloutContent
  | ImageContent
  | TableContent;

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

export interface Quiz {
  id: string;
  title?: string;
  questions: QuizQuestion[];
}

// Main lesson interface
export interface Lesson {
  id: string;
  slug: string;
  version: string;
  title: string;
  description: string;
  meta: LessonMeta;
  content: ContentItem[];
  quiz?: Quiz;
}

// Legacy lesson format (for migration)
export interface LegacyLessonContent {
  type: string;
  content: string;
  items?: string[];
  variant?: string;
  listType?: string;
}

export interface LegacyLessonSection {
  title: string;
  content: LegacyLessonContent[];
}

export interface LegacyLesson {
  title: string;
  description?: string;
  sections: LegacyLessonSection[];
}
