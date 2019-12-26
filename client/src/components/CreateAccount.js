import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import InputField from './InputField';
import Selector from './Selector';
import { data } from '../CountryData';
import { getCountryData } from '../utils/CountryRegion';

import './CreateAccount.css';

const verifyString = string => {
  if (string !== undefined && string.length > 0) return true;
  return false;
};

async function submitUser(user) {
  const data = {
    name: user.name,
    email: user.email,
    phone_num: user.phone,
    dob: user.dob,
    location: user.selectedCountry,
    display_name: user.displayName,
    handle: user.handle,
    password: user.password
  };

  fetch('http://192.168.1.71:4000/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if (data.message && data.message === 'successful') {
        console.log('Created a new user.');
        localStorage.setItem('token', data.jwt);
      } else if (data.message) {
        console.log('error:', data.message);
      }
    });
}

const validateAccountForm = (
  name,
  phone,
  email,
  dob,
  country,
  displayName,
  handle,
  password
) => {
  return {
    isName: verifyString(name),
    isPhone: verifyString(phone),
    isEmail: verifyString(email),
    isDoB: dob !== null ? true : false,
    isCountry: verifyString(country) && country !== 'Select Country',
    isDisplayName: verifyString(displayName),
    isHandle: verifyString(handle),
    isPassword: verifyString(password)
  };
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      selectedCountry: '',
      errorText: null,
      nameError: null,
      emailError: null,
      phoneError: null,
      countryError: null,
      dobError: null,
      displayNameError: null,
      handleError: null,
      passwordError: null,
      password2Error: null
    };
  }

  async dob() {
    if (this.state.dobDay && this.state.dobMonth && this.state.dobYear) {
      await this.setState({
        dob: new Date(
          `${this.state.dobYear}-${this.state.dobMonth}-${this.state.dobDay}`
        )
      });
    }
  }

  updateData = async event => {
    const { value, name } = event.target;

    if (name === 'email' && value.trim() !== '') {
      const url = `http://192.168.1.71:4000/email/${value}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(response => response.json())
        .then(res => {
          if (res.message === 'exists') {
            this.setState({ emailError: 'Email address already used' });
          } else {
            this.setState({
              emailError: null,
              email: value
            });
          }
        });
    } else if (name === 'handle' && value.trim() !== '') {
      const url = `http://192.168.1.71:4000/handle/${value}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(response => response.json())
        .then(res => {
          if (res.message === 'exists') {
            this.setState({ handleError: 'Handle already in use' });
          } else {
            this.setState({
              handleError: null,
              handle: value
            });
          }
        });
    } else if (name === 'month') {
      if (value < 1 || value > 12) {
        this.setState({ dobError: 'Month needs to betwween 1-12.' });
      } else {
        this.setState({ dobError: null, dobMonth: value });
        this.dob();
      }
    } else if (name === 'day') {
      if (value < 1 || value > 31) {
        this.setState({ dobError: 'Day needs to betwween 1-31.' });
      } else {
        this.setState({ dobError: null, dobDay: value });
        this.dob();
      }
    } else if (name === 'year') {
      if (value < 1910 || value > 2001) {
        this.setState({ dobError: 'Year needs to betwween 1910-2001.' });
      } else {
        this.setState({ dobError: null, dobYear: value });
        this.dob();
      }
    } else if (name === 'password2') {
      if (this.state.password1 !== undefined && value !== undefined) {
        if (this.state.password1 === value) {
          this.setState({
            password: value,
            password2Error: null,
            passwordError: null
          });
        } else {
          this.setState({ password2: "Passwords don't match" });
        }
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  async selectCountry(value, event) {
    await this.setState({ selectedCountry: value });
  }

  resetErrors = () => {
    this.setState({
      errorText: null,
      nameError: null,
      phoneError: null,
      countryError: null,
      dobError: null,
      displayNameError: null,
      passwordError: null,
      password2Error: null
    });
  };

  async onSubmit(event) {
    event.preventDefault();

    this.resetErrors();

    const {
      selectedCountry,
      name,
      phone,
      email,
      password,
      displayName,
      handle
    } = this.state;

    await this.dob();

    const errors = validateAccountForm(
      name,
      phone,
      email,
      this.state.dob,
      selectedCountry,
      displayName,
      handle,
      password
    );

    let error = false;
    if (!errors.isName) {
      this.setState({ nameError: 'A name is required.' });
      error = true;
    }
    if (!errors.isEmail && this.state.emailError === null) {
      this.setState({
        emailError: 'An email address is required.'
      });
      error = true;
    }
    if (!errors.isDoB) {
      this.setState({ dobError: 'A date of birth is required.' });
      error = true;
    }
    if (!errors.isDisplayName) {
      this.setState({ displayNameError: 'A display name is required.' });
      error = true;
    }
    if (!errors.isHandle && this.state.handleError === null) {
      this.setState({ handleError: 'A handle is required.' });
      error = true;
    }
    if (!errors.isPassword) {
      this.setState({ passwordError: 'Matching passwords required' });
      error = true;
    }
    if (!errors.isPassword) {
      this.setState({ password2Error: 'Matching passwords required' });
      error = true;
    }

    if (!errors.isCountry) {
      this.setState({ countryError: 'You must provide a country' });
      error = true;
    }

    if (!error) {
      submitUser(this.state);
    }
  }

  render() {
    const countryData = getCountryData(data());
    return (
      <div className="account-creation">
        <div className="title">
          <span className="yellow">C</span>reate&nbsp;
          <span className="yellow">A</span>ccount
        </div>
        <div className="account-text">User Information:</div>
        <div className="user-info">
          <InputField
            type="textOnly"
            text="Full Name"
            name="name"
            autoComplete="name"
            maxLength={50}
            progressiveErrorChecking={true}
            error={this.state.nameError}
            update={event => {
              this.updateData(event);
            }}
            // required={true}
          />
          <InputField
            type="numberOnly"
            text="Phone Number"
            name="phone"
            autoComplete="phone number"
            maxLength={15}
            progressiveErrorChecking={true}
            error={this.state.phoneError}
            update={event => {
              this.updateData(event);
            }}
          />
          <InputField
            text="Email Address"
            input="email"
            name="email"
            autoComplete="email"
            value="me@email.com"
            error={this.state.emailError}
            update={event => {
              this.updateData(event);
            }}
            // required={true}
          />

          <div className="dob">
            <div className="dob-text">Date of Birth:</div>
            <input
              className="dob-daymonth"
              type=""
              name="month"
              id="input"
              required
              autoComplete="off"
              onBlur={event => {
                this.updateData(event);
              }}
              // onKeyUp={this.onKeyUp}
              maxLength="2"
            />
            /
            <input
              className="dob-daymonth"
              type=""
              name="day"
              id="input"
              required
              autoComplete="off"
              onBlur={event => {
                this.updateData(event);
              }}
              // onKeyUp={this.onKeyUp}
              maxLength="2"
            />
            /
            <input
              className="dob-year"
              type=""
              name="year"
              id="input"
              required
              autoComplete="off"
              onBlur={event => {
                this.updateData(event);
              }}
              // onKeyUp={this.onKeyUp}
              maxLength="4"
            />
            <div className="required">{this.state.dobError}</div>
          </div>
        </div>
        <div className="country-selector">
          <div className="selector">
            <Selector
              defaultOptionLabel="Select Country"
              data={countryData}
              value={this.state.selectedCountry}
              // error={this.state.countryError}
              onChange={(value, event) => {
                this.selectCountry(value, event);
              }}
            />
          </div>
          <div className="required center">{this.state.countryError}</div>
        </div>
        {/* <div className="separation"></div> */}
        <div className="account-text">Account Information:</div>
        <div className="account-info">
          <InputField
            type="textOnly"
            text="Display Name"
            name="displayName"
            maxLength={15}
            progressiveErrorChecking={true}
            error={this.state.displayNameError}
            update={event => {
              this.updateData(event);
            }}
          />
          <InputField
            type="textOnly"
            text="@Handle"
            name="handle"
            maxLength={15}
            progressiveErrorChecking={true}
            error={this.state.handleError}
            update={event => {
              this.updateData(event);
            }}
          />
          <InputField
            type="password"
            text="Password"
            name="password1"
            autoComplete="password"
            error={this.state.passwordError}
            update={event => {
              this.updateData(event);
            }}
          />
          <InputField
            type="password"
            text="Repeat Password"
            name="password2"
            error={this.state.password2Error}
            update={event => {
              this.updateData(event);
            }}
          />
        </div>
        <div className="submit">
          <button
            type="button"
            className="button"
            onClick={event => {
              this.onSubmit(event);
            }}
          >
            Submit
          </button>
          <div className="error-text">{this.state.errorText}</div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
