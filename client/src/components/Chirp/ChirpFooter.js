import React, { useContext } from 'react';
import { UserContext } from '../../utils/User';
import { ChirpContext } from '../Chirp';
import { starChirp } from '../../utils/dbHelpers';

const ChirpFooter = () => {
  const { user } = useContext(UserContext);
  const { comments, reChirps, stars, chirpID } = useContext(ChirpContext);

  return (
    <>
      <div className="chirp-footer">
        <div className="comments">
          <svg
            className="comments-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M371.2 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM512 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM652.8 454.4m-51.2 0a0.8 0.8 0 1 0 102.4 0 0.8 0.8 0 1 0-102.4 0ZM377.6 896c-6.4 0-6.4 0-12.8 0-12.8-6.4-19.2-19.2-19.2-32l0-128C211.2 684.8 128 569.6 128 448c0-179.2 172.8-320 384-320s384 140.8 384 320c0 172.8-166.4 313.6-371.2 320l-128 121.6C390.4 896 384 896 377.6 896zM512 192C332.8 192 192 307.2 192 448c0 102.4 76.8 192 192 236.8 12.8 6.4 19.2 19.2 19.2 32l0 76.8 83.2-76.8C492.8 704 505.6 704 512 704c179.2 0 320-115.2 320-256S691.2 192 512 192z" />
          </svg>
          <div className="num-comments">{comments}</div>
        </div>
        <div className="rechirp">
          <svg
            className="rechirp-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M763.340887 545.484625c38.567387 101.653191-28.008914 234.544851-28.008914 234.544851s28.358885-100.56337-67.01223-189.913351c-57.328683-53.6632-156.364257-33.463136-156.364257-33.463136l0 134.069485-268.051989-223.37751 268.051989-223.376487 0 133.939525C511.955486 377.908002 710.114638 405.698952 763.340887 545.484625zM958.70846 243.968477l0 536.060999c0 98.642624-79.971379 178.744987-178.700985 178.744987L243.903497 958.774463c-98.642624 0-178.61298-80.101339-178.61298-178.744987L65.290517 243.968477c0-98.772584 79.969333-178.744987 178.61298-178.744987l536.105001 0C878.73708 65.22349 958.70846 145.19487 958.70846 243.968477zM869.44546 288.599977c0-73.994248-60.119239-134.069485-134.113487-134.069485L288.667004 154.530492c-74.082252 0-134.071532 60.075237-134.071532 134.069485l0 446.797999c0 73.994248 59.989279 133.983527 134.071532 133.983527l446.664969 0c73.994248 0 134.113487-59.989279 134.113487-133.983527L869.44546 288.599977z" />
          </svg>
          <div className="num-rechirps">{reChirps}</div>
        </div>
        <div className="star" onClick={() => starChirp(user, chirpID)}>
          <svg
            className="star-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M755.2 985.6c-12.8 0-32-6.4-44.8-12.8l-192-102.4-192 102.4c-32 19.2-70.4 12.8-102.4-6.4-32-19.2-44.8-57.6-38.4-89.6l38.4-230.4-166.4-166.4c-25.6-25.6-32-64-19.2-96s38.4-57.6 76.8-64l224-32 96-204.8c12.8-32 51.2-51.2 83.2-51.2 38.4 0 70.4 19.2 83.2 51.2l96 204.8 224 32c38.4 6.4 64 32 76.8 64 12.8 32 0 70.4-19.2 96l-166.4 166.4 38.4 230.4c6.4 38.4-6.4 70.4-38.4 89.6-19.2 12.8-38.4 19.2-57.6 19.2z m-243.2-179.2c6.4 0 6.4 0 12.8 6.4l211.2 115.2c12.8 6.4 25.6 6.4 38.4 0 12.8-6.4 19.2-19.2 12.8-32l-38.4-243.2c0-6.4 0-19.2 6.4-25.6l172.8-172.8c6.4-6.4 12.8-25.6 6.4-38.4-6.4-12.8-12.8-19.2-32-25.6l-236.8-38.4c-6.4 0-19.2-6.4-19.2-12.8l-102.4-217.6c-6.4-12.8-19.2-19.2-32-19.2s-25.6 6.4-32 19.2l-102.4 217.6c-6.4 6.4-12.8 12.8-19.2 12.8l-236.8 38.4c-12.8 0-25.6 12.8-32 25.6-6.4 12.8 0 25.6 6.4 38.4l172.8 172.8c6.4 6.4 6.4 12.8 6.4 25.6l-38.4 243.2c0 12.8 6.4 25.6 12.8 32 12.8 6.4 25.6 6.4 38.4 0l211.2-115.2c6.4-6.4 6.4-6.4 12.8-6.4z"
              fill=""
            />
            <path
              d="M198.4 454.4c-6.4 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-19.2h6.4c6.4 0 12.8 6.4 19.2 12.8 0 6.4-6.4 12.8-12.8 19.2h-12.8z m51.2-6.4c-6.4 0-12.8-6.4-12.8-12.8s6.4-12.8 12.8-19.2l153.6-32 57.6-134.4c0-6.4 12.8-12.8 19.2-6.4 6.4 0 12.8 12.8 6.4 19.2l-64 140.8c0 6.4-6.4 6.4-12.8 6.4l-160 38.4z"
              fill=""
            />
          </svg>
          {stars === 0 ? null : <div className="num-stars">{stars}</div>}
        </div>
      </div>
    </>
  );
};

export default ChirpFooter;
