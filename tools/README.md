# Tools Directory

Development tools for generating and managing course content.

## 📁 Structure

```
tools/
  ├── generators/          # Course and content generation
  │   ├── generateCourse.ts
  │   └── courseConfig.example.ts
  ├── scripts/             # Utility scripts
  │   ├── validateContent.ts
  │   └── migrateOldLessons.ts
  ├── types/               # Shared TypeScript types
  │   ├── course.ts
  │   └── lesson.ts
  └── tsconfig.json        # TypeScript config for tools
```

## 🚀 Usage

### Generate a Course

1. **Create your course configuration:**

```typescript
// tools/generators/myCourseConfig.ts
import type { CourseConfig } from '../types/course';

export const courseConfig: CourseConfig = {
  id: 'my-course',
  name: 'My Course',
  description: 'Course description',
  difficulty: 'intermediate',
  
  chapters: [
    {
      id: 'chapter-1',
      title: 'Chapter 1: Introduction',
      order: 1,
      lessons: [
        {
          title: 'First Lesson',
          topics: [
            'Topic 1',
            'Topic 2',
            'Topic 3'
          ],
          duration: 30
        }
      ]
    }
  ]
};
```

2. **Update the generator to use your config:**

```typescript
// tools/generators/generateCourse.ts
import { courseConfig } from './myCourseConfig';

// ... then run the generator
```

3. **Run the generator:**

```bash
npm run tools:generate
```

## 📝 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Generate Course | `npm run tools:generate` | Generate lessons and course metadata using AI |
| Validate Content | `npm run tools:validate` | Validate all course content for errors |
| Migrate Lessons | `npm run tools:migrate` | Migrate old lesson format to new format |

## 🎯 Course Configuration

### CourseConfig Structure

```typescript
{
  id: string;              // Unique course ID (kebab-case)
  name: string;            // Display name
  description: string;     // Course description
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;           // Path to course icon
  
  chapters: [
    {
      id: string;          // Chapter ID
      title: string;       // Chapter title
      order: number;       // Chapter order
      lessons: [
        {
          title: string;   // Lesson title
          topics: string[]; // Topics to cover
          duration?: number; // Optional duration in minutes
        }
      ]
    }
  ]
}
```

## 📚 Lesson Content Types

Lessons support the following content types:

### Section
```typescript
{ id: "section-1", type: "section", title: "1. Section Title" }
```

### Text
```typescript
{ id: "text-1", type: "text", text: "Content with `inline code` and **bold**" }
```

### List
```typescript
{ id: "list-1", type: "list", items: ["Item 1", "Item 2"], listType: "unordered" }
```

### Code
```typescript
{
  id: "code-1",
  type: "code",
  language: "javascript",
  code: "const example = 'code';"
}
```

### Callout
```typescript
{
  id: "callout-1",
  type: "callout",
  text: "Important information",
  variant: "tip" // tip, warning, info, danger, note
}
```

### Heading
```typescript
{
  id: "heading-1",
  type: "heading",
  text: "Best Practices",
  variant: "do" // do, dont, default
}
```

### Table
```typescript
{
  id: "table-1",
  type: "table",
  headers: ["Column 1", "Column 2"],
  rows: [["Value 1", "Value 2"]]
}
```

## 🔧 Environment Setup

Ensure you have your OpenAI API key set in `.env.local`:

```bash
OPENAI_API_KEY=your-api-key-here
```

## 📖 Output

Generated files are saved to:

```
data/learning/
  your-course-id/
    your-course-id_1.js
    your-course-id_2.js
    ...
```

The `courses.js` file is automatically updated with the new course.

## 🎨 Best Practices

1. **Topic Coverage**: Be specific with topics - the AI uses these to generate detailed content
2. **Chapter Organization**: Group related lessons into chapters
3. **Difficulty Progression**: Order lessons from simple to complex
4. **Duration**: Estimate 20-40 minutes per lesson for best engagement
5. **Review Generated Content**: Always review AI-generated lessons before publishing

## 🐛 Troubleshooting

**Rate Limiting**: The generator includes 2-second delays between API calls to avoid rate limits.

**API Key Issues**: Ensure `OPENAI_API_KEY` is set in `.env.local` (not `.env`).

**TypeScript Errors**: Run `npm install` to ensure all dev dependencies are installed.

## 🔮 Future Enhancements

- [ ] Quiz generation
- [ ] Interactive code examples
- [ ] Content validation checks
- [ ] Legacy lesson migration tool
- [ ] Batch course generation
- [ ] Content translation support
