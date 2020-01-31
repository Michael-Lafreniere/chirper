import React, { useEffect, useContext, useState } from 'react';
import Chirp from './Chirp';
import { UserContext } from '../utils/User';
import { AppContext } from '../utils/AppContext';

const ChirpFeed = () => {
  const maxRange = 24;
  const [chirps, setChirps] = useState(null);
  const [numChirps, setNumChirps] = useState(0);
  const [error, setError] = useState(null);
  const [location] = useState(0);
  const { user } = useContext(UserContext);
  const { reply } = useContext(AppContext);

  useEffect(() => {
    async function getTheChirps() {
      const end = location + maxRange;
      fetch('http://192.168.1.71:3000/chirps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({ location, end })
      })
        .then(response => response.json())
        .then(res => {
          setChirps(res);
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
    getTheChirps();
  }, [location, user.accessToken, reply]);

  useEffect(() => {
    if (chirps !== null) setNumChirps(chirps.length);
  }, [chirps]);

  return (
    <>
      {error ? <div className="chirp-feed-error">{error}</div> : null}
      {chirps === null
        ? null
        : chirps.map((chirp, index) => {
            return (
              <Chirp key={index} data={chirp} index={index} total={numChirps} />
            );
          })}
    </>
  );
};

export default ChirpFeed;
