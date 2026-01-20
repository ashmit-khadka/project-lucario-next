const LearningJavaScriptLesson8 = {
    title: "🛠️ Testing & Debugging in JavaScript",
    description: "Learn how to debug JavaScript code effectively and write tests to ensure code quality and reliability.",
    sections: [
        {
            title: "1. 🐞 Debugging with DevTools",
            content: [
                {
                    type: "text",
                    content: "The browser's DevTools provide powerful debugging features to inspect and debug JavaScript code."
                },
                {
                    type: "list",
                    items: [
                        "**Breakpoints**: Pause code execution at specific lines.",
                        "**Call Stack**: View the sequence of function calls leading to the current state.",
                        "**Watch Expressions**: Monitor specific variables or expressions."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Setting a Breakpoint",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Open DevTools (F12 or Ctrl+Shift+I)\n// Add a breakpoint by clicking on the line number in the Sources tab\nfunction calculate(a, b) {\n  return a + b;\n}\nconsole.log(calculate(2, 3));`
                }
            ]
        },
        {
            title: "2. 📋 console Methods Beyond log",
            content: [
                {
                    type: "text",
                    content: "The `console` object provides various methods beyond `console.log` to help debug and analyze data."
                },
                {
                    type: "list",
                    items: [
                        "**console.table**: Displays tabular data in a table format.",
                        "**console.time/timeEnd**: Measures the time taken by a block of code.",
                        "**console.assert**: Logs a message only if an assertion fails."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using console Methods",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const data = [\n  { name: "Alice", age: 25 },\n  { name: "Bob", age: 30 }\n];\nconsole.table(data);\n\nconsole.time("Loop Time");\nfor (let i = 0; i < 1000000; i++) {}\nconsole.timeEnd("Loop Time");\n\nconsole.assert(1 === 2, "Assertion failed: 1 is not equal to 2");`
                }
            ]
        },
        {
            title: "3. 🧪 Unit Testing (Jest, Vitest, Mocha)",
            content: [
                {
                    type: "text",
                    content: "Unit testing involves testing individual units of code, such as functions or methods, to ensure they work as expected."
                },
                {
                    type: "list",
                    items: [
                        "**Jest**: A popular testing framework for JavaScript.",
                        "**Vitest**: A fast testing framework for modern JavaScript projects.",
                        "**Mocha**: A flexible testing framework with support for various assertion libraries."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Unit Testing with Jest",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// sum.js\nfunction sum(a, b) {\n  return a + b;\n}\nmodule.exports = sum;\n\n// sum.test.js\nconst sum = require("./sum");\ntest("adds 1 + 2 to equal 3", () => {\n  expect(sum(1, 2)).toBe(3);\n});\n\n// Run the test\n$ jest`
                }
            ]
        },
        {
            title: "4. 🌐 E2E Testing (Cypress, Playwright)",
            content: [
                {
                    type: "text",
                    content: "End-to-End (E2E) testing simulates user interactions with the application to ensure it works as expected from start to finish."
                },
                {
                    type: "list",
                    items: [
                        "**Cypress**: A modern E2E testing framework with a simple API.",
                        "**Playwright**: A powerful framework for testing web applications across multiple browsers."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: E2E Testing with Cypress",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// cypress/integration/example.spec.js\ndescribe("My First Test", () => {\n  it("Visits the Kitchen Sink", () => {\n    cy.visit("https://example.cypress.io");\n    cy.contains("type").click();\n    cy.url().should("include", "/commands/actions");\n  });\n});\n\n// Run the test\n$ npx cypress open`
                }
            ]
        },
        {
            title: "5. 🕵️ Mocks, Spies, Stubs",
            content: [
                {
                    type: "text",
                    content: "Mocks, spies, and stubs are used to isolate and test specific parts of your code by simulating dependencies."
                },
                {
                    type: "list",
                    items: [
                        "**Mocks**: Simulate the behavior of a function or module.",
                        "**Spies**: Track calls to a function and its arguments.",
                        "**Stubs**: Replace a function with a custom implementation."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using Mocks and Spies with Jest",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// app.js\nfunction fetchData(callback) {\n  setTimeout(() => {\n    callback("Data fetched!");\n  }, 1000);\n}\nmodule.exports = fetchData;\n\n// app.test.js\nconst fetchData = require("./app");\n\ntest("fetchData calls callback with correct data", () => {\n  const callback = jest.fn();\n  fetchData(callback);\n  expect(callback).toHaveBeenCalledWith("Data fetched!");\n});`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson8;