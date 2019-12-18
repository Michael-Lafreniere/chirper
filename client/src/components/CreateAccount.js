import React, { Component, Fragment } from 'react';
import InputField from './InputField';

import './CreateAccount.css';

class CreateAccount extends Component {
  render() {
    return (
      <div className="account-creation">
        <div className="account-text">User Information:</div>
        <div className="user-info">
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
          <InputField text="Email Address" input="email" />

          <div className="dob">
            <div className="dob-text">Date of Birth:</div>
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
            (mm/dd/yy)
          </div>
        </div>
        <div className="separation"></div>
        <div className="account-text">Account Information:</div>
        <div className="account-info">
          <InputField
            input="textOnly"
            text="Display Name"
            maxLength={15}
            progressiveErrorChecking={true}
          />
          <InputField
            input="textOnly"
            text="Handle"
            maxLength={15}
            progressiveErrorChecking={true}
          />
          <InputField
            input="password"
            text="Password"
            maxLength={15}
            progressiveErrorChecking={true}
          />
          <InputField
            input="password"
            text="Repeat Password"
            maxLength={15}
            progressiveErrorChecking={true}
          />
        </div>
      </div>
    );
  }
}

export default CreateAccount;
