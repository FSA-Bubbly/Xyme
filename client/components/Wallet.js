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
    })()
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
      dispatch(removePills(user.id, pillsToRemove));
    }

    const removePillsandInteractions = async () => {
      await dispatch(removeInteractions(user.id, pillsToRemove));
      dispatch(removePills(user.id, pillsToRemove));
    }
    removePillsandInteractions();
  };

	return (
		<div className='flex flex-col'>
			{
				isLoading ? (
					<div className=' my-40 self-center text-center'>
            {" "}
            <img src='/loading.svg' className=' w-32' />
            <h1>Loading...</h1>
          </div>
				) : (
					<>
					<div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-20 md:p-20 overflow-scroll '>
						<h1 className=' font-sans uppercase fadeIn p-2 md:text-2xl  text-xl font-bold text-center text-gray-800 '>
							personal wallet
						</h1>
						<img src='/wallet.svg' alt='Monitoring' />
					</div>
					<div className='flex -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-scroll'>
						<div className='inline-block min-w-full shadow rounded-lg overflow-scroll'>
							{
								pills.length < 1 ? (
									<h1>Your wallet is empty!</h1>
								) : (
									<table className='min-w-full leading-normal'>
										<thead>
											<tr className=''>
												<th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider '>
													Pill
												</th>
												<th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
													Name
												</th>

												<th className='text-center px-5 py-3 border-b-2 border-gray-200 bg-nude text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
													Remove
												</th>
											</tr>
										</thead>
										<tbody className=' border-green space-y-6 mt-30 px-5 py-8 bg-white text-sm'>
											{pills
												.sort((a, b) => (a.name > b.name ? 1 : -1))
												.map((pill) => (
													<tr
														key={pill.id}
														className='shadow rounded-full border-b-10 border-t-8 border-nude  space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
														<td className=' border-green space-y-6 mt-30 px-5 py-5 bg-white text-sm'>
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
														<td className=' border-b-7 border-gray-200 px-5 py-5  bg-white text-sm'>
															<Link
																to={`/wallet/select/${pill.id}`}
																key={pill.id}
																pill={pill}>
																<p className=' text-center text-gray-900 '>
																	{pill.name}
																</p>
															</Link>
														</td>

														<td className=' text-center px-3 py-3  border-gray-200 bg-white text-sm'>
															<span className='relative'>
																<input
																	type='checkbox'
																	value={pill.id}
																	onChange={handleCheck}></input>
															</span>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								)
							}
							<div className='px-5 py-5 border-t flex flex-col xs:flex-row items-center xs:justify-between overflow-scroll m-w-full'>
								<div className='inline-flex mt-2 xs:mt-0'>
									<button className=' mx-5 text-sm bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded'>
										<Link
											to='/wallet/add-pill'
											className='py-5 px-3 text-black hover:text-gray-900 u'>
											add to wallet
										</Link>
									</button>
									<button
									className='text-sm bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded'
									value='remove' type='button' onClick={handleRemove}>
											Remove from wallet
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
