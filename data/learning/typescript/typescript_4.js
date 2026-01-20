const LearningTypeScript4 = {
    title: "🔁 Integration & Ecosystem",
    description: "Learn how TypeScript integrates with JavaScript projects, tooling, and major frameworks like React, Vue, and Node.js.",
    sections: [
        {
            title: "19. 🌐 Working with JavaScript",
            content: [
                {
                    type: "text",
                    content: "TypeScript can be gradually introduced into existing JavaScript projects. JSDoc comments allow you to use TypeScript's type system without fully converting files to `.ts`."
                },
                {
                    type: "list",
                    items: [
                        "Rename `.js` files to `.ts` incrementally.",
                        "Use `//@ts-check` to enable type checking in JS files.",
                        "JSDoc comments can describe types and parameters in JS files."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: JSDoc in JavaScript (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// @ts-check

/**
 * Adds two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b;
}
`
                },
                {
                    type: "heading",
                    content: "Example: Gradual Typing (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Avoid disabling type checking or skipping types entirely
// @ts-nocheck

function greet(user) {
    return user.toUpperCase(); // Runtime error if user is not a string
}
`
                }
            ]
        },
        {
            title: "20. 🧪 Tooling & Linting",
            content: [
                {
                    type: "text",
                    content: "Using proper tooling improves code quality, consistency, and developer experience. ESLint and Prettier help enforce rules and format code, while `tsc` and `ts-node` run and type-check TypeScript files."
                },
                {
                    type: "list",
                    items: [
                        "Use `@typescript-eslint` for TypeScript-specific lint rules.",
                        "Prettier ensures consistent formatting across teams.",
                        "`tsc` performs static type checking.",
                        "`ts-node` allows running `.ts` files directly without compiling."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: ESLint + Prettier + tsc (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// .eslintrc.js
module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ]
};

// Command-line usage
npx tsc --noEmit
npx ts-node src/index.ts
`
                },
                {
                    type: "heading",
                    content: "Example: Tooling (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Don't ignore type errors with 'any' or skip linting
const user: any = getUser(); // Type safety lost

// Not using a formatter leads to inconsistent style
function sayHello( name:string ){ console.log( name ) }
`
                }
            ]
        },
        {
            title: "21. 🚚 TypeScript with Frameworks",
            content: [
                {
                    type: "text",
                    content: "TypeScript integrates seamlessly with modern frameworks. Use it to type props and state in React, define component interfaces in Vue, and build safe APIs in Node.js."
                },
                {
                    type: "list",
                    items: [
                        "Use generics to type React components and hooks.",
                        "Use `defineProps` and `defineEmits` in Vue 3 for type safety.",
                        "Leverage type-safe APIs in Node.js using Express or tRPC."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: React + TypeScript (Do)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `type ButtonProps = {
    label: string;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
);

// Vue 3 example (with script setup)
/*
<script setup lang="ts">
defineProps<{ msg: string }>();
</script>
*/
`
                },
                {
                    type: "heading",
                    content: "Example: Framework Integration (Don't)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// Don't skip typing props
const Card = (props) => {
    return <div>{props.title}</div>; // No type safety
}

// Avoid using 'any' in API handlers
app.get("/user", (req: any, res: any) => {
    res.send("User");
});
`
                }
            ]
        }
    ]
};

export default LearningTypeScript4;
