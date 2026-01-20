const LearningJavaScriptLesson13 = {
    title: "✨ Modern JavaScript Features (ES6+)",
    description: "Explore essential modern JavaScript features introduced in ES6 and beyond to write cleaner, more efficient code.",
    sections: [
        {
            title: "1. 🧩 Destructuring",
            content: [
                {
                    type: "text",
                    content: "Destructuring allows you to extract values from arrays or properties from objects into distinct variables."
                },
                {
                    type: "heading",
                    content: "Example: Array Destructuring",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const [a, b] = [1, 2];\nconsole.log(a, b); // 1, 2`
                },
                {
                    type: "heading",
                    content: "Example: Object Destructuring",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const user = { name: "Alice", age: 25 };\nconst { name, age } = user;\nconsole.log(name, age); // Alice, 25`
                }
            ]
        },
        {
            title: "2. 🌟 Spread & Rest",
            content: [
                {
                    type: "text",
                    content: "The spread operator (`...`) expands arrays or objects, while the rest operator collects remaining elements into an array."
                },
                {
                    type: "heading",
                    content: "Example: Spread Operator",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconsole.log(arr2); // [1, 2, 3, 4]`
                },
                {
                    type: "heading",
                    content: "Example: Rest Operator",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function sum(...numbers) {\n  return numbers.reduce((acc, num) => acc + num, 0);\n}\nconsole.log(sum(1, 2, 3)); // 6`
                }
            ]
        },
        {
            title: "3. ❓ Optional Chaining",
            content: [
                {
                    type: "text",
                    content: "Optional chaining (`?.`) allows you to safely access deeply nested properties without worrying about `undefined` errors."
                },
                {
                    type: "heading",
                    content: "Example: Optional Chaining",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const user = { profile: { name: "Alice" } };\nconsole.log(user.profile?.name); // Alice\nconsole.log(user.address?.city); // undefined`
                }
            ]
        },
        {
            title: "4. 🤔 Nullish Coalescing",
            content: [
                {
                    type: "text",
                    content: "The nullish coalescing operator (`??`) provides a default value only when the left-hand side is `null` or `undefined`."
                },
                {
                    type: "heading",
                    content: "Example: Nullish Coalescing",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const value = null;\nconst defaultValue = value ?? "Default";\nconsole.log(defaultValue); // Default`
                }
            ]
        },
        {
            title: "5. 📦 Dynamic Imports",
            content: [
                {
                    type: "text",
                    content: "Dynamic imports allow you to load modules on demand, improving performance by reducing the initial bundle size."
                },
                {
                    type: "heading",
                    content: "Example: Dynamic Imports",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const loadModule = async () => {\n  const module = await import("./module.js");\n  module.default();\n};\n\nloadModule();`
                }
            ]
        },
        {
            title: "6. 🔄 Async Iterators",
            content: [
                {
                    type: "text",
                    content: "Async iterators allow you to work with asynchronous data streams using `for await...of` loops."
                },
                {
                    type: "heading",
                    content: "Example: Async Iterators",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `async function* fetchData() {\n  yield "Data 1";\n  yield "Data 2";\n}\n\n(async () => {\n  for await (const data of fetchData()) {\n    console.log(data);\n  }\n})();`
                }
            ]
        },
        {
            title: "7. 🗂️ WeakMap & WeakSet",
            content: [
                {
                    type: "text",
                    content: "WeakMap and WeakSet store weakly referenced objects, allowing them to be garbage collected when no longer needed."
                },
                {
                    type: "heading",
                    content: "Example: WeakMap",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const weakMap = new WeakMap();\nconst obj = {};\nweakMap.set(obj, "value");\nconsole.log(weakMap.get(obj)); // value`
                },
                {
                    type: "heading",
                    content: "Example: WeakSet",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const weakSet = new WeakSet();\nconst obj = {};\nweakSet.add(obj);\nconsole.log(weakSet.has(obj)); // true`
                }
            ]
        },
        {
            title: "8. 🔑 Symbol",
            content: [
                {
                    type: "text",
                    content: "Symbols are unique and immutable values often used as object property keys to avoid naming collisions."
                },
                {
                    type: "heading",
                    content: "Example: Using Symbols",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const sym = Symbol("unique");\nconst obj = { [sym]: "value" };\nconsole.log(obj[sym]); // value`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson13;