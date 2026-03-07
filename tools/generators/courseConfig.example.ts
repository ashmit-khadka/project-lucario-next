/**
 * Generic course configuration example
 * 
 * Copy this file and modify it to generate your course.
 * Note: Numbers in titles (e.g., "1.", "2.") will be auto-generated.
 * Then run: npm run tools:generate
 */

import type { CourseInput } from '../types/course';

export const courseConfig: CourseInput = {
  course: {
    name: 'modern-web-development',
    title: 'Modern Web Development',
    description: 'Comprehensive guide to building production-ready web applications with modern tools and best practices',
    difficulty: 'intermediate',
    icon: '/assets/icons/JavaScript.svg',
    author: 'Your Name',
    version: '1.0.0'
  },
  
  content: [
    {
      type: 'chapter',
      name: 'fundamentals',
      title: 'Core Fundamentals',
      description: 'Essential concepts and runtime fundamentals',
      content: [
        {
          type: 'chapter',
          name: 'language-basics',
          title: 'Language Basics',
          description: 'Core language features and syntax',
          content: [
            {
              type: 'lesson',
              name: 'variables-types',
              title: 'Variables and Data Types',
              description: 'Understanding variables, primitives, and type coercion',
              topics: [
                'Variable declarations (let, const, var)',
                'Primitive data types',
                'Type coercion and conversion',
                'Hoisting and temporal dead zone'
              ]
            },
            {
              type: 'lesson',
              name: 'functions-scope',
              title: 'Functions and Scope',
              description: 'Function declarations, expressions, and scope concepts',
              topics: [
                'Function declarations vs expressions',
                'Arrow functions and this binding',
                'Lexical scope and closures',
                'Function parameters and default values'
              ]
            }
          ]
        },
        {
          type: 'chapter',
          name: 'async-programming',
          title: 'Asynchronous Programming',
          description: 'Master async patterns and event-driven programming',
          content: [
            {
              type: 'lesson',
              name: 'promises-basics',
              title: 'Promises and Async/Await',
              description: 'Understanding asynchronous code execution',
              topics: [
                'Promise creation and chaining',
                'Async/await syntax',
                'Error handling in async code',
                'Promise combinators (all, race, allSettled)'
              ]
            },
            {
              type: 'lesson',
              name: 'event-loop',
              title: 'Event Loop Deep Dive',
              description: 'How JavaScript handles asynchronous operations',
              topics: [
                'Call stack and task queue',
                'Microtasks vs macrotasks',
                'Execution order and timing',
                'Performance implications'
              ],
              difficulty: 'advanced'
            }
          ]
        }
      ]
    },
    {
      type: 'chapter',
      name: 'web-apis',
      title: 'Web APIs and Browser',
      description: 'Working with browser APIs and web standards',
      content: [
        {
          type: 'lesson',
          name: 'dom-manipulation',
          title: 'DOM Manipulation',
          description: 'Interacting with the Document Object Model',
          topics: [
            'Selecting and modifying elements',
            'Event handling and delegation',
            'Creating and removing elements',
            'Performance considerations'
          ]
        },
        {
          type: 'lesson',
          name: 'fetch-api',
          title: 'Fetch API and HTTP Requests',
          description: 'Making HTTP requests and handling responses',
          topics: [
            'Fetch API basics',
            'Request and response objects',
            'Headers and CORS',
            'Error handling patterns'
          ]
        },
        {
          type: 'chapter',
          name: 'storage-apis',
          title: 'Storage and State',
          description: 'Client-side storage and state management',
          content: [
            {
              type: 'lesson',
              name: 'local-storage',
              title: 'LocalStorage and SessionStorage',
              description: 'Using browser storage APIs',
              topics: [
                'LocalStorage vs SessionStorage',
                'Storage limits and quotas',
                'Serialization and data types',
                'Security considerations'
              ]
            },
            {
              type: 'lesson',
              name: 'indexeddb',
              title: 'IndexedDB Fundamentals',
              description: 'Working with client-side databases',
              topics: [
                'IndexedDB structure and concepts',
                'Creating and managing databases',
                'Transactions and object stores',
                'Querying and indexing'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'chapter',
      name: 'frameworks',
      title: 'Modern Frameworks',
      description: 'Building applications with modern frameworks',
      content: [
        {
          type: 'chapter',
          name: 'component-architecture',
          title: 'Component Architecture',
          description: 'Understanding component-based design',
          content: [
            {
              type: 'lesson',
              name: 'component-basics',
              title: 'Component Fundamentals',
              description: 'Building reusable UI components',
              topics: [
                'Component composition',
                'Props and state',
                'Lifecycle and effects',
                'Component communication'
              ]
            },
            {
              type: 'lesson',
              name: 'state-management',
              title: 'State Management Patterns',
              description: 'Managing application state effectively',
              topics: [
                'Local vs global state',
                'State management libraries',
                'Immutable updates',
                'State synchronization'
              ]
            }
          ]
        },
        {
          type: 'lesson',
          name: 'routing',
          title: 'Client-Side Routing',
          description: 'Implementing navigation in single-page applications',
          topics: [
            'Routing concepts and patterns',
            'Dynamic routes and parameters',
            'Navigation guards',
            'Code splitting and lazy loading'
          ]
        }
      ]
    },
    {
      type: 'chapter',
      name: 'backend',
      title: 'Backend Development',
      description: 'Server-side development and APIs',
      content: [
        {
          type: 'lesson',
          name: 'api-design',
          title: 'API Design Principles',
          description: 'Designing RESTful and GraphQL APIs',
          topics: [
            'REST principles and best practices',
            'Resource naming and endpoints',
            'HTTP methods and status codes',
            'API versioning strategies'
          ]
        },
        {
          type: 'chapter',
          name: 'databases',
          title: 'Database Integration',
          description: 'Working with databases and data persistence',
          content: [
            {
              type: 'lesson',
              name: 'sql-basics',
              title: 'SQL and Relational Databases',
              description: 'Querying and managing relational data',
              topics: [
                'SQL query fundamentals',
                'Joins and relationships',
                'Indexes and query optimization',
                'Transactions and ACID properties'
              ]
            },
            {
              type: 'lesson',
              name: 'nosql-intro',
              title: 'NoSQL Databases',
              description: 'Document stores and key-value databases',
              topics: [
                'NoSQL database types',
                'Document-oriented databases',
                'Schema design patterns',
                'When to use NoSQL vs SQL'
              ]
            }
          ]
        }
      ]
    }
  ]
};
    {
      type: 'chapter',
      name: 'foundations',
      title: 'Track 0 — Foundations (Core)',
      description: 'Essential runtime and language fundamentals for production systems',
      content: [
        {
          type: 'chapter',
          name: 'javascript-runtime',
          title: '1. JavaScript Runtime',
          description: 'Deep dive into JavaScript runtime behavior, event loop, and async patterns',
          content: [
            {
              type: 'lesson',
              name: 'event-loop-fundamentals',
              title: 'Event Loop Fundamentals',
              description: 'Master the event loop, tasks, microtasks, and execution context',
              topics: [
                'Event loop architecture (call stack, task queue, microtask queue)',
                'Tasks vs microtasks basics',
                'Execution order and timing',
                'Common misconceptions and gotchas'
              ]
            },
            {
              type: 'lesson',
              name: 'async-patterns',
              title: 'Async Patterns and Error Handling',
              description: 'Promises, async/await, and error propagation strategies',
              topics: [
                'Promises, async/await error propagation',
                'Try-catch vs .catch() patterns',
                'Unhandled rejection handling',
                'Error boundaries in async code'
              ]
            },
            {
              type: 'lesson',
              name: 'concurrency-patterns',
              title: 'Concurrency Patterns in Node',
              description: 'Managing concurrent operations and avoiding common pitfalls',
              topics: [
                'Concurrency patterns in Node',
                'Promise.all, Promise.race, Promise.allSettled',
                'Cancellation concept (abort signals, request aborted handling)',
                'Worker threads and cluster module'
              ]
            },
            {
              type: 'lesson',
              name: 'streams-backpressure',
              title: 'Streams and Backpressure',
              description: 'Understanding streams, backpressure, and why buffering causes outages',
              topics: [
                'Streams/backpressure intuition (why buffering causes outages)',
                'Readable, Writable, Transform, Duplex streams',
                'Handling backpressure correctly',
                'Memory management in streaming scenarios'
              ]
            },
            {
              type: 'lesson',
              name: 'production-footguns',
              title: 'Production Footguns and Debugging',
              description: 'Common production issues, memory leaks, and debugging strategies',
              topics: [
                'Common production footguns (unhandled rejections, memory leaks)',
                'Memory leak patterns and detection',
                'CPU profiling and flame graphs',
                'Architecture lab: map "slow request" failure modes and mitigation points'
              ]
            }
          ]
        },
        {
          type: 'chapter',
          name: 'typescript-production',
          title: '2. TypeScript for Production',
          description: 'Type safety strategies, patterns, and boundaries for real-world applications',
          content: [
            {
              type: 'lesson',
              name: 'types-vs-runtime',
              title: 'Types vs Runtime Truth',
              description: 'Understanding the gap between compile-time types and runtime reality',
              topics: [
                'Types vs runtime truth (why runtime validation still required)',
                'Type guards and narrowing',
                'Runtime validation libraries (Zod, io-ts)',
                'When to trust types vs validate'
              ]
            },
            {
              type: 'lesson',
              name: 'dtos-domain-models',
              title: 'DTOs vs Domain Models',
              description: 'Separating data transfer objects from domain logic',
              topics: [
                'DTOs vs domain models (don\'t leak DB shapes)',
                'Mapping between layers',
                'Avoiding anemic domain models',
                'Type-safe transformations'
              ]
            },
            {
              type: 'lesson',
              name: 'error-typing-strategy',
              title: 'Error Typing Strategies',
              description: 'Type-safe error handling patterns for production systems',
              topics: [
                'Error typing strategy (domain errors vs exceptions)',
                'Result types and Either patterns',
                'Error unions and discriminated unions',
                'Error serialization and logging'
              ],
              difficulty: 'advanced'
            },
            {
              type: 'lesson',
              name: 'generics-patterns',
              title: 'Generics for Shared Patterns',
              description: 'Using generics to create reusable, type-safe abstractions',
              topics: [
                'Generics for shared patterns (pagination, result wrappers)',
                'Generic constraints and extends',
                'Utility types and mapped types',
                'Building type-safe APIs'
              ]
            },
            {
              type: 'lesson',
              name: 'strictness-boundaries',
              title: 'Strictness and Boundaries',
              description: 'Enforcing type boundaries and managing strictness tradeoffs',
              topics: [
                'Strictness tradeoffs and enforcing boundaries',
                'Architecture lab: "Express types at the edges only" boundary rule',
                'unknown vs any usage',
                'Module boundary patterns'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'chapter',
      name: 'web-platform',
      title: 'Track 1 — Web Platform & Networking (Core)',
      description: 'Understanding the web as a platform, networking fundamentals, and HTTP concepts',
      content: [
        {
          type: 'lesson',
          name: 'web-fundamentals',
          title: 'The Web as a Platform',
          description: 'Core web platform concepts and architectural patterns',
          topics: [
            'Web app vs website vs service vs API product',
            'Statelessness and where state lives (client/server/db/cache)',
            'Trust boundaries (origins/sites concept)',
            'Progressive enhancement and resilience mindset',
            'Architecture artifact: C4 Context diagram (actors + external systems)'
          ]
        },
        {
          type: 'lesson',
          name: 'urls-navigation',
          title: 'URLs, Navigation, and Request Modes',
          description: 'Understanding web navigation patterns and URL design',
          topics: [
            'URL anatomy, canonicalization, deep-link stability',
            'Redirect semantics and why they matter operationally',
            'Navigation vs subresource vs API fetch implications',
            'History stack, reload types, back/forward cache conceptually',
            'Architecture artifact: URL + routing ownership map (browser/server)'
          ]
        },
        {
          type: 'chapter',
          name: 'http-fundamentals',
          title: '3. HTTP and Networking',
          description: 'Deep dive into HTTP protocol, methods, headers, and best practices',
          content: [
            {
              type: 'lesson',
              name: 'http-methods-status',
              title: 'HTTP Methods and Status Codes',
              description: 'Understanding REST semantics and proper HTTP usage',
              topics: [
                'HTTP methods (GET, POST, PUT, PATCH, DELETE) and idempotency',
                'Status code ranges and their meanings',
                'When to use which status code',
                'RESTful API design principles'
              ]
            },
            {
              type: 'lesson',
              name: 'headers-caching',
              title: 'Headers, Caching, and CDNs',
              description: 'HTTP headers, caching strategies, and content delivery',
              topics: [
                'Request and response headers',
                'Cache-Control, ETag, and conditional requests',
                'CDN caching strategies',
                'Invalidation patterns'
              ]
            },
            {
              type: 'lesson',
              name: 'security-cors',
              title: 'Security Headers and CORS',
              description: 'Cross-origin resource sharing and security best practices',
              topics: [
                'CORS and preflight requests',
                'Security headers (CSP, HSTS, X-Frame-Options)',
                'Cookie security (SameSite, Secure, HttpOnly)',
                'Common security vulnerabilities'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'chapter',
      name: 'databases',
      title: 'Track 2 — Database Design & Optimization',
      description: 'Database fundamentals, query optimization, and data modeling',
      content: [
        {
          type: 'lesson',
          name: 'database-fundamentals',
          title: 'Database Fundamentals',
          description: 'SQL vs NoSQL, ACID properties, and choosing the right database',
          topics: [
            'SQL vs NoSQL tradeoffs',
            'ACID properties and transactions',
            'CAP theorem basics',
            'When to use which database type'
          ]
        },
        {
          type: 'chapter',
          name: 'sql-mastery',
          title: '4. SQL and Query Optimization',
          description: 'Advanced SQL patterns and performance optimization',
          content: [
            {
              type: 'lesson',
              name: 'query-optimization',
              title: 'Query Optimization Techniques',
              description: 'Indexes, query plans, and performance tuning',
              topics: [
                'Index types (B-tree, hash, GiST, GIN)',
                'Query execution plans and EXPLAIN',
                'N+1 query problem and solutions',
                'Query batching and bulk operations'
              ]
            },
            {
              type: 'lesson',
              name: 'transactions-locking',
              title: 'Transactions and Locking',
              description: 'Transaction isolation levels and concurrency control',
              topics: [
                'Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)',
                'Optimistic vs pessimistic locking',
                'Deadlock detection and prevention',
                'Row-level vs table-level locking'
              ],
              difficulty: 'advanced'
            }
          ]
        }
      ]
    }
  ]
};
      id: 'web-platform',
      title: 'Track 1 — Web Platform & Networking (Core)',
      order: 2,
      lessons: [
        {
          title: 'The Web as a platform',
          topics: [
            'Web app vs website vs service vs API product',
            'Statelessness and where state lives (client/server/db/cache)',
            'Trust boundaries (origins/sites concept)',
            'Progressive enhancement and resilience mindset',
            'Architecture artifact: C4 Context diagram (actors + external systems)'
          ],
          duration: 25
        },
        {
          title: 'URLs, navigation, and request modes',
          topics: [
            'URL anatomy, canonicalization, deep-link stability',
            'Redirect semantics and why they matter operationally',
            'Navigation vs subresource vs API fetch implications',
            'History stack, reload types, back/forward cache conceptually',
            'Architecture artifact: URL + routing ownership map (browser/server)'
          ],
          duration: 30
        }
      ]
    }
  ]
};
