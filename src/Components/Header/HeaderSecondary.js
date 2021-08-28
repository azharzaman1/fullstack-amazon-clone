import { useMediaQuery, useTheme } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import "./HeaderSecondary.css";
import "./Header.css";
import { LoginDropDown } from "./Header";

const HeaderSecondary = ({ displayName }) => {
  const theme = useTheme();
  const [showLoginDropDown, setShowLoginDropDown] = useState(false);
  const currentUser = useSelector(selectUser);
  const isDesktop = useMediaQuery("(min-width:960px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = tablet && !isMobile;
  return (
    <div className="headerSecondary flexRow between" id="scrollToTop__dest">
      <div className="headerSecondary__left">
        <a href="#">Today's Deals</a>
        <a href="#">Customers Service</a>

        {isDesktop || isTablet ? (
          <>
            <a href="#">Sell</a>
            <a href="#">Gift Cards</a>
          </>
        ) : (
          <></>
        )}
        {isDesktop && <a href="#">Registry</a>}
      </div>
      {isMobile && (
        <div
          className="headerSecondary__right"
          onClick={() => {
            setShowLoginDropDown(!showLoginDropDown);
          }}
        >
          {!currentUser ? (
            <span
              style={{ fontSize: "12px" }}
              className="headerNav__optionLineOne flexRow align-center pointer"
            >
              Hello Guest, Sign In{" "}
              <KeyboardArrowDown fontSize="small" className="signInArrow" />
            </span>
          ) : (
            <span
              style={{ fontSize: "12px" }}
              className="headerNav__optionLineOne flexRow align-center pointer"
            >
              Hi, {displayName}{" "}
              <KeyboardArrowDown fontSize="small" className="signInArrow" />
            </span>
          )}
          {showLoginDropDown && (
            <LoginDropDown closeLoginDropDown={setShowLoginDropDown} />
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSecondary;
