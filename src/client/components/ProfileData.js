import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER } from '../utils/gqlQueries';

export default () => {
  const { loading, error, data } = useQuery(USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  return <div>{JSON.stringify(data.user)}</div>;
};
