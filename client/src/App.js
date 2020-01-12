import React, { Component, useContext } from 'react';
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

// const userContext = useContext(getUser);

const text =
  'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccountOpen: false
    };
  }

  render() {
    let chirpData = {
      username: 'SomeCoolDude',
      handle: 'CoolDude2',
      userImage: 'https://via.placeholder.com/49',
      chirpText: text
      // reChirp: "StanLee",
    };

    console.log(getUserData());
    // Needs to be moved to Header
    let createAccount = null;
    if (this.state.createAccountOpen) createAccount = <CreateAccount />;
    return (
      // <userContext.Provider>
      <div className="App">
        <Header />
        <div className="test">{createAccount}</div>
        <CreateChirp />
        <br />
        <Chirp data={chirpData} />
      </div>
      // </userContext.Provider>
    );
  }
}

export default App;
