const authServer = 'http://192.168.1.71:4000';

export async function submitUser(user, address) {
  const data = {
    name: user.name,
    email: user.email,
    phone_num: user.phone,
    dob: user.dob,
    location: user.selectedCountry,
    display_name: user.displayName,
    handle: user.handle,
    password: user.password
  };

  const url = address ? address : authServer;

  fetch(`${url}/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if (data.message && data.message === 'successful') {
        console.log('Created a new user.');
        localStorage.setItem('token', data.jwt);
      } else if (data.message) {
        console.log('error:', data.message);
      }
    });
}

export async function authUser(account, password, address) {
  const url = address ? address : authServer;
  const user = {
    account,
    password
  };

  fetch(`${url}/user-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message && data.message === 'successful') {
        localStorage.setItem('displayName', data.user.displayName);
        localStorage.setItem('handle', data.user.handle);
        localStorage.setItem('userImage', data.user.userImage);
        localStorage.setItem('userSince', data.user.userSince);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else if (data.message && data.message) {
        console.log('error:', data.message);
      }
    });
}
