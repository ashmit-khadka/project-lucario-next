const LearningTypeScriptLesson1 = {
    title: "🧠 Core TypeScript Essentials",
    description: "Master the core concepts of TypeScript including basic types, arrays & tuples, object type definitions, functions, union & intersection types, type narrowing, and the differences between interfaces and type aliases.",
    sections: [
        {
            title: "1. ✅ Basic Types",
            content: [
                {
                    type: "text",
                    content: "TypeScript provides a set of basic types to add type safety to your variables. It supports standard types like `string`, `number`, `boolean`, `null`, and `undefined`, and also introduces special types like `any`, `unknown`, and `never`. It’s important to understand type inference versus explicit typing."
                },
                {
                    type: "list",
                    items: [
                        "`string`, `number`, `boolean`, `null`, `undefined` – the fundamental types.",
                        "`any` bypasses type checking, while `unknown` is safer as it forces type validation.",
                        "`never` represents values that never occur.",
                        "Use explicit types when clarity or precision is needed, but type inference can reduce verbosity."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Basic Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Explicit typing and type inference in TypeScript
let firstName: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// Type inference: TypeScript infers 'city' as string
let city = "New York";

// Using 'unknown' for safer values
let data: unknown = "Hello";
// Type guard ensures safe usage of 'data'
if (typeof data === "string") {
    console.log(data.toUpperCase());
}`
                },
                {
                    type: "heading",
                    content: "Example: Basic Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid using 'any' unless absolutely necessary
let userData: any = "This might be anything";
userData = 42;
userData = { name: "Bob" };

// Incorrect explicit type usage leads to errors:
let score: number = "High"; // Error: Type 'string' is not assignable to type 'number'
`
                }
            ]
        },
        {
            title: "2. ✅ Arrays & Tuples",
            content: [
                {
                    type: "text",
                    content: "TypeScript supports arrays with two syntaxes: using `[]` or the generic `Array<Type>`. It also provides tuples, which are fixed-length arrays with specified types for each element."
                },
                {
                    type: "list",
                    items: [
                        "`string[]` and `Array<string>` are equivalent.",
                        "Tuples can be used to represent an array with fixed types, like `[string, number]`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Arrays & Tuples (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Correct use of array types
let fruits: string[] = ["apple", "banana", "cherry"];
let fruitsAlt: Array<string> = ["apple", "banana", "cherry"];

// Using a tuple with specified types
let personInfo: [string, number] = ["Alice", 30];
`
                },
                {
                    type: "heading",
                    content: "Example: Arrays & Tuples (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid mixing types in arrays if they are meant to be homogeneous
let mixedArray: string[] = ["apple", "banana", 42]; // Error: number is not assignable to string

// Incorrect tuple definition: Wrong order or length
let invalidTuple: [string, number] = [25, "Alice"]; // Error: types are swapped
`
                }
            ]
        },
        {
            title: "3. ✅ Objects and Type Aliases",
            content: [
                {
                    type: "text",
                    content: "Objects in TypeScript can be described using type literals, type aliases, or interfaces. This section covers key differences such as optional properties, readonly modifiers, and index signatures."
                },
                {
                    type: "list",
                    items: [
                        "Use type aliases for union types or when a simple object type definition is enough.",
                        "Interfaces are extendable and support declaration merging.",
                        "Mark properties as `optional` using `?` and as `readonly` to prevent reassignment.",
                        "Use index signatures to define types for properties with unknown names."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Objects & Type Aliases (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Using type alias with optional and readonly properties
type User = {
    readonly id: number;
    name: string;
    email?: string;  // Optional property
};

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

// Using index signatures to allow extra properties
type StringDictionary = {
    [key: string]: string;
};

const settings: StringDictionary = { theme: "dark", language: "en" };
`
                },
                {
                    type: "heading",
                    content: "Example: Objects & Type Aliases (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Overly permissive use of any and missing readonly protection
type LooseUser = {
    id: number;
    name: any;
};

let looseUser: LooseUser = { id: 1, name: "Bob" };
looseUser.name = 42;  // No error, but likely unintended

// Incorrect index signature usage leads to type conflicts
type FaultyDictionary = {
    [key: string]: number;
};
const faulty: FaultyDictionary = { theme: "dark" };  // Error: string is not assignable to number
`
                }
            ]
        },
        {
            title: "4. ✅ Functions",
            content: [
                {
                    type: "text",
                    content: "Functions in TypeScript can have explicitly typed parameters and return types. They also support optional/default parameters, rest parameters, and differentiate between returning `void` and `never`."
                },
                {
                    type: "list",
                    items: [
                        "Always specify parameter and return types for clarity.",
                        "Use optional (`?`) or default parameters for flexibility.",
                        "Use rest parameters to handle a variable number of arguments.",
                        "`void` is for functions that return nothing, and `never` for functions that do not return at all."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Functions (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Correctly typed function with parameters and return type
function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string = "Guest"): void {
    console.log("Hello, " + name);
}

function logAll(...items: string[]): void {
    items.forEach(item => console.log(item));
}

// A function that never returns (e.g., throws an error)
function throwError(message: string): never {
    throw new Error(message);
}
`
                },
                {
                    type: "heading",
                    content: "Example: Functions (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Omitting types can lead to unintended behavior
function subtract(a, b) {  // 'a' and 'b' are implicitly any
    return a - b;
}

// Incorrectly marked function: supposed to return a value but declared as void
function faultyMultiply(a: number, b: number): void {
    return a * b;  // Error: Type 'number' is not assignable to type 'void'
}
`
                }
            ]
        },
        {
            title: "5. ✅ Union & Intersection Types",
            content: [
                {
                    type: "text",
                    content: "Union types allow a variable to hold values of multiple types, while intersection types combine multiple types into one. They are powerful tools for building flexible and robust type definitions."
                },
                {
                    type: "list",
                    items: [
                        "Union types using the `|` operator: e.g., `type Status = \"success\" | \"error\"`.",
                        "Intersection types using the `&` operator: e.g., `type Admin = User & { adminLevel: number }`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Union & Intersection Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Union type for status
type Status = "success" | "error";

function handleStatus(status: Status): void {
    if (status === "success") {
        console.log("Operation was successful.");
    } else {
        console.log("There was an error.");
    }
}

// Intersection type combining User and Admin properties
type User = { id: number; name: string; };
type Admin = User & { adminLevel: number; };

const adminUser: Admin = { id: 1, name: "Alice", adminLevel: 2 };
`
                },
                {
                    type: "heading",
                    content: "Example: Union & Intersection Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid loose union types that allow unwanted values
type LooseStatus = string; // Too broad – should restrict to specific values

// Incorrect intersection that conflicts in types
type A = { value: string; };
type B = { value: number; };
type FaultyIntersection = A & B;
const faulty: FaultyIntersection = { value: "conflict" }; // Error: Type 'string' is not assignable to type 'number'
`
                }
            ]
        },
        {
            title: "6. ✅ Type Narrowing",
            content: [
                {
                    type: "text",
                    content: "Type narrowing in TypeScript helps you work safely with union types and unknown values. It uses built-in operators like `typeof` and `instanceof`, along with discriminated unions and custom type guards."
                },
                {
                    type: "list",
                    items: [
                        "Use `typeof` for primitives and `instanceof` for objects.",
                        "Discriminated unions add a literal type property to enable narrowing.",
                        "Custom type guards can improve readability and safety."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Type Narrowing (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Using typeof for type narrowing
function processValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}

// Discriminated union for safe narrowing
interface Success {
    status: "success";
    data: string;
}
interface Failure {
    status: "error";
    error: string;
}
type Response = Success | Failure;

function handleResponse(res: Response) {
    if (res.status === "success") {
        console.log("Data:", res.data);
    } else {
        console.error("Error:", res.error);
    }
}
`
                },
                {
                    type: "heading",
                    content: "Example: Type Narrowing (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid using 'any' or not narrowing types properly
function unsafeProcess(value: any) {
    // No type checks: can cause runtime errors
    console.log(value.toUpperCase());
}
`
                }
            ]
        },
        {
            title: "7. ✅ Interfaces vs Types",
            content: [
                {
                    type: "text",
                    content: "Both interfaces and type aliases can be used to define object shapes in TypeScript. However, interfaces support declaration merging and extension, making them ideal for defining contracts, while type aliases offer more flexibility with unions, intersections, and primitives."
                },
                {
                    type: "list",
                    items: [
                        "Use interfaces when you need extendability and merging.",
                        "Use type aliases for unions, intersections, and more complex types.",
                        "You can extend interfaces and types for reusability."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Interfaces vs Types (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Interface with merging and extension
interface Person {
    name: string;
    age: number;
}
interface Person {
    email?: string;  // Merging properties into the same interface
}

const person: Person = { name: "Alice", age: 30, email: "alice@example.com" };

// Type alias for unions and intersections
type Vehicle = { wheels: number; };
type Car = Vehicle & { model: string; };

const myCar: Car = { wheels: 4, model: "Sedan" };
`
                },
                {
                    type: "heading",
                    content: "Example: Interfaces vs Types (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid overcomplicating when merging is needed but using type aliases instead
type User = { id: number; name: string; };
type ExtendedUser = User & { role: string; } & { permissions: string[]; };

const user: ExtendedUser = { id: 1, name: "Bob", role: "admin", permissions: ["read", "write"] };
// While this works, interfaces would be cleaner if merging or extension is desired.
`
                }
            ]
        }
    ]
};

export default LearningTypeScriptLesson1;
