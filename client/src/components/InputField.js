import React from 'react';

import '../css/InputField.css';

const InputField = () => {
  return (
    <div className="input-form">
      <form>
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
      </form>
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
