import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext([{}, () => {}]);
const UserConsumer = UserContext.Consumer;
const useUser = () => React.useContext(UserContext);

const UserProvider = ({ children }) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    fetch('/auth/user')
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

export { useUser, UserContext, UserConsumer, UserProvider };
