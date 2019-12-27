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

  const url = address ? address : 'http://192.168.1.71:4000';

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
