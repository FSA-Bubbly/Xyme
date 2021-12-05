import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";
import { removePills } from "../store/wallet";
import { removeInteractions } from "../store/interactions";

const Wallet = () => {

	const { auth: user, wallet: pills } = useSelector((s) => s);
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(true);


  const loading = async () => (
    new Promise(resolve => setTimeout(() => resolve(), 1500))
  )

  useEffect(() => {
    (async () => {
      await loading();
      setLoading(!isLoading);
    })();
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
			const removePillsandInteractions = async () => {
				await dispatch(removeInteractions(user.id, pillsToRemove));
				dispatch(removePills(user.id, pillsToRemove));
			}
			removePillsandInteractions();
		}
  };

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <div className=' my-40 self-center text-center'>
          {" "}
          <img src='/loading.svg' className=' w-32' />
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-scroll '>
            <h1 className=' font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
              personal wallet
            </h1>

            <img
              src='/wallet.svg'
              alt='Monitoring'
              className='object-scale-down'
            />
          </div>
          <div className='flex  sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
              {pills.length < 1 ? (
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

                  <tbody className=' dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm text-center w-full '>
                    <tr className=' col-span-3 justify-center dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800 space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                      <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                        <p className='dark:bg-gray-200 text-center text-gray-900 '></p>
                      </td>
                      <td className='dark:bg-gray-200 border-green space-y-6 mt-30 py-5 bg-white text-sm'>
                        <p className='  dark:bg-gray-200 text-center text-gray-900 '>
                          Your wallet is empty!
                        </p>
                      </td>
                      <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                        <p className='dark:bg-gray-200 text-center text-gray-900 '></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
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
                          className=' dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800 space-y-6 mt-30 px-5 py-5 bg-white text-sm'
                        >
                          <td className='  rounded-l-lg dark:bg-gray-200 border-green mt-30 px-5 py-5 bg-white text-sm'>
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

                          <td className=' rounded-r-lg text-center dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
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
              )}
              <div className='  py-5  border-t flex flex-row xs:flex-row justify-center xs:justify-between   dark:border-gray-800 p-5 border-t  min-w-20 '>
                <div className='inline-flex mt-2 xs:mt-0'>
                  <button className='text-xs text-green-300 border-2  border-orange   text-orange mx-2  rounded-full w-full self-center text-xs text-green-300 border-2 py-1  px-1 xs:px-3 sm:px-4 md:px-5 dark:text-gray-500 dark:border-orange hover:bg-orange hover:border-orange hover:text-white text-gray-800 '>
                    <Link to='/wallet/add-pill'>Add to Wallet</Link>
                  </button>
                </div>
                <div className='inline-flex mt-2 xs:mt-0  '>
                  {" "}
                  <button
                    value='remove'
                    type='button'
                    onClick={handleRemove}
                    className='text-xs text-green-300 border-2  border-orange   text-orange mx-2  rounded-full w-full self-center text-xs text-green-300 border-2 py-1 px-1 xs:px-3 sm:px-4 md:px-5 dark:text-gray-500 dark:border-orange hover:bg-orange hover:border-orange hover:text-white text-gray-800 '
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
