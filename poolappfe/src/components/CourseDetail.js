import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCourseById, bookCourse, cancelBooking } from '../services/courses';
import { getCurrentUser } from '../services/auth';

const findCourse = async (id) => {
  const selected = await getCourseById(id);
  return selected;
}

const CourseDetail = ({course}) => {

  const params = useParams();
  const [selected, setSelected] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    if (params.id) {
      const search = async () => {
        const res = await findCourse(params.id);
        setSelected(res.data);
        setIsBooked(res.data.usersBooked.includes(currentUser.email));
      };
      search();
    } else {
      setSelected(course);
      setIsBooked(course.usersBooked.includes(currentUser.email));
    }
    setCurrentUser(getCurrentUser());
  }, []);

  const book = async () => {
    if (isBooked) {
      const res = await cancelBooking(selected.id);
      console.log(res);
      const updated = await findCourse(selected.id);
      setSelected(updated.data);
      setIsBooked(false);
    }
    else {
      const res = await bookCourse(selected.id);
      console.log(res);
      const updated = await findCourse(selected.id);
      setSelected(updated.data);
      setIsBooked(true);
    }
  };

  return (
    <div>
      <h3>{selected.name}</h3>
      <p>{selected.description}</p>
      <p>Capacity: {selected.capacity}</p>
      <p>Price: {selected.price}</p>
      <Link to={"/course/update/" + selected.id}>Edit</Link>
      <Link to={"/course/" + selected.id}>View more</Link>
      <button onClick={book}>
        {isBooked ? "Cancel Booking" : "Book"}
      </button>
    </div>
  );
};

export default CourseDetail;