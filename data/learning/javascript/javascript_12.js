const LearningJavaScriptLesson12 = {
    title: "🔒 Security Essentials in JavaScript",
    description: "Learn the fundamentals of web security to protect your JavaScript applications from common vulnerabilities and attacks.",
    sections: [
        {
            title: "1. 🛡️ XSS & CSRF Basics",
            content: [
                {
                    type: "text",
                    content: "Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) are common web vulnerabilities that can compromise user data and application security."
                },
                {
                    type: "list",
                    items: [
                        "**XSS**: Injecting malicious scripts into web pages viewed by other users.",
                        "**CSRF**: Forcing a user to perform unwanted actions on a trusted website."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Preventing XSS",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Use textContent instead of innerHTML to prevent XSS\nconst userInput = "<script>alert('XSS');</script>";\nconst safeElement = document.getElementById("output");\nsafeElement.textContent = userInput;`
                },
                {
                    type: "heading",
                    content: "Example: Preventing CSRF",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Use CSRF tokens for form submissions\n<form method="POST" action="/submit">\n  <input type="hidden" name="csrf_token" value="secure_token_here">\n  <button type="submit">Submit</button>\n</form>`
                }
            ]
        },
        {
            title: "2. 🧹 Sanitizing Inputs",
            content: [
                {
                    type: "text",
                    content: "Sanitizing user inputs ensures that malicious data cannot be injected into your application."
                },
                {
                    type: "list",
                    items: [
                        "**Escape Special Characters**: Convert `<`, `>`, `&`, etc., to their HTML entities.",
                        "**Use Libraries**: Use libraries like DOMPurify to sanitize HTML inputs."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Sanitizing Inputs with DOMPurify",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Install DOMPurify\n$ npm install dompurify\n\n// Use DOMPurify to sanitize user input\nimport DOMPurify from "dompurify";\nconst userInput = "<img src=x onerror=alert(1)>";\nconst safeHTML = DOMPurify.sanitize(userInput);\ndocument.getElementById("output").innerHTML = safeHTML;`
                }
            ]
        },
        {
            title: "3. ⚠️ Secure Use of eval, innerHTML, etc.",
            content: [
                {
                    type: "text",
                    content: "Avoid using dangerous functions like `eval` and `innerHTML` as they can introduce security vulnerabilities."
                },
                {
                    type: "list",
                    items: [
                        "**eval**: Avoid executing strings as code; use `JSON.parse` for JSON data.",
                        "**innerHTML**: Use `textContent` or libraries like DOMPurify to sanitize HTML.",
                        "**setTimeout/setInterval**: Avoid passing strings as the first argument."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Avoiding eval",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Instead of eval\nconst jsonString = '{"key": "value"}';\nconst data = JSON.parse(jsonString);\nconsole.log(data.key);`
                },
                {
                    type: "heading",
                    content: "Example: Avoiding innerHTML",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Use textContent instead of innerHTML\nconst userInput = "<script>alert('XSS');</script>";\nconst safeElement = document.getElementById("output");\nsafeElement.textContent = userInput;`
                }
            ]
        },
        {
            title: "4. 🌐 CORS (Cross-Origin Resource Sharing)",
            content: [
                {
                    type: "text",
                    content: "CORS is a security feature that restricts how resources on a web page can be requested from another domain."
                },
                {
                    type: "list",
                    items: [
                        "**Same-Origin Policy**: By default, browsers block requests to different origins.",
                        "**CORS Headers**: Use `Access-Control-Allow-Origin` to allow cross-origin requests.",
                        "**Preflight Requests**: For complex requests, browsers send a preflight request to check permissions."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Configuring CORS in Express.js",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Install CORS middleware\n$ npm install cors\n\n// Enable CORS in an Express.js app\nconst express = require("express");\nconst cors = require("cors");\nconst app = express();\n\napp.use(cors());\n\napp.get("/data", (req, res) => {\n  res.json({ message: "CORS enabled!" });\n});\n\napp.listen(3000, () => console.log("Server running on port 3000"));`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson12;