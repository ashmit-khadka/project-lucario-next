import LearningJavaScriptLesson1 from './javascript/javascript_1.js';
import LearningJavaScriptLesson2 from './javascript/javascript_2.js';
import LearningJavaScriptLesson3 from './javascript/javascript_3.js';
import LearningJavaScriptLesson4 from './javascript/javascript_4.js';
import LearningJavaScriptLesson5 from './javascript/javascript_5.js';
import LearningJavaScriptLesson6 from './javascript/javascript_6.js';
import LearningJavaScriptLesson7 from './javascript/javascript_7.js';
import LearningJavaScriptLesson8 from './javascript/javascript_8.js';
import LearningJavaScriptLesson9 from './javascript/javascript_9.js';
import LearningJavaScriptLesson10 from './javascript/javascript_10.js';
import LearningJavaScriptLesson11 from './javascript/javascript_11.js';
import LearningJavaScriptLesson12 from './javascript/javascript_12.js';
import LearningJavaScriptLesson13 from './javascript/javascript_13.js';

import LearningReactLesson1 from './react/react_1.js';
import LearningReactLesson2 from './react/react_2.js';
import LearningReactLesson3 from './react/react_3.js';
import LearningReactLesson4 from './react/react_4.js';
import LearningReactLesson5 from './react/react_5.js';

import LearningTypeScriptLesson1 from './typescript/typescript_1.js';
import LearningTypeScriptLesson2 from './typescript/typescript_2.js';
import LearningTypeScriptLesson3 from './typescript/typescript_3.js';
import LearningTypeScriptLesson4 from './typescript/typescript_4.js';

const courses = [
    {
        id: 'javascript',
        name: 'JavaScript',
        link: '/learn/javascript',
        icon: '/assets/icons/JavaScript.svg',
        description: 'Master the fundamentals and advanced concepts of JavaScript',
        totalLessons: 13,
        lessons: [
            LearningJavaScriptLesson1,
            LearningJavaScriptLesson2,
            LearningJavaScriptLesson3,
            LearningJavaScriptLesson4,
            LearningJavaScriptLesson5,
            LearningJavaScriptLesson6,
            LearningJavaScriptLesson7,
            LearningJavaScriptLesson8,
            LearningJavaScriptLesson9,
            LearningJavaScriptLesson10,
            LearningJavaScriptLesson11,
            LearningJavaScriptLesson12,
            LearningJavaScriptLesson13,
        ]
    },
    {
        id: 'react',
        name: 'React',
        link: '/learn/react',
        icon: '/assets/icons/React.svg',
        description: 'Build modern user interfaces with React',
        totalLessons: 5,
        lessons: [
            LearningReactLesson1,
            LearningReactLesson2,
            LearningReactLesson3,
            LearningReactLesson4,
            LearningReactLesson5,
        ]
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        link: '/learn/typescript',
        icon: '/assets/icons/TypeScript.svg',
        description: 'Add type safety to your JavaScript projects',
        totalLessons: 4,
        lessons: [
            LearningTypeScriptLesson1,
            LearningTypeScriptLesson2,
            LearningTypeScriptLesson3,
            LearningTypeScriptLesson4,
        ]
    }
];

export default courses;
