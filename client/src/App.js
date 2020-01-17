import React, { useState, useRef } from 'react';

import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Chirp from './components/Chirp';
import CreateChirp from './components/CreateChirp';
import { UserContext, getUserData } from './utils/User';

import './App.css';

const App = () => {
  const createAccountOpen = useRef(false);
  const [user, setUser] = useState(getUserData());
  let chirpData = {
    username: 'SomeCoolDude',
    handle: 'CoolDude2',
    userImage: 'https://via.placeholder.com/49',
    chirpText:
      'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test'
    // reChirp: "StanLee",
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <div className="test">
          {createAccountOpen ? null : <CreateAccount />}
        </div>
        <CreateChirp />
        <br />
        <Chirp data={chirpData} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
