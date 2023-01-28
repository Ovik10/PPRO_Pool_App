import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getCourseById, bookCourse, cancelBooking } from '../services/courses';
import { getCurrentUser } from '../services/auth';

const findCourse = async (id) => {
  const selected = await getCourseById(id);
  return selected;
}

const shorten = (str) => {
  if(str){
    return (str.length > 8) ? str.slice(0, 7) + '...' : str;
  }
};

const formatDate = (d) => {
  console.log(d)
  
  const date = new Date(d);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return formattedDate;
}

const CourseDetail = ({ course }) => {

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
    <div className="course">
      <div>
        <h3>{selected.name}</h3>
        <p>{formatDate(selected.beginDate)}</p>
        <p>{params.id ? selected.description : shorten(selected.description)}</p>
        <p>Capacity: {selected.capacity}</p>
        <p>Price: {selected.price}</p>
      </div>
      <div>
        <Link to={"/course/" + selected.id}>View more</Link>
        {currentUser.role == "ADMIN" ? (
          <Link to={"/course/update/" + selected.id}>Edit</Link>
        ) : (
          <button onClick={book}>
            {isBooked ? "Cancel Booking" : "Book"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;