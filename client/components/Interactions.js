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
      {console.log('interactions', interactions)}
      {console.log('pills', user.pills)}
      {
        interactions.length < 1 ? (
          <h1>Loading...</h1>
          ) : (
          <table>
            <tbody>
              <tr>
                <th>Medication 1</th>
                <th>Medication 2</th>
                <th>Description</th>
              </tr>
              {/* {
                interactions.flat().map(interaction => (
                  <tr key={interaction.id} >
                    <td>
                      {interaction.med1.name}
                    </td>
                    <td>
                      {interaction.med2.name}
                    </td>
                    <td>{interaction.interactionDesc}</td>
                  </tr>
                ))
              } */}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default Interactions;
