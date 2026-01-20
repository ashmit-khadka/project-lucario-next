import fetcher from "../utils/fetcher";


const getCourses = async () => {
    try {
        const response = await fetcher.get('/course/getCourses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

const getCourse = async (skill) => {
    try {
        const response = await fetcher.get(`/course/getCourse/${skill}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course:', error);
        throw error;
    }
}


const getLesson = async (skill, lessonId) => {
    try {
        const response = await fetcher.get(`/course/getLesson/${skill}/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        throw error;
    }
}


export { 
    getCourses,
    getCourse,
    getLesson
};