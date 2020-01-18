import React, { useContext } from 'react';
import { UserContext } from '../utils/User';

export default function ProfileImage() {
  const user = useContext(UserContext);
  let image = 'https://via.placeholder.com/48';
  return (
    <div className="user-image">
      <a href={`http://localhost:3000/${user.handle}`}>
        <img src={image} alt="user supplied profile" />
      </a>
    </div>
  );
}
