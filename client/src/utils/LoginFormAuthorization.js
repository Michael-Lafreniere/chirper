export default function LoginFormAuthorization(user) {
  let errors = {};
  if (!user.account) {
    errors.account = 'Required';
  } else if (user.account[0] === '@') {
    if (user.account.length < 4) errors.account = 'Handle to short';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.account)) {
    errors.account = 'Invalid email address';
  }
  if (!user.password) {
    errors.password = 'Required';
  }
  return errors;
}
