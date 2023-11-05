const axios = require('axios');
const signupApi = 'http://localhost:3001/api/v1/user/signup';

const users = [
  {
    firstName: 'Francis',
    lastName: 'Joshua Jr XIV',
    email: 'fourbi@villa.com',
    password: 'password456',
    userName: 'kabbalisto',
  },
];

users.forEach((user) => {
  axios
    .post(signupApi, user)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});
