import React, { useContext } from 'react';
import { ChirpContext } from '../Chirp';

import './ChirpHeader.css';

// class ChirpHeader extends Component {
const ChirpHeader = () => {
  const { display_name, handle, time, acct_verified, reply_to } = useContext(
    ChirpContext
  );

  const reChirp = who => {
    if (who !== undefined || who > -1) {
      return (
        <>
          <div className="header-icon">
            <img src="https://via.placeholder.com/24" alt="some mark" />
          </div>
          <div className="header-text">{who} replied</div>
        </>
      );
    }
    return null;
  };

  let isReChirp = reChirp(reply_to);
  return (
    <>
      <div className="chirp-header">{isReChirp}</div>
      <div className="chirp-body">
        <div className="user-info">
          <div className="user-name">
            <a href={`http://localhost:3000/${handle}`}>{display_name}</a>
          </div>
          {acct_verified ? (
            <div className="user-verified">
              <img
                src="https://via.placeholder.com/24"
                alt="verified checkmark"
              />
            </div>
          ) : null}
          <div className="user-handle">
            <a href={`http://localhost:3000/${handle}`}>@{handle}</a>
          </div>
          <div className="dot">&middot;</div>
          <div className="post-time">{time}</div>
        </div>
      </div>
    </>
  );
};

export default ChirpHeader;
