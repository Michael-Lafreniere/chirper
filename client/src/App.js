import React, { Component, useContext } from 'react';
import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Chirp from './components/Chirp';
import CreateChirp from './components/CreateChirp';
import './App.css';

const getUser = () => {
  const displayName = localStorage.getItem('displayName');
  const handle = localStorage.getItem('handle');
  const userImage = localStorage.getItem('userImage');
  const userSince = localStorage.getItem('userSince');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = [
    displayName,
    handle,
    userImage,
    userSince,
    accessToken,
    refreshToken
  ];
  return user;
};

const appContext = useContext(getUser);

const text =
  'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test';

const AppContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccountOpen: false,
      user: getUser()
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
    let createAccount = null;
    if (this.state.createAccountOpen) createAccount = <CreateAccount />;
    return (
      <AppContext.Provider>
        <div className="App">
          <Header />
          <div className="test">{createAccount}</div>
          <CreateChirp />
          <br />
          <Chirp data={chirpData} />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
