import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkWithVision } from "../store/vision";
import Modal from "react-modal";
import { Link } from "react-router-dom";

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
    ref.current.value = "";
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
        capture='environment'
        ref={ref}
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          dispatch(checkWithVision(event.target.files[0]));
          toggleModal();
        }}
      />
      {showModal ? (
        <Modal
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel='Test'
        >
          <div>
            <div className='flex flex-col  '>
              <div className='flex self-center flex-col fadeIn w-full    sm:p-10 md:p-10 overflow-hidden'>
                <h1 className='  self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl  text-center text-gray-800 dark:text-gray-200 text-gray-800 '>
                  PILL SCAN
                </h1>
              </div>

              <div className='flex justify-center '>
                <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200'>
                  <div className='flex self-center  pt-10 flex-col'>
                    <p className=' text-center px-1 text-xs text-gray-500 uppercase'>
                      {" "}
                      Does the result match your prescription?
                    </p>

                    {selectedImage && (
                      <div className='rounded-mg py-20'>
                        <img
                          alt='No Image'
                          width={"250px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                      </div>
                    )}

                    <p className=' self-center px-1 text-sm text-gray-500 uppercase'>
                      {" "}
                      Name: {imageDetails}
                    </p>

                    <h1 className='text-gray-500 text-sm'></h1>
                    <h1 className='text-gray-500 text-sm p-4 text-left'></h1>
                  </div>
                  <div className='flex justify-between p-6'>
                    <button
                      className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'
                      onClick={() => reset()}
                    >
                      Close
                    </button>
                    <button
                      className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'
                      onClick={() => {
                        reset();
                        walletCallBack(imageDetails);
                      }}
                    >
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
