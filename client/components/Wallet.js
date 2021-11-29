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
                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                      Remove
                    </th>
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
                        <p className='text-gray-900 '>{pill.name}</p>
                      </td>
                      <td className='px-5 py-5  border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          Monday 2pm
                        </p>
                      </td>
                      <td className='px-5 py-5  border-gray-200 bg-white text-sm'>
                        <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                          <span
                            aria-hidden
                            className='absolute inset-0 bg-green-200  rounded-full'
                          ></span>
                          <span className='relative'>x</span>
                        </span>
                      </td>
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
  //   <div>
  //     {
  //       pills === undefined ? (
  //         <h1>Loading...</h1>
  //       ) : (
  //         <div>
  //           <body class='flex items-center justify-center'>
  //             <div class='container'>
  //               <table class='w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-auto sm:shadow-lg my-5'>
  //                 <thead class='text-black'>
  //                   {pills.map((pill) => (
  //                     <tr
  //                       key={pill.id}
  //                       class=' bg-white flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'
  //                     >
  //                       <th class='p-3 text-left'>Name</th>
  //                       <th class='p-3 text-left'>Description</th>
  //                       <th class='p-3 text-left' width='110px'>
  //                         Actions
  //                       </th>
  //                     </tr>
  //                   ))}
  //                 </thead>
  //                 <tbody class='flex-1 sm:flex-none'>
  //                   {pills.sort((a, b) => (
  //                     (a.name > b.name) ? 1 : -1
  //                   ))
  //                   .map(pill => (
  //                     <tr
  //                       key={pill.id}
  //                       class='flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0'
  //                     >
  //                       <td class=' border hover:bg-gray-100 p-3'>{pill.name}</td>
  //                       <td class='border hover:bg-gray-100 p-3 truncate'>
  //                         {pill.description}
  //                       </td>
  //                       <td class=' border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer'>
  //                         Delete
  //                       </td>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //             </div>
  //           </body>
  //           <Link to='/wallet/add-pill' className='bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full'>
  //             add to wallet{" "}
  //           </Link>
  //         </div>
  //       )
  //     }
  // </div>
  );
};

export default Wallet;
