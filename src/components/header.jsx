import logo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
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
        {userInfo && console.log(userInfo)}
        {userInfo ? userInfo.status : 'suck my dick'}
      </Link>

      {userInfo ? (
        <Link to="/" className="main-nav-item">
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
