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
				type='file'
				accept='image/*'
				capture='environment'
				ref={ref}
				onChange={(event) => {
					setSelectedImage(event.target.files[0]);
					dispatch(checkWithVision(event.target.files[0]));
					toggleModal();
				}}
			/>
			{showModal ? (
				<Modal
					isOpen={showModal}
					onRequestClose={toggleModal}
					contentLabel='Test'>
					<div> Name: {imageDetails}</div>
					<div>
						{selectedImage && (
							<div>
								<img
									alt='No Image'
									width={'250px'}
									src={URL.createObjectURL(selectedImage)}
								/>
								<br />
							</div>
						)}
					</div>
					<p>Does the result match your prescription?</p>
					<button onClick={() => reset()}>Close</button>
					<button
						onClick={() => {
							reset();
							walletCallBack(imageDetails);
						}}>
						Yes
					</button>
				</Modal>
			) : null}
		</div>
	);
};

export default Camera;

// Creates a client
