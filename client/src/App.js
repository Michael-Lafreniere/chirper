import React, { useContext, useState } from 'react';
import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Chirp from './components/Chirp';
import CreateChirp from './components/CreateChirp';
import './App.css';

// TODO: Move to it's own file
const getUserData = () => {
  const displayName = localStorage.getItem('displayName');
  const handle = localStorage.getItem('handle');
  const userImage = localStorage.getItem('userImage');
  const userSince = localStorage.getItem('userSince');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    displayName,
    handle,
    userImage,
    userSince,
    accessToken,
    refreshToken
  };
};

const UserContext = useContext(null);

const text =
  'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test';

const App = () => {
  const [createAccountOpen, setCreateAccoutOpen] = useState(false);
  const [user, setUser] = useState(getUserData());
  let chirpData = {
    username: 'SomeCoolDude',
    handle: 'CoolDude2',
    userImage: 'https://via.placeholder.com/49',
    chirpText: text
    // reChirp: "StanLee",
  };
  // console.log(getUserData());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <div className="test">
          {createAccountOpen ? <CreateAccount /> : null}
        </div>
        <CreateChirp />
        <br />
        <Chirp data={chirpData} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
