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

// POST http://192.168.1.71:4000/create-user
// Content-Type: application/json

// {
//     "name": "Steve Gilkes",
//     "password": "123456",
//     "email": "ssteve@yahoo.com",
//     "phone_num": "1234567890",
//     "display_name": "steveG",
//     "dob":"1977-05-16",
//     "location": "Chilliwack, BC"
// }

async function submitUser(user) {
  const data = {
    name: user.name,
    email: user.email,
    phone_num: user.phone,
    dob: '1956-03-19',
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
      if (data.message && data.message === 'successful') {
        console.log('Created a new user.');
        localStorage.setItem('token', data.jwt);
      } else if (data.message) {
        console.log('error:', data.message);
      }
    });
}

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: '',
      emailExists: false,
      passwordError: false
      // selectedRegion: '',
      // regionData: [],
      // regionDisabled: true
    };
  }

  updateData(value, event) {
    // const what = event.target.name;
    // if (what === 'dob-day') this.setState({ dobDay: value });
    // if (what === 'dob-mon') this.setState({ dobMonth: value });
    // if (what === 'dob-Yr') this.setState({ dobYear: value });
    if (event.target.name === 'email') {
      this.setState({ emailExists: true });
    } else if (event.target.name === 'password2') {
      if (this.state.password1 !== undefined && value !== undefined) {
        if (this.state.password1.length === value.length) {
          if (this.state.password1 === value) {
            this.setState({ password: value });
          } else {
            console.log("values don't match");
          }
        } else {
          console.log("lengths don't match");
        }
      } else {
        console.log('one undefined');
      }
    } else {
      this.setState({ [event.target.name]: value });
    }
  }

  async selectCountry(value, event) {
    await this.setState({ selectedCountry: value });
    // await this.setState({
    //   regionData: getRegionData(value, data()),
    //   regionDisabled: false
    // });
  }

  // async selectRegion(value, event) {
  //   await this.setState({ selectedRegion: value });
  // }

  onSubmit(event) {
    event.preventDefault();
    const {
      selectedCountry,
      name,
      phone,
      email,
      password,
      displayName,
      handle
    } = this.state;
    if (
      verifyString(selectedCountry) &&
      selectedCountry !== 'Select Country' &&
      verifyString(name) &&
      verifyString(phone) &&
      verifyString(email) &&
      verifyString(password) &&
      verifyString(displayName) &&
      verifyString(handle)
    ) {
      // console.log('valid user info');
      submitUser(this.state);
    }
  }

  render() {
    const countryData = getCountryData(data());
    let emailExistsError;
    if (this.state.emailExists)
      emailExistsError = 'Email address already exists.';
    return (
      <div className="account-creation">
        <div className="account-text">User Information:</div>
        <div className="user-info">
          <InputField
            type="textOnly"
            text="Full Name"
            name="name"
            autoComplete="name"
            maxLength={50}
            progressiveErrorChecking={true}
            update={(value, event) => {
              this.updateData(value, event);
            }}
          />
          <InputField
            type="numberOnly"
            text="Phone Number"
            name="phone"
            autoComplete="phone number"
            maxLength={15}
            progressiveErrorChecking={true}
            update={(value, event) => {
              this.updateData(value, event);
            }}
            required={true}
          />
          <InputField
            text="Email Address"
            input="email"
            name="email"
            autoComplete="email"
            value="me@email.com"
            error={emailExistsError}
            update={(value, event) => {
              this.updateData(value, event);
            }}
          />

          <div className="dob">
            <div className="dob-text">Date of Birth: (mm/dd/yyyy)</div>
            <input
              className="dob-daymonth"
              type=""
              name="month"
              id="input"
              required
              autoComplete="off"
              onBlur={this.onBlur}
              onKeyUp={this.onKeyUp}
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
              onBlur={this.onBlur}
              onKeyUp={this.onKeyUp}
              maxLength="2"
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
              maxLength="4"
            />
          </div>
        </div>
        <div className="country-selector">
          <Selector
            defaultOptionLabel="Select Country"
            data={countryData}
            value={this.state.selectedCountry}
            onChange={(value, event) => {
              this.selectCountry(value, event);
            }}
          />
          {/* <Selector
            defaultOptionLabel="Select Region"
            data={this.state.regionData}
            disabled={this.state.regionDisabled}
            value={this.state.selectedRegion}
            onChange={(value, event) => {
              this.selectRegion(value, event);
            }}
          /> */}
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
            update={(value, event) => {
              this.updateData(value, event);
            }}
          />
          <InputField
            type="textOnly"
            text="@Handle"
            name="handle"
            maxLength={15}
            progressiveErrorChecking={true}
            update={(value, event) => {
              this.updateData(value, event);
            }}
          />
          <InputField
            type="password"
            text="Password"
            name="password1"
            autoComplete="password"
            update={(value, event) => {
              this.updateData(value, event);
            }}
          />
          <InputField
            type="password"
            text="Repeat Password"
            name="password2"
            update={(value, event) => {
              this.updateData(value, event);
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
        </div>
      </div>
    );
  }
}

export default CreateAccount;
