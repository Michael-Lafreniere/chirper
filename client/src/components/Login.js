import React, { useState } from 'react';

import { authUser } from '../utils/dbHelpers';

import LoginFormValidation from '../utils/LoginFormValidation';
import LoginFormAuthorization from '../utils/LoginFormAuthorization';

const INITIAL_STATE = {
  account: '',
  password: ''
};

export default function Login() {
  const [open, setOpen] = useState(true);
  const [serverError, setServerError] = React.useState(null);
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
      await authUser(account, password);
      setOpen(false);
    } catch (error) {
      console.log('Authentication error:', error);
      setServerError(error);
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
          {serverError && <p className="error-text">{serverError}</p>}
          <button disabled={isSubmitting}>Login</button>
        </form>
      )}
    </>
  );
}
