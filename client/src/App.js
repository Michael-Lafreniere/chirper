import React, { Component } from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <InputField
          input="textOnly"
          text="Name"
          maxLength={20}
          progressiveErrorChecking={true}
        />
        <InputField text="Email Address" input="email" />
      </div>
    );
  }
}

export default App;
