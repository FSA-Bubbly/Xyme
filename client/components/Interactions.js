<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInteractions } from '../store/interactions';

const Interactions = () => {
	const { auth: user, interactions } = useSelector((s) => s);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchInteractions(user));
	}, []);

	return (
		<div className='flex flex-col'>
			{interactions.length < 1 ? (
				<div className=' my-40 self-center text-center'>
					{' '}
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
=======
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteractions } from "../store/interactions";

const Interactions = () => {
  const { auth: user, interactions } = useSelector((s) => s);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const loading = async () => (
    new Promise(resolve => setTimeout(() => resolve(), 1500))
  )

  useEffect(() => {
    (async () => {
      await loading();
      setLoading(!isLoading);
    })()
    dispatch(fetchInteractions(user));
  }, []);

  return (
    <div className='flex flex-col'>
      {
        isLoading ? (
          <div className=' my-40 self-center text-center'>
            {" "}
            <img src='/loading.svg' className=' w-32' />
            <h1>Loading...</h1>
          </div>
          ) : (
            <>
            <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-20 md:p-20 overflow-scroll '>
              <h1 className=' font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 '>
                interactions
              </h1>
						  <img src='/wallet.svg' alt='Monitoring' />
					  </div>
					  <div className='flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
						  <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className=''>
                      <th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider '>
                        Medication 1
                      </th>
                      <th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Medication 2
                      </th>
                      <th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Interactions
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm'>
                    {
                      interactions.length < 1 ? (
                        <h1>Your medications have no interactions!</h1>
                      ) : (
                        interactions.map((interaction) => (
                          <tr
                          key={interaction.id}
                            className='shadow rounded-full border-b-10 border-t-8 border-nude  space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                            <td className='text-center border-b-7 border-gray-200 px-5 py-5  bg-white text-sm'>
                              {interaction.med1.name}
                            </td>
                            <td className='text-center border-b-7 border-gray-200 px-5 py-5  bg-white text-sm'>
                              {interaction.med2.name}
                            </td>
                            <td className='text-center border-b-7 border-gray-200 px-5 py-5  bg-white text-sm'>
                              {interaction.interactionDesc}
                            </td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
            </>
          )
        }
    </div>
  );
>>>>>>> 8bbc0277d30e9983e1b7bbb6ab0fb88d7cddb25e
};

export default Interactions;
