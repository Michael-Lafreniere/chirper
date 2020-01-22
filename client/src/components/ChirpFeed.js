import React, { useEffect, useContext, useState } from 'react';
import Chirp from './Chirp';
import { UserContext } from '../utils/User';
import { getChirps } from '../utils/dbHelpers';

const ChirpFeed = () => {
  const maxRange = 24;
  const [chirps, setChirps] = useState(null);
  const [location, setLocation] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getTheChirps = async () => {
      const chirps = await getChirps(user, location, location + maxRange);
      console.log('getChirps():', chirps);
      setChirps(chirps);
      setLocation(24);
    };
    getTheChirps();
  }, [user, location]);
  return (
    <>
      {/* {chirps.map((chirp, index) => {
        return <Chirp key={index} data={chirp} />;
      })} */}
    </>
  );
};

export default ChirpFeed;
