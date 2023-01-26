import React, { useState } from 'react';
import { createCourse } from '../services/courses';

const CourseForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [beginDate, setDate] = useState('');
  const [price, setPrice] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = { name, description, beginDate, price, capacity};
    await createCourse(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Capacity:
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>
      <br />
      <label>
        Begin Date:
        <input
          type="datetime-local"
          value={beginDate}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
