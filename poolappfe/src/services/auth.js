import axios from 'axios';

const baseUrl = 'http://localhost:8080/auth';

export const login = async (email, password) => {
    const res = await axios.post(`${baseUrl}/authenticate`, { email, password });
    return res;
  }

export const register = async (firstname, lastname, email, password) => {
  const res = await axios.post(`${baseUrl}/register`, { firstname, lastname, email, password });
  return res;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const putUser = async (user) => {
  const res = await axios.put(`${baseUrl}/update`, user, getAuthHeader());
  return res;
};

export const deleteUser = async () => {
  const res = await axios.delete(`${baseUrl}/delete`, getAuthHeader());
  return res;
};


export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getCurrentUser().token}` } };
};

export const addCredits = async (user) => {
  const res = await axios.put(`${baseUrl}/increase`, null, getAuthHeader());
  return res;
};

export const getUser = async () => {
  const res = await axios.get(`${baseUrl}/get`, getAuthHeader());
  return res;
};