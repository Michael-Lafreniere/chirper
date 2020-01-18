import React, { useContext, useEffect, useState } from 'react';
import { UserContext, clearUserData } from '../utils/User';
import Login from './Login';

import './Header.css';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useContext(UserContext);
  let image = 'https://via.placeholder.com/48';

  useEffect(() => {
    if (user && user.id !== null) setLoggedIn(true);
  }, [user]);

  const login = (
    <div>
      <Login /> / <button>Signup</button>
    </div>
  );
  const userInfo = (
    <div>
      <a href={`http://localhost:3000/${user.handle}`}>
        <img src={image} alt="user supplied profile" />
      </a>
      /<button onClick={() => clearUserData()}>Logout</button>
    </div>
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
