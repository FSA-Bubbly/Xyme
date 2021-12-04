import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";

const App = () => {
  
  return (
    <div className=' flex flex-col h-screen'>
      <Navbar className='dark:bg-gray-800 dark:text-gray-200 p-4 z-20' />
      <Routes className=' p-4 flex-grow z-0' />
      <Footer className='p-4' />
    </div>
  );
};

export default App;
