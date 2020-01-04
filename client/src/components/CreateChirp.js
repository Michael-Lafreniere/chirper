import React from 'react';

import './CreateChirp.css';

export default function CreateChirp() {
  const text = 'What is on your mind today?';
  return (
    <>
      <div className="create-chirp">
        <div className="chirp-sidebar">
          <div className="user-image">
            <a href={`http://localhost:3000/test`}>
              <img
                src="https://via.placeholder.com/48"
                alt="user supplied profile"
              />
            </a>
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            className="my-input"
            placeholder="What is on your mind today?"
          />
          {/* <div className="input-div" contentEditable="true" spellCheck="true">
            <span>{text}</span>
            <span className="over-typed"></span>
          </div> */}
        </div>
      </div>
    </>
  );
}
