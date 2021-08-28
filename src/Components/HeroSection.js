import React, { useState } from "react";
import "./HeroSection.css";
import { ForwardArrow, BackArrow } from "../Files/allImagesLink";
import { Button } from "@material-ui/core";
import SliderImg1 from "./files/1.jpg";
import SliderImg2 from "./files/2.jpg";
import SliderImg3 from "./files/3.jpg";
import SliderImg4 from "./files/4.jpg";
import { ReactComponent as ArrowRight } from "./assets/arrow.svg";

const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([
    SliderImg1,
    SliderImg2,
    SliderImg3,
    SliderImg4,
  ]);

  const firstSlideIndex = 0;
  const lastSlideIndex = sliderImages.length - 1;

  function sliderImageSetter(sliderImages) {
    if (slideIndex >= firstSlideIndex && slideIndex <= lastSlideIndex) {
      return sliderImages[slideIndex];
    }
  }

  // Dynamic Slider Controllers(Forward)

  function increment() {
    if (slideIndex >= firstSlideIndex && slideIndex < lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex + 1);
    } else {
      setSlideIndex(firstSlideIndex);
    }
  }

  // Dynamic Slider Controllers(Backward)

  function decrement() {
    if (slideIndex > firstSlideIndex && slideIndex <= lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex - 1);
    } else {
      setSlideIndex(lastSlideIndex);
    }
  }

  return (
    <div className="hero">
      <div className="slider">
        <Button
          onClick={decrement}
          size="small"
          className="slider__controller slider__controllerBack"
        >
          <img
            className="slider__arrows"
            src={BackArrow}
            width="20px"
            alt="<"
          />
        </Button>
        <img src={sliderImageSetter(sliderImages)} />
        <Button
          onClick={increment}
          className="slider__controller slider__controllerForw"
        >
          <img
            loading="lazy"
            className="slider__arrows"
            src={ForwardArrow}
            width="20px"
            alt=">"
          />
        </Button>
      </div>
      <div className="slider__fade"></div>
    </div>
  );
};

export default HeroSection;
