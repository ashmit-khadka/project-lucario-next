const LearningReactLesson4 = {
    title: "🧱 UI Patterns & Architecture",
    description: "Learn scalable component design patterns, organize your project like a pro, and build consistent UI systems with reusable design components and theming.",
    sections: [
      {
        title: "18. Component Design Patterns",
        content: [
          {
            type: "text",
            content: "Designing components well is crucial for scalability and reusability. Understand patterns like presentational vs container components, compound components, and the difference between controlled and uncontrolled behavior."
          },
          {
            type: "list",
            items: [
              "Presentational components focus on UI, container components handle logic.",
              "Compound components share implicit state through context.",
              "Controlled components are fully driven by props/state; uncontrolled use refs.",
              "Render props and HOCs are older but useful for understanding abstraction."
            ]
          },
          {
            type: "heading",
            content: "Do: Separate Logic and Presentation",
            variant: "do"
          },
          {
            type: "code",
            content: `// Presentational
  function ProfileCard({ name, age }) {
    return <div>{name} - {age}</div>;
  }
  
  // Container
  function ProfileContainer() {
    const user = useUser(); // custom hook
    return <ProfileCard name={user.name} age={user.age} />;
  }`
          },
          {
            type: "heading",
            content: "Don't: Mix Logic and UI Everywhere",
            variant: "dont"
          },
          {
            type: "code",
            content: `function ProfileCard() {
    const user = useUser(); // ❌ tightly coupled
    return <div>{user.name}</div>;
  }`
          },
          {
            type: "heading",
            content: "Do: Use Compound Components with Context",
            variant: "do"
          },
          {
            type: "code",
            content: `const TabsContext = createContext();
  
  function Tabs({ children }) {
    const [active, setActive] = useState(0);
    return (
      <TabsContext.Provider value={{ active, setActive }}>
        <div>{children}</div>
      </TabsContext.Provider>
    );
  }
  
  function TabList({ children }) {
    return <div>{children}</div>;
  }
  
  function Tab({ index, children }) {
    const { active, setActive } = useContext(TabsContext);
    return (
      <button onClick={() => setActive(index)} aria-selected={active === index}>
        {children}
      </button>
    );
  }`
          },
          {
            type: "heading",
            content: "Don't: Hardcode Internal Logic",
            variant: "dont"
          },
          {
            type: "code",
            content: `function Tabs() {
    const [active, setActive] = useState(0);
    return (
      <>
        <button onClick={() => setActive(0)}>Tab 1</button>
        <button onClick={() => setActive(1)}>Tab 2</button>
        <div>{active === 0 ? "Content 1" : "Content 2"}</div>
      </>
    ); // ❌ not reusable or scalable
  }`
          }
        ]
      },
      {
        title: "19. Folder Structure & Project Organization",
        content: [
          {
            type: "text",
            content: "Organize your codebase using feature-based structures. Avoid dumping all components or logic into global folders. Keep concerns together—components, tests, hooks, styles, and state."
          },
          {
            type: "list",
            items: [
              "Use domain-based folders for large apps.",
              "Group files by feature, not type (e.g., keep `hooks`, `components`, `slices`, and `styles` together).",
              "Separate truly shared UI into `ui/` or `common/` folders."
            ]
          },
          {
            type: "heading",
            content: "Do: Use Feature or Domain-Based Structure",
            variant: "do"
          },
          {
            type: "code",
            content: `src/
    features/
      auth/
        AuthForm.tsx
        useAuth.ts
        authSlice.ts
        auth.css
    ui/
      Button.tsx
      Modal.tsx
    app/
      store.ts
      App.tsx`
          },
          {
            type: "heading",
            content: "Don't: Group by Type Globally",
            variant: "dont"
          },
          {
            type: "code",
            content: `src/
    components/
      Button.tsx
      AuthForm.tsx
    hooks/
      useAuth.ts
    styles/
      auth.css
    redux/
      authSlice.ts // ❌ unrelated files scattered`
          }
        ]
      },
      {
        title: "20. Reusable Component Systems / Design Systems",
        content: [
          {
            type: "text",
            content: "Design systems help enforce consistency across your app. Use component libraries with tools like Storybook. Use CSS-in-JS, utility-first CSS, or scoped styling (like CSS Modules) to control styles reliably."
          },
          {
            type: "list",
            items: [
              "Use Storybook to preview components in isolation.",
              "Use Tailwind, styled-components, Emotion, or CSS Modules for scalable styles.",
              "Theme switching can be done via context or CSS variables."
            ]
          },
          {
            type: "heading",
            content: "Do: Build Reusable Styled Components",
            variant: "do"
          },
          {
            type: "code",
            content: `// Button.tsx using styled-components
  import styled from "styled-components";
  
  const Button = styled.button\`
    background: ${(p) => (p.primary ? "#333" : "#eee")};
    color: ${(p) => (p.primary ? "#fff" : "#333")};
  \`;
  
  export default Button;`
          },
          {
            type: "heading",
            content: "Do: Use Tailwind for Utility-First Styling",
            variant: "do"
          },
          {
            type: "code",
            content: `function Button({ children }) {
    return (
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        {children}
      </button>
    );
  }`
          },
          {
            type: "heading",
            content: "Don't: Hardcode Styles Inline Everywhere",
            variant: "dont"
          },
          {
            type: "code",
            content: `<button style={{ backgroundColor: "#333", color: "#fff" }}>
    Submit
  </button> // ❌ Hard to maintain and override`
          },
          {
            type: "heading",
            content: "Do: Use Storybook to Develop and Document UI",
            variant: "do"
          },
          {
            type: "code",
            content: `// Button.stories.tsx
  import Button from "./Button";
  
  export default {
    title: "Components/Button",
    component: Button
  };
  
  export const Primary = () => <Button primary>Click me</Button>;`
          }
        ]
      }
    ]
  };
  
  export default LearningReactLesson4;
  