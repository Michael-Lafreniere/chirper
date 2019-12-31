import React, { useState } from 'react';

import './CreateChirp.css';

export default function CreateChirp() {
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
          <div className="input-div" contenteditable="true" spellcheck="true">
            <span>What is on your mind?</span>
            <span className="over-typed">test text</span>
          </div>
        </div>
      </div>
    </>
  );
}
