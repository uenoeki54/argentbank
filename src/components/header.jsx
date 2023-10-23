import logo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './AuthSlice';
import { useState, useEffect } from 'react';

function Header() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  // Get token
  const [token, setToken] = useState('pasencore');

  useEffect(() => {
    const retrievedUser = JSON.parse(localStorage.getItem('user'));
    if (retrievedUser != null) {
      setToken(retrievedUser.body.token);
    }
  }, []);

  // Fetch profile
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token !== 'pasencore') {
      console.log(`Bearer ${token}`);
      fetch(`http://localhost:3001/api/v1/user/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [token]);

  // Force le composant à se re-rendre lorsque le state `token` est mis à jour
  useEffect(() => {
    return () => {
      // Rien à faire
    };
  }, [user]);

  return (
    <nav className="main-nav">
      <Link to="/" classname="main-nav-logo">
        <img class="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
      </Link>
      <h1 class="sr-only">Argent Bank</h1>

      <Link to="/user" className="main-nav-item" href="./user.html">
        <i class="fa fa-user-circle"></i>
        {data ? data.body.firstName : 'rien'}
      </Link>

      {user ? (
        <Link to="/" onClick={() => onLogout()} className="main-nav-item">
          <i class="fa fa-user-circle"></i>
          Sign Out
        </Link>
      ) : (
        <Link to="/login" className="main-nav-item">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
      )}
    </nav>
  );
}

export default Header;
