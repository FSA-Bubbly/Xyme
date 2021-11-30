import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkWithVision } from '../store/vision';
import FileBase64 from 'react-file-base64';

const Camera = (props) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const dispatch = useDispatch();

	return (
		<div>
			{selectedImage && (
				<div>
					{console.log(selectedImage.file)}
					<img
						alt='No Image'
						width={'250px'}
						src={URL.createObjectURL(selectedImage.file)}
					/>
					<br />
					<button onClick={() => setSelectedImage(null)}>Remove</button>
				</div>
			)}
			<br />

			<br />
			<FileBase64
				multiple={true}
				type='file'
				accept='image/*'
				capture='environment'
				onDone={(event) => {
					console.log(event[0]);
					setSelectedImage(event[0]);
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
