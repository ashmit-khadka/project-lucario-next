const LearningJavaScriptLesson1 = {
    title: "🧠 Core JavaScript Fundamentals",
    description: "Understand the most essential concepts in JavaScript to build better, more reliable code.",
    sections: [
        {
            title: "1. 🔡 Variables: `let`, `const`, and `var`",
            content: [
                {
                    type: "text",
                    content: "Variables are containers for storing data values. JavaScript provides three ways to declare them:"
                },
                {
                    type: "list",
                    items: [
                        "`let`: Block-scoped, can be reassigned.",
                        "`const`: Block-scoped, cannot be reassigned.",
                        "`var`: Function-scoped, can be reassigned (not recommended)."
                    ]
                },
                {
                    type: "heading",
                    content: "Example",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `let age = 25;\nconst name = "Sam";\nvar legacy = true;`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `let` for variables that will change.",
                        "Use `const` for constants or values that won't change.",
                        "Avoid using `var` to prevent scope issues."
                    ]
                }
            ]
        },
        {
            title: "2. 📊 Data Types: Primitives and Objects",
            content: [
                {
                    type: "text",
                    content: "JavaScript has 8 data types: 7 primitives and 1 object (referece) type. Understanding these is key to writing robust code."
                },
                {
                    type: "list",
                    items: [
                        "`number`: Represents numeric values, including special values like `NaN` and `Infinity`.",
                        "`bigint`: For integers larger than `2^53 - 1`. Declared with an `n` suffix (e.g., `123n`).",
                        "`string`: Represents text, enclosed in single, double, or backticks.",
                        "`boolean`: Represents `true` or `false`.",
                        "`undefined`: Default value for uninitialized variables.",
                        "`null`: Represents the intentional absence of value.",
                        "`symbol`: Unique and immutable value, often used as object keys.",
                        "`object`: Non-primitive type for collections of key-value pairs."
                    ]
                },
                {
                    type: "heading",
                    content: "Example",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const num = 42; // number\nconst big = 123n; // bigint\nconst text = "Hello"; // string\nconst isTrue = true; // boolean\nlet notDefined; // undefined\nconst empty = null; // null\nconst unique = Symbol("id"); // symbol\nconst obj = { key: "value" }; // object`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `typeof` to check data types, but note quirks like `typeof null === 'object'`.",
                        "Use `Array.isArray()` to check for arrays.",
                        "Prefer `BigInt` for large integers to avoid precision issues.",
                        "Avoid comparing `null` and `undefined` directly; use strict equality (`===`)."
                    ]
                }
            ]
        },
        {
            title: "3. 🔄 Type Coercion vs. Conversion",
            content: [
                {
                    type: "text",
                    content: "Type coercion and type conversion are two ways JavaScript handles type changes. Understanding the difference is crucial for avoiding bugs."
                },
                {
                    type: "list",
                    items: [
                        "**Type Coercion**: Implicit type conversion performed by JavaScript during operations (e.g., `1 + '2'` becomes `'12'`).",
                        "**Type Conversion**: Explicitly converting a value from one type to another using functions like `Number()`, `String()`, or `Boolean()`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Type Coercion",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `console.log(1 + '2'); // '12' (number coerced to string)\nconsole.log('5' - 2); // 3 (string coerced to number)`
                },
                {
                    type: "heading",
                    content: "Example: Type Conversion",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const num = Number('42'); // Explicit conversion to number\nconst str = String(42); // Explicit conversion to string\nconst bool = Boolean(1); // Explicit conversion to boolean`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Prefer **explicit type conversion** to avoid unexpected results.",
                        "Use `Number()` for numeric conversion, but handle `NaN` cases.",
                        "Use `Boolean()` to convert values to `true` or `false`.",
                        "Avoid relying on implicit coercion in complex expressions."
                    ]
                }
            ]
        },
        {
            title: "4. ➕ Operators: Arithmetic, Comparison, and Logical",
            content: [
                {
                    type: "text",
                    content: "Operators are used to perform operations on values and variables. JavaScript provides several types of operators for different purposes."
                },
                {
                    type: "list",
                    items: [
                        "**Arithmetic Operators**: Perform mathematical operations like addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).",
                        "**Comparison Operators**: Compare two values and return a boolean (`true` or `false`). Examples: `===`, `!==`, `>`, `<`.",
                        "**Logical Operators**: Combine or invert boolean values. Examples: `&&` (AND), `||` (OR), `!` (NOT).",
                        "**Assignment Operators**: Assign values to variables. Examples: `=`, `+=`, `-=`, `*=`, `/=`.",
                        "**Bitwise Operators**: Perform operations at the binary level. Examples: `&`, `|`, `^`, `~`.",
                        "**Ternary Operator**: A shorthand for `if-else`. Syntax: `condition ? valueIfTrue : valueIfFalse`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Arithmetic and Comparison",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const sum = 5 + 3; // 8\nconst isEqual = 10 === 10; // true\nconst isGreater = 15 > 10; // true`
                },
                {
                    type: "heading",
                    content: "Example: Logical and Ternary",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const isAdult = age >= 18 && age < 65; // Logical AND\nconst message = isAdult ? "You are an adult" : "You are not an adult"; // Ternary`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `===` and `!==` for strict equality and inequality checks to avoid type coercion.",
                        "Avoid using bitwise operators unless working with binary data.",
                        "Use parentheses to clarify complex logical expressions.",
                        "Prefer the ternary operator for simple conditional assignments."
                    ]
                }
            ]
        },
        {
            title: "5. 🔁 Control Flow: Loops and Conditionals",
            content: [
                {
                    type: "text",
                    content: "Control flow determines the order in which statements are executed in JavaScript. Loops and conditionals are key tools for managing control flow."
                },
                {
                    type: "list",
                    items: [
                        "**Conditionals**: Use `if`, `else if`, and `else` to execute code based on conditions.",
                        "**Switch Statements**: Use `switch` for multiple condition checks, especially when comparing the same variable.",
                        "**Loops**: Use `for`, `while`, and `do...while` to repeat code until a condition is met.",
                        "**For...of**: Iterate over iterable objects like arrays.",
                        "**For...in**: Iterate over object properties (not recommended for arrays).",
                        "**Break and Continue**: Use `break` to exit a loop and `continue` to skip the current iteration."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Conditionals",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const age = 20;\nif (age >= 18) {\n  console.log("You are an adult.");\n} else {\n  console.log("You are not an adult.");\n}`
                },
                {
                    type: "heading",
                    content: "Example: Loops",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const numbers = [1, 2, 3];\nfor (const num of numbers) {\n  console.log(num);\n}`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `if-else` for simple condition checks and `switch` for multiple cases.",
                        "Prefer `for...of` for iterating over arrays to avoid index-related bugs.",
                        "Avoid using `for...in` for arrays; it's better suited for objects.",
                        "Use `break` and `continue` sparingly to maintain readability.",
                        "Use `while` loops when the number of iterations is unknown."
                    ]
                }
            ]
        },
        {
            title: "6. 🛠️ Functions: Declarations, Expressions, and Arrow Functions",
            content: [
                {
                    type: "text",
                    content: "Functions are reusable blocks of code that perform specific tasks. JavaScript provides multiple ways to define functions."
                },
                {
                    type: "list",
                    items: [
                        "**Function Declaration**: Declares a named function that can be called anywhere in its scope.",
                        "**Function Expression**: Assigns a function to a variable. Can be anonymous or named.",
                        "**Arrow Function**: A concise syntax for writing functions. Does not bind its own `this`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Function Declaration",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("Alice")); // "Hello, Alice!"`
                },
                {
                    type: "heading",
                    content: "Example: Function Expression",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const greet = function(name) {\n  return \`Hello, \${name}!\`;\n};\nconsole.log(greet("Bob")); // "Hello, Bob!"`
                },
                {
                    type: "heading",
                    content: "Example: Arrow Function",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("Charlie")); // "Hello, Charlie!"`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use **function declarations** for named, reusable functions.",
                        "Use **arrow functions** for concise, one-liner functions or when you don't need `this` binding.",
                        "Avoid using **function expressions** unless necessary for closures or callbacks.",
                        "Always name your functions for better debugging and stack traces.",
                        "Use default parameters to handle missing arguments (e.g., `function greet(name = 'Guest')`)."
                    ]
                }
            ]
        },
        {
            title: "7. 🌐 Scope: Global, Local, and Block",
            content: [
                {
                    type: "text",
                    content: "Scope determines the accessibility of variables in different parts of your code. JavaScript has three main types of scope: global, local, and block."
                },
                {
                    type: "list",
                    items: [
                        "**Global Scope**: Variables declared outside any function or block are accessible everywhere in the code.",
                        "**Local Scope**: Variables declared inside a function are accessible only within that function.",
                        "**Block Scope**: Variables declared with `let` or `const` inside a block (`{}`) are accessible only within that block."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Global and Local Scope",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `let globalVar = "I am global";\n\nfunction exampleFunction() {\n  let localVar = "I am local";\n  console.log(globalVar); // Accessible\n  console.log(localVar); // Accessible\n}\n\nexampleFunction();\nconsole.log(globalVar); // Accessible\nconsole.log(localVar); // Error: localVar is not defined`
                },
                {
                    type: "heading",
                    content: "Example: Block Scope",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `if (true) {\n  let blockScoped = "I am block scoped";\n  console.log(blockScoped); // Accessible\n}\nconsole.log(blockScoped); // Error: blockScoped is not defined`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `let` and `const` to avoid polluting the global scope.",
                        "Minimize the use of global variables to reduce the risk of name collisions.",
                        "Use block scope (`let` or `const`) to limit variable accessibility to where it's needed.",
                        "Avoid using `var` as it does not respect block scope and can lead to unexpected behavior."
                    ]
                }
            ]
        },
        {
            title: "7. 🎣 Hoisting: Variable and Function Declarations",
            content: [
                {
                    type: "text",
                    content: "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. This applies to variables and functions."
                },
                {
                    type: "list",
                    items: [
                        "**Variable Hoisting**: Variables declared with `var` are hoisted but initialized as `undefined`. Variables declared with `let` and `const` are hoisted but not initialized.",
                        "**Function Hoisting**: Function declarations are hoisted with their definitions, making them accessible before their declaration in the code."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Variable Hoisting with `var`",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `console.log(a); // undefined\nvar a = 5;`
                },
                {
                    type: "heading",
                    content: "Example: Variable Hoisting with `let` and `const`",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `console.log(b); // ReferenceError: Cannot access 'b' before initialization\nlet b = 10;`
                },
                {
                    type: "heading",
                    content: "Example: Function Hoisting",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `greet(); // "Hello!"\n\nfunction greet() {\n  console.log("Hello!");\n}`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Avoid using `var` to prevent unexpected behavior due to hoisting.",
                        "Always declare variables with `let` or `const` at the top of their scope to make the code more predictable.",
                        "Declare functions before calling them to improve code readability.",
                        "Understand the temporal dead zone (TDZ) for `let` and `const` to avoid accessing variables before their declaration."
                    ]
                }
            ]
        },
        {
            title: "8. 🔒 Closures: Capturing Variables",
            content: [
                {
                    type: "text",
                    content: "A closure is a function that retains access to its outer scope, even after the outer function has finished executing. Closures are a powerful feature in JavaScript for managing state and creating private variables."
                },
                {
                    type: "list",
                    items: [
                        "**Definition**: A closure is created when a function is defined inside another function and accesses variables from the outer function's scope.",
                        "**Use Cases**: Closures are commonly used for data encapsulation, creating private variables, and implementing function factories or callbacks."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Basic Closure",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function outerFunction(outerVariable) {\n  return function innerFunction(innerVariable) {\n    console.log(\`Outer: \${outerVariable}, Inner: \${innerVariable}\`);\n  };\n}\n\nconst closureExample = outerFunction("outside");\nclosureExample("inside"); // Output: Outer: outside, Inner: inside`
                },
                {
                    type: "heading",
                    content: "Example: Private Variables",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function createCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use closures to encapsulate state and avoid polluting the global scope.",
                        "Be cautious with closures in loops; use `let` instead of `var` to avoid unexpected behavior.",
                        "Avoid creating unnecessary closures in performance-critical code to reduce memory usage.",
                        "Use closures to implement private variables and methods in JavaScript."
                    ]
                }
            ]
        },
        {
            title: "8. ⚠️ Error Handling: Try, Catch, and Throw",
            content: [
                {
                    type: "text",
                    content: "Error handling in JavaScript allows you to gracefully manage runtime errors and ensure your application continues to function as expected. The `try...catch` statement is the primary mechanism for handling errors."
                },
                {
                    type: "list",
                    items: [
                        "**try...catch**: Use `try` to execute code that might throw an error and `catch` to handle the error.",
                        "**throw**: Use `throw` to create custom errors.",
                        "**finally**: Use `finally` to execute code after `try` and `catch`, regardless of the outcome."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Basic Error Handling",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `try {\n  const result = riskyOperation();\n  console.log(result);\n} catch (error) {\n  console.error("An error occurred:", error.message);\n} finally {\n  console.log("Cleanup code runs here.");\n}`
                },
                {
                    type: "heading",
                    content: "Example: Throwing Custom Errors",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function divide(a, b) {\n  if (b === 0) {\n    throw new Error("Division by zero is not allowed.");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 0));\n} catch (error) {\n  console.error(error.message);\n}`
                },
                {
                    type: "heading",
                    content: "Best Practices",
                    variant: "do"
                },
                {
                    type: "list",
                    items: [
                        "Use `try...catch` to handle errors in critical sections of your code.",
                        "Avoid catching errors you cannot handle; let them propagate to higher levels.",
                        "Use `finally` for cleanup tasks like closing resources or resetting states.",
                        "Throw custom errors with meaningful messages to make debugging easier.",
                        "Log errors for monitoring and debugging purposes."
                    ]
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson1;