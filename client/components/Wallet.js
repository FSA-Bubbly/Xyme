import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { fetchWallet } from "../store/wallet";
import { fetchInteractions } from "../store/interactions";
import { fetchUpdateUser } from "../store/user";
import { removePills } from "../store/wallet";
import { removeInteractions } from "../store/interactions";
import Modal from "react-modal";

const Wallet = () => {
  const { auth: user, interactions, wallet: pills } = useSelector((s) => s);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loading = async () =>
    new Promise((resolve) => setTimeout(() => resolve(), 1200));

  useEffect(() => {
    (async () => {
      await loading();
      setLoading(!isLoading);
    })();
    dispatch(fetchWallet(user));
    dispatch(fetchInteractions(user));
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
      };
      removePillsandInteractions();
    }
  };

  const interactionNames = [
    ...new Set(
      interactions.map((int) => [int.med1.name, int.med2.name]).flat()
    ),
  ];

  const toggleModal = () => {
    //console.log("hello");

    setShowModal(!showModal);
  };

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-hidden'>
            <h1 className='  tracking-widest self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-widest text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
              personal wallet
            </h1>

            <img
              src='/wallet.svg'
              alt='Monitoring'
              className=' self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32 '
            />
          </div>

          {showModal ? (
            <Modal
              isOpen={showModal}
              onRequestClose={toggleModal}
              className=' my-16 w-auto'
            >
              <div>
                <div className='flex flex-col  '>
                  <div className='flex justify-center '>
                    <div className='bg-white w-full m-10 rounded-lg dark:bg-gray-200'>
                      <div className=' flex justify-center pt-10 flex-row'>
                        <img
                          onClick={toggleModal}
                          src='/pill3.svg'
                          alt='Monitoring'
                          className='  mx-10  object-scale-down w-10 sm:w-10 md:w-10 lg:w-10 xl:w-10 hover:scale-125 cursor-pointer'
                        />{" "}
                        <p className=' text-center py-5 text-xs text-gray-500 uppercase'>
                          {" "}
                          = Pill has no interactions
                        </p>
                      </div>
                      <div className=' flex justify-center  pt-10 flex-row'>
                        <img
                          onClick={toggleModal}
                          src='/pill2.svg'
                          alt='Monitoring'
                          className='  mx-10 object-scale-down w-10 sm:w-10 md:w-10 lg:w-10 xl:w-10 hover:scale-125 cursor-pointer'
                        />{" "}
                        <p className=' text-center py-5 text-xs text-gray-500 uppercase'>
                          {" "}
                          = Pill has interactions
                        </p>
                      </div>
                      <div className='flex justify-between p-6'>
                        <button
                          onClick={toggleModal}
                          className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800 hover:bg-orange hover:border-orange hover:text-white '
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}

          <div className='flex  sm:-mx-8 px-4 sm:px-8 py-4 overflow-hidden'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
              <div className=' dark:bg-gray-500 flex justify-end sm:-mx-4 sm:-mx-4 py-4 px-4 sm:px-8  '>
                {" "}
                <img
                  onClick={toggleModal}
                  src='/medical.svg'
                  alt='Monitoring'
                  className=' animate-pulse object-scale-down w-10 sm:w-10 md:w-10 lg:w-10 xl:w-10 hover:scale-125 cursor-pointer'
                />
              </div>
              {pills.length < 1 ? (
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className=''>
                      <th className='rounded-top dark:bg-gray-500 text-center px-5 py-3 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Pill
                      </th>
                      <th className=' dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Name
                      </th>

                      <th className=' dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Remove
                      </th>
                    </tr>
                  </thead>

                  <tbody className=' dark:bg-gray-300 border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm text-center w-full '>
                    <tr className='justify-center dark:bg-gray-200 shadow rounded-full border-b-10 border-nude dark:border-gray-800 space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                      <td colSpan='4' className='dark:bg-gray-200 border-green space-y-6 mt-30 py-5 bg-white text-sm'>
                        <p className='  dark:bg-gray-200 text-center text-gray-900 '>
                          your wallet is empty...
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className=''>
                      <th className=' dark:bg-gray-500 text-center px-5 py-5 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Pill
                      </th>
                      <th className='  dark:bg-gray-500 text-center px-5 py-5 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Name
                      </th>

                      <th className='  dark:bg-gray-500 text-center px-5 py- border-b-2 border-gray-200 bg-nude dark:border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Remove
                      </th>
                    </tr>
                  </thead>

                  <tbody className='dark:bg-gray-300 border-green px-5 py-8 bg-white text-sm'>
                    {pills
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((pill) => (
                        <tr
                          key={pill.id}
                          className=' dark:bg-gray-300 shadow rounded-full border-b border-t-8 border-nude dark:border-gray-800  mt-30 px-5 py-5 bg-white text-sm'
                        >
                          <td className=' dark:bg-gray-200 border-green mt-30 px-5 py-5 bg-white text-sm'>
                            <div className='flex justify-center'>
                              <div className='flex w-10 h-10'>
                                {interactionNames.includes(pill.name) ? (
                                  <Link
                                    to={{
                                      pathname: `/interactions`,
                                      state: { pillName: pill.name },
                                    }}
                                  >
                                    <img
                                      className='w-full h-full'
                                      src='/pill2.svg'
                                      alt=''
                                    />
                                  </Link>
                                ) : (
                                  <img
                                    className='w-full h-full '
                                    src='/pill3.svg'
                                    alt=''
                                  />
                                )}
                              </div>
                              <div className='ml-3'>
                                <p className='text-gray-900 whitespace-no-wrap dark:text-gray-600'></p>
                              </div>
                            </div>
                          </td>
                          <td className='dark:bg-gray-200 border-green mt-30 px-5 py-5 bg-white text-sm'>
                            <Link
                              to={{
                                pathname: `/wallet/select/${pill.id}`,
                                state: { pill: pill },
                              }}
                              key={pill.id}
                            >
                              <p className='dark:bg-gray-200 text-center text-gray-900 dark:text-gray-600'>
                                {pill.name}
                              </p>
                            </Link>
                          </td>

                          <td className=' text-center dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                            <span className='relative'>
                              <input
                                type='checkbox'
                                value={pill.id}
                                className='form-checkbox   border-2 rounded focus:outline-none text-orange w-4 h-4 text-center'
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

              <div className=' mt-2 flex justify-evenly py-4   border-nude dark:bg-gray-200 dark:border-t-4 dark:border-gray-200 border-2 dark:border-gray-500'>
                <Link
                  to={`/wallet/add-pill`}
                  className='text-xs text-green-300 border-2 border-gray-600 py-1 px-2  rounded-full  text-gray-800 hover:text-gray-600 hover:border-orange dark:text-gray-800 dark:bg-gray-200 hover:bg-orange'
                >
                  Add to Wallet
                </Link>
                <button
                  className='text-xs text-green-300 border-2 border-gray-600 py-1 px-2  rounded-full  text-gray-800 hover:text-gray-600 hover:border-orange dark:text-gray-800 dark:bg-gray-200 hover:bg-orange '
                  value='submit'
                  type='submit'
                  onClick={handleRemove}
                >
                  Remove from Wallet
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
