import React from 'react';

export const UserContext = React.createContext(null);

export const getUserData = () => {
  const displayName = localStorage.getItem('displayName');
  const handle = localStorage.getItem('handle');
  const userImage = localStorage.getItem('userImage');
  const userSince = localStorage.getItem('userSince');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    displayName,
    handle,
    userImage,
    userSince,
    accessToken,
    refreshToken
  };
};
