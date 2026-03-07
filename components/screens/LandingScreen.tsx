'use client';

import React, { useState } from "react";
import KCLLogo from '../../assets/image/kcl_logo.jpg';
import UEALogo from '../../assets/image/uea_logo.webp';

import CSharpIcon from '../../assets/icons/CSharp.svg';
import JavaScriptIcon from '../../assets/icons/JavaScript.svg';
import TypeScriptIcon from '../../assets/icons/TypeScript.svg';
import NodeIcon from '../../assets/icons/Node.svg';
import FigmaIcon from '../../assets/icons/Figma.svg';
import MongoDBIcon from '../../assets/icons/MongoDB.svg';
import SQLIcon from '../../assets/icons/PostgresSQL.svg';
import PythonIcon from '../../assets/icons/Python.svg';
import DjangoIcon from '../../assets/icons/Django.svg';
import GitIcon from '../../assets/icons/Git.svg';
import JiraIcon from '../../assets/icons/Jira.svg';
import AzureIcon from '../../assets/icons/Azure.svg';
import IconTailwind from '../../assets/icons/Tailwind.svg';
import IconCypress from '../../assets/icons/Cypress.svg';
import IconSelenium from '../../assets/icons/Selenium.svg';
import IconReact from '../../assets/icons/React.svg';
import IconRedux from '../../assets/icons/Redux.svg';
import IconJenkins from '../../assets/icons/Jenkins.svg';
import IconSASS from '../../assets/icons/Sass.svg';

import SelfImage from '../../assets/image/PXL_20230625_190943733~2.jpg';
import SelfImage2 from '../../assets/image/grad_single_021434.jpg';
import IconDot from '../../assets/icons/noun-dot-1420973.svg';
import IconStar from '../../assets/icons/noun-star-995145.svg';
import IconJavaScript from '../../assets/icons/JavaScript.svg';
import IconTypeScript from '../../assets/icons/TypeScript.svg';
import IconNode from '../../assets/icons/Node.svg';
import IconFigma from '../../assets/icons/Figma.svg';

import ImageGoogle from '../../assets/image/logos/google.svg';
import ImagePenn from '../../assets/image/logos/penn.png';
import ImageUdemy from '../../assets/image/logos/udemy.png';


import ImagePortfolio from '../../assets/image/app-store-preview-screenshot-sketch.jpg';
import ImageADP from '../../assets/image/logos/adp.jpg';
import ImageProjectPnsuk from '../../assets/image/projects/project_pnsuk.png';
import ImageProjectPalkia from '../../assets/image/projects/project_geekcaffeine.png';
import ImageProjectPg from '../../assets/image/projects/project_pg.png';
import ImageProjectUg from '../../assets/image/projects/project_ug.png';


import IconEmail from '../../assets/icons/noun-mail-1428698.svg';
import IconPhone from '../../assets/icons/noun-phone-7849386.svg';
import IconLocation from '../../assets/icons/noun-location-5480581.svg';
import IconLink from '../../assets/icons/noun-link-5747677.svg';


import Button from '../core/Button';
import { motion } from "framer-motion";

import ImageG2 from '../../assets/image/logos/G2.png';
import ImageAmerican from '../../assets/image/logos/american_best_in_business_awards.png';
import ImageComm from '../../assets/image/logos/comm_awards.png';
import ImageTitan from '../../assets/image/logos/titan_awards.png';
import ImageBIG from '../../assets/image/logos/business_intelligence_group_big_awards_logo.jpg';
import ImageAppStore from '../../assets/icons/App_Store.svg';
import ImagePlayStore from '../../assets/icons/Google_Play_.png';

import text from '../../data/resume';
import parseText from '../../utils/parseText';

import NavigationHover from '../NavigationHover';

const LandingScreen = () => {

    const [activeSection, setActiveSection] = useState('about');

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="landing">
            <NavigationHover
                sections={[
                    { id: 'about', label: 'About me' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'experience', label: 'Experience' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'education', label: 'Education' },
                    { id: 'certifications', label: 'Certifications' },
                    { id: 'contact', label: 'Contact' }
                ]}
                showAfterSection={'about'}
            />
            <div id="about" className="landing-about section screen">
                <div className="landing-about--large">
                    {AboutSectionIntro}
                    <AboutSectionShortcuts
                        activeSection={activeSection}
                        onSectionClick={scrollToSection}
                    />
                </div>
                <div className="landing-about--large">
                    {AboutSectionBio}
                </div>

                <div className="landing-about--small">
                    {AboutSectionIntro}
                    {AboutSectionBio}
                    <AboutSectionShortcuts
                        activeSection={activeSection}
                        onSectionClick={scrollToSection}
                    />
                </div>
            </div>

            <SkillsSection />

            <div id="experience" className="landing-experience section screen">
                <SectionTitle title="Experience" />
                <div className="section-items">
                    <ExperienceItem
                        title="Software Engineer"
                        organization="ADP (Automatic Data Processing)"
                        date="September 2021 - Present"
                        responsibilities={text.default.workExperience[0].responsibilities}
                        logo={text.default.workExperience[0].logo}
                        awards={[
                            { image: ImageAppStore, text: "4.9/5 from 37k+ reviews, Apple App Store" },
                            { image: ImagePlayStore, text: "4.9/5 from 10k+ reviews, Google Play Store" },
                            { image: ImageAmerican, text: "Gold Winner for Mobile Web & App of the Year, 2023" },
                            { image: ImageG2, text: "Top 50 Best HR Products, (2021-2025) G2" },
                            { image: ImageBIG, text: "BIG Innovation Award for Business Services, 2025" },
                            { image: ImageTitan, text: "Platinum Winner for Financial Services Information Technology, 2023" },
                            { image: ImageComm, text: "Gold Winner for Mobile Site Design, 2023" },
                        ]}
                    />
                    <ExperienceItem
                        title="Associate Software Engineer"
                        organization="ADP (Automatic Data Processing)"
                        date="July 2019 - July 2020"
                        responsibilities={text.default.workExperience[1].responsibilities}
                        logo={text.default.workExperience[1].logo}
                    />
                    <ExperienceItem
                        title={text.default.workExperience[2].position}
                        organization={text.default.workExperience[2].company}
                        date={text.default.workExperience[2].startDate + " - " + text.default.workExperience[2].endDate}
                        responsibilities={text.default.workExperience[2].responsibilities}
                        logo={text.default.workExperience[2].logo}
                    />
                </div>
            </div>


            <div id="projects" className="screen section">
                <SectionTitle title="Projects" />

                <div className="section-items">
                    <PortfolioSection
                        header="AI-Powered Sustainability Platform for Higher Education"
                        description="Built as part of my MSc thesis for which I was awarded distinction, this MERN stack web app uses AI to generate personalised sustainability challenges and support user interaction through chatbots and comment moderation. Gamified features like leaderboards and rewards drive engagement, while the VIPER-based architecture ensures scalability and clean modular design."
                        image={ImageProjectPg}
                        link={`${process.env.PUBLIC_URL}/assets/docs/pg_project.pdf`}
                    />
                    <PortfolioSection
                        header="DNA Visualisation Platform for Plant Pathogen Research"
                        description="Built as part of my BSc thesis for which I was awarded first class honours. Collaborated with The Sainsbury Laboratory to build a MERN stack web app for visualising complex DNA and protein interaction datasets. Integrated D3.js to render interactive visualisations from the ground up."
                        image={ImageProjectUg}
                        flipped
                        link={`${process.env.PUBLIC_URL}/assets/docs/ug_project.pdf`}
                    />
                    <PortfolioSection
                        header="GeekCaffeine.com: One Hub for All Things Tech"
                        description="I built GeekCaffeine to create the ultimate destination for computer geeks—a single platform that curates the best tech content from across the internet. From programming and gaming to hardware and cybersecurity, it brings together news, tutorials, and videos in one clean, responsive interface designed for daily use."
                        link="https://geekcaffeine.com/"
                        image={ImageProjectPalkia}
                    />
                    <PortfolioSection
                        header="PNSUK.com: Empowering the Nepali Community"
                        description="I helped design and develop the official site for the Peterborough Nepalese Society UK (PNSUK), a registered charity that empowers the local Nepali community through cultural events, education, and charitable support. My goal was to make a platform that reflects their mission, enables blog contributions, and makes resources more accessible for members and supporters alike."
                        image={ImageProjectPnsuk}
                        link="https://pnsuk.com/"
                        flipped
                    />
                </div>
            </div>


            <div id="education" className="landing-education section screen">
                <SectionTitle title="Education" />
                <div className="section-items">
                    <EducationTile
                        title="Master of Science in Software Engineering"
                        description="King's College London, 2024, High Merit."
                        logo={KCLLogo}
                    />
                    <EducationTile
                        title="Bachelor of Science in Computer Science"
                        description="University of East Anglia, 2020, First Class Honours."
                        logo={UEALogo}
                    />
                </div>

            </div>

            <div id="certifications" className="landing-education section screen">
                <SectionTitle title="Certifications" />
                <div className="section-items section-items--grid">
                    <CertificationTile
                        title="Google UX Design"
                        institution="Google"
                        platform="Coursera"
                        year="2021"
                        logo={ImageGoogle}
                        link="https://www.coursera.org/account/accomplishments/specialization/certificate/BQYR2BE9BL4Z"
                    />
                    <CertificationTile
                        title="Entrepreneurship Specialization"
                        institution="University of Pennsylvania"
                        platform="Coursera"
                        year="2023"
                        logo={ImagePenn}
                        link="https://www.coursera.org/account/accomplishments/certificate/78SW7ZLCBYL4"
                    />

                    <CertificationTile
                        title="JavaScript: The Advanced Concepts"
                        institution="Zero to Mastery"
                        platform="Udemy"
                        year="2022"
                        logo={ImageUdemy}
                        link="https://udemy-certificate.s3.amazonaws.com/pdf/UC-628b7748-f652-467f-af3f-00c588747cb0.pdf"
                    />

                    <CertificationTile
                        title="Mastering TypeScript - 2023 Edition"
                        institution="Colt Steele"
                        platform="Udemy"
                        year="2023"
                        logo={ImageUdemy}
                        link="https://udemy-certificate.s3.amazonaws.com/pdf/UC-0ea23300-3f11-443d-ae2c-08d9e22ee458.pdf"
                    />

                    <CertificationTile
                        title="C# Advanced Topics"
                        institution="Mosh Hamedani"
                        platform="Udemy"
                        year="2022"
                        logo={ImageUdemy}
                        link="https://udemy-certificate.s3.amazonaws.com/pdf/UC-71e26554-f4cf-44d7-b83b-113fbbd63a31.pdf"
                    />

                </div>
            </div>


            <div id="contact" className="landing-contact section screen">
                <SectionTitle title="Contact" />
                <div className="section-items">
                    <ContactTile text="ashmit.khadka@outlook.com" icon={<IconEmail />} />
                    <ContactTile text="07476919615" icon={<IconPhone />} />
                    <ContactTile text="London, Peterborough, Cambridge" icon={<IconLocation />} />
                </div>
            </div>
        </div>
    );
}

const ContactTile = (props) => {
    const { text, icon } = props;
    return (
        <motion.div
            className="landing-contact-tile"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
            >
                {icon}
            </motion.div>
            <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
            >
                {text}
            </motion.p>
        </motion.div>
    );
}

const ExperienceItem = (props) => {
    const { title, organization, date, responsibilities, logo, awards } = props;

    const awardItem = (image, text) => (
        <li className="landing-experience-tile-award">
            <img src={image.src} alt="Award" />
            <p>{parseText(text)}</p>
        </li>
    );

    return (
        <motion.div
            className="landing-experience-tile"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            <motion.div
                className="landing-experience-tile--header"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div>
                    <img src={logo.src} alt="Experience Logo" className="experience-logo" />
                </div>
                <div className="landing-experience-tile--text">
                    <h2>{title}</h2>
                    <p>{organization}</p>
                    <p>{date}</p>
                </div>
            </motion.div>
            <motion.ul
                className="landing-experience-tile--responsibilities"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
            >
                {responsibilities.map((item, index) => (
                    <>

                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.6 + (index * 0.1),
                                duration: 0.5
                            }}
                            viewport={{ once: true }}
                        >
                            <IconStar />
                            <div>
                                {parseText(item)}

                            </div>
                        </motion.li>
                    </>
                ))}
            </motion.ul>

            {awards && (
                <ul className="landing-experience-tile-awards">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.6 + (index * 0.1),
                                duration: 0.5
                            }}
                            viewport={{ once: true }}
                        >
                            {awardItem(award.image, award.text)}
                        </motion.div>
                    ))}

                </ul>
            )}
        </motion.div>
    );
}

const AboutSectionIntro = (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <div className="landing-intro-header">
            <motion.div
                className="landing-intro-header-underline"
                initial={{ width: 0 }}
                animate={{ width: "22%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
            />
            <h1>Hi, I'm Ash</h1>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            >
                <IconStar />
            </motion.div>
        </div>

        <motion.div
            className="landing-intro-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <ul>
                <li>Problem Solver <IconDot /></li>
                <li>Creator <IconDot /></li>
                <li>Pioneer</li>
            </ul>
        </motion.div>

        <motion.div
            className="landing-intro-quick-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <ul>
                <li><span>S&P 500</span> Software Engineer </li>
                <li>Certified <span>UX</span> enthusiast </li>
                <li>A world top 50 university graduate</li>
            </ul>
        </motion.div>
    </motion.div>
);

const AboutSectionShortcuts = ({ activeSection, onSectionClick }) => {
    const shortcuts = [
        { id: 'about', label: 'About me' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <motion.div
            className="landing-intro-shortcuts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.ul>
                {shortcuts.map(({ id, label }, index) => (
                    <motion.li
                        key={id}
                        className={`landing-intro-shortcuts-item ${id === 'about' || activeSection === id ? 'landing-intro-shortcuts--active' : ''}`}
                        onClick={() => onSectionClick(id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1
                        }}

                    >
                        {label}
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};

const AboutSectionBio = (
    <div className="landing-intro-bio">
        <div className="landing-intro-bio-icon">
            <motion.div
                className="landing-intro-bio-icon--javascript"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <IconJavaScript />
            </motion.div>
            <motion.div
                className="landing-intro-bio-icon--typescript"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <IconTypeScript />
            </motion.div>
            <motion.div
                className="landing-intro-bio-icon--node"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <IconNode />
            </motion.div>
            <motion.div
                className="landing-intro-bio-icon--figma"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <IconFigma />
            </motion.div>
            <motion.img
                src={SelfImage2.src}
                alt="Profile"
                className="landing-intro-profile"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.1
                }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                }}
            />
        </div>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {`"I'm a trailblazing software engineer who loves building things that matter. With a Master’s in Software Engineering from King’s College London and nearly five years at ADP, a leading S&P 500 tech giant where I’ve worked on RUN — an award-winning web app boasting a 4.9 rating on the App Store."`}
        </motion.p>
    </div>
);

const Skill = (props) => {
    const { name, icon, index, isExpanded } = props;

    // Calculate stagger delay based on position
    const delay = isExpanded ?
        (index >= 8 ? (index - 8) * 0.1 : index * 0.1) :
        (index * 0.1);

    return (
        <motion.div
            className="landing-skill-tile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            <motion.img
                src={icon.src}
                alt={`${name} Icon`}
                className="skill-icon"
                whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.2)",
                    transition: { duration: 0.2 }
                }}
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
            >
                {name}
            </motion.p>
        </motion.div>
    );
}


const SkillsSection = () => {
    const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);


    const initialSkills = [
        { name: "JavaScript", icon: JavaScriptIcon },
        { name: "React", icon: IconReact },
        { name: "Node.js", icon: NodeIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Figma", icon: FigmaIcon },
        { name: "C#", icon: CSharpIcon },
        { name: "MongoDB", icon: MongoDBIcon },
        { name: "PostgreSQL", icon: SQLIcon },
    ];

    const additionalSkills = [
        { name: "Python", icon: PythonIcon },
        { name: "Django", icon: DjangoIcon },
        { name: "Tailwind", icon: IconTailwind },
        { name: "Git", icon: GitIcon },
        { name: "Jira", icon: JiraIcon },
        { name: "Azure", icon: AzureIcon },
        { name: "Redux", icon: IconRedux },
        { name: "Cypress", icon: IconCypress },
        { name: "Selenium", icon: IconSelenium },
        { name: "Jenkins", icon: IconJenkins },
        { name: "Sass", icon: IconSASS },
    ];

    const visibleSkills = isSkillsExpanded ? [...initialSkills, ...additionalSkills] : initialSkills;

    const containerVariants = {
        collapsed: {
            height: "250px",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        expanded: {
            height: "auto",
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    return (
        <div id="skills" className="landing-skill section">
            <SectionTitle title="Skills" isLight isWide />
            <motion.div
                className="landing-skill-container screen"
                variants={containerVariants}
                initial="collapsed"
                animate={isSkillsExpanded ? "expanded" : "collapsed"}
            >
                {visibleSkills.map((skill, index) => (
                    <Skill
                        key={`${skill.name}-${isSkillsExpanded}`}
                        name={skill.name}
                        icon={skill.icon}
                        index={index}
                        isExpanded={isSkillsExpanded}
                    />
                ))}
            </motion.div>
            <motion.button
                className="landing-skill-expand"
                onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
                whileHover={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
            >
                {isSkillsExpanded ? 'Show Less' : 'Show More'}
            </motion.button>
        </div>
    );
};

const PortfolioSection = (props) => {
    const { header, description, image, link, flipped } = props;

    const imageClass = `landing-portfolio-tile-image ${flipped ? 'landing-portfolio-tile-image--flipped' : ''}`;
    const textClass = `landing-portfolio-tile-text ${flipped ? 'landing-portfolio-tile-text--flipped' : ''}`;

    const handleOpenProject = () => {
        if (link) {
            window.open(link, '_blank');
        }
    }

    return (
        <motion.div
            className="landing-portfolio-tile"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
            }}
        >
            <motion.div
                className={imageClass}
                //initial={{ opacity: 0, x: flipped ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.img
                    src={image.src}
                    alt="Portfolio Icon"
                    className="portfolio-icon"
                    whileHover={{
                        filter: "brightness(1.1)",
                        transition: { duration: 0.3 }
                    }}
                />
            </motion.div>
            <motion.div
                className={textClass}
                //initial={{ opacity: 0, x: flipped ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2>{header}</h2>
                <p>{description}</p>
                <Button
                    onClick={handleOpenProject}
                    className="landing-portfolio-tile--button"
                >
                    View Project
                </Button>
            </motion.div>
        </motion.div>
    );
}

const EducationTile = (props) => {
    const { title, description, logo } = props;

    return (
        <motion.div
            className="landing-education-tile"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
            >
                <img src={logo.src} alt="Education Logo" className="education-logo" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
            >
                <h2>{title}</h2>
                <p>{description}</p>
            </motion.div>
        </motion.div>
    );
}

const CertificationTile = (props) => {
    const { title, institution, platform, year, logo, link } = props;

    const handleOpenCertification = () => {
        if (link) {
            window.open(link, '_blank');
        }
    }

    return (
        <motion.div
            className="landing-certification-tile"
            onClick={handleOpenCertification}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.05)"
            }}
            transition={{
                duration: 0.3,
                stiffness: 300
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
            >
                <img src={logo.src} alt="Certification Logo" className="certification-logo" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
            >
                <h2>{title}</h2>
                <p>{institution}, {platform}, {year}</p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.2, rotate: 45 }}
                transition={{ stiffness: 400 }}
                viewport={{ once: true }}
            >
                <IconLink className="icon-button" />
            </motion.div>
        </motion.div>
    );
}

const SectionTitle = (props) => {
    const { title, isLight, isWide } = props;
    return (
        <div className={`section-title ${isLight ? 'section-title--light' : ''} ${isWide ? 'screen section-title--wide' : ''}`}>
            <h2>{title}.</h2>
        </div>
    );
}


export default LandingScreen;