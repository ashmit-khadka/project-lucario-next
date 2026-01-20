const LearningJavaScriptLesson3 = {
    title: "🌐 DOM & Browser APIs",
    description: "Learn how to interact with the DOM and leverage browser APIs to build dynamic and responsive web applications.",
    sections: [
        {
            title: "1. 🌳 DOM Traversal & Manipulation",
            content: [
                {
                    type: "text",
                    content: "The DOM (Document Object Model) represents the structure of a web page. Traversal and manipulation allow you to dynamically interact with and modify the page."
                },
                {
                    type: "list",
                    items: [
                        "**Traversal**: Use methods like `querySelector`, `getElementById`, and `children` to navigate the DOM.",
                        "**Manipulation**: Modify elements using properties like `innerHTML`, `textContent`, and `style`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Traversal & Manipulation",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const element = document.querySelector("#myElement");\nelement.textContent = "Updated Text";\nelement.style.color = "blue";`
                },
                {
                    type: "heading",
                    content: "Don't: Directly Modify HTML Without Validation",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `document.body.innerHTML = "<script>alert('XSS');</script>"; // Vulnerable to XSS attacks`
                }
            ]
        },
        {
            title: "2. 🎉 Events & Event Delegation",
            content: [
                {
                    type: "text",
                    content: "Events allow you to respond to user interactions. Event delegation is a technique to handle events efficiently by attaching a single listener to a parent element."
                },
                {
                    type: "list",
                    items: [
                        "**Event Listeners**: Use `addEventListener` to attach event handlers.",
                        "**Event Delegation**: Use event bubbling to handle events on dynamically added elements."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Event Delegation",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `document.querySelector("#parent").addEventListener("click", (event) => {\n  if (event.target.matches(".child")) {\n    console.log("Child clicked:", event.target);\n  }\n});`
                },
                {
                    type: "heading",
                    content: "Don't: Attach Listeners to Every Child",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `document.querySelectorAll(".child").forEach((child) => {\n  child.addEventListener("click", () => {\n    console.log("Child clicked");\n  });\n}); // Inefficient for large or dynamic lists`
                }
            ]
        },
        {
            title: "3. 🌐 Web APIs (localStorage, fetch, etc.)",
            content: [
                {
                    type: "text",
                    content: "Web APIs provide powerful tools for interacting with the browser and the web, such as storing data or making network requests."
                },
                {
                    type: "list",
                    items: [
                        "**localStorage**: Store key-value pairs in the browser.",
                        "**fetch**: Make HTTP requests to retrieve or send data.",
                        "**Geolocation API**: Access the user's location."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using fetch",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `fetch("https://api.example.com/data")\n  .then((response) => response.json())\n  .then((data) => console.log(data))\n  .catch((error) => console.error("Error:", error));`
                },
                {
                    type: "heading",
                    content: "Don't: Store Sensitive Data in localStorage",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `localStorage.setItem("password", "123456"); // Avoid storing sensitive data in localStorage`
                }
            ]
        },
        {
            title: "4. ⏱️ Timers (setTimeout, setInterval, requestAnimationFrame)",
            content: [
                {
                    type: "text",
                    content: "Timers allow you to schedule code execution after a delay or at regular intervals."
                },
                {
                    type: "list",
                    items: [
                        "**setTimeout**: Executes code after a specified delay.",
                        "**setInterval**: Repeats code execution at regular intervals.",
                        "**requestAnimationFrame**: Optimized for animations."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using requestAnimationFrame",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function animate() {\n  console.log("Animating...");\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);`
                },
                {
                    type: "heading",
                    content: "Don't: Use setInterval for Animations",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `setInterval(() => {\n  console.log("Animating...");\n}, 16); // Less efficient than requestAnimationFrame`
                }
            ]
        },
        {
            title: "5. 📝 Forms & Validation",
            content: [
                {
                    type: "text",
                    content: "Forms are essential for user input. Validation ensures the data entered is correct before submission."
                },
                {
                    type: "list",
                    items: [
                        "**HTML5 Validation**: Use attributes like `required` and `pattern`.",
                        "**Custom Validation**: Use JavaScript to validate complex rules."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Custom Validation",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const form = document.querySelector("#myForm");\nform.addEventListener("submit", (event) => {\n  const input = form.querySelector("#email");\n  if (!input.value.includes("@")) {\n    event.preventDefault();\n    alert("Invalid email address!");\n  }\n});`
                },
                {
                    type: "heading",
                    content: "Don't: Rely Solely on Client-Side Validation",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Server-side validation is crucial to prevent malicious input\nform.addEventListener("submit", (event) => {\n  // Client-side validation only\n});`
                }
            ]
        },
        {
            title: "6. 🛠️ Web Workers",
            content: [
                {
                    type: "text",
                    content: "Web Workers allow you to run JavaScript in a background thread, improving performance for heavy computations."
                },
                {
                    type: "heading",
                    content: "Example: Using a Web Worker",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// worker.js\nself.onmessage = (event) => {\n  const result = event.data * 2;\n  self.postMessage(result);\n};\n\n// main.js\nconst worker = new Worker("worker.js");\nworker.onmessage = (event) => {\n  console.log("Result:", event.data);\n};\nworker.postMessage(5);`
                }
            ]
        },
        {
            title: "7. 👀 IntersectionObserver & ResizeObserver",
            content: [
                {
                    type: "text",
                    content: "These APIs allow you to observe changes in element visibility or size, enabling efficient handling of dynamic content."
                },
                {
                    type: "list",
                    items: [
                        "**IntersectionObserver**: Detect when an element enters or exits the viewport.",
                        "**ResizeObserver**: Detect changes to an element's size."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using IntersectionObserver",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach((entry) => {\n    if (entry.isIntersecting) {\n      console.log("Element is visible:", entry.target);\n    }\n  });\n});\nobserver.observe(document.querySelector("#myElement"));`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson3;