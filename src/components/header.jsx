import logo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="main-nav">
      <Link to="/" classname="main-nav-logo">
        <img class="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
      </Link>
      <h1 class="sr-only">Argent Bank</h1>

      <Link to="/login" className="main-nav-item">
        <i class="fa fa-user-circle"></i>
        Sign In
      </Link>
    </nav>
  );
}

export default Header;
