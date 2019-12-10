import React from 'react';

import './InputField.css';

const InputField = props => {
  let width = 'normal_width';
  if (props.customClass === 'short') width = 'short-width';
  const c = `input-form ${width}`;
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
};

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
