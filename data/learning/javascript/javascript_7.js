const LearningJavaScriptLesson7 = {
    title: "🌐 Design Patterns in JavaScript",
    description: "Learn common design patterns in JavaScript to write more modular, reusable, and maintainable code.",
    sections: [
        {
            title: "1. 📦 Module Pattern",
            content: [
                {
                    type: "text",
                    content: "The Module Pattern is used to encapsulate private and public methods and variables, promoting code organization and reusability."
                },
                {
                    type: "heading",
                    content: "Example: Module Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const CounterModule = (function () {\n  let count = 0; // Private variable\n\n  return {\n    increment: function () {\n      count++;\n      console.log(count);\n    },\n    reset: function () {\n      count = 0;\n      console.log("Counter reset.");\n    }\n  };\n})();\n\nCounterModule.increment(); // 1\nCounterModule.increment(); // 2\nCounterModule.reset(); // Counter reset.`
                }
            ]
        },
        {
            title: "2. 🔍 Revealing Module Pattern",
            content: [
                {
                    type: "text",
                    content: "The Revealing Module Pattern improves the Module Pattern by explicitly exposing only the methods you want to make public."
                },
                {
                    type: "heading",
                    content: "Example: Revealing Module Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const CounterModule = (function () {\n  let count = 0;\n\n  function increment() {\n    count++;\n    console.log(count);\n  }\n\n  function reset() {\n    count = 0;\n    console.log("Counter reset.");\n  }\n\n  return {\n    increment,\n    reset\n  };\n})();\n\nCounterModule.increment(); // 1\nCounterModule.reset(); // Counter reset.`
                }
            ]
        },
        {
            title: "3. 🏭 Factory Pattern",
            content: [
                {
                    type: "text",
                    content: "The Factory Pattern is used to create objects without specifying their exact class or constructor."
                },
                {
                    type: "heading",
                    content: "Example: Factory Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function CarFactory(type) {\n  const car = {};\n  car.type = type;\n  car.drive = function () {\n    console.log(\`Driving a \${type} car.\`);\n  };\n  return car;\n}\n\nconst sedan = CarFactory("sedan");\nsedan.drive(); // Driving a sedan car.\nconst suv = CarFactory("SUV");\nsuv.drive(); // Driving an SUV car.`
                }
            ]
        },
        {
            title: "4. 🧩 Singleton Pattern",
            content: [
                {
                    type: "text",
                    content: "The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it."
                },
                {
                    type: "heading",
                    content: "Example: Singleton Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const Singleton = (function () {\n  let instance;\n\n  function createInstance() {\n    return { id: Math.random() };\n  }\n\n  return {\n    getInstance: function () {\n      if (!instance) {\n        instance = createInstance();\n      }\n      return instance;\n    }\n  };\n})();\n\nconst instance1 = Singleton.getInstance();\nconst instance2 = Singleton.getInstance();\nconsole.log(instance1 === instance2); // true`
                }
            ]
        },
        {
            title: "5. 👀 Observer Pattern",
            content: [
                {
                    type: "text",
                    content: "The Observer Pattern allows objects (observers) to subscribe to and receive updates from another object (subject)."
                },
                {
                    type: "heading",
                    content: "Example: Observer Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `class Subject {\n  constructor() {\n    this.observers = [];\n  }\n\n  subscribe(observer) {\n    this.observers.push(observer);\n  }\n\n  unsubscribe(observer) {\n    this.observers = this.observers.filter((obs) => obs !== observer);\n  }\n\n  notify(data) {\n    this.observers.forEach((observer) => observer.update(data));\n  }\n}\n\nclass Observer {\n  update(data) {\n    console.log("Received data:", data);\n  }\n}\n\nconst subject = new Subject();\nconst observer1 = new Observer();\nconst observer2 = new Observer();\n\nsubject.subscribe(observer1);\nsubject.subscribe(observer2);\nsubject.notify("Hello Observers!");`
                }
            ]
        },
        {
            title: "6. 📢 Pub/Sub Pattern",
            content: [
                {
                    type: "text",
                    content: "The Publish/Subscribe Pattern is a variation of the Observer Pattern where a central event bus manages subscriptions and notifications."
                },
                {
                    type: "heading",
                    content: "Example: Pub/Sub Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const EventBus = {\n  events: {},\n\n  subscribe(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  },\n\n  publish(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach((callback) => callback(data));\n    }\n  }\n};\n\nEventBus.subscribe("message", (data) => console.log("Received:", data));\nEventBus.publish("message", "Hello Pub/Sub!");`
                }
            ]
        },
        {
            title: "7. 🎨 Decorator Pattern",
            content: [
                {
                    type: "text",
                    content: "The Decorator Pattern allows you to dynamically add behavior to an object without modifying its structure."
                },
                {
                    type: "heading",
                    content: "Example: Decorator Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `function addLogging(car) {\n  car.log = function () {\n    console.log(\`Car type: \${this.type}\`);\n  };\n  return car;\n}\n\nconst car = { type: "sedan" };\nconst decoratedCar = addLogging(car);\ndecoratedCar.log(); // Car type: sedan`
                }
            ]
        },
        {
            title: "8. 🛠️ Strategy Pattern",
            content: [
                {
                    type: "text",
                    content: "The Strategy Pattern allows you to define a family of algorithms and make them interchangeable at runtime."
                },
                {
                    type: "heading",
                    content: "Example: Strategy Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `class PaymentStrategy {\n  pay(amount) {\n    throw new Error("Method not implemented.");\n  }\n}\n\nclass CreditCardPayment extends PaymentStrategy {\n  pay(amount) {\n    console.log(\`Paid \${amount} using Credit Card.\`);\n  }\n}\n\nclass PayPalPayment extends PaymentStrategy {\n  pay(amount) {\n    console.log(\`Paid \${amount} using PayPal.\`);\n  }\n}\n\nconst paymentMethod = new CreditCardPayment();\npaymentMethod.pay(100);`
                }
            ]
        },
        {
            title: "9. 🛡️ Proxy Pattern",
            content: [
                {
                    type: "text",
                    content: "The Proxy Pattern provides a placeholder or surrogate to control access to another object."
                },
                {
                    type: "heading",
                    content: "Example: Proxy Pattern",
                    variant: "do"
                },
                {
                    type: "code",
                    content: `const handler = {\n  get: function (target, property) {\n    console.log(\`Accessing property: \${property}\`);\n    return target[property];\n  }\n};\n\nconst target = { name: "Proxy Example" };\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.name); // Logs: Accessing property: name, Proxy Example`
                }
            ]
        }
    ]
};

export default LearningJavaScriptLesson7;