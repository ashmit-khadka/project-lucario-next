/**
 * Chapter structure types and interfaces
 */

import type { UUID } from './lesson';

// ── DB Document ───────────────────────────────────────────────

export interface Chapter {
  _id: UUID;
  slug: string;
  title: string;
  description?: string;
  order: number;
  courseId: UUID;
  lessonIds: UUID[];
}
