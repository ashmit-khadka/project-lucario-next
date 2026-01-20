const LearningReactLesson1 = {
    title: "🔰 React Essentials (Must-Know for All React Developers)",
    description: "Master the foundational React concepts including JSX, components, hooks, rendering logic, forms, and lifecycle behavior to build reliable and scalable user interfaces.",
    sections: [
        {
            title: "1. React Fundamentals",
            content: [
                {
                    type: "text",
                    content: "Understanding JSX, components, props, and state is fundamental to building React applications."
                },
                {
                    type: "list",
                    items: [
                        "JSX lets you write HTML-like syntax in JavaScript.",
                        "Components can be functions or classes.",
                        "`props` are inputs to components; `defaultProps` provides defaults.",
                        "`state` allows components to manage local data (in class components)."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use JSX Correctly",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`
                },
                {
                    type: "heading",
                    content: "Don't: Forget Return or Wrap Multiple JSX Elements",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function Welcome({ name }) {
  // Missing return
  <h1>Hello, {name}!</h1>;
}

// Or:
function Welcome() {
  return (
    <h1>Hello</h1>
    <p>Welcome</p> // Error: JSX must have one root element
  );
}`
                },
                {
                    type: "heading",
                    content: "Do: Use Props and Default Props",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function Greet({ name = "Guest" }) {
  return <p>Hello, {name}</p>;
}

// Or with defaultProps
Greet.defaultProps = { name: "Guest" };`
                },
                {
                    type: "heading",
                    content: "Don't: Mutate Props",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function Greet(props) {
  props.name = "Admin"; // ❌ Never mutate props!
  return <p>{props.name}</p>;
}`
                },
                {
                    type: "heading",
                    content: "Do: Use setState Correctly (Class Component)",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>Count: {this.state.count}</button>;
  }
}`
                },
                {
                    type: "heading",
                    content: "Don't: Modify State Directly",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `this.state.count += 1; // ❌ Wrong
this.setState(this.state.count++); // ❌ Wrong`
                }
            ]
        },
        {
            title: "2. Component Lifecycle",
            content: [
                {
                    type: "text",
                    content: "Lifecycle methods and the `useEffect` hook let you control what happens when components mount, update, or unmount."
                },
                {
                    type: "list",
                    items: [
                        "`useEffect` runs side effects in functional components.",
                        "`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` are class lifecycle methods.",
                        "Always clean up in `useEffect` where needed."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use useEffect for Side Effects",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `useEffect(() => {
  document.title = "Hello";

  return () => {
    console.log("Cleanup runs on unmount");
  };
}, []); // Empty array runs only once on mount`
                },
                {
                    type: "heading",
                    content: "Don't: Forget Cleanup or Create Infinite Loops",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  // ❌ Forgot cleanup
});

useEffect(() => {
  setCount(count + 1); // ❌ Infinite loop if count is a dependency
}, [count]);`
                }
            ]
        },
        {
            title: "3. Hooks",
            content: [
                {
                    type: "text",
                    content: "React hooks let you use state, context, and lifecycle behavior in functional components."
                },
                {
                    type: "list",
                    items: [
                        "`useState`: Manage local state.",
                        "`useEffect`: Handle side effects.",
                        "`useRef`: Store mutable values.",
                        "`useMemo`/`useCallback`: Optimize performance.",
                        "`useContext`: Access shared global data.",
                        "Custom hooks allow reuse of logic."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Hooks Properly",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count updated:", count);
}, [count]);

const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
`
                },
                {
                    type: "heading",
                    content: "Don't: Use Hooks Conditionally or Outside Components",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `if (someCondition) {
  useEffect(() => {}); // ❌ Never call hooks conditionally
}

function notAComponent() {
  useState(0); // ❌ Hooks must be inside components or custom hooks
}`
                }
            ]
        },
        {
            title: "4. Conditional Rendering",
            content: [
                {
                    type: "text",
                    content: "React supports rendering content conditionally using ternary operators, logical AND (short-circuiting), and fragments to group elements."
                },
                {
                    type: "list",
                    items: [
                        "Use `{condition && <Component />}` for simple checks.",
                        "Use ternaries when you have `if-else`-like logic.",
                        "Use `<></>` to return multiple elements without a div."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Render with Short-Circuit or Ternary",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `{isLoggedIn && <p>Welcome back!</p>}

{user ? <p>Hello, {user.name}</p> : <p>Please sign in.</p>}`
                },
                {
                    type: "heading",
                    content: "Don't: Render Invalid Expressions or Empty Elements",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `{undefined && <p>Won't show</p>}

{true ? <div>Hello</div> : <></>} // ❌ Avoid unnecessary fragments
`
                }
            ]
        },
        {
            title: "5. Forms & Controlled Components",
            content: [
                {
                    type: "text",
                    content: "Controlled components keep form values in sync with component state. They ensure React is the source of truth for the input value."
                },
                {
                    type: "list",
                    items: [
                        "Always bind input `value` to state and use `onChange`.",
                        "Validate inputs before submitting.",
                        "Prevent default form behavior."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Controlled Inputs",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const [name, setName] = useState("");

function handleChange(e) {
  setName(e.target.value);
}

<form onSubmit={(e) => { e.preventDefault(); alert(name); }}>
  <input value={name} onChange={handleChange} />
  <button type="submit">Submit</button>
</form>`
                },
                {
                    type: "heading",
                    content: "Don't: Mix Controlled and Uncontrolled Logic",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `<input value={name} /> // Controlled
<input defaultValue="John" /> // Uncontrolled — don't mix the two
`
                }
            ]
        },
        {
            title: "6. Lists & Keys",
            content: [
                {
                    type: "text",
                    content: "When rendering lists with `.map()`, use a `key` prop to help React efficiently update items. The key must be stable and unique."
                },
                {
                    type: "list",
                    items: [
                        "Use `.map()` to transform an array into elements.",
                        "Use `key` with a unique value (like `id`).",
                        "Avoid using array index as key unless the list is static."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Stable Unique Keys",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const items = [{ id: 1, text: "A" }, { id: 2, text: "B" }];

<ul>
  {items.map(item => (
    <li key={item.id}>{item.text}</li>
  ))}
</ul>`
                },
                {
                    type: "heading",
                    content: "Don't: Use Index as Key for Dynamic Lists",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `{items.map((item, index) => (
  <li key={index}>{item.text}</li> // ❌ Keys won't remain stable if order changes
))}`
                }
            ]
        }
    ]
};

export default LearningReactLesson1;
