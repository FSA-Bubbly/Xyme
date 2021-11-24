import React, { useRef } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import { useEffect, useState } from "react";

/**
 * COMPONENT
 */
export const Landing = () => {
  return (
    <div>
      <header class='container mx-auto'></header>
      <div class=' flex justify-around'>
        <div class='bg-green h-10 w-5'> </div>
        <div class='bg-green h-10 w-5'> </div>
        <div class='bg-green h-10 w-5'></div>
        <div class='bg-green h-10 w-5'> </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState, null)(Landing);
