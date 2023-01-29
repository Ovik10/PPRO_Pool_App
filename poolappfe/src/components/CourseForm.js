import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { createCourse, updateCourse, deleteCourse } from '../services/courses';
import { getCourseById } from '../services/courses';

const findCourse = async (id) => {
  const selected = await getCourseById(id);
  return selected;
}


const CourseForm = () => {

  const params = useParams();




  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [beginDate, setDate] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (params.id) {
      const search = async () => {
        try {
          const res = await findCourse(params.id);
          setName(res.data.name);
          setDescription(res.data.description);
          setDate(res.data.beginDate);
          setCapacity(res.data.capacity);
          setPrice(res.data.price);
        } catch (error) { alert(error.response ? error.response.data.message : error) }
      };
      search();
    } else {
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = { name, description, beginDate, price, capacity };
    if (params.id) {
      try {
        const res = await updateCourse(params.id, course);
        alert("Course has been updated")
      } catch (error) {  alert(error.response ? error.response.data.message : error)}

    } else {
      try {
        const res = await createCourse(course);
        alert("Course has been created")
      } catch (error) {  alert(error.response ? error.response.data.message : error)}

    }
  };

  const dropCourse = async (id, e) => {
    e.preventDefault()
    await deleteCourse(id);
    window.location.replace("/courses");
  }


  return (
    <form onSubmit={handleSubmit}>
      <h1>Course</h1>
      <label>
        Name
        <input required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description
        <input required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Capacity
        <input required
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>
      <br />
      <label>
        Begin Date
        <input required
          type="datetime-local"
          value={beginDate}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price
        <input required
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">
        {params.id ? (
          <>
            Update Course
          </>
        ) : (
          <>
            Create Course
          </>
        )}
      </button>
      {params.id ? (
        <button class="danger" onClick={(e) => dropCourse(params.id, e)}>Delete course</button>
      ) : (
        ''
      )
      }
    </form>
  );
};

export default CourseForm;
