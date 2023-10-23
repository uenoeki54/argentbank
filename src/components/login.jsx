import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './AuthSlice';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  //

  const { email, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then((pommechipe) => {
        // console.log(
        //   `La valeur de la reponse, aussi appelle dans le code pommechipe est ${pommechipe.message}`
        // );
        // toast.success(`${userData.email} signed in succesfully`);
        // toast.success(pommechipe.message);
        toast.success(`${userData.email}`);
        navigate('/user');
      })

      .catch(toast.error);
  };

  // fetch('http://localhost:3001/api/v1/user/login', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     email: 'tony@stark.com',
  //     password: 'password123',
  //   }),
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data.body.token));

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
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
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              onChange={onChange}
              checked={form.rememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
