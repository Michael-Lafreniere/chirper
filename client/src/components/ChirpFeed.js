import React, { useEffect, useContext, useState } from 'react';
import Chirp from './Chirp';
import { UserContext } from '../utils/User';
// import { getChirps } from '../utils/dbHelpers';

const ChirpFeed = () => {
  const maxRange = 24;
  const [chirps, setChirps] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(0);
  const { user } = useContext(UserContext);

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
  }, [location, user.accessToken]);

  let chirpsToRender = null;
  if (chirps === null) console.log('none');
  else {
    console.log('chirps:', chirps);
    chirpsToRender = chirps.map((chirp, index) => {
      return <Chirp key={index} data={chirp} />;
    });
  }

  // if (chirps !== null) chirpsToRender = <Chirp data={chirps[0]} />;
  // if (chirps !== null) console.log('first chirp:', chirps[0]);

  return (
    <>
      <div>ChirpFeed:</div>
      <div className="chirp-feed-error">{error}</div>
      {chirpsToRender}
      {/* {chirps
        ? null
        : chirps.map((chirp, index) => {
            return <Chirp key={index} data={chirp} />;
          })} */}
    </>
  );
};

export default ChirpFeed;
