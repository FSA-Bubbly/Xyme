import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteractions } from "../store/interactions";

const Interactions = () => {
  const { auth: user, interactions } = useSelector((s) => s);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInteractions(user));
  }, []);

  return (
    <div className='flex flex-col'>
      {console.log("component", interactions)}
      {interactions.length < 1 ? (
        <div className=' my-40 self-center text-center'>
          {" "}
          <img src='/loading.svg' className=' w-32' />
          <h1>Loading...</h1>
        </div>
      ) : (
        <table>
          <tr>
            <th>Medication 1</th>
            <th>Medication 2</th>
            <th>Description</th>
          </tr>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td>
                {user.pills.map((pill) => {
                  if (pill.id === interaction.med1Id) return pill.name;
                })}
              </td>
              <td>
                {user.pills.map((pill) => {
                  if (pill.id === interaction.med2Id) return pill.name;
                })}
              </td>
              <td>{interaction.interactionDesc}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Interactions;
