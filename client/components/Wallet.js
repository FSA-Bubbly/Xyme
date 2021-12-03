import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";
import { removePills } from "../store/wallet";

const Wallet = () => {
  const { auth: user, wallet: pills } = useSelector((s) => s);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);

  let pillsToRemove = [];

  const handleCheck = (e) => {
    if (e.target.checked) {
      pillsToRemove.push(e.target.value);
    } else {
      const idx = pillsToRemove.indexOf(e.target.value);
      pillsToRemove.splice(idx, 1);
    }
  };

  const handleRemove = () => {
    if (pillsToRemove.length > 0) {
      dispatch(removePills(user.id, pillsToRemove));
    }
  };

  return (
    <div className='flex flex-col'>
      {pills === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-20 md:p-20 overflow-scroll '>
            <h1 className=' font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
              personal wallet
            </h1>

            <img src='/wallet.svg' alt='Monitoring' />
          </div>
          <div className='flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className=''>
                    <th className=' dark:bg-gray-500 text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                      Pill
                    </th>
                    <th className='  dark:bg-gray-500 text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                      Name
                    </th>

                    <th className='  dark:bg-gray-500 text-center px-5 py-3 border-b-2 border-gray-200 bg-nude dark:border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm'>
                  {pills
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((pill) => (
                      <tr
                        key={pill.id}
                        className=' dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800  space-y-6 mt-30 px-5 py-5 bg-white text-sm'
                      >
                        <td className='  dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                          <div className='flex justify-center'>
                            <div className='flex w-10 h-10'>
                              <img
                                className='w-full h-full '
                                src='/pill2.svg'
                                alt=''
                              />
                            </div>
                            <div className='ml-3'>
                              <p className='text-gray-900 whitespace-no-wrap'></p>
                            </div>
                          </div>
                        </td>
                        <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                          <Link
                            to={`/wallet/select/${pill.id}`}
                            key={pill.id}
                            pill={pill}
                          >
                            <p className='dark:bg-gray-200 text-center text-gray-900 '>
                              {pill.name}
                            </p>
                          </Link>
                        </td>

                        <td className=' text-center dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                          <span className='relative'>
                            <input
                              type='checkbox'
                              value={pill.id}
                              className=' dark:border-2 dark:border-gray-200 text-center'
                              onChange={handleCheck}
                            ></input>
                          </span>
                        </td>
                      </tr>
                    ))}
                  <tr></tr>
                </tbody>
              </table>
              <div className=' mt-2 border-t-40 border-nude dark:border-gray-800  dark:bg-gray-200 px-5 py-5 border-t flex flex-col  items-center xs:justify-between overflow-scroll min-w-20 flex-shrink'>
                <div className='flex flex-row flex-shrink'>
                  <button className='text-xs text-green-300 border-2 py-2 px-4 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800 mx-5'>
                    <Link to='/wallet/add-pill'>Add to Wallet</Link>
                  </button>

                  <button
                    value='remove'
                    type='button'
                    onClick={handleRemove}
                    className='text-xs text-green-300 border-2 py-2 px-4 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800 mx-5'
                  >
                    Remove from Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
