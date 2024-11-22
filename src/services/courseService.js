import API from "./api";

export const createCourse = async (courseData) => {
    const response = await API.post('/courses/create-course', courseData)
    return response.data
}

// Recupera tutti i corsi
export const getAllCourses = async () => {
    const response = await API.get('/courses/all-courses');
    return response.data;
};