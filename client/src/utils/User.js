import React from 'react';

export const UserContext = React.createContext(null);

export const getUserData = () => {
  const id = localStorage.getItem('id');
  const displayName = localStorage.getItem('displayName');
  const handle = localStorage.getItem('handle');
  const userImage = localStorage.getItem('userImage');
  const userSince = localStorage.getItem('userSince');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    id,
    displayName,
    handle,
    userImage,
    userSince,
    accessToken,
    refreshToken
  };
};

export const clearUserData = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('displayName');
  localStorage.removeItem('handle');
  localStorage.removeItem('userImage');
  localStorage.removeItem('userSince');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
