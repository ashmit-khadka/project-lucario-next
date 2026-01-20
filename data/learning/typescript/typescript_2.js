const LearningTypeScript2 = {
    title: "🛠 Intermediate TypeScript Concepts",
    description: "Dive deeper into TypeScript with powerful intermediate features like generics, enums, type assertions, modules, compatibility, and utility types.",
    sections: [
        {
            title: "8. 🧰 Generics",
            content: [
                {
                    type: "text",
                    content: "Generics allow you to write reusable code while keeping type safety. You can define generic functions, classes, and interfaces using `<T>`, and constrain them with `extends`. Default types improve flexibility."
                },
                {
                    type: "list",
                    items: [
                        "Use `<T>` to define a generic placeholder.",
                        "Constrain generics with `<T extends Constraint>`.",
                        "Set default types with `<T = DefaultType>`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Generics (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function identity<T>(value: T): T {
    return value;
}

interface ApiResponse<T> {
    data: T;
    success: boolean;
}

function wrapInArray<T = string>(value: T): T[] {
    return [value];
}

function printLength<T extends { length: number }>(item: T): void {
    console.log(item.length);
}`
                },
                {
                    type: "heading",
                    content: "Example: Generics (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function identity(value: any): any {
    return value; // Loses type safety
}

function printLength(item: any) {
    console.log(item.length); // No guarantee item has a 'length' property
}`
                }
            ]
        },
        {
            title: "9. 🧰 Enums and Literal Types",
            content: [
                {
                    type: "text",
                    content: "Enums and literal types allow you to define clear sets of values. TypeScript supports string and numeric enums, but they behave differently. Prefer literal types for simpler and safer alternatives."
                },
                {
                    type: "list",
                    items: [
                        "`enum` defines a set of named constants.",
                        "`const enum` is inlined at compile time for performance.",
                        "Use union literals (`'small' | 'medium' | 'large'`) for lightweight alternatives."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Enums & Literal Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `enum Status {
    Success = "success",
    Error = "error",
}

const enum Direction {
    Up,
    Down,
    Left,
    Right
}

type Size = "small" | "medium" | "large";

function printSize(size: Size) {
    console.log("Size:", size);
}`
                },
                {
                    type: "heading",
                    content: "Example: Enums & Literal Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `enum LooseEnum {
    A,
    B,
    C
}

function handle(status: LooseEnum) {
    console.log(status); // Could be any number (0, 1, 2), not very readable
}`
                }
            ]
        },
        {
            title: "10. 🧰 Type Assertion & Casting",
            content: [
                {
                    type: "text",
                    content: "Type assertions let you tell TypeScript to treat a value as a different type. Use `as Type` or `<Type>value`. You can also use the non-null assertion operator (`!`) when you're sure a value isn’t null or undefined."
                },
                {
                    type: "list",
                    items: [
                        "`as Type` is the preferred syntax.",
                        "Use `<Type>` in .ts files (avoid in .tsx).",
                        "Non-null assertions (`!`) should be used sparingly and carefully."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Type Assertion (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const input = document.querySelector("input") as HTMLInputElement;
input.value = "Hello";

const user = {} as { id: number; name: string };
user.id = 1;
user.name = "Alice";
`
                },
                {
                    type: "heading",
                    content: "Example: Type Assertion (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const el = document.querySelector("input")!;
el.value = 123; // Risky: assumes el exists and has 'value'

const data = "not a number" as unknown as number; // Avoid double assertions
`
                }
            ]
        },
        {
            title: "11. 🧰 Modules & Namespaces",
            content: [
                {
                    type: "text",
                    content: "Modules are the modern standard for organizing code. Avoid using namespaces in module-based code. Use `import` and `export` to structure reusable logic."
                },
                {
                    type: "list",
                    items: [
                        "Use `export` to expose functionality.",
                        "Use `import` to bring in external modules.",
                        "Avoid namespaces in module-based environments."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Modules (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// mathUtils.ts
export function add(a: number, b: number): number {
    return a + b;
}

// main.ts
import { add } from "./mathUtils";
console.log(add(2, 3));`
                },
                {
                    type: "heading",
                    content: "Example: Namespaces (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid in modern codebases
namespace MathUtils {
    export function subtract(a: number, b: number): number {
        return a - b;
    }
}
`
                }
            ]
        },
        {
            title: "12. 🧰 Type Compatibility",
            content: [
                {
                    type: "text",
                    content: "TypeScript uses structural typing, meaning types are compatible if their structure matches. It's important to understand excess property checks and how variance works."
                },
                {
                    type: "list",
                    items: [
                        "Structural typing compares shape, not names.",
                        "Excess property checks apply when passing object literals.",
                        "Covariance and contravariance affect assignability in functions."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Type Compatibility (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `type Point2D = { x: number; y: number; };
type Point3D = { x: number; y: number; z: number; };

const p3d: Point3D = { x: 1, y: 2, z: 3 };
const p2d: Point2D = p3d; // OK due to structural typing

function logMessage(msg: string | number): void {
    console.log(msg);
}`
                },
                {
                    type: "heading",
                    content: "Example: Type Compatibility (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function logStrings(callback: (val: string) => void) {
    callback("Hello");
}

const callbackWithAny = (val: any) => console.log(val);
logStrings(callbackWithAny); // Works, but unsafe

// Excess property check issue
type Person = { name: string; age: number };
const person: Person = { name: "Alice", age: 30, email: "alice@example.com" }; // Error: extra property
`
                }
            ]
        },
        {
            title: "13. 🧰 Type Utilities",
            content: [
                {
                    type: "text",
                    content: "TypeScript provides built-in utility types to transform existing types: `Partial`, `Pick`, `Omit`, `Readonly`, and others. You can also create custom utility types using conditional and mapped types."
                },
                {
                    type: "list",
                    items: [
                        "`Partial<T>` makes all properties optional.",
                        "`Pick<T, K>` selects a subset of properties.",
                        "`Omit<T, K>` removes specific properties.",
                        "`Readonly<T>` makes properties immutable.",
                        "Custom utility types are powerful for abstraction."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Utility Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `type User = {
    id: number;
    name: string;
    email: string;
};

type PartialUser = Partial<User>;
type UserNameOnly = Pick<User, "name">;
type UserWithoutEmail = Omit<User, "email">;
type ReadonlyUser = Readonly<User>;

// Custom utility type
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};
`
                },
                {
                    type: "heading",
                    content: "Example: Utility Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `type User = {
    id: number;
    name: string;
};

// Avoid manually redefining utilities
type ManualPartialUser = {
    id?: number;
    name?: string;
};

// Avoid overly generic custom types
type Weird<T> = any; // Defeats type safety
`
                }
            ]
        }
    ]
};

export default LearningTypeScript2;
