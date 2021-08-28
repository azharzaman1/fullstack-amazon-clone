import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AmazonLogo from "../files/logo.png";
import EnglishFlag from "../files/english.png";
import Dropdown from "./Dropdown";
import useStateValue from "../../Files/StateProvider";
import {
  KeyboardArrowDown,
  ShoppingBasket,
  PersonPinCircle,
} from "@material-ui/icons";
import {
  AppBar,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../Files/firebase";
import { selectUser } from "../../redux/slices/userSlice";
import "./Header.css";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.default,
    padding: " .5rem 1rem",
  },
}));

const Header = ({ displayName, countryName, basketItems }) => {
  const currentUser = useSelector(selectUser);
  const [{ basket }] = useStateValue();

  const [localBasket, setLocalBasket] = useState(
    JSON.parse(localStorage.getItem("basket"))
  );
  const [show, setShow] = useState(false);
  const [showLoginDropDown, setShowLoginDropDown] = useState(false);

  useEffect(() => {
    setLocalBasket(JSON.parse(localStorage.getItem("basket")));
  }, [basket]);

  const c = useStyles();

  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:960px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar position="static" className={c.appbar}>
      <Grid container className="header" alignItems="center" spacing={3}>
        <Grid item className="header__LogoLocation">
          <Grid container>
            <Link to="/" className="header__logo">
              <img src={AmazonLogo} alt="Amazon" width={isDesktop ? 95 : 75} />
            </Link>
            <Grid item>
              {countryName !== "" && (
                <Grid item className="header__delivery flexRow">
                  <PersonPinCircle className="locationIcon" />
                  <div className="flexColumn center pointer">
                    <span className="headerNav__optionLineOne">Deliver to</span>
                    <span className="headerNav__optionLineTwo boldText">
                      {countryName}
                    </span>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs item id="header__search">
          <Grid
            className="header__search"
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item className="headerSearchSide__sections cats pointer">
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{ height: "100%" }}
              >
                <span>All</span>
              </Grid>
            </Grid>
            <Grid item xs>
              <input
                className="headerSearchBar"
                onFocus={() => {
                  document
                    .getElementById("header__search")
                    .classList.add("header__searchBarActive");
                }}
                onChange={() => {
                  document
                    .getElementById("header__search")
                    .classList.remove("header__searchBarActive");
                }}
                type="text"
              />
            </Grid>
            <Grid item className="headerSearchSide__sections search pointer">
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{ height: "100%" }}
              >
                <SearchIcon fontSize="small" />
              </Grid>
            </Grid>
          </Grid>

          {show && <Dropdown />}
        </Grid>
        <Grid item className="header__nav">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={isMobile ? 1 : 2}
          >
            <Grid item className="headerNav__languages pointer">
              <img src={EnglishFlag} alt="EN" />
              <KeyboardArrowDown />
            </Grid>
            {!isMobile && (
              <>
                <Grid
                  item
                  onClick={() => {
                    setShowLoginDropDown(!showLoginDropDown);
                  }}
                  className="headerNav__option headerNav__loginOption borderOnHover flexColumn"
                >
                  {!currentUser ? (
                    <span className="headerNav__optionLineOne extra--margin--top signIn pointer">
                      Hello Guest, Sign In
                    </span>
                  ) : (
                    <span className="headerNav__optionLineOne signIn pointer extra--margin--top">
                      Hi, {displayName}
                    </span>
                  )}
                  <div>
                    <span className="headerNav__optionLineTwo pointer boldText">
                      Accounts & Lists{" "}
                      <KeyboardArrowDown className="signInArrow" />
                    </span>
                  </div>
                </Grid>
                {showLoginDropDown && (
                  <LoginDropDown closeLoginDropDown={setShowLoginDropDown} />
                )}
              </>
            )}

            {isDesktop && (
              <Grid
                item
                className="headerNav__option borderOnHover flexColumn pointer"
              >
                <Link to="/account/my-orders">
                  <span className="headerNav__optionLineOne">Returns</span>
                </Link>
                <Link to="/account/my-orders">
                  <span className="headerNav__optionLineTwo  boldText">
                    & Orders
                  </span>
                </Link>
              </Grid>
            )}
            <Grid item className="headerNav__basket">
              <Link to="/cart" className=" pointer">
                <ShoppingBasket className="basketIcon" />
                <span className="headerNav__optionLineTwo  boldText basketCount">
                  {basket.length > 0 ? basket.length : basketItems}
                </span>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export const LoginDropDown = ({ closeLoginDropDown }) => {
  const currentUser = useSelector(selectUser);

  const signoutHandler = () => {
    auth.signOut();
    closeDropDown();
  };

  const closeDropDown = () => {
    closeLoginDropDown(false);
  };

  return (
    <div className="loginDropDown flexColumn">
      {currentUser ? (
        <div className="loginDropDown__top flexColumn">
          <a>
            <button onClick={signoutHandler}>Sign out</button>
          </a>
        </div>
      ) : (
        <div className="loginDropDown__top flexColumn">
          <Link to="/auth/signin">
            <button>Sign in</button>
          </Link>
          <div className="flexRow">
            <p className="newCustomer__text">New customer?</p>
            <Link
              onClick={closeDropDown}
              to="/auth/register"
              className="redirectLink"
            >
              Start here
            </Link>
          </div>
        </div>
      )}

      <div className="loginDropDown__bottom flexRow">
        <div className="loginDropDown__bottomLeft flexColumn">
          <h3>Your lists</h3>

          <a href="#">Create a list</a>
          <a href="#">Find a list or registry</a>
          <a href="#">Amazon Smile Charity Lists</a>
        </div>

        <div className="loginDropDown__bottomRight flexColumn">
          <h3>Your account</h3>
          <a href="#">Account</a>
          <Link onClick={closeDropDown} to="/account/my-orders">
            Orders
          </Link>
          <a href="#">Recommendations</a>
          <a href="#">Browsing history</a>
          <a href="#">Watch list</a>
          <a href="#">Purchasing history</a>
          <a href="#">Kindle unlimited</a>
        </div>
      </div>
    </div>
  );
};
export default Header;
