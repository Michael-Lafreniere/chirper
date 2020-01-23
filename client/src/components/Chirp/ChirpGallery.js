import React, { useContext } from 'react';
import { ChirpContext } from '../Chirp';
import Image from '../Image';

const ChirpGallery = () => {
  const { image1, image2, image3, image4 } = useContext(ChirpContext);
  return (
    <div className="gallary">
      {image1 !== undefined ? <Image imageURL={image1} /> : null}
      {image2 !== undefined ? <Image imageURL={image2} /> : null}
      {image3 !== undefined ? <Image imageURL={image3} /> : null}
      {image4 !== undefined ? <Image imageURL={image3} /> : null}
    </div>
  );
};

export default ChirpGallery;
