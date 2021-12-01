import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInteractions } from '../store/interactions';

const Interactions = () => {
  const { auth: user, interactions } = useSelector(s => s);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInteractions(user));
  }, []);

  return (
    <div>
      {console.log('component', interactions)}
      {
        interactions.length < 1 ? (
          <h1>Loading...</h1>
          ) : (
          <h1>ayo</h1>
        )
      }
    </div>
  )
}

export default Interactions;
