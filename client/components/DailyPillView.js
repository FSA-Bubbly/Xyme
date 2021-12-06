import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decreaseDosage } from "../store/wallet";
import history from "../history";
import DatePicker from "react-datepicker";
import { fetchWallet } from "../store/wallet";

const DailyPillView = () => {
  const { wallet: pills } = useSelector((s) => s);
  const currentUser = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const dateNum = Date.now();

  const filtered = pills.filter((eachpill) => {
    const start = Date.parse(eachpill.wallet.startDate);
    const end = Date.parse(eachpill.wallet.endDate);
    console.log("current time", dateNum);
    console.log("start", start);
    console.log("end", end);
    if (dateNum >= start && eachpill.wallet.dailyDosage > 0 && dateNum <= end) {
      return eachpill.wallet;
    }
  });

  useEffect(() => {
    dispatch(fetchWallet(currentUser));
  }, []);

  let pillsToUpdate = [];
  const handleTakenPills = () => {
    dispatch(decreaseDosage(currentUser.id, pillsToUpdate));
    dispatch(fetchWallet(currentUser));
    // document
    //   .getElementById("checkbox1")
    //   .map((singlecheck) => (singlecheck.checked = false));
  };

  const handlePillCheck = (evt) => {
    if (evt.target.checked) {
      pillsToUpdate.push(evt.target.value);
    } else {
      const idx = pillsToUpdate.indexOf(evt.target.value);
      pillsToUpdate.splice(idx, 1);
    }
  };

  return (
    <div>
      {console.log("pills", pills)}
      <div className='flex flex-col'>
        {pills === undefined ? (
          <div className=' my-40 self-center text-center'>
            {" "}
            <img src='/loading.svg' className=' self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32' />
            <h1>Loading...</h1>
          </div>
        ) : (
          <>
            <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-hidden'>
              <h1 className='  self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
                medication for today
              </h1>
              <img
                className=' self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                src='/pill2.svg'
                alt='Monitoring'
              />
            </div>

            <div className=' flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className=''>
                      <th className=' dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Pill
                      </th>
                      <th className='  dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Name
                      </th>
                      <th className=' dark:bg-gray-500 text-center px-5 py-3  bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Pills Left For Today
                      </th>
                      <th className='  dark:bg-gray-500 text-center px-5 py-3 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
                        Take pill
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                    {filtered
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((pill) => (
                        <tr
                          key={pill.id}
                          className=' dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800  space-y-6 mt-30 px-5 py-5 bg-white text-sm'
                        >
                          <td className='  dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                            <div className='text-center'>
                              <div className=' flex justify-center flex-shrink-0 w-10 h-10'>
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
                          <td className=' border-b-7 border-gray-200 px-5 py-5  bg-white text-sm'>
                            <Link
                              to={`/wallet/select/${pill.id}`}
                              key={pill.id}
                              pill={pill}
                            >
                              <p className='dark:bg-gray-200 text-center text-gray-900 '>
                                {pill.name}, take {pill.wallet.frequencyPerDay}{" "}
                                per day.
                              </p>
                            </Link>
                          </td>
                          <td className=' text-center dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                            <p className=' text-center text-gray-900 whitespace-no-wrap'>
                              {pill.wallet.dailyDosage}
                            </p>
                          </td>

                          <td className=' text-center dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                            <span className=' text-center relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                              <span
                                aria-hidden
                                className='absolute inset-0 bg-green-200  rounded-full'
                              ></span>
                              <span className='relative'>
                                <input
                                  className=' dark:border-2 dark:border-gray-200 text-center'
                                  id='checkbox1'
                                  type='checkbox'
                                  value={pill.id}
                                  onChange={handlePillCheck}
                                ></input>
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className='px-5 py-5  border-t flex flex-col xs:flex-row items-center xs:justify-between   '>
                  <div className='inline-flex mt-2 xs:mt-0'>
                    <button
                      className='text-xs text-green-300 border-2  border-orange   text-orange mx-5  rounded-full w-full self-center text-xs text-green-300 border-2 py-1 px-2  dark:text-gray-500 dark:border-orange hover:bg-orange hover:border-orange hover:text-white text-gray-800 '
                      onClick={handleTakenPills}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyPillView;
