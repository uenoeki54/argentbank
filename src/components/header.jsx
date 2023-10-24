import logo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './AuthSlice';
import { useState, useEffect } from 'react';
import AuthService from './AuthService';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  // const [token, setToken] = useState('pasencore');

  // useEffect(() => {
  //   const retrievedUser = JSON.parse(localStorage.getItem('user'));
  //   if (retrievedUser != null) {
  //     setToken(retrievedUser.body.token);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (token !== 'pasencore') {
  //     console.log(`Bearer ${token}`);
  //     fetch(`http://localhost:3001/api/v1/user/profile`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((userData) => {
  //         setData(userData.body);
  //       });
  //   }
  // }, [token]);

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>

      <Link to="/user" className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        {console.log(data)}
        {data ? data.firstName : 'rien'}
      </Link>

      {user ? (
        <Link to="/" onClick={onLogout} className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign Out
        </Link>
      ) : (
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      )}
    </nav>
  );
}

export default Header;
