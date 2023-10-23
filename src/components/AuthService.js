import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

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

// Get user data
const getUser = () => {
  const token = localStorage.getItem('token');
  console.log('token est ci-dessous');
  console.log(token);
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
  logout,
  login,
  getUser,
};

export default authService;
