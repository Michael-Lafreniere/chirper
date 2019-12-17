import React, { Component } from 'react';
import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Chirp from './components/Chirp';
import './App.css';

const text =
  'This is my chirp, there are many like it, but this one is mine. @steve_rocks This is a very long text test to see how it wraps and stuff to see if we need to change anything @World #test';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let chirpData = {
      username: 'SomeCoolDude',
      handle: 'CoolDude2',
      userImage: 'https://via.placeholder.com/49',
      chirpText: text
      // reChirp: "StanLee",
    };
    return (
      <div className="App">
        <Header />
        <CreateAccount />
        <br />
        <Chirp data={chirpData} />
      </div>
    );
  }
}

export default App;
