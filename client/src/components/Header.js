import React, { useContext, useState, useEffect } from 'react';
import { UserContext, clearUserData } from '../utils/User';
import { AppContext } from '../utils/AppContext';
import Login from './Login';
import ProfileImage from './ProfileImage';

import './Header.css';

const Header = () => {
  const { setNewAcct, setLoginOpen, loginOpen } = useContext(AppContext);
  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user && user.id !== null) setLoggedIn(true);
  }, [loginOpen, user]);

  const login = (
    <div className="right-side">
      <Login />
      <button
        className="login-logout"
        onClick={() => {
          setNewAcct(true);
          setLoginOpen(false);
        }}
      >
        Signup
      </button>
    </div>
  );
  const userInfo = (
    <div className="right-side">
      <ProfileImage />
      <button
        className="login-logout"
        onClick={() => {
          setUser(null);
          clearUserData();
          setLoggedIn(false);
        }}
      >
        Logout
      </button>
    </div>
  );
  return (
    <header className="app-header">
      <div className="title">
        <div className="site-title">
          my<span>C</span>hirper
        </div>
      </div>
      {loggedIn ? userInfo : login}
    </header>
  );
};

export default Header;
