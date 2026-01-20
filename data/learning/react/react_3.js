const LearningReactLesson3 = {
    title: "🚀 Advanced React Topics",
    description: "Take your React skills to the next level with advanced tools like state management libraries, SSR, performance patterns, testing, TypeScript integration, and accessibility best practices.",
    sections: [
        {
            title: "12. State Management Libraries",
            content: [
                {
                    type: "text",
                    content: "For complex or global state, libraries like Redux Toolkit, Zustand, Recoil, or MobX provide alternatives to Context API. Each offers unique tradeoffs in scalability and simplicity."
                },
                {
                    type: "list",
                    items: [
                        "Use Redux Toolkit for large apps that require middleware and dev tools.",
                        "Zustand and Jotai offer minimal APIs for smaller apps.",
                        "Context is best for low-frequency, simple global state."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Redux Toolkit for Structured Global State",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// Redux Toolkit setup
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1
  }
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });
`
                },
                {
                    type: "heading",
                    content: "Don't: Use Context as a Full State Manager",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// ❌ Context for large, high-frequency updates
const CounterContext = createContext();

function App() {
  const [count, setCount] = useState(0); // Unscalable for deep components
  return <CounterContext.Provider value={{ count, setCount }} />;
}`
                }
            ]
        },
        {
            title: "13. Performance Optimization",
            content: [
                {
                    type: "text",
                    content: "Optimize performance by memoizing components, functions, and values. Avoid unnecessary re-renders and use virtualization for large lists."
                },
                {
                    type: "list",
                    items: [
                        "Use `React.memo` to memoize functional components.",
                        "`useMemo` caches expensive values.",
                        "`useCallback` prevents function recreation.",
                        "Use virtualization libraries for long lists."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Memoization to Prevent Re-Renders",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const ExpensiveComponent = React.memo(({ value }) => {
  return <p>Rendered with {value}</p>;
});

const MemoizedValue = useMemo(() => computeHeavyTask(data), [data]);
const stableFn = useCallback(() => console.log("Clicked"), []);
`
                },
                {
                    type: "heading",
                    content: "Don't: Recompute or Rerender Unnecessarily",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const onClick = () => console.log("Clicked");
// ❌ New function every render

const slow = computeHeavyTask(data); // ❌ Recalculates every render
`
                }
            ]
        },
        {
            title: "14. Server-Side Rendering (SSR) & Static Generation",
            content: [
                {
                    type: "text",
                    content: "Next.js enables SSR and SSG out of the box. Use `getStaticProps` for static builds and `getServerSideProps` for dynamic server-side rendering."
                },
                {
                    type: "list",
                    items: [
                        "Use `getStaticProps` for content that doesn’t change often.",
                        "Use `getServerSideProps` for user-specific or time-sensitive data.",
                        "With App Directory (Next.js 13+), use `generateStaticParams`, `fetch` inside components, or route-based layouts."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Next.js Data Fetching Correctly",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// pages/index.tsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// app/page.tsx (Next 13+)
export default async function Page() {
  const data = await fetch("/api");
  return <pre>{JSON.stringify(data)}</pre>;
}`
                },
                {
                    type: "heading",
                    content: "Don't: Use SSR for Static or Non-Dynamic Content",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `export async function getServerSideProps() {
  // ❌ Avoid if data doesn't change per request
  return { props: { time: Date.now() } };
}`
                }
            ]
        },
        {
            title: "15. Testing",
            content: [
                {
                    type: "text",
                    content: "Use React Testing Library for testing behavior over implementation. Use Jest for mocking and handling async logic."
                },
                {
                    type: "list",
                    items: [
                        "Test user interactions and expectations, not internals.",
                        "Use `jest.fn()` to mock callbacks.",
                        "`waitFor` and `findBy` handle async expectations."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Test User Behavior",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `test("shows user name", async () => {
  render(<UserProfile />);
  expect(await screen.findByText("Alice")).toBeInTheDocument();
});

test("calls callback on click", () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick} />);
  fireEvent.click(screen.getByText("Click me"));
  expect(onClick).toHaveBeenCalled();
});`
                },
                {
                    type: "heading",
                    content: "Don't: Test Internal State or Use Timeouts",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `// ❌ Anti-pattern: testing internal implementation
expect(component.state).toBe("loading");

setTimeout(() => {
  expect(screen.getByText("Loaded")); // ❌ Use waitFor instead
}, 1000);`
                }
            ]
        },
        {
            title: "16. TypeScript with React",
            content: [
                {
                    type: "text",
                    content: "Use TypeScript to strongly type props, state, and refs in React. Discriminated unions and generics make components more flexible and safer."
                },
                {
                    type: "list",
                    items: [
                        "Use `interface` or `type` for props.",
                        "Type refs with `useRef<HTMLInputElement>(null)`.",
                        "Use discriminated unions for prop-based rendering logic."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Type Props and Generics",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `type ButtonProps = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

type InputProps<T> = {
  value: T;
  onChange: (val: T) => void;
};`
                },
                {
                    type: "heading",
                    content: "Don't: Use `any` or Ignore Type Safety",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function Form(props: any) {
  return <input value={props.val} />; // ❌ You lose autocompletion & safety
}

const ref = useRef(); // ❌ Not typed — use useRef<HTMLInputElement>()
`
                }
            ]
        },
        {
            title: "17. Accessibility (a11y)",
            content: [
                {
                    type: "text",
                    content: "Accessibility ensures your app works for all users. Use ARIA attributes, semantic HTML, and support for keyboard navigation."
                },
                {
                    type: "list",
                    items: [
                        "Use semantic tags like `button`, `nav`, and `form`.",
                        "Use `aria-label`, `aria-hidden` where necessary.",
                        "Ensure keyboard accessibility with `tabIndex`, event handlers."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use ARIA and Semantic HTML",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `<button aria-label="Close" onClick={closeModal}>×</button>

<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>`
                },
                {
                    type: "heading",
                    content: "Don't: Rely Solely on divs or Inaccessible Markup",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `<div onClick={submit}>Submit</div> // ❌ No keyboard support
<div role="button" tabIndex={0} onKeyDown={handleKeyDown} /> // ✅ Needs keyboard handling if not using <button>`
                }
            ]
        }
    ]
};

export default LearningReactLesson3;
