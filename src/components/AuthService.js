import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:3001/api/v1/user';
// const [data, setData] = useState();
// Login user
const login = async (userData) => {
  console.log(userData);
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    console.log(localStorage.user);
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

//Fetch donnees utilisateur

const fetchutil = async () => {
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const retrievedUser = JSON.parse(localStorage.getItem('user'));
  if (retrievedUser != null) {
    setToken(retrievedUser.body.token);
  }
  const res = await axios.post(
    `http://localhost:3001/api/v1/user/profile`,
    `Bearer ${token}`
  );
  if (res.data) {
    localStorage.setItem('data', JSON.stringify(res.data));
    console.log(localStorage.data);
  }
  return res.data;
};

const authService = {
  logout,
  login,
  fetchutil,
};

export default authService;
