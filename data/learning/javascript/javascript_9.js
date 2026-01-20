const LearningJavaScriptLesson9 = {
    title: "🛠️ Tooling in JavaScript",
    description: "Learn about essential tools and workflows to improve code quality, maintainability, and development efficiency in JavaScript.",
    sections: [
        {
            title: "1. 🧹 Linters (ESLint)",
            content: [
                {
                    type: "text",
                    content: "Linters like ESLint help identify and fix problems in your JavaScript code by enforcing coding standards and best practices."
                },
                {
                    type: "heading",
                    content: "Example: Setting Up ESLint",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm install eslint --save-dev\n$ npx eslint --init\n// Follow the prompts to configure ESLint\n\n// Example .eslintrc.json\n{\n  "env": {\n    "browser": true,\n    "es2021": true\n  },\n  "extends": "eslint:recommended",\n  "parserOptions": {\n    "ecmaVersion": 12\n  },\n  "rules": {\n    "semi": ["error", "always"],\n    "quotes": ["error", "double"]\n  }\n}`
                }
            ]
        },
        {
            title: "2. 🎨 Formatters (Prettier)",
            content: [
                {
                    type: "text",
                    content: "Prettier is an opinionated code formatter that ensures consistent code style across your project."
                },
                {
                    type: "heading",
                    content: "Example: Setting Up Prettier",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm install prettier --save-dev\n\n// Example .prettierrc\n{\n  "semi": true,\n  "singleQuote": true,\n  "tabWidth": 2\n}\n\n// Format a file\n$ npx prettier --write index.js`
                }
            ]
        },
        {
            title: "3. 🔄 Transpilers (Babel)",
            content: [
                {
                    type: "text",
                    content: "Babel is a JavaScript transpiler that converts modern JavaScript code into a version compatible with older browsers."
                },
                {
                    type: "heading",
                    content: "Example: Setting Up Babel",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm install @babel/core @babel/cli @babel/preset-env --save-dev\n\n// Example .babelrc\n{\n  "presets": ["@babel/preset-env"]\n}\n\n// Transpile a file\n$ npx babel src --out-dir dist`
                }
            ]
        },
        {
            title: "4. 📦 Bundlers (Vite, Webpack, Rollup)",
            content: [
                {
                    type: "text",
                    content: "Bundlers like Vite, Webpack, and Rollup combine multiple JavaScript files into a single file for production."
                },
                {
                    type: "heading",
                    content: "Example: Setting Up Vite",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm create vite@latest my-project --template vanilla\n$ cd my-project\n$ npm install\n$ npm run dev`
                },
                {
                    type: "heading",
                    content: "Example: Setting Up Webpack",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ npm install webpack webpack-cli --save-dev\n\n// Example webpack.config.js\nmodule.exports = {\n  entry: "./src/index.js",\n  output: {\n    filename: "bundle.js",\n    path: __dirname + "/dist"\n  },\n  mode: "development"\n};\n\n$ npx webpack`
                }
            ]
        },
        {
            title: "5. 🛠️ DevTools Features",
            content: [
                {
                    type: "text",
                    content: "Browser DevTools provide features like performance profiling, network monitoring, and debugging tools."
                },
                {
                    type: "list",
                    items: [
                        "**Performance Tab**: Analyze and optimize page load times.",
                        "**Network Tab**: Inspect network requests and responses.",
                        "**Application Tab**: Manage storage (localStorage, cookies) and service workers."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using the Performance Tab",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Open DevTools (F12 or Ctrl+Shift+I)\n// Go to the Performance tab\n// Click 'Record', perform actions on the page, and analyze the results`
                }
            ]
        },
        {
            title: "6. 🗺️ Source Maps",
            content: [
                {
                    type: "text",
                    content: "Source maps map minified or transpiled code back to the original source code, making debugging easier."
                },
                {
                    type: "heading",
                    content: "Example: Generating Source Maps with Webpack",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// webpack.config.js\nmodule.exports = {\n  devtool: "source-map",\n  entry: "./src/index.js",\n  output: {\n    filename: "bundle.js",\n    path: __dirname + "/dist"\n  },\n  mode: "development"\n};\n\n$ npx webpack`
                }
            ]
        },
        {
            title: "7. 🔄 Version Control Tips (Git Workflows)",
            content: [
                {
                    type: "text",
                    content: "Git workflows help teams collaborate effectively and manage code changes efficiently."
                },
                {
                    type: "list",
                    items: [
                        "**Feature Branch Workflow**: Create a new branch for each feature.",
                        "**Pull Requests**: Use pull requests to review and merge changes.",
                        "**Rebasing**: Keep your branch up-to-date with the main branch."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Feature Branch Workflow",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `$ git checkout -b feature/new-feature\n// Make changes and commit\n$ git add .\n$ git commit -m "Add new feature"\n$ git push origin feature/new-feature\n\n// Create a pull request and merge`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson9;