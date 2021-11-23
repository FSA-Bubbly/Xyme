import React from "react";
import { useEffect, useState } from "react";
import { Sliderdata } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);
  console.log(current);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <section className='slider' id='section-b'>
      <button className='left-arrow' onClick={prevSlide}></button>
      <button className='right-arrow' onClick={nextSlide} />
      {Sliderdata.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='slideimg' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
