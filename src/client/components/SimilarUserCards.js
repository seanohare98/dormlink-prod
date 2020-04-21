import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SIMILAR } from '../utils/gqlQueries';
import { UserContext } from '../contexts/UserProvider';

export default () => {
  const [user, setUser] = useContext(UserContext);
  const { loading, error, data } = useQuery(SIMILAR, {
    variables: { sid: user.id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;
  return <div>{JSON.stringify(data)}</div>;
};
