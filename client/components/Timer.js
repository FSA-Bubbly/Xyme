import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(tick, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [time]);

  const tick = () => {
    setTime(new Date());
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div>
      <h1 className='rounded-top dark:bg-gray-500 text-center px-5 py-3 bg-nude text-left text-md font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300'>
        Current Time:
      </h1>
      <div className=' border-yellow-0 rounded shadow-2x1 font-mono text-9x1  text-white grid grid-cols-3 gap-x-px'>
        {/* left side */}
        <div className='relative bg-black p-8'>
          {/* background grid of black squares */}
          <div className='absolute inset-0 bg-red-400 grid grid-rows-2'>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
          </div>
          {/* time numbers */}
          <span className='relative text-gray-700 '>
            {("0" + hours).slice(-2)}
          </span>
          {/* line across the middle */}
          <div className='absolute inset-0 flex items-center'>
            <div className='h-px w-full bg-black'></div>
          </div>
        </div>
        {/* right side */}
        <div className='relative bg-black p-8'>
          {/* background grid of black squares */}
          <div className='absolute inset-0 bg-red-400 grid grid-rows-2'>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
          </div>
          {/* time numbers */}
          <span className='relative text-gray-700'>
            {" "}
            {("0" + minutes).slice(-2)}
          </span>
          {/* line across the middle */}
          <div className='absolute inset-0 flex items-center'>
            <div className='h-px w-full bg-black'></div>
          </div>
        </div>

        <div className='relative bg-black p-8'>
          <div className='absolute inset-0 bg-red-400 grid grid-rows-2'>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
            <div className='bg-gradient-to-br from-nude to-nude'></div>
          </div>
          {/* time numbers */}
          <span className='relative text-gray-700'>
            {" "}
            {("0" + seconds).slice(-2)}
          </span>
          {/* line across the middle */}
          <div className='absolute inset-0 flex items-center'>
            <div className='h-px w-full bg-black'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
