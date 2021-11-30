import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInteractions } from '../store/interactions';

const Interactions = () => {
  const { auth: user } = useSelector(s => s);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInteractions(user));
  }, []);

  return (
    <div>
      <h1>{user.firstName}</h1>
      <h1>{user.id}</h1>
    </div>
  )
}

export default Interactions;
