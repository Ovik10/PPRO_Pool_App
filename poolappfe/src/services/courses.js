import axios from 'axios';
import { getAuthHeader } from './auth';

const baseUrl = 'http://localhost:8080/course';

export const getCourses = async () => {
    console.log(getAuthHeader())
    const res = await axios.get(`${baseUrl}/getAll`, getAuthHeader()).catch(function (error) {
        console.log(error.toJSON());
      });
      console.log(JSON.stringify(res.data));
    return res;
};

export const getCourseById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res;
  };
  
  export const createCourse = async (course) => {
    console.log(course);
    const res = await axios.post(`${baseUrl}/add`, course, getAuthHeader()).catch(function (error) {
        console.log(error.toJSON());
      });
      console.log(JSON.stringify(res.data));
    return res;
  };
  
  export const updateCourse = async (id, course) => {
    const res = await axios.put(`${baseUrl}/${id}`, course, getAuthHeader());
    return res;
  };
  
  export const deleteCourse = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`, getAuthHeader());
    return res;
  };
  
  export const bookCourse = async (id) => {
    const res = await axios.post(`${baseUrl}/${id}/book`, null, getAuthHeader());
    return res;
  };
  
  export const cancelBooking = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}/book`, getAuthHeader());
    return res;
  };