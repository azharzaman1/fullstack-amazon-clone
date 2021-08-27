import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Heading } from "../Components";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./Slider.css";

const Slider = ({
  title,
  redirectTo,
  linkText,
  children,
  sliderSpecificClass,
  sliderContentSpecificClass,
}) => {
  const [sliderContentId, setSliderContentId] = useState(uuid());

  return (
    <div className={`products__slider flexColumn ${sliderSpecificClass}`}>
      <div className="productsSlider__head flexRow center">
        <Heading type={2}>{title}</Heading>
        <Link className="redirectLink" to={redirectTo}>
          {linkText}
        </Link>
      </div>
      <div className="productsSlider__slider flexRow between">
        <Button
          onClick={() => {
            document.getElementById(sliderContentId).scrollLeft -= 150;
          }}
          className="productSlider__controller productSlider__controller1"
          variant="outlined"
        >
          <ArrowBackIosIcon />
        </Button>
        <div
          className={`slider__content flexRow between ${sliderContentSpecificClass}`}
          id={sliderContentId}
        >
          {children}
        </div>
        <Button
          onClick={() => {
            document.getElementById(sliderContentId).scrollLeft += 150;
          }}
          className="productSlider__controller productSlider__controller2"
          variant="outlined"
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default Slider;
