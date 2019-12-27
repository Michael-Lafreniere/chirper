import React, { useState } from 'react';

export default function Login() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open ? (
        <button onClick={() => setOpen(!open)}>Login</button>
      ) : (
        <form>
          <input type="text" placeholder="Email or handle" />
          <input type="password" placeholder="password" />
          <button>Login</button>
        </form>
      )}
    </>
  );
}
