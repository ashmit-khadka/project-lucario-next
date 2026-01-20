const LearningJavaScriptLesson4 = {
    title: "🌐 Asynchronous JavaScript",
    description: "Master asynchronous programming in JavaScript to handle tasks like fetching data, managing delays, and improving performance.",
    sections: [
        {
            title: "1. 🔄 Callbacks",
            content: [
                {
                    type: "text",
                    content: "Callbacks are functions passed as arguments to other functions and executed after some operation is completed."
                },
                {
                    type: "heading",
                    content: "Example: Using Callbacks",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function fetchData(callback) {\n  setTimeout(() => {\n    callback("Data fetched!");\n  }, 1000);\n}\nfetchData((data) => {\n  console.log(data); // "Data fetched!"\n});`
                },
                {
                    type: "heading",
                    content: "Don't: Nest Callbacks Excessively (Callback Hell)",
                    variant: "dont"
                },
                {
                    type: "code",
                    content: `fetchData((data) => {\n  processData(data, (processed) => {\n    saveData(processed, (saved) => {\n      console.log("Data saved!");\n    });\n  });\n}); // Hard to read and maintain`
                }
            ]
        },
        {
            title: "2. 🌟 Promises",
            content: [
                {
                    type: "text",
                    content: "Promises represent a value that may be available now, in the future, or never. They help avoid callback hell."
                },
                {
                    type: "heading",
                    content: "Example: Using Promises",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve("Data fetched!");\n    }, 1000);\n  });\n};\nfetchData()\n  .then((data) => console.log(data)) // "Data fetched!"\n  .catch((error) => console.error(error));`
                }
            ]
        },
        {
            title: "3. ⚡ async/await",
            content: [
                {
                    type: "text",
                    content: "`async/await` is a modern syntax for handling asynchronous code, making it easier to read and write."
                },
                {
                    type: "heading",
                    content: "Example: Using async/await",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const fetchData = () => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve("Data fetched!");\n    }, 1000);\n  });\n};\n\nasync function getData() {\n  try {\n    const data = await fetchData();\n    console.log(data); // "Data fetched!"\n  } catch (error) {\n    console.error(error);\n  }\n}\ngetData();`
                }
            ]
        },
        {
            title: "4. ⚠️ Error Handling in Async Code",
            content: [
                {
                    type: "text",
                    content: "Proper error handling ensures your application can gracefully recover from failures in asynchronous operations."
                },
                {
                    type: "heading",
                    content: "Example: Handling Errors with async/await",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `async function fetchData() {\n  try {\n    const response = await fetch("https://api.example.com/data");\n    if (!response.ok) {\n      throw new Error("Network response was not ok");\n    }\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error("Fetch error:", error);\n  }\n}\nfetchData();`
                }
            ]
        },
        {
            title: "5. 🔀 Parallel vs Sequential Async Flows",
            content: [
                {
                    type: "text",
                    content: "Understanding when to run asynchronous tasks in parallel or sequentially can improve performance and maintainability."
                },
                {
                    type: "heading",
                    content: "Example: Parallel Execution with Promise.all",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const fetchData1 = () => Promise.resolve("Data 1");\nconst fetchData2 = () => Promise.resolve("Data 2");\n\nasync function fetchAllData() {\n  const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);\n  console.log(data1, data2); // "Data 1", "Data 2"\n}\nfetchAllData();`
                },
                {
                    type: "heading",
                    content: "Example: Sequential Execution",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `async function fetchSequentialData() {\n  const data1 = await fetchData1();\n  console.log(data1); // "Data 1"\n  const data2 = await fetchData2();\n  console.log(data2); // "Data 2"\n}\nfetchSequentialData();`
                }
            ]
        },
        {
            title: "6. 🛑 AbortController",
            content: [
                {
                    type: "text",
                    content: "The `AbortController` API allows you to cancel ongoing asynchronous operations like `fetch` requests."
                },
                {
                    type: "heading",
                    content: "Example: Using AbortController with fetch",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const controller = new AbortController();\nconst signal = controller.signal;\n\nfetch("https://api.example.com/data", { signal })\n  .then((response) => response.json())\n  .then((data) => console.log(data))\n  .catch((error) => {\n    if (error.name === "AbortError") {\n      console.log("Fetch aborted");\n    } else {\n      console.error("Fetch error:", error);\n    }\n  });\n\n// Abort the fetch request after 2 seconds\nsetTimeout(() => controller.abort(), 2000);`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson4;