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
  // const [loggedIn, setLoggedIn] = useState(() => {
  //   if (user && user.id !== null) return true;
  //   return false;
  // });

  useEffect(() => {
    if (user && user.id !== null) setLoggedIn(true);
  }, [loginOpen, user]);

  const login = (
    <>
      <Login />/
      <button
        onClick={() => {
          setNewAcct(true);
          setLoginOpen(false);
        }}
      >
        Signup
      </button>
    </>
  );
  const userInfo = (
    <>
      <ProfileImage />/
      <button
        onClick={() => {
          setUser(null);
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
