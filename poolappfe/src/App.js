import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import {
  login,
  register,
  getCurrentUser,
  putUser,
  addCredits,
  deleteUser,
  getUser,
} from './services/auth';

import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  bookCourse,
  cancelBooking,
} from './services/courses';

import Navbar from './components/Navbar';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';

import UserForm from './components/UserForm';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import CourseForm from './components/CourseForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      setUser(res);
    };
    fetchUser();
  }, []);

  const handleRegister = async (firstname, lastname, email, password) => {
    try {
      const res = await register(firstname, lastname, email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (error) { alert(error.response ? error.response.data.message : error) }

  };

  const handleLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (error) { alert(error.response ? error.response.data.message : error) }

  };

  const getCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
      return res.data;
    } catch (error) { alert(error.response ? error.response.data.message : error) }

  };

  const handleCreateCourse = async (course) => {
    try {
      const res = await createCourse(course);
      setCourses([...courses, res.data]);
    } catch (error) { alert(error.response ? error.response.data.message : error) }

  };

  const handleUpdateCourse = async (id, course) => {
    try {

      await updateCourse(id, course);
      const updatedCourses = courses.map((l) => (l.id === id ? course : l));
      setCourses(updatedCourses);
    } catch (error) { alert(error.response ? error.response.data.message : error) }

  };

  const handleUpdateUser = async () => {
    setUser(getCurrentUser());
  };

  const handleUpdateBook = async () => {
    try {

      const newUser = await getUser();
      
      newUser.data["token"] = user.token
      
      setUser(newUser.data);
    
    } catch (error) { alert(error.response ? error.response.data.message : error) }
  };

  const handleAddCredits = async () => {
    try {
      const res = await addCredits();
      user['credits'] = res.data.credits;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(getCurrentUser());
    } catch (error) {
      alert(error)
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser();
      setUser(null);
      
    } catch (error) {  alert(error.response ? error.response.data.message : error)}

  };



  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route exact path="/" element=
          {user ? (
            <Navigate to="/courses" />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/register" element={
          user ? (
            <Navigate to="/courses" />
          ) : (
            <RegisterPage onRegister={handleRegister} />
          )}
        />
        <Route exact path="/login" element={
          user ? (
            <Navigate to="/courses" />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        />
        <Route exact path="/user" element=
          {user ? (
            <UserForm user={user} onUpdateUser={handleUpdateUser} onDeleteProfile={handleDeleteUser} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/add_credits" element=
          {user ? (
            <div>
              <h1>Get credits</h1>
              <button onClick={handleAddCredits}>Add 100 credits</button>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/courses" element={
          user ? (
            <CourseList courses={courses} onUpdateBook={handleUpdateBook} />
          ) : (
            <Navigate to="/login" />
          )
        }
        />
        <Route path="course/:id" element={
          user ? (
            <CourseDetail onUpdateBookCredits={handleUpdateBook} />
          ) : (
            <Navigate to="/login" />
          )
        }
        />
        <Route exact path="/courses/add" element=
          {user && user.role == "ADMIN" ? (
            <CourseForm onCreateCourse={handleCreateCourse} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/course/update/:id" element=
          {user && user.role == "ADMIN" ? (
            <CourseForm
              onUpdateBookCredits={handleUpdateCourse}
            />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
};


export default App;