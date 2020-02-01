import React, { useReducer, useContext } from 'react';
import ProfileImage from './ProfileImage';
import { postChirp } from '../utils/dbHelpers';
import { UserContext } from '../utils/User';
import { AppContext } from '../utils/AppContext';

import './CreateChirp.css';

const initialState = {
  text: '',
  maxChirpLength: 255,
  maxChirpsPerPost: 1
};

const createChirpReducer = (state, action) => {
  switch (action.type) {
    case 'text':
      return {
        ...state,
        text: action.value
      };
    case 'send':
      if (action.reply !== undefined) {
        // console.log(
        //   'text:',
        //   action.value,
        //   'user:',
        //   action.user,
        //   'reply to:',
        //   action.reply
        // );
        postChirp(action.user, action.value, action.reply);
        action.setReply(-1);
        return {
          ...state,
          text: ''
        };
      }
      return state;
    case 'clear':
      if (action.value.length === 0) action.setReply(-1);
      return {
        ...state,
        text: ''
      };
    default:
      return state;
  }
};

const CreateChirp = ({ placeholder = 'What is on your mind today?' }) => {
  const { reply, setReply } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const inputRef = React.createRef(null);
  const [state, dispatch] = useReducer(createChirpReducer, initialState);

  const { text, maxChirpLength, maxChirpsPerPost } = state;
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
          <ProfileImage />
        </div>
        <div className="input-container">
          <textarea
            ref={inputRef}
            className="my-input"
            placeholder={placeholder}
            autoresize="true"
            maxLength={maxLength}
            value={text}
            onChange={event =>
              dispatch({ type: 'text', value: inputRef.current.value })
            }
            onKeyDown={event => {
              if (event.key === 'Enter')
                dispatch({
                  type: 'send',
                  value: inputRef.current.value,
                  reply,
                  user,
                  setReply: setReply
                });
              if (event.key === 'Escape')
                dispatch({
                  type: 'clear',
                  value: inputRef.current.value,
                  setReply
                });
            }}
          ></textarea>
          <div className="bottom-row">
            <div className="add-images">
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M720 464H560V304a48 48 0 1 0-96 0v160H304a48 48 0 1 0 0 96h160v160a48 48 0 1 0 96 0V560h160a48 48 0 1 0 0-96zM512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0z m0 928C282.256 928 96 741.744 96 512 96 282.24 282.256 96 512 96s416 186.256 416 416-186.256 416-416 416z"
                  fill=""
                />
              </svg>
            </div>
            <div className="remaining">
              <span className={textRemainingClass}>{textRemaining}</span>
              <span className="split-chirps">{splitChirps}</span>
            </div>
            <div className="chirp-it">
              <button
                onClick={() => {
                  dispatch({
                    type: 'send',
                    value: inputRef.current.value,
                    user
                  });
                }}
              >
                Chirp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChirp;
