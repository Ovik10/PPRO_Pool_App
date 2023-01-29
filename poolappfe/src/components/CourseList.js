import React, { useState, useEffect } from 'react';
import CourseDetail from './CourseDetail';
import { getCourses } from '../services/courses';

const CourseList = ({onUpdateBook}) => {
  const [courses, setCourses] = useState([]);
  const lectionTypes = ['SAUNA', 'WHIRLPOOL', null];

  
  const onUpdateBooks = async () => {
    await onUpdateBook();
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCourses();
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {lectionTypes.map(type => (
        <>
          <h2>Reserve {type}</h2>
          {courses.filter(course => course.lectionType === type).map(course => (
            <CourseDetail key={course.id} course={course} onUpdateBookCredits={onUpdateBooks}  />
          ))}
        </>
      ))}
    </div>
  );
};

export default CourseList;
