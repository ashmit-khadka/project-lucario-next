const LearningJavaScriptLesson2 = {
    title: "📦 Advanced JavaScript Concepts",
    description: "Dive deeper into JavaScript with advanced concepts to write more efficient and scalable code.",
    sections: [
        {
            title: "1. 🧠 Execution Contexts & Lexical Environments",
            content: [
                {
                    type: "text",
                    content: "Execution contexts and lexical environments are fundamental to understanding how JavaScript code is executed and how variables are resolved."
                },
                {
                    type: "list",
                    items: [
                        "**Execution Context**: The environment in which JavaScript code is executed. Includes global, function, and eval contexts.",
                        "**Lexical Environment**: The structure that holds variable bindings and their scope."
                    ]
                },
                {
                    type: "heading",
                    content: "Example",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function outer() {\n  let outerVar = "I'm outer";\n  function inner() {\n    console.log(outerVar); // Accesses outerVar from the lexical environment\n  }\n  inner();\n}\nouter();`
                }
            ]
        },
        {
            title: "2. 🔒 Closures (and Practical Use-Cases)",
            content: [
                {
                    type: "text",
                    content: "Closures allow functions to retain access to their outer scope even after the outer function has executed."
                },
                {
                    type: "list",
                    items: [
                        "**Definition**: A closure is created when a function accesses variables from its outer scope.",
                        "**Use Cases**: Data encapsulation, private variables, and function factories."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Private Variables",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function createCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`
                }
            ]
        },
        {
            title: "3. 🔑 this Keyword",
            content: [
                {
                    type: "text",
                    content: "The `this` keyword refers to the object that is currently executing the function. Its value depends on how the function is called."
                },
                {
                    type: "list",
                    items: [
                        "**Global Context**: `this` refers to the global object (`window` in browsers).",
                        "**Function Context**: Depends on how the function is invoked.",
                        "**Arrow Functions**: Do not have their own `this`; they inherit it from their enclosing scope.",
                        "**Class Context**: Refers to the instance of the class."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Arrow Function vs Regular Function",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const obj = {\n  name: "Alice",\n  regularFunction: function () {\n    console.log(this.name); // "Alice"\n  },\n  arrowFunction: () => {\n    console.log(this.name); // undefined (inherits from global scope)\n  }\n};\nobj.regularFunction();\nobj.arrowFunction();`
                }
            ]
        },
        {
            title: "4. 🔗 Bind, Call, Apply",
            content: [
                {
                    type: "text",
                    content: "These methods allow you to explicitly set the value of `this` when calling a function."
                },
                {
                    type: "list",
                    items: [
                        "**bind()**: Returns a new function with `this` set to the specified object.",
                        "**call()**: Calls a function with `this` set to the specified object and arguments passed individually.",
                        "**apply()**: Similar to `call()`, but arguments are passed as an array."
                    ]
                },
                {
                    type: "heading",
                    content: "Example",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function greet(greeting) {\n  console.log(\`\${greeting}, \${this.name}!\`);\n}\nconst person = { name: "Alice" };\ngreet.call(person, "Hello"); // "Hello, Alice!"\ngreet.apply(person, ["Hi"]); // "Hi, Alice!"\nconst boundGreet = greet.bind(person);\nboundGreet("Hey"); // "Hey, Alice!"`
                }
            ]
        },
        {
            title: "5. 🧬 Prototype Chain & Inheritance",
            content: [
                {
                    type: "text",
                    content: "The prototype chain is a mechanism by which objects inherit properties and methods from other objects."
                },
                {
                    type: "list",
                    items: [
                        "**Prototype**: Every JavaScript object has a prototype from which it can inherit properties.",
                        "**Inheritance**: Objects can inherit from other objects using the prototype chain."
                    ]
                },
                {
                    type: "heading",
                    content: "Example",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  console.log(\`Hello, \${this.name}!\`);\n};\nconst alice = new Person("Alice");\nalice.greet(); // "Hello, Alice!"`
                }
            ]
        },
        {
            title: "6. 🏛️ Object-Oriented Programming (OOP) in JS",
            content: [
                {
                    type: "text",
                    content: "JavaScript supports OOP principles like encapsulation, inheritance, and polymorphism using classes and prototypes."
                },
                {
                    type: "heading",
                    content: "Example: Class Syntax",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    console.log(\`Hello, \${this.name}!\`);\n  }\n}\nconst alice = new Person("Alice");\nalice.greet(); // "Hello, Alice!"`
                }
            ]
        },
        {
            title: "7. 🌀 Functional Programming (FP) in JS",
            content: [
                {
                    type: "text",
                    content: "Functional programming emphasizes immutability, pure functions, and function composition."
                },
                {
                    type: "list",
                    items: [
                        "**Pure Functions**: Functions that do not modify external state.",
                        "**Immutability**: Avoid modifying data; create new copies instead.",
                        "**Composition**: Combine smaller functions to build more complex ones."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Pure Function",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3)); // 5`
                }
            ]
        },
        {
            title: "8. 🔗 Currying, Composition, Pure Functions",
            content: [
                {
                    type: "text",
                    content: "Currying and composition are techniques to build reusable and modular functions."
                },
                {
                    type: "heading",
                    content: "Example: Currying",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args);\n    } else {\n      return (...nextArgs) => curried(...args, ...nextArgs);\n    }\n  };\n}\nconst add = (a, b) => a + b;\nconst curriedAdd = curry(add);\nconsole.log(curriedAdd(2)(3)); // 5`
                }
            ]
        },
        {
            title: "9. 🛡️ Immutability & State Management",
            content: [
                {
                    type: "text",
                    content: "Immutability ensures that data is not modified directly, which is crucial for predictable state management."
                },
                {
                    type: "heading",
                    content: "Example: Using Object.freeze",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const obj = Object.freeze({ name: "Alice" });\nobj.name = "Bob"; // Error in strict mode\nconsole.log(obj.name); // "Alice"`
                }
            ]
        },
        {
            title: "10. 📦 Modules (CommonJS, ES Modules, Dynamic Imports)",
            content: [
                {
                    type: "text",
                    content: "Modules allow you to organize your code into reusable pieces."
                },
                {
                    type: "list",
                    items: [
                        "**CommonJS**: Used in Node.js (`require` and `module.exports`).",
                        "**ES Modules**: Standardized module system (`import` and `export`).",
                        "**Dynamic Imports**: Load modules dynamically using `import()`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: ES Modules",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// math.js\nexport function add(a, b) {\n  return a + b;\n}\n\n// main.js\nimport { add } from './math.js';\nconsole.log(add(2, 3)); // 5`
                }
            ]
        },
        {
            title: "11. ♻️ Garbage Collection",
            content: [
                {
                    type: "text",
                    content: "Garbage collection is the process of automatically reclaiming memory that is no longer in use."
                },
                {
                    type: "list",
                    items: [
                        "**Mark-and-Sweep Algorithm**: The most common garbage collection algorithm in JavaScript.",
                        "**Best Practices**: Avoid memory leaks by cleaning up references to unused objects."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Avoiding Memory Leaks",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `let obj = {};\nfunction createLeak() {\n  obj.leak = obj; // Circular reference\n}\ncreateLeak();\nobj = null; // Break the reference to allow garbage collection`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson2;