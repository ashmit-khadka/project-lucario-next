'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCourses } from "../../services/courseServices";
import Breadcrumb from "../Breadcrumb";

const CourseCatalogueScreen = () => {
    const router = useRouter();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    if (!courses) {
        return <div className="screen-empty"></div>
    }

    return (
        <div className="learn-skill-screen screen">
            {/* <h1 className="screen-header">Select a Course</h1> */}
            <Breadcrumb
                items={[
                    { label: "Home", link: "/" },
                    { label: "Learn", link: "/learn" },
                ]}
            />
            <div className="screen-intro">
                <h1 className="screen-header">Course Catalogue</h1>
                <p>{`🚀 Explore a curated library of in-depth software engineering courses covering essential and advanced topics in JavaScript, TypeScript, React, C#, and more.`}</p>
                <p>{`Each course is packed with expert-level insights, best practices, and real-world examples to help you become a top-tier developer. Whether you're learning something new or recapping key concepts, the structured lessons and integrated quizzes make your journey interactive, practical, and career-focused.`}</p>
            </div>
            <div className="lesson-tiles">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="lesson-tile"
                        onClick={() => router.push(course.link)} // Navigate to the course page
                    >
                        <div className="lesson-tile-header">
                            <img
                                src={`/${course.icon}`}
                                alt={course.name}
                                className="course-image"
                            />

                            <h2 className="course-name">{course.name}</h2>
                        </div>
                        <p className="course-description">{course.description}</p>
                        <p className="course-description italic">{`📖 Modules: ${course.totalLessons}`}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseCatalogueScreen;