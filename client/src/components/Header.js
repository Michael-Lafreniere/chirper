import React, { useContext, useEffect, useState } from 'react';
import { UserContext, clearUserData } from '../utils/User';
import Login from './Login';
import ProfileImage from './ProfileImage';

import './Header.css';

const Header = () => {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (user && user.id !== null) return true;
    return false;
  });

  // useEffect(() => {
  //   if (user && user.id !== null) setLoggedIn(true);
  // }, [user]);

  const login = (
    <>
      <Login /> / <button>Signup</button>
    </>
  );
  const userInfo = (
    <>
      <ProfileImage />/
      <button
        onClick={() => {
          clearUserData();
          setLoggedIn(false);
        }}
      >
        Logout
      </button>
    </>
  );
  return (
    <header className="App-header">
      <div className="title">
        <h3>
          my<span>C</span>hirper
        </h3>
      </div>
      {loggedIn ? userInfo : login}
    </header>
  );
};

export default Header;
