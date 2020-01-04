import React, { Component } from 'react';

import './ChirpHeader.css';

class ChirpHeader extends Component {
  reChirp = who => {
    if (who !== undefined) {
      return (
        <>
          <div className="header-icon">
            <img src="https://via.placeholder.com/24" alt="some mark" />
          </div>
          <div className="header-text">{who} re-chirped</div>
        </>
      );
    }
    return null;
  };

  render() {
    let reChirp = this.reChirp(this.props.reChirp);
    return (
      <>
        <div className="chirp-header">{reChirp}</div>
        <div className="chirp-body">
          <div className="user-info">
            <div className="user-name">
              <a href={`http://localhost:3000/${this.props.handle}`}>
                {this.props.username}
              </a>
            </div>
            {this.props.acct_verified ? (
              <div className="user-verified">
                <img
                  src="https://via.placeholder.com/24"
                  alt="verified checkmark"
                />
              </div>
            ) : null}
            <div className="user-handle">
              <a href={`http://localhost:3000/${this.props.handle}`}>
                @{this.props.handle}
              </a>
            </div>
            <div className="dot">&middot;</div>
            <div className="post-time">{this.props.time}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ChirpHeader;
