import React, { Component } from 'react';

import './InputField.css';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width
    };
  }

  render() {
    let width = '';
    if (this.state.width === 'short') width = ' short-width';
    if (this.state.width === 'long') width = ' long-width';
    const c = `input-form${width}`;
    return (
      <div className={c}>
        <input
          type="text"
          name="name"
          class="question"
          id="input"
          required
          autocomplete="off"
        />
        <label for="input" className="label-name">
          <span className="content-name">Email address</span>
        </label>
      </div>
    );
  }
}

// const InputField = props => {
//   let width = 'normal-width';
//   if (props.customClass === 'short') width = 'short-width';
//   const c = `input-form ${width}`;
//   return (
//     <div className={c}>
//       <input
//         type="text"
//         name="name"
//         class="question"
//         id="input"
//         required
//         autocomplete="off"
//       />
//       <label for="input" className="label-name">
//         <span className="content-name">Email address</span>
//       </label>
//     </div>
//   );
// };

export default InputField;

/*
  <textarea
    name="message"
    rows="2"
    class="question"
    id="msg"
    required
    autocomplete="off"
  ></textarea>
  <label for="msg">
      <span>What's your message?</span>
  </label>
  <input type="submit" value="Submit!" /> 
*/
