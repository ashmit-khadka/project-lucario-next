const LearningReactLesson2 = {
    title: "⚙️ Intermediate React Concepts",
    description: "Explore React's core ecosystem tools including Context API, React Router, lazy loading, error boundaries, and working with refs for more scalable and maintainable apps.",
    sections: [
        {
            title: "7. React Context API",
            content: [
                {
                    type: "text",
                    content: "The Context API provides a way to pass data deeply without prop drilling. Use `createContext`, wrap with `Provider`, and consume with `useContext`."
                },
                {
                    type: "list",
                    items: [
                        "Use `createContext()` to initialize context.",
                        "Wrap your component tree with `Context.Provider`.",
                        "Use `useContext()` to access values within descendants."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use useContext with Provider",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <p>Current theme: {theme}</p>;
}`
                },
                {
                    type: "heading",
                    content: "Don't: Use Context Without a Provider or Value",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const UserContext = React.createContext();

function Profile() {
  const user = useContext(UserContext); // ❌ undefined if not wrapped
  return <p>{user.name}</p>;
}`
                }
            ]
        },
        {
            title: "8. React Router (v6+)",
            content: [
                {
                    type: "text",
                    content: "React Router enables navigation between views. Use `Routes`, `Route`, and hooks like `useNavigate`, `useParams`, and `useLocation` for routing logic."
                },
                {
                    type: "list",
                    items: [
                        "`BrowserRouter` wraps your app to enable routing.",
                        "`useNavigate()` is used for programmatic navigation.",
                        "`useParams()` reads dynamic route segments.",
                        "404s handled using `*` route.",
                        "Protect routes using auth checks + redirects."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Nested Routes & Hooks",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile/:id" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

function Profile() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}`
                },
                {
                    type: "heading",
                    content: "Don't: Use Old API or Imperative Navigation Only",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `<Switch> {/* ❌ Deprecated in v6 */}</Switch>

function goToHome() {
  window.location.href = "/"; // ❌ Avoid full-page reload
}`
                }
            ]
        },
        {
            title: "9. Code Splitting & Lazy Loading",
            content: [
                {
                    type: "text",
                    content: "React supports dynamic imports using `React.lazy()` and `Suspense`. This enables faster initial loads by deferring non-critical code."
                },
                {
                    type: "list",
                    items: [
                        "Use `React.lazy()` for component-level splitting.",
                        "Wrap lazy components in `<Suspense>` with a fallback UI.",
                        "Split large routes or components dynamically."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use Lazy + Suspense for Component Loading",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const LazyAbout = React.lazy(() => import("./About"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LazyAbout />
    </Suspense>
  );
}`
                },
                {
                    type: "heading",
                    content: "Don't: Forget Suspense or Use Lazy Everywhere",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const LazyPage = React.lazy(() => import("./Page"));

function App() {
  return <LazyPage />; // ❌ No Suspense = crash

// Avoid: splitting small components that load instantly anyway
const LazyButton = React.lazy(() => import("./Button")); // ❌ Overkill
`
                }
            ]
        },
        {
            title: "10. Error Boundaries",
            content: [
                {
                    type: "text",
                    content: "Error boundaries catch rendering errors in child components. They're implemented using class components with `componentDidCatch()` and `getDerivedStateFromError()`."
                },
                {
                    type: "list",
                    items: [
                        "Only class components can be error boundaries (as of now).",
                        "Use them to prevent full app crashes.",
                        "Show a fallback UI when an error occurs."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Wrap Sections in Error Boundaries",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error);
  }

  render() {
    return this.state.hasError ? <h2>Something went wrong.</h2> : this.props.children;
  }
}

// Usage:
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>`
                },
                {
                    type: "heading",
                    content: "Don't: Use Hooks for Error Boundaries",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `function App() {
  try {
    return <Component />;
  } catch {
    return <p>Error</p>; // ❌ React ignores try/catch in components
  }
}`
                }
            ]
        },
        {
            title: "11. Refs & DOM Manipulation",
            content: [
                {
                    type: "text",
                    content: "`useRef` and `createRef` give access to DOM nodes or persistent values. Forwarding refs allows parent components to access child elements."
                },
                {
                    type: "list",
                    items: [
                        "Use `useRef` in function components.",
                        "`createRef` is used in class components.",
                        "Use `forwardRef` to pass refs to child components."
                    ]
                },
                {
                    type: "heading",
                    content: "Do: Use useRef for Accessing DOM",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}`
                },
                {
                    type: "heading",
                    content: "Do: Forward Refs When Necessary",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const FancyInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

const parentRef = useRef();
<FancyInput ref={parentRef} />;`
                },
                {
                    type: "heading",
                    content: "Don't: Use Refs for Everything or Mutate State",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `const valueRef = useRef(0);
valueRef.current = 42; // ❌ Don't use ref instead of state for render-driven updates

// Or manipulating DOM unnecessarily
useEffect(() => {
  document.getElementById("myDiv").style.color = "red"; // ❌ Use React style instead
}, []);
`
                }
            ]
        }
    ]
};

export default LearningReactLesson2;
