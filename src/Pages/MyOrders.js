import React, { useState, useEffect } from "react";
import { db } from "../Files/firebase";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import "./MyOrders.css";
import { MainContainer } from "../Files/Mui/Styled/MuiStyled";

const MyOrders = () => {
  const currentUser = useSelector(selectUser);
  const [orders, setOrders] = useState();

  useEffect(() => {
    db.collection("users")
      .doc(currentUser?.uid)
      .collection("orders")
      .onSnapshot((snapshot) =>
        setOrders(
          snapshot.docs.map((order) => ({
            id: order.id,
            orderDetails: order.data(),
          }))
        )
      );
  }, [currentUser]);

  return (
    <MainContainer maxWidth={false} className="my__orders">
      <Grid container direction="column" className="myOrders__content">
        <Grid item className="myOrders__header">
          <h3>My Orders</h3>
        </Grid>
        <Grid item container className="myOrders__list">
          {orders?.map((order) => (
            <MyOrdersOrder
              orderNumber={order?.id}
              orderTimeStamp={new Date(
                order?.orderDetails.orderInfo.orderTimeStamp.toDate()
              ).toUTCString()}
              orderAddressName={order?.orderDetails.address.fullName}
              addressLineOne={order?.orderDetails.address.addressLineOne}
              addressLineTwo={order?.orderDetails.address.addressLineTwo}
              zipCode={order?.orderDetails.address.zipCode}
              city={order?.orderDetails.address.city}
              country={order?.orderDetails.address.country}
              province={order?.orderDetails.address.province}
              orderCart={order?.orderDetails.cart}
              orderTotal={
                order?.orderDetails.orderInfo.orderTotalAmountInDollers
              }
              orderItems={order?.orderDetails.orderInfo.orderTotalItems}
            />
          ))}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

const MyOrdersOrder = ({
  orderNumber,
  orderTimeStamp,
  orderAddressName,
  addressLineOne,
  addressLineTwo,
  zipCode,
  city,
  province,
  country,
  orderCart,
  orderItems,
  orderTotal,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:960px)");

  return (
    <Grid
      item
      container
      id="just-extra-spacing-compensation"
      style={{ padding: "12px" }}
    >
      <Grid item container className="order" spacing={3}>
        <Grid
          item
          sm={8}
          md={3}
          container
          direction="column"
          className="orderContent__left"
        >
          <Grid item className="orderDetails">
            <h3>Order No: {orderNumber}</h3>
            <span>Order placed at: {orderTimeStamp} </span>
          </Grid>
          <Grid item className="order__address">
            <h3>Order shipping address </h3>
            <h4>{orderAddressName}</h4>
            <h4>{addressLineOne}</h4>
            <h4>
              <span>{addressLineTwo},</span> <span>{zipCode}</span>
            </h4>
            <h4>
              <span>{city},</span> <span>{province} | </span>{" "}
              <span>{country}</span>
            </h4>
          </Grid>
        </Grid>
        {!isDesktop && (
          <Grid item md={2} className="order__amounts flexColumn">
            <h4>Order Total Items : {orderItems}</h4>
            <h4>Order Total : ${orderTotal.toFixed(2)}</h4>
            <h4>Order Status : Processing</h4>
          </Grid>
        )}
        <Grid
          item
          md
          containr
          justifyContent="center"
          className="orderContent__right"
        >
          <Grid item md="11" className="order__cart flexColumn">
            <h3>Order Items </h3>
            {orderCart?.map((cartItem) => (
              <OrderCartItem
                key={cartItem.id}
                title={cartItem.title}
                imgUrl={cartItem.imgUrl}
                price={cartItem.price}
                qty={cartItem.qty}
              />
            ))}
          </Grid>
        </Grid>
        {isDesktop && (
          <Grid item md={2} className="order__amounts flexColumn">
            <h4>Order Total Items : {orderItems}</h4>
            <h4>Order Total : ${orderTotal.toFixed(2)}</h4>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const OrderCartItem = ({ title, imgUrl, price, qty }) => {
  return (
    <div className="ordersCart__item flexRow">
      <img className="checkout__productImage" src={imgUrl} />
      <div className="orderCart__itemInfo flexColumn">
        <h3 className="orderCart__itemTitle">{title}</h3>
        <div className="calc flexRow">
          <h3>
            {qty} * {price} ={" "}
          </h3>
          <strong> {qty * price} </strong>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
