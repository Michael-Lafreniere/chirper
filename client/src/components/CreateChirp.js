import React, { useReducer } from 'react';

import './CreateChirp.css';

const initialState = {
  text: '',
  placeholder: 'What is on your mind today?',
  maxChirpLength: 25,
  maxChirpsPerPost: 2
};

const createChirpReducer = (state, action) => {
  switch (action.type) {
    case 'text':
      return {
        ...state,
        text: action.value.substr(
          0,
          state.maxChirpLength * state.maxChirpsPerPost
        )
      };
    default:
      return state;
  }
};

export default function CreateChirp() {
  const [state, dispatch] = useReducer(createChirpReducer, initialState);

  const { text, placeholder, maxChirpLength, maxChirpsPerPost } = state;
  const maxLength = maxChirpLength * maxChirpsPerPost;
  let textRemaining = '';
  let textRemainingClass = 'remaining-yellow';
  let splitChirps = '';

  if (text.length > maxChirpLength * 0.2)
    textRemaining = `${text.length}/${maxChirpLength}`;
  if (text.length > maxChirpLength * 0.9) textRemainingClass = `remaining-red`;
  if (text.length > maxChirpLength) {
    let percent = Math.round(text.length / maxChirpLength);
    splitChirps += ` ${percent}/${maxChirpsPerPost} chirps`;
  }

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
            value={text}
            onChange={event =>
              dispatch({ type: 'text', value: event.currentTarget.value })
            }
            placeholder={placeholder}
            maxLength={maxLength}
          />
          <div className="add-images">
            <button>
              <span>+</span>
            </button>
          </div>
          <div className="remaining">
            <span className={textRemainingClass}>{textRemaining}</span>
            <span className="split-chirps">{splitChirps}</span>
          </div>
        </div>
      </div>
    </>
  );
}
