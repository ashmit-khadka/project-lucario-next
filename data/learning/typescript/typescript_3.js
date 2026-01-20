const LearningTypeScript3 = {
    title: "🚀 Advanced TypeScript Topics",
    description: "Explore advanced TypeScript features like conditional and mapped types, the `infer` keyword, declaration files, type packages, and compiler configuration.",
    sections: [
        {
            title: "14. 🔍 Advanced Type Manipulation",
            content: [
                {
                    type: "text",
                    content: "TypeScript allows powerful type transformations using conditional types, mapped types, and template literal types. These features help you build flexible and reusable type logic."
                },
                {
                    type: "list",
                    items: [
                        "Conditional types: `T extends U ? X : Y`.",
                        "Mapped types: `{ [K in keyof T]: ... }`.",
                        "Template literal types: ``type Event = `on${Capitalize<string>}` ``."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Advanced Type Manipulation (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `type IsString<T> = T extends string ? true : false;

type User = { id: number; name: string };
type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};

type Event = \`on\${Capitalize<'click' | 'hover'>}\`;
// Results in: "onClick" | "onHover"
`
                },
                {
                    type: "heading",
                    content: "Example: Advanced Type Manipulation (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid overly complex or unreadable conditional types
type Confusing<T> = T extends string ? (T extends number ? string : boolean) : number;

// Don't use mapped types without understanding property keys
type BadMapped = { [key: string]: number }; // Too broad, no key control
`
                }
            ]
        },
        {
            title: "15. 🔍 Infer and typeof in Types",
            content: [
                {
                    type: "text",
                    content: "`infer` allows you to extract types inside conditional types, while `typeof` enables referencing value types in your type definitions."
                },
                {
                    type: "list",
                    items: [
                        "Use `infer` to extract return types, array element types, etc.",
                        "`typeof` lets you refer to the type of a variable or function."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: infer & typeof (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function getUser() {
    return { id: 1, name: "Alice" };
}

type User = ReturnType<typeof getUser>;

type ElementType<T> = T extends (infer U)[] ? U : T;

type NumberElement = ElementType<number[]>; // number
`
                },
                {
                    type: "heading",
                    content: "Example: infer & typeof (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid excessive or confusing use of infer
type DeepInfer<T> = T extends Promise<infer U>
    ? U extends Array<infer V>
        ? V
        : U
    : T;

// Incorrect typeof usage
const user = { id: 1, name: "Bob" };
type UserType = typeof "user"; // Incorrect – gives 'string' not type of user
`
                }
            ]
        },
        {
            title: "16. 🔍 Declaration Files",
            content: [
                {
                    type: "text",
                    content: "Declaration files (`.d.ts`) allow you to define type information for JavaScript code or untyped modules. They're essential when working with legacy or third-party code."
                },
                {
                    type: "list",
                    items: [
                        "Use `.d.ts` to declare types for modules or global variables.",
                        "`declare module` is useful for 3rd-party packages without types.",
                        "Use `export` or `global` scope as needed."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Declaration Files (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// file: custom-lib.d.ts
declare module "custom-lib" {
    export function greet(name: string): string;
}

// Usage
import { greet } from "custom-lib";
greet("World");
`
                },
                {
                    type: "heading",
                    content: "Example: Declaration Files (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Don't put implementation in .d.ts files
// Bad: this file should only contain declarations
declare function greet(name: string) {
    return "Hi " + name;
}
`
                }
            ]
        },
        {
            title: "17. 🔍 Third-Party Types",
            content: [
                {
                    type: "text",
                    content: "TypeScript supports external type definitions through the DefinitelyTyped project. Install these with `@types` packages to enable type checking on third-party libraries."
                },
                {
                    type: "list",
                    items: [
                        "Use `npm install @types/library` for third-party type support.",
                        "DefinitelyTyped is the community-maintained source of type packages.",
                        "Types are automatically picked up if installed."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Third-Party Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Install types separately for non-TypeScript packages
// npm install lodash
// npm install --save-dev @types/lodash

import _ from "lodash";

_.chunk(["a", "b", "c", "d"], 2);
`
                },
                {
                    type: "heading",
                    content: "Example: Third-Party Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Don't use 'any' for external libraries with available types
const lodash: any = require("lodash");
lodash.map([1, 2, 3], x => x * 2); // No type safety
`
                }
            ]
        },
        {
            title: "18. 🔍 Configuration",
            content: [
                {
                    type: "text",
                    content: "The `tsconfig.json` file controls TypeScript’s compiler behavior. Understanding key options like `strict`, `paths`, and `moduleResolution` helps you write safer and more scalable projects."
                },
                {
                    type: "list",
                    items: [
                        "Use `strict: true` to enable all strict type checks.",
                        "`paths` and `baseUrl` let you define path aliases.",
                        "`moduleResolution` affects how modules are located.",
                        "Use `include` and `exclude` to control file compilation."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: tsconfig.json (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`
                },
                {
                    type: "heading",
                    content: "Example: tsconfig.json (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false // Loses safety
  }
}
// Avoid disabling strict checks in production
`
                }
            ]
        }
    ]
};

export default LearningTypeScript3;
