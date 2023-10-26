import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// USE DISPATCH IS TO DISPATCH AN ACTION AND USESELECTOR IS TOSELECT FROM OUR GLOBAL STATE

import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { useFetchuserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { setUser } from '../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [fetchuser] = useFetchuserMutation();

  const { userInfo } = useSelector((state) => state.auth);
  // const [token, setToken] = useState('pasencore');
  // const { token } = useSelector((state) => state.auth);

  const fetchTry = async () => {
    const retrievedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (retrievedInfo) {
      console.log(retrievedInfo);
      console.log(retrievedInfo.body.token);
      const token = retrievedInfo.body.token;

      try {
        const res = await fetchuser(token).unwrap();
        dispatch(setUser({ ...res }));
        console.log('ca a lair de marcher a peu pres');
        navigate('/user');
      } catch (err) {
        console.log(
          'il ya une erreur non repertoriée dans le fetch des donnees user'
        );
        toast.error(err?.data?.message || err?.error);
      }
    }
  };
  // WE WANT TO REDIRECT TO TEH HOMEPAGE IF WE ARE ALREADY LOGGED IN
  useEffect(() => {
    if (userInfo) {
      fetchTry();
      navigate('/user');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`message:${res.message}`);
      navigate('/user');
    } catch (err) {
      console.log('il ya une erreur non repertoriée');
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
