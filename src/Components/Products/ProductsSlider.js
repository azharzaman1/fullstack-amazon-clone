import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Heading } from "../Components";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./ProductsSlider.css";

const ProductsSlider = ({
  title,
  redirectTo,
  linkText,
  children,
  sliderSpecificClass,
  sliderContentSpecificClass,
}) => {
  const [sliderContentId, setSliderContentId] = useState(parseFloat(uuid()));
  const [sliderLeftControlId, setSliderLeftControlId] = useState(
    parseFloat(uuid())
  );
  const [sliderRightControlId, setSliderRightControlId] = useState(
    parseFloat(uuid())
  );
  useEffect(() => {
    const buttonRight = document.getElementById(sliderRightControlId);
    const buttonLeft = document.getElementById(sliderLeftControlId);

    buttonRight.onclick = function () {
      document.getElementById(sliderContentId).scrollLeft += 150;
    };
    buttonLeft.onclick = function () {
      document.getElementById(sliderContentId).scrollLeft -= 150;
    };
  }, []);

  return (
    <div
      className={`products__slider flexColumn ${sliderSpecificClass}`}
      onClick={() => {
        console.log(sliderContentId);
      }}
    >
      <div className="productsSlider__head flexRow center">
        <Heading type={2}>{title}</Heading>
        <Link className="redirectLink" to={redirectTo}>
          {linkText}
        </Link>
      </div>
      <div className="productsSlider__slider flexRow between">
        <Button
          id={sliderLeftControlId}
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
          id={sliderRightControlId}
          className="productSlider__controller productSlider__controller2"
          variant="outlined"
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductsSlider;
