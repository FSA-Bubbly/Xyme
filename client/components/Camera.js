import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkWithVision } from '../store/vision';

const Camera = (props) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const dispatch = useDispatch();

	return (
		<div>
			{selectedImage && (
				<div>
					<img
						alt='No Image'
						width={'250px'}
						src={URL.createObjectURL(selectedImage)}
					/>
					<br />
					<button onClick={() => setSelectedImage(null)}>Remove</button>
				</div>
			)}
			<br />

			<br />
			<input
				type='file'
				accept='image/*'
				capture='environment'
				onChange={(event) => {
					console.log(event.target.files[0]);
					setSelectedImage(event.target.files[0]);
				}}
			/>

			<button onClick={() => dispatch(checkWithVision(selectedImage))}>
				Check With Vision
			</button>
		</div>
	);
};

export default Camera;

// Creates a client
