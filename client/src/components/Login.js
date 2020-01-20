import React, { useContext } from 'react';

import { authUser } from '../utils/dbHelpers';
import { AppContext } from '../utils/AppContext';

import LoginFormValidation from '../utils/LoginFormValidation';
import LoginFormAuthorization from '../utils/LoginFormAuthorization';

const INITIAL_STATE = {
  account: '',
  password: ''
};

export default function Login() {
  const handleRef = React.createRef();
  const passwdRef = React.createRef();
  // const [open, setOpen] = useState(true);
  const [error] = React.useState(null);
  const { setNewAcct, loginOpen, setLoginOpen } = useContext(AppContext);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = LoginFormValidation(
    INITIAL_STATE,
    LoginFormAuthorization,
    authenticateUser
  );

  async function authenticateUser() {
    const { account, password } = values;
    try {
      const result = await authUser(account, password);
      if (result) {
        setLoginOpen(false);
      } else {
        passwdRef.current.value = '';
        handleRef.current.value = '';
        handleRef.current.focus();
      }
    } catch {}
  }

  return (
    <>
      {loginOpen ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={handleRef}
            name="account"
            value={values.account}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.account && 'error-input'}
            placeholder="Email or @handle"
          />
          {errors.account && <p className="error-text">{errors.account}</p>}
          <input
            ref={passwdRef}
            name="password"
            value={values.password}
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && 'error-input'}
            placeholder="password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {error && <p className="error-text">{error}</p>}
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Working' : 'Login'}
          </button>
        </form>
      ) : (
        <button
          onClick={() => {
            setLoginOpen(!loginOpen);
            setNewAcct(false);
          }}
        >
          Login
        </button>
      )}
    </>
  );
}
