import React, { useRef } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { ImageSlider } from "./ImageSlider";
import { Sliderdata } from "./SliderData";

/**
 * COMPONENT
 */
export const Landing = () => {
  return (
    <div>
      <header className='headerbanner' id='header'>
        <h1>Your personalized medication + supplementation tracker</h1>
      </header>
      <div className='contentLanding'>
        <section id='section-a'>
          <div className='box-1'>box1 </div>
          <div className='box-1'></div>
          <div className='box-1'></div>
          <div className='box-1'></div>
          <div className='box-1'></div>
          <div className='box-1'></div>
        </section>
        <section className='slides' id='section-b'>
          <ImageSlider slides={Sliderdata} />
        </section>
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
