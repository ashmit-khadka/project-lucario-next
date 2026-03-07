# Course Generation Script - Summary

## Overview

The `generateCourse.ts` script has been updated to:
1. Accept course input in JSON format
2. Use ChatGPT (OpenAI API) to generate lesson content
3. Output structured JSON files for course, chapters, and lessons
4. Track parent-child relationships through file references

## Key Features

### ✨ AI-Powered Content Generation
- Uses OpenAI's GPT-4o model to generate comprehensive lesson content
- Follows the `demo_lesson.js` structure with rich content types
- Generates educational content with sections, code examples, callouts, and more

### 📂 Structured Output
- Creates organized directory structure in `tools/generators/output/`
- Generates three types of files:
  - **course.json**: Main course metadata with chapter references
  - **[chapter].json**: Chapter metadata with lesson/sub-chapter references
  - **[lesson].json**: Full lesson content with AI-generated educational material

### 🔗 Parent-Child Tracking
- Course tracks its chapter files in `chapterFiles` array
- Chapters track their lesson files in `lessonFiles` array
- Chapters track sub-chapters in `subChapterFiles` array
- Supports unlimited nesting of chapters

### 📊 Content Types Supported
The generated lessons include 8 content types:
1. **section**: Main section dividers
2. **text**: Explanatory paragraphs
3. **list**: Bulleted/numbered lists
4. **heading**: Sub-headings (do/dont/default variants)
5. **code**: Code examples with syntax highlighting
6. **callout**: Important notes (info/tip/warning/danger/note variants)
7. **image**: Diagrams and illustrations
8. **table**: Comparison tables with headers and rows

## Usage

### 1. Setup
```bash
# Install dependencies (if not already done)
npm install

# Create .env file from example
cp .env.example .env

# Add your OpenAI API key to .env
OPENAI_API_KEY=your_key_here
```

### 2. Create Course Input
Create a JSON file with your course structure (see `test-course.json` or `example.json`):

```json
{
  "course": {
    "name": "my-course",
    "title": "My Course",
    "description": "Course description",
    "difficulty": "intermediate"
  },
  "content": [
    {
      "type": "chapter",
      "name": "chapter-1",
      "title": "Chapter 1",
      "description": "Chapter description",
      "content": [
        {
          "type": "lesson",
          "name": "lesson-1",
          "title": "Lesson 1",
          "description": "Lesson description",
          "topics": ["Topic 1", "Topic 2", "Topic 3"]
        }
      ]
    }
  ]
}
```

### 3. Run the Generator
```bash
# Use default example.json
npm run tools:generate

# Use custom input file
npm run tools:generate test-course.json
```

### 4. Check Output
Generated files will be in `tools/generators/output/[course-name]/`

## File Structure

### Input Structure
```
tools/generators/
├── generateCourse.ts        # Main script
├── example.json             # Full example (production-ready course)
├── test-course.json         # Simple test example
├── courseConfig.example.ts  # TypeScript config (reference)
└── README.md               # Detailed documentation
```

### Output Structure
```
tools/generators/output/
└── [course-name]/
    ├── course.json              # Course metadata
    ├── chapter-1.json           # Chapter 1 metadata
    ├── chapter-1/               # Chapter 1 directory
    │   ├── lesson-1.json        # Lesson 1 content (AI-generated)
    │   └── lesson-2.json        # Lesson 2 content (AI-generated)
    ├── chapter-2.json           # Chapter 2 metadata
    └── chapter-2/
        ├── sub-chapter.json     # Sub-chapter metadata
        └── sub-chapter/         # Sub-chapter directory
            └── lesson.json      # Nested lesson content
```

## Output File Formats

### course.json
```json
{
  "id": "course-name",
  "name": "Course Display Name",
  "slug": "course-name",
  "description": "Course description",
  "difficulty": "intermediate",
  "totalLessons": 10,
  "chapterFiles": ["chapter-1.json", "chapter-2.json"]
}
```

### [chapter].json
```json
{
  "id": "chapter-name",
  "name": "chapter-name",
  "title": "Chapter Title",
  "description": "Chapter description",
  "order": 0,
  "lessonFiles": ["lesson-1.json", "lesson-2.json"],
  "subChapterFiles": ["sub-chapter.json"]
}
```

### [lesson].json
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
    "tags": ["tag1", "tag2"],
    "author": "AI Generated",
    "lastUpdated": "2026-02-05"
  },
  "content": [
    {
      "id": "section-1",
      "type": "section",
      "title": "1. Introduction"
    },
    {
      "id": "text-1",
      "type": "text",
      "text": "Content here..."
    },
    {
      "id": "code-1",
      "type": "code",
      "language": "javascript",
      "code": "const example = 'code';"
    }
  ],
  "quiz": null
}
```

## How It Works

### 1. Input Parsing
- Reads JSON course configuration
- Validates structure against TypeScript types

### 2. Recursive Processing
- Traverses course content tree
- Processes chapters and lessons in order
- Maintains chapter context for AI generation

### 3. AI Content Generation
For each lesson:
- Constructs prompt with lesson details and topics
- Calls OpenAI API with GPT-4o model
- Parses JSON response into lesson content array
- Validates content structure

### 4. File Generation
- Creates output directory structure
- Writes lesson JSON files
- Writes chapter metadata JSON files
- Writes course metadata JSON file
- All parent objects track their children's filenames

### 5. Completion
- Reports total lessons generated
- Shows output location
- Exits with success/error status

## AI Generation Details

### Prompt Structure
The script sends two prompts to ChatGPT:

1. **System Prompt**: Instructs the AI to be a technical content creator and explains the expected JSON structure

2. **User Prompt**: Provides:
   - Course name
   - Chapter context path
   - Lesson title and description
   - Topics to cover
   - Difficulty level

### Model Configuration
- **Model**: gpt-4o (latest GPT-4 optimized)
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 4000 (comprehensive content)
- **Response Format**: JSON object

### Content Quality
The AI generates:
- ✅ Multiple content sections per lesson
- ✅ Variety of content types (text, code, lists, callouts)
- ✅ Practical code examples
- ✅ Best practices and tips
- ✅ Proper formatting and structure

## Testing

### Quick Test
```bash
# Generate test course (4 lessons)
npm run tools:generate test-course.json
```

Expected output:
```
tools/generators/output/test-course/
├── course.json
├── getting-started.json
├── getting-started/
│   ├── hello-world.json
│   └── variables.json
├── advanced-concepts.json
└── advanced-concepts/
    ├── functions.json
    └── functions/
        ├── function-basics.json
        └── arrow-functions.json
```

### Full Example Test
```bash
# Generate full production-ready course
npm run tools:generate example.json
```

This will generate a comprehensive course with many lessons (may take several minutes and API calls).

## Cost Considerations

### OpenAI API Costs
- **Model**: GPT-4o pricing applies
- **Tokens per lesson**: ~3000-4000 tokens (combined input + output)
- **Estimate**: $0.01-0.02 per lesson

Example:
- 10 lessons = ~$0.10-0.20
- 50 lessons = ~$0.50-1.00
- 100 lessons = ~$1.00-2.00

### Optimization Tips
1. Start with small test courses
2. Review generated content before scaling
3. Adjust `max_tokens` if content is too long/short
4. Consider rate limits for large courses

## Next Steps

### Recommended Actions
1. ✅ Set up `.env` with your OpenAI API key
2. ✅ Test with `test-course.json` (4 lessons)
3. ✅ Review generated content quality
4. ✅ Adjust prompts/parameters if needed
5. ✅ Generate your actual course content

### Potential Enhancements
- Add retry logic for API failures
- Add progress bar for long generations
- Add content validation after generation
- Add quiz generation support
- Add parallel lesson generation (with rate limiting)
- Add resume capability for interrupted generations

## Troubleshooting

### Common Issues

**"OPENAI_API_KEY not found"**
- Create `.env` file from `.env.example`
- Add your API key

**"Input file not found"**
- Check file is in `tools/generators/` directory
- Use correct filename

**API Rate Limit Errors**
- Add delays between requests
- Reduce batch size
- Upgrade API tier

**Incomplete Content**
- Increase `max_tokens` in script
- Reduce topics per lesson
- Split large lessons

## Files Created/Modified

### New Files
1. `tools/generators/generateCourse.ts` - Main script
2. `tools/generators/output/` - Output directory
3. `tools/generators/output/.gitignore` - Ignore generated files
4. `tools/generators/output/README.md` - Output directory docs
5. `tools/generators/README.md` - Comprehensive documentation
6. `tools/generators/test-course.json` - Simple test input
7. `.env.example` - Environment variable template

### Existing Files
- Package.json already had `openai` dependency ✅
- Types already defined in `tools/types/` ✅
- Example files already present ✅

## Summary

The course generation system is now complete and ready to use! It provides:

✅ AI-powered content generation using ChatGPT
✅ Structured JSON output with parent-child tracking
✅ Support for nested chapters
✅ Rich content types (8 types supported)
✅ Comprehensive documentation
✅ Test files for quick validation
✅ Production-ready examples

Start by testing with `test-course.json` and then scale up to your actual course content!
