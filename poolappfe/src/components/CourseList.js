import React, { useState, useEffect } from 'react';
import CourseDetail from './CourseDetail';
import { getCourses } from '../services/courses';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCourses();
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {courses.map((course) => (
        <CourseDetail key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
