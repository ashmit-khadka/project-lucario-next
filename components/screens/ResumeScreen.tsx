'use client';

import React from 'react';
import ADPLogo from '../../assets/image/logos/adp.jpg';
import CTMLogo from '../../assets/image/logos/ctm.png';
import PNSLogo from '../../assets/image/pnsuk_logo.png';
import KCLLogo from '../../assets/image/kcl_logo.jpg';
import UEALogo from '../../assets/image/uea_logo.webp';

import IconProfile from '../../assets/icons/noun-person-7065915.svg';
import IconWorkExperience from '../../assets/icons/noun-briefcase-7779894.svg';

import IconEmail from '../../assets/icons/noun-mail-1428698.svg';
import IconPhone from '../../assets/icons/noun-phone-7849386.svg';
import IconLocation from '../../assets/icons/noun-location-5480581.svg';
import IconSkills from '../../assets/icons/noun-magic-2704149.svg';
import IconEducation from '../../assets/icons/noun-education-3961689.svg';
import IconCertificate from '../../assets/icons/noun-certificate-7830135.svg';
import IconLink from '../../assets/icons/noun-link-5747677.svg';
import IconGitHub from '../../assets/icons/GitHub.svg';

import text from '../../data/resume';
import parseText from '../../utils/parseText';
import Breadcrumb from '../Breadcrumb';
import Button from '../core/Button';

const ResumeScreen = () => {

    const resumeText = text.default;

    return (
        <div className="screen">
            <div className="resume-screen-info" >
                <Breadcrumb
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Resume", link: "/resume" },
                    ]}
                />
                <div className="screen-intro">
                    <h1 className="screen-header">Resume</h1>
                    <p>🚀 Here's a detailed overview of my professional journey, skills, and accomplishments.</p>
                    <Button
                        onClick={() => {
                            const link = `/assets/docs/CV_Ashmit_Khadka.pdf`;
                            window.open(link, "_blank");
                        }}
                    >
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="resume resume-container">
                {/* Left Column */}
                <div className="resume-left-column">
                    <ContactSection
                        name={resumeText.header.name}
                        title={resumeText.header.title}
                        entries={resumeText.contact}
                    />
                    <SectionDivider />

                    <SkillSection
                        languages={resumeText.skills.languages}
                        frameworks={resumeText.skills.frameworks}
                        cloud={resumeText.skills.cloud}
                        database={resumeText.skills.databases}
                        testing={resumeText.skills.testing}
                        tools={resumeText.skills.tools}
                    />
                    <SectionDivider />

                    <EducationSection
                        entries={resumeText.education}
                    />
                    <SectionDivider />

                    <CertificationSection
                        entries={resumeText.certifications}
                    />

                    <SectionDivider />
                    <AwardSection
                        entries={resumeText.awards}
                    />

                </div>

                {/* Right Column */}
                <div className="resume-right-column">
                    <ProfileSection
                        text={resumeText.profile.text}
                    />
                    <SectionDivider />
                    <WorkExperienceSection
                        workExperience={resumeText.workExperience}
                    />
                    <SectionDivider />
                    <ProjectSection
                        projects={resumeText.projects}
                    />
                </div>
            </div>
        </div>
    );
}

const SectionDivider = () => {
    return (
        <div className="resume-section-divider">
        </div>
    )

    // return (
    //     <div style={{
    //         width: "100%",
    //         borderBottom: "1px solid lightgray",
    //         margin: "1rem 0"
    //     }} ></div>
    // )
}


const SkillSection = (props) => {

    const { languages, frameworks, cloud, database, testing, tools } = props;

    return (
        <section className="resume-section skills">
            <SectionHeader header="Skills" icon={<IconSkills />} />
            <div className="resume-skills-groups">
                <div className="resume-skills-group">
                    <p><span className="bold">Languages</span>: {languages}</p>
                </div>

                <div className="resume-skills-group">
                    <p><span className="bold">Frameworks</span>: {frameworks}</p>

                </div>
                <div className="resume-skills-group">
                    <p><span className="bold">Cloud / DevOps</span>: {cloud}</p>
                </div>
                <div className="resume-skills-group">
                    <p><span className="bold">Databases</span>: {database}</p>
                </div>
                <div className="resume-skills-group">
                    <p><span className="bold">Testing</span>: {testing}</p>
                </div>
                <div className="resume-skills-group">
                    <p><span className="bold">Other</span>: {tools}</p>
                </div>
            </div>
        </section>
    )
}

const ProjectSection = (props) => {
    const { projects } = props;
    return (
        <section className="resume-section">
            <SectionHeader header="Projects" icon={<IconProfile />} />
            <ul>
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        title={project.title}
                        description={project.description}
                        context={project.context}
                    />
                ))}
            </ul>
        </section>
    );
}

const ProjectItem = (props) => {
    const { title, description, context } = props;
    return (
        <li className="project">
            <p><span className="bold">{title}</span>, <span style={{ fontStyle: "italic", fontWeight: "200" }}>{context}</span> - {parseText(description)}</p>
        </li>
    );
}

const ProfileSection = (props) => {
    const { text } = props;
    return (
        <section >
            <SectionHeader header="Profile" icon={<IconProfile />} />
            <p>{text}</p>
        </section>
    );
}

const WorkExperienceSection = (props) => {
    const { workExperience } = props;
    return (
        <section>
            <SectionHeader header="Work Experience" icon={<IconWorkExperience />} />
            <div
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
                {workExperience.map((entry, index) => (
                    <WorkExperience
                        key={index}
                        company={entry.company}
                        position={entry.position}
                        startDate={entry.startDate}
                        endDate={entry.endDate}
                        responsibilities={entry.responsibilities}
                        logo={entry.logo}
                    />
                ))}
            </div>
        </section>
    );
}

const WorkExperience = (props) => {
    const { company, position, startDate, endDate, responsibilities, logo } = props;

    return (
        <div className="resume-work-experience">
            {/* <div className="resume-work-experience-timeline-dot"></div> */}
            <div className="resume-work-experience-company">
                {logo && <img src={logo} alt={`${company} logo`} className="company-logo" />}
                <div>
                    <h3 className="bold">{`${position} - ${company}`}</h3>
                    <p>{startDate} - {endDate}</p>
                </div>
            </div>
            <ul className="responsibilities">
                {responsibilities.map((item, index) => (
                    <li key={index}>{parseText(item)}</li>
                ))}
            </ul>
        </div>
    );
}

const ContactSection = (props) => {
    const { name, title, entries } = props;
    return (
        <section className="resume-section contact-info">
            <div className="resume-name">
                <h1>{name}</h1>
                <p>{title}</p>
            </div>
            <ul className="resume-info">
                {entries.map((entry, index) => (
                    <li key={index} className="resume-contact">
                        {entry.icon}
                        {entry.link ? (
                            <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {entry.text}
                            </a>
                        ) : (
                            <p>{entry.text}</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

const EducationSection = (props) => {
    const { entries } = props;
    return (
        <section className="resume-section resume-education">
            <SectionHeader header="Education" icon={<IconEducation />} />
            <ul>
                {entries.map((entry, index) => (
                    <li key={index} className="resume-education-entry">
                        <img src={entry.logo} alt={`${entry.from} logo`} className="education-logo" />
                        <div>
                            <p><span className="bold">{entry.title}</span> - {entry.institution}, {entry.date}, {entry.grade} </p>

                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

const CertificationSection = (props) => {
    const { entries } = props;
    return (
        <section className="resume-section resume-certifications">
            <SectionHeader header="Certifications" icon={<IconCertificate />} />
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p><span className="bold">{entry.title}</span> - {entry.institution}, {entry.platform}, {entry.date}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

const AwardSection = (props) => {
    const { entries } = props;
    return (
        <section className="resume-section resume-awards">
            <SectionHeader header="Awards" icon={<IconCertificate />} />
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <p><span className="bold">{entry.title}</span> - {entry.from}, {entry.date}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}


const SectionHeader = (props) => {
    const { header, icon } = props;
    return (
        <div className="resume-section-header">
            {icon}
            <h2 className="resume-section-header">{header}</h2>
        </div>
    );
}

export default ResumeScreen;