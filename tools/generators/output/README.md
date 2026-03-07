# Generated Course Output

This directory contains AI-generated course content created by the `generateCourse.ts` script.

## Structure

When you run the course generator, it creates the following structure:

```
output/
└── [course-name]/
    ├── course.json           # Course metadata with chapter references
    ├── [chapter-1].json      # Chapter metadata with lesson/sub-chapter references
    ├── [chapter-1]/          # Chapter directory
    │   ├── [lesson-1].json   # Individual lesson content
    │   ├── [lesson-2].json
    │   └── [sub-chapter]/    # Nested chapters
    │       ├── [chapter].json
    │       └── [lesson].json
    └── [chapter-2].json
```

## File Formats

### Course File (`course.json`)
```json
{
  "id": "course-name",
  "name": "Course Display Name",
  "slug": "course-name",
  "description": "Course description",
  "difficulty": "intermediate",
  "icon": "/assets/icons/Icon.svg",
  "author": "Author Name",
  "version": "1.0.0",
  "totalLessons": 10,
  "chapterFiles": ["chapter-1.json", "chapter-2.json"]
}
```

### Chapter File (`chapter-name.json`)
```json
{
  "id": "chapter-name",
  "name": "chapter-name",
  "title": "Chapter Display Title",
  "description": "Chapter description",
  "order": 0,
  "lessonFiles": ["lesson-1.json", "lesson-2.json"],
  "subChapterFiles": ["sub-chapter.json"]
}
```

### Lesson File (`lesson-name.json`)
Follows the structure from `demo_lesson.js` with:
- Metadata (title, description, difficulty, duration, tags, etc.)
- Content array with various content types (section, text, list, code, callout, image, table)
- Optional quiz

## Generated Files

All files in this directory (except `.gitignore` and this README) are automatically generated and should not be committed to version control.
