import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const SinglePill = (props) => {
	const [isLoading, setLoading] = useState(true);
	const pill = props.location.state.pill;

	const loading = async () =>
		new Promise((resolve) => setTimeout(() => resolve(), 400));

	useEffect(() => {
		(async () => {
			await loading();
			setLoading(!isLoading);
		})();
	}, []);

	return (
		<div className='flex flex-col'>
			{isLoading ? (
				<Loading />
			) : (
				<div className='flex flex-col  '>
					<div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-hidden'>
						<h3 className='tracking-widest self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-200 text-gray-800  '></h3>
					</div>
					<div className='flex items-center justify-center '>
						<div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200'>
							<div className='flex items-center justify-center pt-10 flex-col'>
								<h1 className='tracking-widest self font-sans uppercase fadeIn p-10 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-800 text-gray-800 '>
									{pill.name}
								</h1>
								<div>
									<img
										src={pill.image}
										className=' p-10 rounded-md object-scale-down'
									/>
								</div>

								<h1 className='text-gray-500 text-sm p-4 text-center font-bold'>
									Generic drug description (may not refer to your substance by
									brand name):
								</h1>
								<h2 className='text-gray-500 text-sm p-4 text-left'>
									{pill.description}
								</h2>
							</div>
							<div className='flex justify-evenly py-4'>
								<div>
									<Link
										to={`/wallet`}
										className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800 hover:bg-orange hover:text-white hover:border-orange'>
										Return to Wallet
									</Link>
								</div>
								<div>
									<Link
										to={{
											pathname: `/wallet/select/${pill.id}/edit`,
											state: { pill: pill },
										}}
										className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'>
										Edit Pill
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SinglePill;
