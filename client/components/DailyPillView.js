import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decreaseDosage } from "../store/wallet";
import history from "../history";
import DatePicker from "react-datepicker";
import { fetchWallet } from "../store/wallet";

//filter over that array and check if the date.now is greater than or equal  after the start date &&
//

//if the frequency on state is greater than 0
//than we will render

//daily pills state

// we want to grab and render the pills depending on their frequency being 1 or 2, and the elapsed time from the date.now and the expected next time. At the end of the day we want to counter the expencted next time by 24 hours and restart the cycle.

// backend has to adjust the expected next date when we've completed a full cycle.

// backend also has to decipher which pills in wallet have frequency of 1 or 2.
// if frequency of 1 - 0900
// if frequency of 2 = 0900 and 2100

// if date.now is before time slot 1, render pills with both frequency of 1 and 2

// time slot 1 0900

// if date.now is after time slot 1 but before time slot 2, render pills with only with frequency of 2

//time slot 2 2100

// if date.now is after both time slot 1 and after time slot 2, render neither pills with frequency of 1 or 2 (you've taken all pills for today)

// when date.now is equal to 24 hours past the expected next date, expected next date gets increased by 24 hours and cycle restarts.

// when the pill has been taken, we want to mark it off and adjust the pill in db to be taken/not taken, wallet view will reflect taken/not taken

// every rest in cycle will reset the taken field to false

const DailyPillView = () => {
  const { wallet: pills } = useSelector((s) => s);
  const currentUser = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const date = new Date();
  const dateNum = Date.parse(date);

  const filtered = pills.filter((eachpill) => {
    const expDateinMs = Date.parse(eachpill.wallet.expectedNextDate);
    // console.log("current time", dateNum);
    // console.log("    exp time", expDateinMs);
    if (dateNum >= expDateinMs && eachpill.wallet.dailyDosage > 0) {
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
      <div className='flex flex-col'>
        {pills === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className='flex self-center fadeIn w-full sm:1/2 md:w-1/3 overflow-scroll '>
              <img
                className='p-20  md:p-30 lg:p-10'
                src='/pill2.svg'
                alt='Monitoring'
              />
            </div>

            <div className=' flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className=''>
                      <th className=' text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider '>
                        Pill
                      </th>
                      <th className=' text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Name
                      </th>
                      <th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Pills Left For Today
                      </th>
                      <th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Taken?
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                    {filtered
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((pill) => (
                        <tr
                          key={pill.id}
                          className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'
                        >
                          <td className='border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
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
                              <p className=' text-center text-gray-900 '>
                                {pill.name}, take {pill.wallet.frequencyPerDay}{" "}
                                per day.
                              </p>
                            </Link>
                          </td>
                          <td className=' text-center px-5 py-5  border-b border-gray-200 bg-white text-sm'>
                            <p className=' text-center text-gray-900 whitespace-no-wrap'>
                              {pill.wallet.dailyDosage}
                            </p>
                          </td>

                          <td className=' text-center px-5 py-5  border-gray-200 bg-white text-sm'>
                            <span className=' text-center relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                              <span
                                aria-hidden
                                className='absolute inset-0 bg-green-200  rounded-full'
                              ></span>
                              <span className='relative'>
                                <input
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
                <div className='px-5 py-5  border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
                  <div className='inline-flex mt-2 xs:mt-0'>
                    <button
                      className='text-sm bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded'
                      onClick={handleTakenPills}
                    >
                      Submit Taken Pills
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
