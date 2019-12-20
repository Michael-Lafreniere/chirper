import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import InputField from './InputField';
import Selector from './Selector';
import { data } from '../CountryData';
import { getCountryData } from '../utils/CountryRegion';

import './CreateAccount.css';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: ''
      // selectedRegion: '',
      // regionData: [],
      // regionDisabled: true
    };
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

  onSubmit() {}

  render() {
    const countryData = getCountryData(data());
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
            input="textOnly"
            text="Display Name"
            maxLength={15}
            progressiveErrorChecking={true}
          />
          <InputField
            input="textOnly"
            text="@Handle"
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
        <div className="submit">
          <button
            type="button"
            className="button"
            onClick={() => {
              this.onSubmit();
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
