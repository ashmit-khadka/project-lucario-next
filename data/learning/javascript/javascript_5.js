const LearningJavaScriptLesson5 = {
    title: "🌐 JavaScript in the Browser",
    description: "Explore how JavaScript interacts with the browser environment and learn techniques to optimize performance and user experience.",
    sections: [
        {
            title: "1. 🪟 The window Object",
            content: [
                {
                    type: "text",
                    content: "The `window` object represents the browser's global environment and provides access to browser-specific APIs."
                },
                {
                    type: "list",
                    items: [
                        "**Global Scope**: Variables declared globally are properties of the `window` object.",
                        "**Methods**: Includes methods like `alert`, `setTimeout`, and `open`.",
                        "**Properties**: Includes properties like `innerWidth`, `innerHeight`, and `localStorage`."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Accessing the window Object",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `console.log(window.innerWidth); // Logs the width of the browser window\nwindow.alert("Hello, World!");`
                }
            ]
        },
        {
            title: "2. 📄 document, navigator, location, history",
            content: [
                {
                    type: "text",
                    content: "These objects provide access to various parts of the browser environment."
                },
                {
                    type: "list",
                    items: [
                        "**document**: Represents the DOM and allows interaction with the page's structure.",
                        "**navigator**: Provides information about the browser and device (e.g., `navigator.userAgent`).",
                        "**location**: Represents the URL of the current page and allows navigation.",
                        "**history**: Allows navigation through the browser's history."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using document and location",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `console.log(document.title); // Logs the page title\ndocument.body.style.backgroundColor = "lightblue";\nconsole.log(location.href); // Logs the current URL\nlocation.href = "https://example.com"; // Redirects to another page`
                }
            ]
        },
        {
            title: "3. 🚀 Performance Optimization",
            content: [
                {
                    type: "text",
                    content: "Optimizing performance ensures a smooth user experience and faster load times."
                },
                {
                    type: "list",
                    items: [
                        "**Minimize DOM Manipulations**: Batch updates to the DOM to reduce reflows and repaints.",
                        "**Use Efficient Selectors**: Use `querySelector` or `getElementById` for faster DOM access.",
                        "**Defer Scripts**: Use the `defer` attribute to load scripts without blocking rendering."
                    ]
                },
                {
                    type: "heading",
                    content: "Example: Using requestAnimationFrame for Smooth Animations",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function animate() {\n  console.log("Animating...");\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);`
                }
            ]
        },
        {
            title: "4. 💤 Lazy Loading",
            content: [
                {
                    type: "text",
                    content: "Lazy loading delays the loading of resources (e.g., images, scripts) until they are needed, improving initial load times."
                },
                {
                    type: "heading",
                    content: "Example: Lazy Loading Images",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="Lazy Loaded Image">\n\n// JavaScript for lazy loading\nconst images = document.querySelectorAll("img[data-src]");\nimages.forEach((img) => {\n  img.onload = () => img.removeAttribute("data-src");\n  img.src = img.dataset.src;\n});`
                }
            ]
        },
        {
            title: "5. ⏱️ Debouncing & Throttling",
            content: [
                {
                    type: "text",
                    content: "Debouncing and throttling are techniques to control the frequency of function execution, improving performance in high-frequency events like scrolling or resizing."
                },
                {
                    type: "heading",
                    content: "Example: Debouncing",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function debounce(func, delay) {\n  let timeout;\n  return function (...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n\nconst log = debounce(() => console.log("Debounced!"), 300);\nwindow.addEventListener("resize", log);`
                },
                {
                    type: "heading",
                    content: "Example: Throttling",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function throttle(func, limit) {\n  let lastFunc;\n  let lastRan;\n  return function (...args) {\n    const context = this;\n    if (!lastRan) {\n      func.apply(context, args);\n      lastRan = Date.now();\n    } else {\n      clearTimeout(lastFunc);\n      lastFunc = setTimeout(() => {\n        if (Date.now() - lastRan >= limit) {\n          func.apply(context, args);\n          lastRan = Date.now();\n        }\n      }, limit - (Date.now() - lastRan));\n    }\n  };\n}\n\nconst log = throttle(() => console.log("Throttled!"), 300);\nwindow.addEventListener("scroll", log);`
                }
            ]
        },
        {
            title: "6. 🛠️ Service Workers & Caching (PWA-related)",
            content: [
                {
                    type: "text",
                    content: "Service workers enable offline capabilities and caching for Progressive Web Apps (PWAs)."
                },
                {
                    type: "heading",
                    content: "Example: Registering a Service Worker",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `if ("serviceWorker" in navigator) {\n  navigator.serviceWorker\n    .register("/service-worker.js")\n    .then((registration) => {\n      console.log("Service Worker registered with scope:", registration.scope);\n    })\n    .catch((error) => {\n      console.error("Service Worker registration failed:", error);\n    });\n}`
                },
                {
                    type: "heading",
                    content: "Example: Caching with Service Workers",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `// service-worker.js\nself.addEventListener("install", (event) => {\n  event.waitUntil(\n    caches.open("v1").then((cache) => {\n      return cache.addAll(["/index.html", "/styles.css", "/script.js"]);\n    })\n  );\n});\n\nself.addEventListener("fetch", (event) => {\n  event.respondWith(\n    caches.match(event.request).then((response) => {\n      return response || fetch(event.request);\n    })\n  );\n});`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson5;