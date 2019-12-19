import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import InputField from './InputField';
import Selector from './Selector';

import './CreateAccount.css';

const rawData = [
  {
    countryName: 'Afghanistan',
    countryShortCode: 'AF',
    regions: [
      {
        name: 'Badakhshan',
        shortCode: 'BDS'
      },
      {
        name: 'Badghis',
        shortCode: 'BDG'
      },
      {
        name: 'Baghlan',
        shortCode: 'BGL'
      },
      {
        name: 'Balkh',
        shortCode: 'BAL'
      },
      {
        name: 'Bamyan',
        shortCode: 'BAM'
      }
    ]
  },
  {
    countryName: 'Åland Islands',
    countryShortCode: 'AX',
    regions: [
      {
        name: 'Brändö',
        shortCode: 'BR'
      },
      {
        name: 'Eckerö',
        shortCode: 'EC'
      },
      {
        name: 'Finström',
        shortCode: 'FN'
      },
      {
        name: 'Föglö',
        shortCode: 'FG'
      },
      {
        name: 'Geta',
        shortCode: 'GT'
      },
      {
        name: 'Hammarland',
        shortCode: 'HM'
      }
    ]
  }
];

const getCountryData = data => {
  let results = [];
  data.map(country =>
    results.push({ key: country.countryShortCode, data: country.countryName })
  );
  return results;
};

const getRegionData = (countryName, data) => {
  let country = data.filter(country => country.countryName === countryName);
  console.log(country[0]);
  if (country !== undefined) return country[0].regions;
  return [];
};

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: '',
      regionData: []
    };
  }

  selectCountry(value, event) {
    console.log(value);
    this.setState({ selectedCountry: value });
    const regions = getRegionData(value, rawData);
    console.log(regions);
  }

  render() {
    const ctryData = getCountryData(rawData);
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
        </div>
        <div className="country-selector">
          <Selector
            defaultOptionLabel="Select Country"
            data={ctryData}
            value={this.state.selectedCountry}
            onChange={(value, event) => {
              this.selectCountry(value, event);
            }}
          />
          <Selector
            defaultOptionLabel="Select Region"
            data={this.state.regionData}
            disabled={true}
          />
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
      </div>
    );
  }
}

export default CreateAccount;
