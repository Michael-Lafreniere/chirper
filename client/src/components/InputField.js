import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validateInput } from '../ValidateInput';
import './InputField.css';

/*
  @text: Title of input
  @input: 'email', 'numberOnly', or 'textOnly', 'password', 'any' (default)
  @width: 'short' or 'long'
  @minLength: number of characters needed at a minimum.
  @maxLength: maximum number of characters allowed. 
  @progressiveErrorChecking: true or false (default)

  isValid() - returns true/false.  False if any error state exists.
*/

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      input: props.input,
      width: props.width,
      minLength: props.minLength,
      maxLength: props.maxLength,
      progressiveErrorChecking: props.progressiveErrorChecking || false,
      error: props.error
    };
  }

  onBlur = event => {
    const error = validateInput(
      event.target.value,
      this.state.input,
      this.state.minLength,
      this.state.maxLength
    );
    this.setState({ error });
  };

  onKeyUp = event => {
    if (this.state.progressiveErrorChecking) {
      const error = validateInput(
        event.target.value,
        this.state.input,
        this.state.minLength,
        this.state.maxLength
      );
      this.setState({ error });
    }
  };

  isValid = () => {
    if (
      this.state.error ||
      this.state.error !== null ||
      this.state.error !== undefined
    )
      return false;
    return true;
  };

  render() {
    let inputType = 'text';
    if (this.state.input === 'email' || this.state.input === 'textOnly')
      inputType = 'text';
    let divClass = 'input-form';
    if (this.state.width === 'short')
      divClass = 'input-form input-form_short-width';
    if (this.state.width === 'long')
      divClass = 'input-form input-form_long-width';
    return (
      <div className={divClass}>
        <input
          type={inputType}
          name="name"
          id="input"
          required
          autoComplete="off"
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
        />
        <label htmlFor="input" className="label-name">
          <span className="content-name">{this.state.text}</span>
        </label>
        <span className="error">{this.state.error}</span>
      </div>
    );
  }
}

InputField.propTypes = {
  text: PropTypes.string.isRequired,
  input: PropTypes.string,
  width: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  progressiveErrorChecking: PropTypes.bool
};

InputField.defaultProps = {
  input: 'text',
  width: '',
  minLength: 0,
  maxLength: 0,
  progressiveErrorChecking: false
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
