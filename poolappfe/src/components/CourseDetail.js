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
  if (str) {
    return (str.length > 8) ? str.slice(0, 7) + '...' : str;
  }
};

const formatDate = (d) => {
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

const CourseDetail = ({ course, onUpdateBookCredits }) => {

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
      try {
        const res = await cancelBooking(selected.id);
        const updated = await findCourse(selected.id);
        setSelected(updated.data);
        setIsBooked(false);
        await onUpdateBookCredits();
      } catch (error) { alert(error.response ? error.response.data.message : error) }
    }
    else {
      try {
        const res = await bookCourse(selected.id);
        const updated = await findCourse(selected.id);
        setSelected(updated.data);
        setIsBooked(true);
        await onUpdateBookCredits();
      } catch (error) { alert(error.response ? error.response.data.message : error) }


    }
  };

  return (
    <div className={`course ${params.id ? 'row' : ''}`}>
      <div>
        <h3>{selected.name}</h3>
        <p>{formatDate(selected.beginDate)}</p>
        <p>{params.id ? selected.description : shorten(selected.description)}</p>
        <p>Capacity: {selected.capacity}</p>
        <p>Price: {selected.price}</p>
        {params.id ?
          <p>Users booked:

            {
              selected.usersBooked ?
                selected.usersBooked.map(user => (
                  <div>{user}</div>
                ))
                : ""
            }

          </p>
          :
          ""
        }
      </div>
      <div>
        {params.id ?
         ""
          :
          <Link to={"/course/" + selected.id}>View more</Link>
        }
        {currentUser.role == "ADMIN" ? (
          <Link to={"/course/update/" + selected.id}>Edit</Link>
        ) : (
          <button className={isBooked ? 'admin' : null} onClick={book}>
            {isBooked ? "Unbook" : "Book"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;