import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/wallet";

const Wallet = (props) => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);
  return (
    <div>
      <body class='flex items-center justify-center'>
        <div class='container'>
          <table class='w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-auto sm:shadow-lg my-5'>
            <thead class='text-black'>
              {user.pills.map((pill) => (
                <tr
                  key={pill.id}
                  class=' bg-white flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'
                >
                  <th class='p-3 text-left'>Name</th>
                  <th class='p-3 text-left'>Description</th>
                  <th class='p-3 text-left' width='110px'>
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody class='flex-1 sm:flex-none'>
              {user.pills.map((pill) => (
                <tr
                  key={pill.id}
                  class='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
                >
                  <td class=' border hover:bg-gray-100 p-3'>{pill.name}</td>
                  <td class='border hover:bg-gray-100 p-3 truncate'>
                    {pill.description}
                  </td>
                  <td class=' border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
      <button className='bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full'>
        add to wallet{" "}
      </button>
    </div>
  );
};

export default Wallet;
