import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const FIXTURES_DIR = join(process.cwd(), 'fixtures/sample-course');

let cache: { // cache variable
    courses: any[];
    modules: any[];
    chapters: any[];
    lessons: any[];
} | null = null;

function loadFixtures() {
    // Disable caching in development so editing JSON files hot-reloads immediately
    if (cache && process.env.NODE_ENV !== 'development') return cache;
    try {
        const courses = existsSync(join(FIXTURES_DIR, 'courses.json')) 
            ? JSON.parse(readFileSync(join(FIXTURES_DIR, 'courses.json'), 'utf8'))
            : [];
        const modules = existsSync(join(FIXTURES_DIR, 'modules.json'))
            ? JSON.parse(readFileSync(join(FIXTURES_DIR, 'modules.json'), 'utf8'))
            : [];
        const chapters = existsSync(join(FIXTURES_DIR, 'chapters.json'))
            ? JSON.parse(readFileSync(join(FIXTURES_DIR, 'chapters.json'), 'utf8'))
            : [];
        
        const lessonsDir = join(FIXTURES_DIR, 'lessons');
        const lessons: any[] = [];
        if (existsSync(lessonsDir)) {
            const files = readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
            for (const file of files) {
                lessons.push(JSON.parse(readFileSync(join(lessonsDir, file), 'utf8')));
            }
        }
        
        cache = { courses, modules, chapters, lessons };
        return cache;
    } catch (e) {
        console.error("Error loading fixtures:", e);
        return { courses: [], modules: [], chapters: [], lessons: [] };
    }
}

export const fixtures = {
    getCourses: () => loadFixtures().courses,
    getCourseBySlug: (slug: string) => loadFixtures().courses.find(c => c.slug === slug),
    getModulesByIds: (ids: any[]) => {
        const strIds = ids.map(id => id.toString());
        return loadFixtures().modules.filter(m => strIds.includes(m._id?.toString()));
    },
    getChaptersByIds: (ids: any[]) => {
        const strIds = ids.map(id => id.toString());
        return loadFixtures().chapters.filter(c => strIds.includes(c._id?.toString()));
    },
    getLessonsByIds: (ids: any[]) => {
        const strIds = ids.map(id => id.toString());
        return loadFixtures().lessons.filter(l => strIds.includes(l._id?.toString()));
    },
    getLessonBySlug: (slug: string) => {
        const lesson = loadFixtures().lessons.find(l => l.slug === slug);
        if (lesson) {
            const mockLesson = loadFixtures().lessons.find(l => l.slug === 'mock-lesson');
            if (mockLesson) {
                return { ...lesson, content: mockLesson.content, status: 'published' };
            }
        }
        return lesson;
    },
    getLessonById: (id: string) => {
        const lesson = loadFixtures().lessons.find(l => l._id?.toString() === id.toString());
        if (lesson) {
            const mockLesson = loadFixtures().lessons.find(l => l.slug === 'mock-lesson');
            if (mockLesson) {
                return { ...lesson, content: mockLesson.content, status: 'published' };
            }
        }
        return lesson;
    },
    getChapterBySlugAndCourseId: (slug: string, courseId: string) => 
        loadFixtures().chapters.find(c => c.slug === slug && c.courseId?.toString() === courseId.toString()),
    getChaptersByCourseId: (courseId: string) => 
        loadFixtures().chapters.filter(c => c.courseId?.toString() === courseId.toString())
};
