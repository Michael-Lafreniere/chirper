import React, { useState } from 'react';

import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Chirp from './components/Chirp';
import CreateChirp from './components/CreateChirp';
import { UserContext, getUserData } from './utils/User';
import { AppContext } from './utils/AppContext';

import './App.css';

const App = () => {
  const [newAcct, setNewAcct] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(getUserData());
  let chirpData = {
    username: 'SomeCoolDude',
    handle: 'CoolDude2',
    userImage: 'https://via.placeholder.com/49',
    chirpText:
      'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test'
    // reChirp: "StanLee",
  };

  const newsFeedOpen = newAcct || loginOpen;

  return (
    <AppContext.Provider value={{ setNewAcct, loginOpen, setLoginOpen }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <div className="test">{newAcct ? <CreateAccount /> : null}</div>
          {user && user.id !== null ? <CreateChirp /> : null}
          <br />
          {newsFeedOpen ? null : <Chirp data={chirpData} />}
        </div>
      </UserContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
