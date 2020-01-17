import React, { useState, useRef } from 'react';

import { authUser } from '../utils/dbHelpers';

import LoginFormValidation from '../utils/LoginFormValidation';
import LoginFormAuthorization from '../utils/LoginFormAuthorization';

const INITIAL_STATE = {
  account: '',
  password: ''
};

export default function Login() {
  const [open, setOpen] = useState(true);
  // const [error, setError] = React.useState(null);
  const error = useRef(null);
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
      const results = await authUser(account, password);
      console.log(results);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      {open ? (
        <button onClick={() => setOpen(!open)}>Login</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
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
      )}
    </>
  );
}
