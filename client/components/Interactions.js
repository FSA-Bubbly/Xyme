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
      <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-scroll  '>
        <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl text-xl font-bold text-center text-gray-800 dark:text-gray-200 text-gray-800'>
          Interactions
        </h1>
      </div>
      {interactions.length < 1 ? (
        <div className=' my-40 self-center text-center'>
          {" "}
          <img src='/loading.svg' className=' w-32' />
          <h1>Loading...</h1>
        </div>
      ) : (
        <table>
          <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-20 md:p-20 overflow-scroll '>
            <h1 className=' font-sans uppercase fadeIn p-2 md:text-2xl pt-3 md:pt-28 text-xl font-bold text-center text-gray-800 '>
              personal wallet
            </h1>

            <img src='/wallet.svg' alt='Monitoring' />
          </div>
          <tr>
            <th>Medication 1</th>
            <th>Medication 2</th>
            <th>Description</th>
          </tr>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td>{interaction.med1.name}</td>
              <td>{interaction.med2.name}</td>
              <td>{interaction.interactionDesc}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Interactions;
