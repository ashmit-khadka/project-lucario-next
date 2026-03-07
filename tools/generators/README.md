# Course Generation Tools

Tools for generating course content using AI (ChatGPT).

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Configure your OpenAI API key** in `.env` at the project root:
```env
OPENAI_API_KEY=your_api_key_here
```

3. **Run the generator:**
```bash
# Command line
npm run tools:generate [input-file.json]

# VS Code debugger
# Press F5 and select "Generate Course (AI)"
```

**Note:** Currently configured to generate only the **first lesson** from the input file for testing purposes.

If no input file is specified, it will use `example.json` by default.

## 📝 Usage

### Generate a Course

The script takes a course input JSON file and uses ChatGPT to generate comprehensive lesson content.

```bash
# Use default example.json
npm run tools:generate

# Use a custom input file
npm run tools:generate my-course.json
```

### Input Format

Create a JSON file following the `CourseInput` interface. See `example.json` for a complete example.

**Basic structure:**

```json
{
  "course": {
    "name": "my-course-name",           // kebab-case identifier
    "title": "My Course Title",          // Display name
    "description": "Course description",
    "difficulty": "intermediate",        // beginner | intermediate | advanced
    "icon": "/assets/icons/Icon.svg",
    "author": "Your Name",
    "version": "1.0.0"
  },
  "content": [
    {
      "type": "chapter",
      "name": "chapter-name",            // kebab-case identifier
      "title": "Chapter Title",
      "description": "Chapter description",
      "content": [
        {
          "type": "lesson",
          "name": "lesson-name",         // kebab-case identifier
          "title": "Lesson Title",
          "description": "Lesson description",
          "topics": [
            "Topic 1 to cover",
            "Topic 2 to cover",
            "Topic 3 to cover"
          ],
          "difficulty": "intermediate"   // Optional override
        }
      ]
    }
  ]
}
```

**Nested chapters are supported:**

```json
{
  "type": "chapter",
  "name": "parent-chapter",
  "title": "Parent Chapter",
  "description": "Parent description",
  "content": [
    {
      "type": "chapter",
      "name": "sub-chapter",
      "title": "Sub Chapter",
      "description": "Sub chapter description",
      "content": [
        {
          "type": "lesson",
          "name": "nested-lesson",
          "title": "Nested Lesson",
          "description": "Lesson in sub-chapter",
          "topics": ["Topic 1", "Topic 2"]
        }
      ]
    }
  ]
}
```

## 📂 Output Structure

The generator creates files in `generators/output/[course-name]/`:

```
output/
└── [course-name]/
    ├── course.json              # Course metadata with chapter file references
    ├── chapter-1.json           # Chapter metadata with lesson/sub-chapter references
    ├── chapter-1/               # Chapter directory
    │   ├── lesson-1.json        # Generated lesson content
    │   ├── lesson-2.json
    │   └── sub-chapter/         # Nested chapter
    │       ├── sub-chapter.json
    │       └── lesson.json
    └── chapter-2.json
```

### Output File Formats

**course.json** - Main course metadata:
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
  "chapterFiles": ["chapter-1.json", "chapter-2.json"]  // Tracks children
}
```

**[chapter].json** - Chapter metadata:
```json
{
  "id": "chapter-name",
  "name": "chapter-name",
  "title": "Chapter Display Title",
  "description": "Chapter description",
  "order": 0,
  "lessonFiles": ["lesson-1.json", "lesson-2.json"],     // Tracks lesson children
  "subChapterFiles": ["sub-chapter.json"]                // Tracks sub-chapter children
}
```

**[lesson].json** - Generated lesson content:
```json
{
  "id": "lesson-name",
  "slug": "lesson-name",
  "version": "1.0.0",
  "title": "Lesson Title",
  "description": "Lesson description",
  "meta": {
    "difficulty": "intermediate",
    "duration": 30,
    "prerequisites": [],
    "tags": ["tag1", "tag2"],
    "author": "AI Generated",
    "lastUpdated": "2026-02-05"
  },
  "content": [
    // Array of content items (see Content Types below)
  ],
  "quiz": null
}
```

## 🎨 Content Types

Generated lessons include rich content following the `demo_lesson.js` structure:

| Type | Description | Fields |
|------|-------------|--------|
| **section** | Main section dividers | `id`, `type`, `title` |
| **text** | Explanatory paragraphs | `id`, `type`, `text` |
| **list** | Bulleted/numbered lists | `id`, `type`, `items`, `listType?` |
| **heading** | Sub-headings | `id`, `type`, `text`, `variant?` (do/dont/default) |
| **code** | Code examples | `id`, `type`, `language`, `code`, `filename?` |
| **callout** | Important notes | `id`, `type`, `text`, `variant?` (info/tip/warning/danger/note) |
| **image** | Diagrams/illustrations | `id`, `type`, `src`, `alt`, `caption?` |
| **table** | Comparison tables | `id`, `type`, `headers`, `rows`, `caption?` |

**Example content array:**
```json
[
  {
    "id": "section-1",
    "type": "section",
    "title": "1. 📝 Introduction"
  },
  {
    "id": "text-1",
    "type": "text",
    "text": "This section introduces the core concepts..."
  },
  {
    "id": "list-1",
    "type": "list",
    "items": ["Point 1", "Point 2", "Point 3"]
  },
  {
    "id": "code-1",
    "type": "code",
    "language": "javascript",
    "code": "const example = 'Hello World';\nconsole.log(example);"
  },
  {
    "id": "callout-1",
    "type": "callout",
    "text": "This is an important tip!",
    "variant": "tip"
  }
]
```

## 🤖 AI Generation

The script uses OpenAI's ChatGPT API (gpt-4o model) to generate:

- Comprehensive lesson content covering all specified topics
- Multiple content types (text, code, callouts, tables, etc.)
- Educational structure with sections and sub-sections
- Practical code examples
- Best practices and tips

**What gets generated:**
- ✅ Lesson content array with varied content types
- ✅ Unique IDs for each content item
- ✅ Comprehensive coverage of all topics
- ✅ Code examples with proper syntax highlighting
- ✅ Callouts for important notes and tips

**What you provide:**
- Lesson title and description
- Topics to cover
- Course and chapter context
- Difficulty level

## 📚 Examples

### Quick Examples

**Simple course with one chapter:**
```json
{
  "course": {
    "name": "javascript-basics",
    "title": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "difficulty": "beginner"
  },
  "content": [
    {
      "type": "chapter",
      "name": "intro",
      "title": "Introduction",
      "description": "Getting started with JavaScript",
      "content": [
        {
          "type": "lesson",
          "name": "variables",
          "title": "Variables and Data Types",
          "description": "Understanding JavaScript variables",
          "topics": [
            "let, const, and var",
            "Primitive data types",
            "Type coercion"
          ]
        }
      ]
    }
  ]
}
```

### Reference Files

- **`example.json`** - Complete production-ready course example with nested chapters
- **`courseConfig.example.ts`** - TypeScript configuration example (for reference)
- **`../data/learning/demo_lesson.js`** - Example of generated lesson structure

## ⚙️ Configuration

### Environment Variables

```env
OPENAI_API_KEY=your_api_key_here    # Required: OpenAI API key
```

### Model Configuration

The script uses `gpt-4o` model. To use a different model, edit `generateCourse.ts`:

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o',  // Change this to your preferred model
  // ...
});
```

### Generation Parameters

You can adjust generation parameters in `generateCourse.ts`:

```typescript
temperature: 0.7,      // Creativity (0.0 - 1.0)
max_tokens: 4000,      // Maximum response length
```

## 🛠️ Troubleshooting

**Error: "OPENAI_API_KEY not found"**
- Make sure you have a `.env` file in the project root
- Verify the API key is correct

**Error: "Input file not found"**
- Check the file path is correct
- Make sure the file is in the `generators` directory

**Generated content is incomplete**
- Increase `max_tokens` in the script
- Reduce the number of topics per lesson
- Split large lessons into smaller ones

**Rate limiting errors**
- Add delays between API calls
- Use a higher tier API key

## 📖 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TypeScript Types](../types/) - Course and Lesson type definitions
- [Output Directory](./output/) - Generated course files
