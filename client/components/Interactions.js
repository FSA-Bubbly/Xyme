import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";
import { fetchInteractions } from "../store/interactions";

const Interactions = (props) => {
  const { auth: user, interactions, wallet: pills } = useSelector((s) => s);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [pillFilter, setPillFilter] = useState(
    props.location.state === undefined ? "all" : props.location.state.pillName
  );

  const loading = async () =>
    new Promise((resolve) => setTimeout(() => resolve(), 1500));

  useEffect(() => {
    (async () => {
      await loading();
      setLoading(!isLoading);
    })();
    if (props.location.state === undefined) {
      dispatch(fetchWallet(user));
      dispatch(fetchInteractions(user));
    }
  }, []);

  const filteredInteractions = interactions.filter((int) => {
    if (pillFilter === "all") return int;
    return int.med1.name === pillFilter || int.med2.name === pillFilter;
  });

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-hidden'>
            <h1 className=' tracking-widest self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl  text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
              interactions
            </h1>
            <img
              className=' self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
              src='/pills-1.svg'
              alt='Monitoring'
            />
          </div>
          <div className=' flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-hidden'>
            <div className=' dark:bg-gray-500 inline-block min-w-full shadow rounded-lg overflow-scroll'>
              <div className='filter  '>
                <form className='flex flex-row justify-end dark:bg-gray-500'>
                  <label
                    className='text-center px-5 py-3  dark:text-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-normal'
                    htmlFor='medName'
                  >
                    show interactions with:
                  </label>
                  <select
                    className='self-center border-white w-20 text-xs  mr-5 -bg-nude self-end w-10  dark:text-gray-200 dark:bg-gray-500 dark:text-gray-200 dark:border-gray-200 border-2 rounded'
                    name='pillName'
                    value={pillFilter}
                    onChange={(e) => setPillFilter(e.target.value)}
                  >
                    <option value='all'>All</option>
                    {pills.map((pill) => (
                      <option value={pill.name} key={pill.id}>
                        {pill.name}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className=''>
                    <th className='dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300 '>
                      Medication 1
                    </th>
                    <th className='dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300 '>
                      Medication 2
                    </th>
                    <th className='dark:bg-gray-500 text-center px-5 py-3   bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300 '>
                      Interactions
                    </th>
                  </tr>
                </thead>
                <tbody className='overflow-scroll dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm text-center w-full '>
                  {filteredInteractions.length < 1 ? (
                    <tr className='justify-center dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800 space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                      <td colSpan='4' className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm dark:text-gray-600'>
                        <h1>Your medications have no interactions!</h1>
                      </td>
                    </tr>
                  ) : (
                    filteredInteractions.map((interaction) => (
                      <tr
                        key={interaction.id}
                        className=' dark:bg-gray-200 shadow rounded-full border-b-10 border-t-8 border-nude dark:border-gray-800 space-y-6 mt-30 px-5 py-5 bg-white text-sm '
                      >
                        <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm dark:text-gray-600'>
                          {interaction.med1.name}
                        </td>
                        <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm dark:text-gray-600'>
                          {interaction.med2.name}
                        </td>
                        <td className='dark:bg-gray-200 border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm dark:text-gray-600'>
                          {interaction.interactionDesc}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Interactions;
