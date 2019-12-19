import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getDefaultOption() {
    const { showDefaultOption, defaultOptionLabel } = this.props;
    if (!showDefaultOption) {
      return null;
    }
    return (
      <option value="" key="default">
        {defaultOptionLabel}
      </option>
    );
  }

  render() {
    const {
      name,
      id,
      classes,
      value,
      onChange,
      onBlur,
      disabled,
      showDefaultOption,
      defaultOptionLabel,
      labelType,
      valueType,
      whitelist,
      blacklist,
      customOptions,
      priorityOptions,
      ...extraProps
    } = this.props;

    const attrs = {
      ...extraProps,
      name,
      value,
      onChange: e => onChange(e.target.value, e),
      onBlur: e => onBlur(e),
      disabled
    };

    if (classes) {
      attrs.className = classes;
    }

    return (
      <select {...attrs}>
        {this.getDefaultOption()}
        <option value="Canada">Canada</option>
        <option value="US">United States of America</option>
        <option value="Germany">Germany</option>
        <option value="Japan">Japan</option>
      </select>
    );
  }
}

Selector.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  id: PropTypes.string,
  classes: PropTypes.string,
  showDefaultOption: PropTypes.bool,
  defaultOptionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
};

Selector.defaultProps = {
  value: '',
  name: 'chirp-selector',
  id: '',
  classes: 'general-selector',
  showDefaultOption: true,
  defaultOptionLabel: 'Select',
  onChange: () => {},
  onBlur: () => {},
  disabled: false
};

export default Selector;
