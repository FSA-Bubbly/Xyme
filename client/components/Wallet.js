import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";
import { removePills } from "../store/wallet";

const Wallet = () => {
  const { auth: user, wallet: pills } = useSelector(s => s);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);

  let pillsToRemove = [];

  const handleCheck = e => {
    if (e.target.checked) {
      pillsToRemove.push(e.target.value);
    } else {
      const idx = pillsToRemove.indexOf(e.target.value);
      pillsToRemove.splice(idx, 1);
    }
  }

  const handleCancel = () => {
    setEditing(!editing);
    pillsToRemove = [];
  }

  const handleRemove = () => {
    if (pillsToRemove.length > 0) {
      dispatch(removePills(user.id, pillsToRemove));
      setEditing(!editing);
    }

  }

  return (
    <div className='flex flex-col'>
      {
        pills === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <>
          <div className='flex self-center fadeIn w-full md:w-1/3 p-20 sm:p-20 md:p-20 '>
            <img src='/wallet.svg' alt='Monitoring' />
          </div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr className=''>
                    <th className=' px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider '>
                      Pill
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Time Taken
                    </th>
                    {
                      !editing ? (
                        <th className='p-3 text-left' width='110px'>
                          <button
                            value='edit'
                            type='button'
                            onClick={() => setEditing(!editing)}
                          >Edit</button>
                        </th>
                      ) : (
                        <>
                          <th className='p-3 text-left' width='110px'>
                            <button
                              value='remove'
                              type='button'
                              onClick={handleRemove}
                            >Remove</button>
                            <button
                              value='remove'
                              type='button'
                              onClick={handleCancel}
                            >Cancel</button>
                          </th>
                        </>
                      )
                    }
                  </tr>
                </thead>
                <tbody className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                  {pills.sort((a, b) => (
                    (a.name > b.name) ? 1 : -1
                  ))
                  .map(pill => (
                    <tr
                      key={pill.id}
                      className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'
                    >
                      <td className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 w-10 h-10'>
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
                            <p className='text-gray-900 '>{pill.name}</p>
                          </Link>
                        </td>
                      <td className='px-5 py-5  border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {pill.wallet.frequencyPerDay === 2 ? (<td>both morning and night</td>) : (<td>morning</td>)}
                        </p>
                      </td>
                      {
                        !editing ? (
                          <td className='px-5 py-5  border-gray-200 bg-white text-sm'>
                            <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span
                              aria-hidden
                              className='absolute inset-0 bg-green-200  rounded-full'
                            ></span>
                            </span>
                          </td>
                        ) : (
                        <td className='px-5 py-5  border-gray-200 bg-white text-sm'>
                          <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span
                              aria-hidden
                              className='absolute inset-0 bg-green-200  rounded-full'
                            ></span>
                            <span className='relative'>
                              <input
                                type='checkbox'
                                value={pill.id}
                                onChange={handleCheck}>
                              </input>
                            </span>
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
                <div className='inline-flex mt-2 xs:mt-0'>
                  <button className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded'>
                    <Link
                      to='/wallet/add-pill'
                      className='py-5 px-3 text-black hover:text-gray-900 u'
                    >
                      +
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        )
      }
    </div>
  );
};

export default Wallet;
