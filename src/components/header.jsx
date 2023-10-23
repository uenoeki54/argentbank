import logo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from './AuthSlice';
function Header() {
  const { user } = useSelector((state) => state.auth);
  console.log(`la constante user vaut ${user}`);
  user
    ? console.log(`dans la constante user message vaut ${user.message}`)
    : console.log('user undefined');
  const token = localStorage.getItem('Token');
  console.log(`le token vaut ${token}`);
  return (
    <nav className="main-nav">
      <Link to="/" classname="main-nav-logo">
        <img class="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
      </Link>
      <h1 class="sr-only">Argent Bank</h1>
      {user ? (
        <Link to="/" onClick={logout()} className="main-nav-item">
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
