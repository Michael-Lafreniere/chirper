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
        <InputField width="" />
      </div>
    );
  }
}

export default App;
