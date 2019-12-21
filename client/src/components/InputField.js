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
*/

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      required: props.required,
      text: props.text,
      type: props.type,
      update: props.update,
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
    if (error !== undefined) this.setState({ error });
    if (this.state.update !== undefined)
      this.state.update(event.target.value, event);
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

  static getDerivedStateFromProps(props, state) {
    if (state !== props) return { error: props.error };
    return null;
  }

  render() {
    const {
      id,
      type,
      name,
      classes,
      autoComplete,
      onChange,
      disabled,
      error,
      maxLength
    } = this.props;

    const attrs = {
      id,
      name,
      type,
      error,
      autoComplete,
      onChange: event => onChange(event.target.value, event),
      disabled,
      maxLength
    };

    if (name === undefined) attrs.name = this.state.text;
    if (classes) attrs.classNames = classes;
    if (this.state.type === 'email' || this.state.input === 'textOnly')
      attrs.type = 'text';

    let divClass = 'input-form';
    if (this.state.width === 'short') divClass += ' input-form_short-width';
    if (this.state.width === 'long') divClass += ' input-form_long-width';

    let required = null;
    if (this.state.required) required = <span className="required">*</span>;

    let errorMsg = null;
    if (this.state.error)
      errorMsg = <span className="error">{this.state.error}</span>;

    return (
      <div className={divClass}>
        <input
          {...attrs}
          required
          onKeyUp={this.onKeyUp}
          onBlur={this.onBlur}
        />
        <label htmlFor="input" className="label-name">
          <div className="content-name">
            {required}
            <span>{this.state.text}</span>
          </div>
        </label>
        {errorMsg}
      </div>
    );
  }
}

InputField.propTypes = {
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  progressiveErrorChecking: PropTypes.bool,
  onChange: PropTypes.func,
  update: PropTypes.func,
  disabled: PropTypes.bool,
  require: PropTypes.bool,
  error: PropTypes.string
};

InputField.defaultProps = {
  id: null,
  autoComplete: 'off',
  type: 'text',
  width: null,
  minLength: 0,
  maxLength: null,
  progressiveErrorChecking: false,
  onChange: () => {},
  update: () => {},
  disabled: false,
  required: false,
  error: null
};

export default InputField;
