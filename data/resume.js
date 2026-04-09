import ADPLogo from '../assets/image/logos/adp.jpg';
import PNSLogo from '../assets/image/pnsuk_logo.png';
import KCLLogo from '../assets/image/kcl_logo.jpg';
import UEALogo from '../assets/image/uea_logo.webp';
import CTMLogo from '../assets/image/logos/ctm.png';

import IconEmail from '../assets/icons/noun-mail-1428698.svg';
import IconPhone from '../assets/icons/noun-phone-7849386.svg';
import IconLocation from '../assets/icons/noun-location-5480581.svg';
import IconSkills from '../assets/icons/noun-magic-2704149.svg';
import IconEducation from '../assets/icons/noun-education-3961689.svg';
import IconCertificate from '../assets/icons/noun-certificate-7830135.svg';
import IconLink from '../assets/icons/noun-link-5747677.svg';
import IconGitHub from '../assets/icons/GitHub.svg';
import IconLinkedIn from '../assets/icons/LinkedIn.svg';

const text ={
    default: {
        header: {
            name: "Ashmit Khadka",
            title: "Software Engineer",
        },
        profile: {
            text: "Product driven software engineer with half a decade experience at ADP, a leading S&P 500 tech company, building and scaling React, .NET Core web apps used by over 1 million clients. I work on RUN, an award winning payroll platform with a 4.9 rating on the App Store and Google Play. King's College London master's graduate in Software Engineering with a First Class Honours in Computer Science. Driven by clean, scalable code and a deep interest in emerging tech and AI. Thrives in collaborative teams and embraces complex challenges with a hands-on, solutions-first mindset. Recent company hackathon winner for 2024.",
        },
        contact: [
            { 
                text: "ashmit.khadka@outlook.com", 
                icon: <IconEmail />,
                link: "mailto:ashmit.khadka@outlook.com"
            },
            { 
                text: "07476919615", 
                icon: <IconPhone />,
                link: "tel:07476919615"
            },
            { 
                text: "linkedin.com/in/ashmit-khadka", 
                icon: <IconLinkedIn />,
                link: "https://linkedin.com/in/ashmit-khadka"
            },
            { 
                text: "github.com/ashmit-khadka", 
                icon: <IconGitHub />,
                link: "https://github.com/ashmit-khadka"
            },
            { 
                text: "akhadka.dev", 
                icon: <IconLink />,
                link: "https://akhadka.dev"
            },
            {
                text: "geekcaffeine.com",
                icon: <IconLink />,
                link: "https://geekcaffeine.com"
            },
        ],
        workExperience: [
            {
                company: "Compare the Market",
                position: "Senior Software Engineer",
                startDate: "August 2025",
                endDate: "Present",
                responsibilities: [
                    "Lead development of high-traffic comparison platform features serving millions of UK customers.",
                    "Architect and implement scalable microservices using modern web technologies and cloud infrastructure.",
                    "Drive technical design decisions and establish engineering best practices across development teams.",
                    "Mentor junior and mid-level engineers through code reviews, pair programming, and technical guidance.",
                    "Collaborate with product managers and stakeholders to translate business requirements into technical solutions.",
                    "Optimize application performance and user experience across web and mobile platforms.",
                    "Champion quality through comprehensive testing strategies and CI/CD pipeline improvements.",
                ],
                logo: CTMLogo, // Add logo later if available
            },
            {
                company: "ADP (Automatic Data Processing)",
                position: "Software Engineer",
                startDate: "September 2021",
                endDate: "July 2025",
                responsibilities: [
                    "Hackathon 2024 winner for developing a web application that tracks code deployments across multiple environments, improving visibility and release traceability.",
                    "Delivered over 500+ features and production bug fixes across the full stack using _React_, _TypeScript_, _Node.js_, _C#_.",
                    "Performed 300+ code reviews, promoted architectural standards, and best practices.",
                    "Mentored 3 graduate engineers through deep dives, shadowing sessions, and pair programming.",
                    "Collaborate cross-functionally with UX designers to build responsive, accessible web apps using _React_ and _Figma_. Engineered modular, reusable UI components with _React_ and _Tailwind_.",
                    "Designed and optimized 30+ mission critical _RESTful_ APIs using _Node.js_, _Express_, _MongoDB_ and _C#_, implementing robust error handling, logging and performance tuning.",
                    "Authored and optimized stored procedures and queries using _SQL_ and _MongoDB_, supporting data heavy features at scale.",
                    "Built 1,000+ unit and integration tests using _React Testing Library_ and _Jest_.",
                    "Developed 100+ end-to-end UI test suites with _Cypress_, _Selenium_, and _Cucumber_, automating complex user journeys and release validation.",
                ],
                logo: ADPLogo,
            },
            {
                company: "ADP (Automatic Data Processing)",
                position: "Associate Software Engineer",
                startDate: "July 2019",
                endDate: "June 2020 (Internship)",
                responsibilities: [
                    "Developed responsive, high performance client-facing user experience using _React_, _Node.js_, and _TypeScript_.",
                    "Automated data mining of production usage patterns using _Python_ to generate realistic _LoadRunner_ performance test profiles and error reporting with _Grafana_.",
                    "Integrated _Google Tag Manager_ to capture key user interactions and built end-to-end _Google Analytics_ reporting pipelines helping enable better data-driven UX and product decisions.",
                ],
                logo: ADPLogo,
            },
            {
                company: "Peterborough Nepalese Samaj (PNSUK)",
                position: "Head of IT",
                startDate: "April 2017",
                endDate: "Present",
                responsibilities: [
                    "Collaborate with community stakeholders to build and enhance the charity website PNSUK.org, using _React_, _Python_, _Django_ and _SQL_",
                    "Lead IT education workshops for both adults and children, fostering digital literacy and empowering the community with essential tech skills.",
                ],
                logo: PNSLogo,
            },
        ],
        projects: [
            {
                title: "AI Sustainability Platform",
                description: "Social platform targeting higher education with _AI_ generated sustainability challenges, chatbots, and content moderation. Built using the _MERN_ stack + _GraphQL_",
                link: "https://geekc",
                context: "Master's thesis (awarded Distinction)",
            },
            {
                title: "DNA Visualisation Tool",
                description: "Partnered with The Sainsbury Laboratory to build an interactive web app for visualising protein interactions in plant pathogens. Powered by _D3_ and the _MERN_ stack.",
                link: "https://geekc",
                context: "Bachelor's thesis (awarded First Class Honours)",
            },
            {
                title: "GeekCaffeine.com: One Hub for All Things Tech",
                description: "Curated a tech content hub with custom web scrapers and AI powered trend analytics using _Python_, _TypeScript_ and the _MERN_ stack.",
                link: "https://geekc",
            },
            {
                title: "PNSUK.com: Empowering the Nepali Community",
                description: "Designed and developed the official site for a UK-based Nepali charity that empowers the local Nepali community. Built using _React_ and powered by _Python_ and _Django_.",
                link: "https://geekc",
            },
        ],
        education: [
            {
                title: "MSc, Advanced Software Engineering",
                institution: "King's College London",
                grade: "Merit",
                date: "2024",
                logo: KCLLogo,
            },
            {
                title: "BSc, Computing Science (with a Year in Industry)",
                institution: "University of East Anglia",
                grade: "First Class Honours",
                date: "2021",
                logo: UEALogo,
            },
        ],
        skills: {
            languages: "JavaScript, TypeScript, C#, Python, SQL, HTML, CSS, Java, PowerShell",
            frameworks: "React, Node, ASP.NET Core, Express, Django, React Native, SASS, Redux, Next, GraphQL, D3, Tailwind",
            cloud: "Azure, AWS, Docker, Jenkins, Splunk, Nginx",
            databases: "SQL, MongoDB",
            testing: "Jest, React Testing Library, Playwright, Selenium, Cypress, Cucumber",
            tools: "Git, Figma, WCAG, Lunix, Jira, Postman, Webpack, Google Analytics",
        },
        certifications: [
            {
                title: "UX Design",
                institution: "Google",
                platform: "Coursera",
                date: "2021",
                link: "https://www.coursera.org/account/accomplishments/specialization/certificate/BQYR2BE9BL4Z",
            },
            {
                title: "JavaScript: The Advanced Concepts",
                institution: "Mosh Hamedani",
                platform: "Udemy",
                date: "2022",
                link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-628b7748-f652-467f-af3f-00c588747cb0.pdf",
            },
            {
                title: "Mastering TypeScript - 2023 Edition",
                institution: "Zero to Mastery",
                platform: "Udemy",
                date: "2023",
                link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-0ea23300-3f11-443d-ae2c-08d9e22ee458.pdf",
            },
            {
                title: "C# Advanced Topics",
                institution: "Colt Steele",
                platform: "Udemy",
                date: "2022",
                link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-71e26554-f4cf-44d7-b83b-113fbbd63a31.pdf",
            },
        ],
        awards: [
            {
                title: "Company Hackathon Winner",
                from: "ADP",
                date: "2024",
            },
            {
                title: "Top 50 Best HR Products",
                from: "G2",
                date: "(2021-2024)",
            },
            {
                title: "Gold Winner for Mobile Web & App of the Year",
                from: "The American Business Awards",
                date: "2024",
            },
            {
                title: "Gold Winner for Mobile Site Design",
                from: "COMM",
                date: "2023",
            },
            {
                title: "Bebras Challenge - 1st of 200 students",
                from: "Raspberry Pi foundation",
                date: "2016",
            },
        ],

    }
}

export default text;