import React, { Component, Fragment } from 'react';
import InputField from './InputField';

import './CreateAccount.css';

class CreateAccount extends Component {
  render() {
    return (
      <div className="account-creation">
        <div className="general-info">
          <div className="top-line">
            <InputField
              input="textOnly"
              text="Name"
              maxLength={50}
              progressiveErrorChecking={true}
            />
            <InputField
              input="numberOnly"
              text="Phone Number"
              maxLength={15}
              progressiveErrorChecking={true}
            />
          </div>
          <div className="second-line">
            <div className="dob">
              <div className="dob-text">Date of Birth (m/d/y):</div>
              <input
                className="dob-daymonth"
                type=""
                name="month"
                id="input"
                required
                autoComplete="off"
                onBlur={this.onBlur}
                onKeyUp={this.onKeyUp}
              />
              /
              <input
                className="dob-daymonth"
                type=""
                name="month"
                id="input"
                required
                autoComplete="off"
                onBlur={this.onBlur}
                onKeyUp={this.onKeyUp}
              />
              /
              <input
                className="dob-year"
                type=""
                name="month"
                id="input"
                required
                autoComplete="off"
                onBlur={this.onBlur}
                onKeyUp={this.onKeyUp}
              />
            </div>
            <InputField text="Email Address" input="email" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
