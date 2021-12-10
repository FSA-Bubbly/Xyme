import React, { useState, useEffect} from "react";

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
      <h1 className="self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-widest text-center text-gray-800 dark:text-gray-200 text-gray-800 ">
        Current Time:
      </h1>
      <div className="border-8 border-yellow-0 rounded shadow-2x1 font-mono text-9x1  text-white grid grid-cols-3 gap-x-px">
        {/* left side */}
        <div className="relative bg-black p-8">
          {/* background grid of black squares */}
          <div className="absolute inset-0 bg-red-400 grid grid-rows-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-800"></div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-900"></div>
          </div>
          {/* time numbers */}
          <span className="relative">{("0" + hours).slice(-2)}</span>
          {/* line across the middle */}
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-black"></div>
          </div>
        </div>
        {/* right side */}
        <div className="relative bg-black p-8">
          {/* background grid of black squares */}
          <div className="absolute inset-0 bg-red-400 grid grid-rows-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-800"></div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-900"></div>
          </div>
          {/* time numbers */}
          <span className="relative"> {("0" + minutes).slice(-2)}</span>
          {/* line across the middle */}
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-black"></div>
          </div>
        </div>

        <div className="relative bg-black p-8">
          <div className="absolute inset-0 bg-red-400 grid grid-rows-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-800"></div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-900"></div>
          </div>
          {/* time numbers */}
          <span className="relative"> {("0" + seconds).slice(-2)}</span>
          {/* line across the middle */}
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
