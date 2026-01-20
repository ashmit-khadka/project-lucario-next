import fetcher from "../utils/fetcher";

const getQuiz = async (skill, quizId) => {
    try {
        const response = await fetcher.get(`/course/getQuiz/${skill}/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz:', error);
        throw error;
    }
}


export { 
    getQuiz,
};