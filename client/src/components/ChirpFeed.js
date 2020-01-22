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
    const end = location + maxRange;
    async function getTheChirps() {
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
          setLocation(end);
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
    getTheChirps();
  }, []);

  let chirpsToRender = null;
  // if (chirps === null) console.log('none');
  // else {
  //   chirpsToRender = chirps.map((chirp, index) => {
  //     return <Chirp key={index} data={chirp} />;
  //   });
  // }

  console.log(chirps);

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
