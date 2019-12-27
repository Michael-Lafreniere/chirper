import React from 'react';
import Login from './Login';

import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <div className="title">
        <h3>
          my<span>C</span>hirper
        </h3>
      </div>
      <div className="login-signup">
        <Login />
        {/* <form>
          <input type="text" placeholder="Email or handle" />
          <input type="password" placeholder="password" />
          <button>Login</button>
        </form> */}
        /<button>Signup</button>
      </div>
    </header>
  );
};

export default Header;
