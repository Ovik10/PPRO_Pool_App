import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  login,
  register,
  getCurrentUser,
  logout,
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
    const res = await register(firstname, lastname, email, password);
    setUser(res);
  };

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    setUser(res);
  };

  const getCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
    return res.data;
  };

  const handleCreateCourse = async (course) => {
    const res = await createCourse(course);
    setCourses([...courses, res.data]);
  };

  const handleUpdateCourse = async (id, course) => {
    await updateCourse(id, course);
    const updatedCourses = courses.map((l) => (l.id === id ? course : l));
    setCourses(updatedCourses);
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    const updatedCourses = courses.filter((l) => l.id !== id);
    setCourses(updatedCourses);
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route exact path="/" element=
          {user ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/register" element={
          <RegisterPage onRegister={handleRegister} />}
        />
        <Route exact path="/login" element={
          <LoginPage onLogin={handleLogin} />}
        />
        <Route exact path="/user" element=
          {user ? (
            <UserForm user={user} onUpdateUser={setUser} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route exact path="/courses" element={
          user ? (
            <CourseList courses={courses} />
          ) : (
            <Navigate to="/login" />
          )
        }
        />
        <Route exact path="/courses/add" element=
          {user && user.role == "USER" ? (
            <CourseForm onCreateCourse={handleCreateCourse} />
          ) : (
            <Navigate to="/courses" />
          )}
        />
      </Routes>
    </Router>
  );
};


export default App;
