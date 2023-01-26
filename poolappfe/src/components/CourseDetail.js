import React from 'react';


const CourseDetail = ({ course }) => {
  return (
    <div>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>Capacity: {course.capacity}</p>
      <p>Price: {course.price}</p>
      <button>Book course</button>
    </div>
  );
};

export default CourseDetail;