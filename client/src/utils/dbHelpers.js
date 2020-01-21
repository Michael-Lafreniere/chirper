const authServer = 'http://192.168.1.71:4000';
const chirpServer = 'http://192.168.1.71:3000';

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
    })
    .catch(error => {
      console.log('submitUser:', error);
    });
}

export async function authUser(account, password, address) {
  const url = address ? address : authServer;
  const user = {
    account,
    password
  };

  const results = await fetch(`${url}/user-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await results.json();
  if (data) {
    if (data.message && data.message === 'successful') {
      localStorage.setItem('id', data.user.id);
      localStorage.setItem('displayName', data.user.displayName);
      localStorage.setItem('handle', data.user.handle);
      localStorage.setItem('userImage', data.user.userImage);
      localStorage.setItem('userSince', data.user.userSince);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    console.log({ data });
  }
  return data;
}

export async function postChirp(user, chirp, reply_to = -1, address) {
  const url = address ? address : chirpServer;
  const { accessToken, id } = user;

  const chirpData = {
    content: chirp,
    reply_to,
    user_id: id
  };

  fetch(`${url}/chirp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    // body: chirpData
    body: JSON.stringify(chirpData)
  })
    .then(response => response.json())
    .then(reply => {
      console.log('chirp reply:', reply);
    })
    .catch(error => {
      console.log('error', error);
    });
}

export async function starChirp(user, chirpID, address) {
  const url = address ? address : chirpServer;
  const { accessToken, id } = user;
  const star = { chirp_id: chirpID, user_id: Number(id) };

  fetch(`${url}/star`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(star)
  })
    // .then(response => response.json())
    // .then(reply => {
    //   console.log('chirp reply:', reply);
    // })
    .catch(error => {
      console.log('error', error);
    });
}
