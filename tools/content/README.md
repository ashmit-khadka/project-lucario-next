# Course Generation Tools

AI-powered tools for generating educational course content using OpenAI's GPT-4.

## Setup

1. **Install dependencies** (if not already installed):
```bash
npm install openai
```

2. **Set your OpenAI API key**:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or add it to your `.env.local`:
```
OPENAI_API_KEY=your-api-key-here
```

## Usage

### Method 1: Edit the script directly

1. Open `generateCourse.js`
2. Modify the `courseConfig` object in the `main()` function:
```javascript
const courseConfig = {
    name: 'Your Course Name',
    description: 'Course description',
    difficulty: 'beginner', // or 'intermediate', 'advanced'
    contents: [
        'Chapter 1 Title',
        'Chapter 2 Title',
        'Chapter 3 Title',
        // ... more chapters
    ]
};
```

3. Run the script:
```bash
node tools/content/generateCourse.js
```

### Method 2: Create a config file

1. Create a new config file:
```bash
cp tools/content/courseConfig.example.js tools/content/my-course.js
```

2. Edit `my-course.js` with your course details

3. Modify `generateCourse.js` to import your config

4. Run the script

## What Gets Generated

The script will:

1. **Generate lesson objects** for each chapter using OpenAI GPT-4
2. **Create a course directory** at `data/learning/{course-id}/`
3. **Save individual lesson files** as `{course-id}_1.js`, `{course-id}_2.js`, etc.
4. **Create an index file** that exports the complete course

### Generated Structure

```
data/learning/
└── your-course-name/
    ├── index.js                    # Course export
    ├── your-course-name_1.js      # Lesson 1
    ├── your-course-name_2.js      # Lesson 2
    └── ...
```

### Lesson Content Types

Each generated lesson includes:
- ✅ **Sections** - Organized content blocks
- ✅ **Text** - Explanatory paragraphs
- ✅ **Headings** - Best practices, examples, etc.
- ✅ **Lists** - Key points and concepts
- ✅ **Code** - Syntax-highlighted examples
- ✅ **Callouts** - Tips, warnings, notes
- ✅ **Tables** - Comparisons and data
- ✅ **Metadata** - Difficulty, duration, tags

## Adding Generated Course to Your App

After generation:

1. **Import the course** in `data/learning/courses.js`:
```javascript
import YourCourse from './your-course-name/index.js';

const courses = [
    // ... existing courses
    YourCourse
];
```

2. **Test the course**:
```
http://localhost:6969/learn/your-course-name
```

## Cost Estimation

- **Model**: GPT-4o
- **Tokens per lesson**: ~3,000-4,000 tokens
- **Cost per lesson**: ~$0.03-0.05
- **5-lesson course**: ~$0.15-0.25
- **10-lesson course**: ~$0.30-0.50

## Customization

### Adjust Generation Prompt

Edit the prompt in `generateLesson()` function to:
- Change content style
- Add/remove content types
- Adjust complexity level
- Focus on specific topics

### Modify Lesson Structure

Update the JSON structure in the prompt to match your needs.

### Rate Limiting

The script includes a 2-second delay between generations to avoid rate limits. Adjust in the `generateCourse()` function if needed.

## Troubleshooting

**API Key Error**:
```
❌ Error: OPENAI_API_KEY environment variable is not set
```
→ Set your OpenAI API key as shown in Setup

**JSON Parse Error**:
```
❌ Error generating lesson: Unexpected token
```
→ The AI returned invalid JSON. Try running again or adjust the prompt.

**Rate Limit Error**:
```
❌ Error: Rate limit exceeded
```
→ Increase the delay between generations or wait a few minutes.

## Tips

1. **Start small** - Test with 2-3 chapters first
2. **Review generated content** - AI-generated content should be reviewed and edited
3. **Iterate prompts** - Adjust the generation prompt based on results
4. **Save API costs** - Generate in batches, not one lesson at a time
5. **Version control** - Commit generated content to track changes

## Examples

### Generate a Python Course
```javascript
const courseConfig = {
    name: 'Python Basics',
    difficulty: 'beginner',
    contents: [
        'Variables and Data Types',
        'Control Flow',
        'Functions',
        'Lists and Dictionaries',
        'File I/O'
    ]
};
```

### Generate an Advanced Course
```javascript
const courseConfig = {
    name: 'System Design',
    difficulty: 'advanced',
    contents: [
        'Scalability Principles',
        'Database Design',
        'Caching Strategies',
        'Load Balancing',
        'Microservices Architecture'
    ]
};
```
