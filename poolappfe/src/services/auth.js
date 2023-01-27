import axios from 'axios';

const baseUrl = 'http://localhost:8080/auth';

export const login = async (email, password) => {
  const res = await axios.post(`${baseUrl}/authenticate`, { email, password }).catch(function (error) {
    console.log(error.toJSON());
  });
  console.log(JSON.stringify(res.data));
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

export const register = async (firstname, lastname, email, password) => {
  console.log(firstname, lastname, email, password);
  const res = await axios.post(`${baseUrl}/register`, {firstname, lastname, email, password }).catch(function (error) {
    console.log(error.toJSON());
  });
  console.log(JSON.stringify(res.data));
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const putUser = async (user) => {
  console.log("fewfwefewfwefwefwefwefwe")
  const res = await axios.put(`${baseUrl}/update`, user, getAuthHeader());
  console.log(res);
  return res;
};

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getCurrentUser().token}` } };
};
