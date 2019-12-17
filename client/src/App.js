import React, { Component } from 'react';
import Header from './components/Header';
// import InputField from './components/InputField';
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
      username: "SomeCoolDude",
      handle: "CoolDude2",
      userImage: "https://via.placeholder.com/49",
      chirpText: text,
      // reChirp: "StanLee",
    }
    return (
      <div className="App">
        <Header />
        <Chirp data={chirpData} />
        {/* <br />
        <InputField
          input="textOnly"
          text="Name"
          maxLength={20}
          progressiveErrorChecking={true}
        />
        <InputField text="Email Address" input="email" /> */}
      </div>
    );
  }
}

export default App;
