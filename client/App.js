import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";
// import { fetchWallet } from "./store/wallet";
// import { fetchInteractions } from "./store/interactions";
// import { fetchUpdateUser } from "./store/user";

const App = () => {
  // const { auth: user } = useSelector(s => s)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchWallet(user))
  //   dispatch(fetchInteractions(user))
  //   dispatch(fetchUpdateUser(user.id))
  // }, [])

  return (
    <div className=' flex flex-col h-screen'>
      <Navbar className='dark:bg-gray-800 dark:text-gray-200 p-4 z-20' />
      <Routes className=' p-4 flex-grow z-0' />
      <Footer className='p-4' />
    </div>
  );
};

export default App;
