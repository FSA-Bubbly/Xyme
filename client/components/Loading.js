import React from 'react';

const Loading = () => {
  return (
    <div className=' my-40 self-center text-center'>
      {" "}
      <img
        src='/XYME.png'
        className=' animate-bounce self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
      />
      <h1>Loading...</h1>
    </div>
  )
}

export default Loading;
