const LearningReactLesson5 = {
    title: "🌐 API & Integration",
    description: "Master data fetching, caching, and secure authentication flows in React using modern libraries like Axios, React Query, GraphQL clients, and OAuth providers.",
    sections: [
      {
        title: "21. Data Fetching Strategies",
        content: [
          {
            type: "text",
            content: "React supports many data-fetching methods, from REST with `fetch` or `axios` to GraphQL and caching layers like React Query and SWR. Choose based on complexity, caching needs, and architecture."
          },
          {
            type: "list",
            items: [
              "Use `fetch` or `axios` for simple REST APIs.",
              "Use React Query or SWR for caching, retries, and background updates.",
              "Use Apollo Client or urql for GraphQL integration."
            ]
          },
          {
            type: "heading",
            content: "Do: Use Axios for REST Requests with Error Handling",
            variant: "do"
          },
          {
            type: "code",
            content: `import axios from "axios";
  
  async function getUsers() {
    try {
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }`
          },
          {
            type: "heading",
            content: "Don't: Ignore Error Handling or Response Shape",
            variant: "dont"
          },
          {
            type: "code",
            content: `fetch("/api/data")
    .then((res) => res.json())
    .then((data) => console.log(data));
  
  // ❌ No catch block, no loading state, no error handling
  `
          },
          {
            type: "heading",
            content: "Do: Use React Query for Caching and Auto Re-fetching",
            variant: "do"
          },
          {
            type: "code",
            content: `import { useQuery } from "@tanstack/react-query";
  
  function Users() {
    const { data, isLoading, error } = useQuery({
      queryKey: ["users"],
      queryFn: () => axios.get("/api/users").then((res) => res.data)
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
  
    return data.map((user) => <p key={user.id}>{user.name}</p>);
  }`
          },
          {
            type: "heading",
            content: "Do: Use SWR for Lightweight Data Fetching",
            variant: "do"
          },
          {
            type: "code",
            content: `import useSWR from "swr";
  const fetcher = (url) => fetch(url).then((res) => res.json());
  
  function Profile() {
    const { data, error } = useSWR("/api/user", fetcher);
  
    if (!data) return <p>Loading...</p>;
    return <p>Hello, {data.name}</p>;
  }`
          },
          {
            type: "heading",
            content: "Do: Use Apollo for GraphQL Queries",
            variant: "do"
          },
          {
            type: "code",
            content: `import { useQuery, gql } from "@apollo/client";
  
  const GET_USER = gql\`
    query GetUser {
      user {
        id
        name
      }
    }
  \`;
  
  function UserProfile() {
    const { data, loading, error } = useQuery(GET_USER);
    if (loading) return <p>Loading...</p>;
    return <p>{data.user.name}</p>;
  }`
          }
        ]
      },
      {
        title: "22. Authentication & Authorization",
        content: [
          {
            type: "text",
            content: "Authentication verifies identity; authorization grants access. Store tokens securely, use role-based rendering, and integrate OAuth providers for smoother user onboarding."
          },
          {
            type: "list",
            items: [
              "Use `localStorage` for non-sensitive tokens, but prefer cookies for security (HttpOnly).",
              "Render UI conditionally based on auth roles.",
              "Use providers like Google/GitHub with libraries such as Firebase or NextAuth.js."
            ]
          },
          {
            type: "heading",
            content: "Do: Store Tokens Safely and Handle Expiry",
            variant: "do"
          },
          {
            type: "code",
            content: `// Using localStorage (not for sensitive tokens)
  localStorage.setItem("token", token);
  
  // Or secure HttpOnly cookies (server-side)
  
  axios.defaults.headers.common["Authorization"] = \`Bearer \${token}\`;
  `
          },
          {
            type: "heading",
            content: "Don't: Store Sensitive Tokens in Insecure Locations",
            variant: "dont"
          },
          {
            type: "code",
            content: `window.token = "secret"; // ❌ Global scope = insecure
  sessionStorage.setItem("auth", JSON.stringify(user)); // ❌ Vulnerable to XSS
  `
          },
          {
            type: "heading",
            content: "Do: Render Based on Roles or Auth Status",
            variant: "do"
          },
          {
            type: "code",
            content: `function Dashboard({ user }) {
    if (!user) return <Navigate to="/login" />;
    if (user.role === "admin") return <AdminPanel />;
    return <UserPanel />;
  }`
          },
          {
            type: "heading",
            content: "Do: Use OAuth Providers (e.g., Firebase Auth)",
            variant: "do"
          },
          {
            type: "code",
            content: `import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const token = result.user.accessToken;
      // Store token and redirect
    });`
          },
          {
            type: "heading",
            content: "Don't: Rely on Frontend Checks Only for Secure Access",
            variant: "dont"
          },
          {
            type: "code",
            content: `if (user.role === "admin") {
    // ✅ Can hide UI...
  } 
  // ❌ But still enforce on the backend — don't rely solely on frontend controls`
          }
        ]
      }
    ]
  };
  
  export default LearningReactLesson5;
  