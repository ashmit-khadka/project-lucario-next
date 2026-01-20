const LearningJavaScriptLesson6 = {
    title: "🌐 JavaScript in Node.js",
    description: "Learn how JavaScript works in the Node.js runtime, including file system operations, HTTP handling, and package management.",
    sections: [
        {
            title: "1. 🔄 The Event Loop in Node",
            content: [
                {
                    type: "text",
                    content: "The event loop in Node.js handles asynchronous operations, allowing non-blocking I/O and efficient execution of tasks."
                },
                {
                    type: "list",
                    items: [
                        "**Phases**: The event loop has phases like timers, I/O callbacks, idle/prepare, poll, check, and close callbacks.",
                        "**Non-blocking I/O**: Node.js uses the event loop to handle I/O operations asynchronously."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Understanding the Event Loop",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `console.log("Start");\nsetTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise")); \nconsole.log("End");\n// Output: Start, End, Promise, Timeout`
                }
            ]
        },
        {
            title: "2. 📂 File System",
            content: [
                {
                    type: "text",
                    content: "The `fs` module in Node.js provides methods to interact with the file system, such as reading, writing, and deleting files."
                },
                {
                    type: "heading",
                    content: "Example: Reading a File",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const fs = require("fs");\nfs.readFile("example.txt", "utf8", (err, data) => {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(data);\n});`
                },
                {
                    type: "heading",
                    content: "Don't: Block the Event Loop with Synchronous File Operations",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const data = fs.readFileSync("example.txt", "utf8"); // Blocks the event loop\nconsole.log(data);`
                }
            ]
        },
        {
            title: "3. 📦 Buffers & Streams",
            content: [
                {
                    type: "text",
                    content: "Buffers and streams are used to handle binary data and large files efficiently in Node.js."
                },
                {
                    type: "heading",
                    content: "Example: Using Streams to Read a File",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const fs = require("fs");\nconst stream = fs.createReadStream("large-file.txt", "utf8");\nstream.on("data", (chunk) => {\n  console.log("Received chunk:", chunk);\n});\nstream.on("end", () => {\n  console.log("File read complete.");\n});`
                }
            ]
        },
        {
            title: "4. 🌐 HTTP Module",
            content: [
                {
                    type: "text",
                    content: "The `http` module allows you to create HTTP servers and handle requests and responses."
                },
                {
                    type: "heading",
                    content: "Example: Creating an HTTP Server",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end("Hello, World!");\n});\nserver.listen(3000, () => {\n  console.log("Server running at http://localhost:3000/");\n});`
                }
            ]
        },
        {
            title: "5. 📦 NPM & package.json",
            content: [
                {
                    type: "text",
                    content: "NPM (Node Package Manager) is used to manage dependencies in Node.js projects. The `package.json` file stores metadata about the project and its dependencies."
                },
                {
                    type: "heading",
                    content: "Example: Initializing a package.json File",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm init -y\n// Creates a package.json file with default values`
                },
                {
                    type: "heading",
                    content: "Example: Installing a Dependency",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm install express\n// Installs the Express.js library and adds it to package.json`
                }
            ]
        },
        {
            title: "6. 📜 ES Modules in Node",
            content: [
                {
                    type: "text",
                    content: "Node.js supports ES Modules (`import`/`export`) alongside CommonJS (`require`/`module.exports`)."
                },
                {
                    type: "heading",
                    content: "Example: Using ES Modules",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// package.json\n{\n  "type": "module"\n}\n\n// index.mjs\nimport fs from "fs";\nfs.readFile("example.txt", "utf8", (err, data) => {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(data);\n});`
                }
            ]
        },
        {
            title: "7. 🔑 Environment Variables",
            content: [
                {
                    type: "text",
                    content: "Environment variables store configuration data, such as API keys and database URLs, outside the source code."
                },
                {
                    type: "heading",
                    content: "Example: Using Environment Variables",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// .env\nAPI_KEY=123456\n\n// app.js\nrequire("dotenv").config();\nconsole.log("API Key:", process.env.API_KEY);`
                }
            ]
        },
        {
            title: "8. 🚀 Basic Express.js Usage (Optional)",
            content: [
                {
                    type: "text",
                    content: "Express.js is a popular web framework for building APIs and web applications in Node.js."
                },
                {
                    type: "heading",
                    content: "Example: Creating a Basic Express Server",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Hello, World!");\n});\n\napp.listen(3000, () => {\n  console.log("Server running at http://localhost:3000/");\n});`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson6;