import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkWithVision } from '../store/vision';
import Modal from 'react-modal';

const Camera = ({ walletCallBack }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showModal, setShowModal] = useState(false);
	let visionImage = useSelector((state) => state.vision);
	const dispatch = useDispatch();
	const ref = useRef();
	const imageDetails = visionImage[0]?.name;
	const reset = () => {
		visionImage.length = 0;
		toggleModal();
		ref.current.value = '';
	};
	const toggleModal = () => {
		if (visionImage) {
			setShowModal((value) => !value);
		}
	};

	return (
		<div>
			<input
				className='bg-yellow'
				type='file'
				accept='image/*'
				ref={ref}
				onChange={(event) => {
					setSelectedImage(event.target.files[0]);
					dispatch(checkWithVision(event.target.files[0]));
					toggleModal();
				}}
			/>
			{showModal ? (
				<Modal
					className=' my-16 w-auto mx-10'
					isOpen={showModal}
					onRequestClose={toggleModal}
					ariaHideApp={false}
					contentLabel='Test'>
					<div className='flex justify-center'>
						<div className='flex flex-col max-w-lg'>
							<div className='flex justify-center '>
								<div className='bg-white w-full rounded-lg dark:bg-gray-200'>
									<div className='flex self-center pt-5 flex-col'>
										<p className=' text-center px-1 text-xs text-gray-500 uppercase'>
											{' '}
											Does the result match your prescription?
										</p>

										{selectedImage && (
											<div className='flex justify-center self-center rounded-mg'>
												<div className='flex justify-center'>
													<img
														alt='No Image'
														className='self-center p-10'
														src={URL.createObjectURL(selectedImage)}
													/>
												</div>
											</div>
										)}

										<p className=' self-center px-1 text-xs sm:text-sm text-gray-500 uppercase'>
											{' '}
											Name: {imageDetails}
										</p>

										<h1 className='text-gray-500 text-sm'></h1>
										<h1 className='text-gray-500 text-sm text-left'></h1>
									</div>
									<div className='flex justify-between p-5'>
										<button
											className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'
											onClick={() => reset()}>
											Close
										</button>
										<button
											className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'
											onClick={() => {
												reset();
												walletCallBack(imageDetails);
											}}>
											Yes
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

export default Camera;

// Creates a client
