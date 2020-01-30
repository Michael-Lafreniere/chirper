import React, { useContext } from 'react';
import { ChirpContext } from '../Chirp';
import ToolTip from '../ToolTip';

import './ChirpHeader.css';

const ChirpHeader = () => {
  let postedTime = null;
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

  const convertSQLDateTimeToJS = () => {
    const dateParts = time.split('-');
    postedTime = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2),
      dateParts[2].substr(3, 2),
      dateParts[2].substr(6, 2),
      dateParts[2].substr(9, 2)
    );
  };

  const refactorTime = () => {
    const current = new Date();
    if (current.getFullYear() === postedTime.getFullYear()) {
      if (current.getMonth() === postedTime.getMonth()) {
        if (current.getDate() === postedTime.getDate()) {
          if (current.getHours() === postedTime.getHours()) {
            if (current.getMinutes() === postedTime.getMinutes()) {
            } else {
              const diff = current.getMinutes() - postedTime.getMinutes();
              if (diff > 1) return `${diff} mins ago`;
              else return `${diff} min ago`;
            }
          } else {
            const diff = current.getHours() - postedTime.getHours();
            if (diff > 1) return `${diff} hrs ago`;
            else return `${diff} hr ago`;
          }
        } else {
          const diff = current.getDate() - postedTime.getDate();
          if (diff > 1) return `${diff} days ago`;
          else return `${diff} day ago`;
        }
      } else {
        const diff = current.getMonth() - postedTime.getMonth();
        if (diff > 1) return `${diff} mnths ago`;
        else return `${diff} mnth ago`;
      }
    } else {
      const diff = current.getFullYear() - postedTime.getFullYear();
      if (diff > 1) return `${diff} yrs ago`;
      else return `${diff} yr ago`;
    }
  };

  let isReChirp = reChirp(reply_to);
  convertSQLDateTimeToJS();
  let convertedTime = refactorTime();

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
          <div
            className="post-time"
            onMouseOver={() => <ToolTip text={String(postedTime)} />}
          >
            {convertedTime}
          </div>
          <ToolTip text={String(postedTime)} />
        </div>
      </div>
    </>
  );
};

export default ChirpHeader;
