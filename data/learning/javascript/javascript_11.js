const LearningJavaScriptLesson11 = {
    title: "🚀 Performance Optimization in JavaScript",
    description: "Learn techniques to optimize JavaScript performance, reduce memory usage, and improve application responsiveness.",
    sections: [
        {
            title: "1. 🧠 Memory Leaks",
            content: [
                {
                    type: "text",
                    content: "Memory leaks occur when objects are no longer needed but are still referenced, preventing garbage collection."
                },
                {
                    type: "list",
                    items: [
                        "**Common Causes**: Global variables, event listeners not removed, closures holding references.",
                        "**Prevention**: Use `WeakMap`/`WeakSet`, remove unused event listeners, and avoid excessive global variables."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Avoiding Memory Leaks",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function attachListener() {\n  const button = document.getElementById("myButton");\n  const handleClick = () => console.log("Clicked!");\n  button.addEventListener("click", handleClick);\n\n  // Remove listener to prevent memory leaks\n  return () => button.removeEventListener("click", handleClick);\n}\nconst detach = attachListener();\ndetach();`
                }
            ]
        },
        {
            title: "2. 🎨 Reflows/Repaints",
            content: [
                {
                    type: "text",
                    content: "Reflows and repaints are expensive operations triggered by changes to the DOM or CSS."
                },
                {
                    type: "list",
                    items: [
                        "**Reflow**: Occurs when the layout of the page changes.",
                        "**Repaint**: Occurs when visual styles (e.g., color) change without affecting layout.",
                        "**Optimization**: Batch DOM updates, use `classList` for style changes, and avoid inline styles."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Minimizing Reflows",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const list = document.getElementById("list");\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 100; i++) {\n  const item = document.createElement("li");\n  item.textContent = \`Item \${i}\`;\n  fragment.appendChild(item);\n}\nlist.appendChild(fragment); // Single reflow`
                }
            ]
        },
        {
            title: "3. ⏱️ Debounce/Throttle",
            content: [
                {
                    type: "text",
                    content: "Debouncing and throttling control the frequency of function execution to improve performance during high-frequency events."
                },
                {
                    type: "heading",
                    content: "Example: Debouncing",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function debounce(func, delay) {\n  let timeout;\n  return function (...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n\nconst log = debounce(() => console.log("Debounced!"), 300);\nwindow.addEventListener("resize", log);`
                },
                {
                    type: "heading",
                    content: "Example: Throttling",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function throttle(func, limit) {\n  let lastFunc;\n  let lastRan;\n  return function (...args) {\n    const context = this;\n    if (!lastRan) {\n      func.apply(context, args);\n      lastRan = Date.now();\n    } else {\n      clearTimeout(lastFunc);\n      lastFunc = setTimeout(() => {\n        if (Date.now() - lastRan >= limit) {\n          func.apply(context, args);\n          lastRan = Date.now();\n        }\n      }, limit - (Date.now() - lastRan));\n    }\n  };\n}\n\nconst log = throttle(() => console.log("Throttled!"), 300);\nwindow.addEventListener("scroll", log);`
                }
            ]
        },
        {
            title: "4. 💤 Lazy Evaluation",
            content: [
                {
                    type: "text",
                    content: "Lazy evaluation delays the computation of a value until it is actually needed, improving performance."
                },
                {
                    type: "heading",
                    content: "Example: Lazy Loading Images",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="Lazy Loaded Image">\n\n// JavaScript for lazy loading\nconst images = document.querySelectorAll("img[data-src]");\nimages.forEach((img) => {\n  img.onload = () => img.removeAttribute("data-src");\n  img.src = img.dataset.src;\n});`
                }
            ]
        },
        {
            title: "5. ⚡ Efficient DOM Access",
            content: [
                {
                    type: "text",
                    content: "Efficient DOM access reduces the number of interactions with the DOM, improving performance."
                },
                {
                    type: "list",
                    items: [
                        "**Use Selectors Wisely**: Use `getElementById` or `querySelector` for faster access.",
                        "**Cache DOM Elements**: Store references to frequently accessed elements.",
                        "**Minimize DOM Traversal**: Avoid repeatedly traversing the DOM."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Caching DOM Elements",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const button = document.getElementById("myButton");\nbutton.addEventListener("click", () => {\n  console.log("Button clicked!");\n});`
                }
            ]
        },
        {
            title: "6. 📦 Code Splitting",
            content: [
                {
                    type: "text",
                    content: "Code splitting divides your JavaScript code into smaller chunks, loading only what is needed to improve performance."
                },
                {
                    type: "heading",
                    content: "Example: Code Splitting with Dynamic Imports",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Dynamically import a module\nconst loadModule = async () => {\n  const module = await import("./module.js");\n  module.default();\n};\n\n// Load the module when needed\nconst button = document.getElementById("loadButton");\nbutton.addEventListener("click", loadModule);`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson11;