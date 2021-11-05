import React, { useState, useEffect, lazy, Suspense } from "react";
import Homepage from "./Pages/Homepage";
import Header from "./Components/Header/Header";
import HeaderSecondary from "./Components/Header/HeaderSecondary";
import ShopingCart from "./Pages/ShopingCart";
import { useDispatch } from "react-redux";
import { SET_FETCHED_DETAILS } from "./redux/slices/fetchedDetailsSlice";
import { SET_USER } from "./redux/slices/userSlice";
import { CssBaseline } from "@material-ui/core";
import { auth, db } from "./Files/firebase";
import useStateValue from "./Files/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { PageLoadingSpinner } from "./Components/Components";
import CopyrightFooter from "./Components/CopyrightFooter/CopyrightFooter";

const OrderPlacedSuccssfully = lazy(() =>
  import("./Pages/OrderPlacedSuccssfully")
);
const MyOrders = lazy(() => import("./Pages/MyOrders"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const CheckoutAdress = lazy(() => import("./Pages/CheckoutAddress"));
const CheckoutPayment = lazy(() => import("./Pages/CheckoutPayment"));
const Footer = lazy(() => import("./Components/Footer"));

const App = () => {
  const [{ basket }] = useStateValue();
  const dispatch = useDispatch();
  const [fetchedData, setFetchedData] = useState({});
  const [secureData, setSecureData] = useState({});
  const [user, setUser] = useState({});
  const [userLocDetails, setUserLocDetails] = useState();
  const [localBasketAfterRefrsh, setLocalBasketAfterRefrsh] = useState();

  useEffect(() => {
    if (basket?.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  useEffect(() => {
    if (basket?.length < 1) {
      setLocalBasketAfterRefrsh(JSON.parse(localStorage.getItem("basket")));
    }
  }, [basket]);

  const promise = loadStripe(
    "pk_test_51I8N1gJHgoNdpJN9NedWNqHGlHGZRCcKRyvxG9eB4tmOmwU6KXjJFeKbxqUbpSbi1vmR5tKNqp4tUIcybLHbsdT600cmjwGy5m"
  );

  useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
      if (userObj) {
        setUser(userObj);
        dispatch(
          SET_USER({
            uid: userObj.uid,
            email: userObj.email,
            displayName: userObj.displayName,
            emailVerified: userObj.emailVerified,
          })
        );
        localStorage.setItem("userID", userObj.uid);
      } else {
        dispatch(SET_USER(null));
      }
    });
  }, [dispatch]);

  // Fetche Location Details of visiting user

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("visitingUserLoc"))) {
      setUserLocDetails(JSON.parse(localStorage.getItem("visitingUserLoc")));
    } else {
      const getUserGeoLocationDetails = () => {
        fetch(
          "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0"
        )
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("visitingUserLoc", JSON.stringify(data));
            setUserLocDetails(data);
          });
      };
      getUserGeoLocationDetails();
    }
  }, []);

  // Fetch and Prepare data from Data base

  useEffect(() => {
    const fetchDataFromDB = () => {
      const docRef = db.collection("users").doc(user?.uid);

      docRef.get().then((doc) => {
        setFetchedData(doc.data());
        dispatch(SET_FETCHED_DETAILS(doc.data()));
      });
    };

    fetchDataFromDB();
  }, [user, dispatch]);

  useEffect(() => {
    setSecureData({
      displayName: fetchedData?.displayName,
      userID: fetchedData?.userID,
      email: fetchedData?.email,
    });
  }, [fetchedData]);

  useEffect(() => {
    localStorage.setItem("fetchedData", JSON.stringify(secureData));
  }, [secureData]);

  return (
    <Router>
      <div className="app relative">
        <Switch>
          <Route exact path="/">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary displayName={fetchedData?.displayName} />
            <Homepage />
          </Route>
          <Route path="/cart">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary displayName={fetchedData?.displayName} />
            <ShopingCart />
          </Route>
          <Route path="/auth/register">
            <Suspense fallback={<PageLoadingSpinner show={true} />}>
              <Signup />
            </Suspense>
          </Route>
          <Route path="/auth/signin">
            <Suspense fallback={<PageLoadingSpinner show={true} />}>
              <Login />
            </Suspense>
          </Route>
          <Route path="/checkout/payment-and-order-placement">
            <Elements stripe={promise}>
              <Header
                countryName={userLocDetails?.country_name}
                displayName={fetchedData?.displayName}
                basketItems={localBasketAfterRefrsh?.length}
              />
              <Suspense fallback={<PageLoadingSpinner show={true} />}>
                <CheckoutPayment />
              </Suspense>
            </Elements>
          </Route>
          <Route path="/checkout/add-your-shipping-address">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <Suspense fallback={<PageLoadingSpinner show={true} />}>
              <CheckoutAdress />
            </Suspense>
          </Route>
          <Route path="/order-placed-notification">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <Suspense
              fallback={<PageLoadingSpinner show={true} color="#fff" />}
            >
              <OrderPlacedSuccssfully />
            </Suspense>
          </Route>
          <Route path="/account/my-orders">
            <Header
              countryName={userLocDetails?.country_name}
              displayName={fetchedData?.displayName}
              basketItems={localBasketAfterRefrsh?.length}
            />
            <HeaderSecondary displayName={fetchedData?.displayName} />
            <Suspense
              fallback={<PageLoadingSpinner show={true} color="#fff" />}
            >
              <MyOrders />
            </Suspense>
          </Route>
        </Switch>
        <CssBaseline />
      </div>
    </Router>
  );
};

export default App;
