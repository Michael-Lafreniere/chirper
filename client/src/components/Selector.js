import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      data: this.props.data
    };
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

  getData() {
    if (this.state.data === undefined) return null;

    return this.state.data.map(item => (
      <option
        value={item.data}
        key={item.key !== undefined ? item.data : item.key}
      >
        {item.data}
      </option>
    ));
  }

  static getDerivedStateFromProps(props, state) {
    if (state.data !== props.data) {
      return { data: props.data };
    } else if (state.error !== props.error) {
      return { error: props.error };
    }
    return null;
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
      customOptions,
      priorityOptions,
      ...extraProps
    } = this.props;

    const attrs = {
      ...extraProps,
      name,
      value,
      data: null,
      onChange: event => onChange(event.target.value, event),
      onBlur: event => onBlur(event),
      disabled
    };

    if (classes) {
      attrs.className = classes;
    }

    return (
      <select {...attrs}>
        {this.getDefaultOption()}
        {this.getData()}
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
  disabled: PropTypes.bool,
  error: PropTypes.string
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
  disabled: false,
  error: 'Test error message'
};

export default Selector;
