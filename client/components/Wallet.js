import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";
import { removePills } from "../store/wallet";

const Wallet = () => {
  const { auth: user, wallet: pills } = useSelector(s => s);
  const [editing, setEditing] = useState(false);
  // const [pillsToRemove, setPillsToRemove] = useState([]);
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
    console.log(pillsToRemove)
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
    <div>
      {
        pills === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <body className='flex items-center justify-center'>
              <div className='container'>
                <table className='w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-auto sm:shadow-lg my-5'>
                  <thead className='text-black'>
                    {pills.map(pill => (
                      <tr
                        key={pill.id}
                        className=' bg-white flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'
                      >
                        <th className='p-3 text-left'>Name</th>
                        <th className='p-3 text-left'>Description</th>
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
                    ))}
                  </thead>
                  <tbody className='flex-1 sm:flex-none'>
                    {pills.sort((a, b) => (
                      (a.name > b.name) ? 1 : -1
                    ))
                    .map(pill => (
                      <tr
                        key={pill.id}
                        className='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
                      >
                        <td className=' border hover:bg-gray-100 p-3'>{pill.name}</td>
                        <td className='border hover:bg-gray-100 p-3 truncate'>
                          {pill.description}
                        </td>
                        {
                          !editing ? (
                            <td className=' border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                            </td>
                          ) : (
                            <td className=' border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                              <input
                                type='checkbox'
                                value={pill.id}
                                onChange={handleCheck}>
                              </input>
                            </td>
                          )
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </body>
            <Link to='/wallet/add-pill' className='bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full'>
              add to wallet{" "}
            </Link>
          </div>
        )
      }
  </div>
  );
};

export default Wallet;
