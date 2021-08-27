import { Card, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useStateValue from "../../Files/StateProvider";
import { ADD_TO_BASKET } from "../../redux/slices/basketSlice";
import "./Products.css";

const Product = ({ id, title, price, imgUrl, rating }) => {
  const dispatchRedux = useDispatch();
  const [{ basket }, dispatch] = useStateValue();
  const [objectPresentInBasket, setObjectPresentInBasket] = useState(undefined);

  useEffect(() => {
    const tracedProduct = basket.find((product) => product.id === id);
    setObjectPresentInBasket(tracedProduct);
  }, [basket]);

  const addToBasketOrRemoveFromBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        imgUrl: imgUrl,
        qty: 1,
      },
    });
    dispatchRedux(
      ADD_TO_BASKET({
        id: id,
        title: title,
        price: price,
        rating: rating,
        imgUrl: imgUrl,
        qty: 1,
      })
    );
  };

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isBelow500px = useMediaQuery("(max-width:500px)");

  return (
    <Grid item xs={isBelow500px ? 12 : 6} sm={6} md={3}>
      <Card className="product">
        <div className="product__info">
          <p className="product__title mainHoverEffect">{title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        </div>
        <div className="product__rating flexRow">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <div className="product__images">
          <img src={imgUrl} alt="Oops... Product images missing" />
        </div>
        <div className="product__btn">
          <button
            disabled={objectPresentInBasket}
            onClick={addToBasketOrRemoveFromBasket}
          >
            {objectPresentInBasket ? "Added to Basket" : "Add to Basket"}
          </button>
        </div>
      </Card>
    </Grid>
  );
};

export default Product;
