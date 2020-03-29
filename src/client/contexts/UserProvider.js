import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    fetch('/user')
      .then(res => res.json())
      .then(res => {
        res.loading = false;
        setState(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
