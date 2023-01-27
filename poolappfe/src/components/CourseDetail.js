import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/courses';

const findCourse = async (id) => {
  const selected = await getCourseById(id);
  return selected;
}

const CourseDetail = ({ course }) => {

  const params = useParams();
  const [selected, setSelected] = useState('');

  useEffect(() => { 
  if(params.id){
    course = null;
    const search = async () => {
      const res = await findCourse(params.id);
      setSelected(res.data);
    };
    search();
  } else {
    setSelected(course);
  }
  }, []);

  return (
    <div>
      <h3>{selected.name}</h3>
      <p>{selected.description}</p>
      <p>Capacity: {selected.capacity}</p>
      <p>Price: {selected.price}</p>
      <Link to={"update/" + selected.id}>Select</Link>
      <Link to={"/course/" + selected.id}>Select</Link>
    </div>
  );
};

export default CourseDetail;