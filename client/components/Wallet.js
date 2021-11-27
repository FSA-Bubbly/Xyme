import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";

const Wallet = () => {
  const {
    auth: user,
    wallet: { data: pills },
  } = useSelector((s) => s);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);

  return (
    <div>
      <div class='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div class='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table class='min-w-full leading-normal'>
            <thead>
              <tr>
                <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Pill
                </th>
                <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Name
                </th>
                <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Name
                </th>
                <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {user.pills.map((pill) => (
                <tr key={pill.id}>
                  <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div class='flex items-center'>
                      <div class='flex-shrink-0 w-10 h-10'>
                        <img
                          class='w-full h-full rounded-full'
                          src='/pill2.svg'
                          alt=''
                        />
                      </div>
                      <div class='ml-3'>
                        <p class='text-gray-900 whitespace-no-wrap'></p>
                      </div>
                    </div>
                  </td>
                  <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p class='text-gray-900 whitespace-no-wrap'>Editor</p>
                  </td>
                  <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p class='text-gray-900 whitespace-no-wrap'>Jan 01, 2020</p>
                  </td>
                  <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span class='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                      <span
                        aria-hidden
                        class='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                      ></span>
                      <span class='relative'>Activo</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
            <span class='text-xs xs:text-sm text-gray-900'>
              Showing 1 to 4 of 50 Entries
            </span>
            <div class='inline-flex mt-2 xs:mt-0'>
              <button class='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l'>
                Prev
              </button>
              <button class='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <body class='flex flex-col items-center justify-center'>
        <div className=' flex justify-center fadeIn w-full md:w-1/4 p-10 sm:p-20 md:p-30 ml-30 '>
          <img src='/wallet.svg' alt='Monitoring' />
        </div>
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
        <button className='bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full'>
          add to wallet{" "}
        </button>
      </body>
    </div>
  );
};

export default Wallet;
