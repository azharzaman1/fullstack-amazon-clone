import React, { Suspense } from "react";
import HeroSection from "../Components/HeroSection";
import CategoriesRow1 from "../Components/Categories/CategoriesRow1";
import Product from "../Components/Products/Product";
import DoneIcon from "@material-ui/icons/Done";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import useStateValue from "../Files/StateProvider";
import CurrencyFormat from "react-currency-format";
import { basketTotal } from "../Files/reducer";
import {
  selectUser,
  SET_REDIRECT_TO_CHECKOUT,
} from "../redux/slices/userSlice";
import { makeStyles, useTheme, useMediaQuery, Grid } from "@material-ui/core";
import Category from "../Components/Categories/Category";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket } from "../redux/slices/basketSlice";
import {
  HomeapageCatsRow2,
  HomeapageCatsRow3,
  HomeapageCatsRow4,
} from "../Files/ProductCatsData";
import ProductsRow from "../Components/Products/ProductsRow";
import {
  HomeapageProductsRow1,
  HomeapageProductsRow2,
} from "../Files/ProductsData";
import { Heading, PageLoadingSpinner } from "../Components/Components";
import "./Homepage.css";
import "../Components/Products/CartLiveStatusBar.css";
import {
  HomepageFeaturesSlider1Items,
  HomepageProductsSlider1Items,
} from "../Files/ProductsSlidersData";
import { MainContainer } from "../Files/Mui/Styled/MuiStyled";
import Footer from "../Components/Footer";
import CopyrightFooter from "../Components/CopyrightFooter/CopyrightFooter";

const CategoriesRow = React.lazy(() =>
  import("../Components/Categories/CategoriesRow")
);

const Slider = React.lazy(() => import("../Components/Products/Slider"));

const Homepage = () => {
  const [{ basket }] = useStateValue();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isBelow500px = useMediaQuery("(max-width:500px)");

  return (
    <div className="home">
      <HeroSection />
      <div className="homepageContainer">
        <MainContainer maxWidth={false}>
          <CategoriesRow1 />

          <Suspense fallback={<PageLoadingSpinner show={true} />}>
            <CategoriesRow className={`categories__row2`}>
              {HomeapageCatsRow2?.map((cat) => (
                <Category
                  key={cat.id}
                  categotyTitle={cat.title}
                  imgUrl={cat.banner}
                  linkText={cat.linkText ? cat.linkText : "Shop Now"}
                />
              ))}
            </CategoriesRow>
          </Suspense>

          <Heading className="sectionHeading">Some trending from tech</Heading>

          {basket.length > 0 && (
            <div className="livebasketbar__container">
              <BasketLiveStatusBar />
            </div>
          )}

          <ProductsRow className="products__row1">
            {HomeapageProductsRow1?.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                imgUrl={product.imgUrl}
                rating={product.rating}
              />
            ))}
          </ProductsRow>

          <ProductsRow className="products__row2">
            {HomeapageProductsRow2?.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                imgUrl={product.imgUrl}
                rating={product.rating}
              />
            ))}
          </ProductsRow>
          <Suspense fallback={<PageLoadingSpinner show={true} />}>
            <Slider
              sliderSpecificClass="topSellers__productsSlider"
              sliderContentSpecificClass="sliderTopSeller__content"
              title="Amazon Top Sellers"
              linkText="Shop now"
              sliderUniqueId="1"
            >
              {HomepageProductsSlider1Items?.map((item) => (
                <ProductsSliderProduct key={item.imgUrl} imgUrl={item.imgUrl} />
              ))}
            </Slider>
          </Suspense>
          <Suspense fallback={<PageLoadingSpinner show={true} />}>
            <Slider
              title="Discover Amazon"
              linkText="Click to learn more"
              sliderUniqueId="2"
            >
              {HomepageFeaturesSlider1Items?.map((item) => (
                <ProductsSliderProduct key={item.imgUrl} imgUrl={item.imgUrl} />
              ))}
            </Slider>
          </Suspense>

          <Suspense fallback={<PageLoadingSpinner show={true} />}>
            <CategoriesRow className={`categories__row3`}>
              {HomeapageCatsRow3?.map((cat) => (
                <Category
                  key={cat.id}
                  categotyTitle={cat.title}
                  imgUrl={cat.banner}
                  linkText={cat.linkText ? cat.linkText : "Shop Now"}
                />
              ))}
            </CategoriesRow>
          </Suspense>
          <Suspense fallback={<PageLoadingSpinner show={true} />}>
            <CategoriesRow className={`categories__row4 `}>
              {HomeapageCatsRow4?.map((cat) => (
                <Category
                  key={cat.id}
                  categotyTitle={cat.title}
                  imgUrl={cat.banner}
                  linkText={cat.linkText ? cat.linkText : "Shop Now"}
                />
              ))}
            </CategoriesRow>
          </Suspense>
        </MainContainer>
        <Suspense fallback={<span>.</span>}>
          <Footer />
        </Suspense>
        <CopyrightFooter />
      </div>
    </div>
  );
};

const BasketLiveStatusBar = () => {
  const basket = useSelector(selectBasket);
  const currentUser = useSelector(selectUser);
  const dispatchRedux = useDispatch();

  const setUserPendingState = () => {
    if (!currentUser) {
      dispatchRedux(SET_REDIRECT_TO_CHECKOUT(true));
    }
  };

  const isDesktop = useMediaQuery("(min-width:960px)");

  return (
    <Grid container alignItems="center" className="basketLive__statusBar">
      {isDesktop && (
        <Grid item className="basketLive__left">
          <DoneIcon />
          <h3>{basket.length} Product(s) in Cart</h3>
        </Grid>
      )}

      <Grid
        xs
        item
        className={`basketLive__right ${
          !isDesktop && "basketLive__right__belowDesktop"
        }`}
      >
        <Grid
          container
          direction={isDesktop ? "row" : "column"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid item className="basket__subtotal flexRow">
              <h3>
                Cart subtotal <span>({basket.length} items):</span>{" "}
              </h3>
              <CurrencyFormat
                decimalScale={2}
                value={basketTotal(basket)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"$"}
                renderText={(value) => <strong>{value}</strong>}
              />
            </Grid>

            <Grid item className="gift__check flexRow">
              <input type="checkbox" className="checkbox" />
              <div className="flexRow">
                <CardGiftcardIcon /> <h5> This order contains a gift</h5>
              </div>
            </Grid>
          </Grid>
          <Grid
            item
            className={`basketLive__rightActions ${
              !isDesktop && "basketLive__rightActions__belowDesktop"
            }`}
          >
            <Link to="cart">
              <button className="cart__btn">Cart</button>
            </Link>
            <Link
              onClick={setUserPendingState}
              to={
                currentUser
                  ? "/checkout/add-your-shipping-address"
                  : "/auth/signin"
              }
            >
              <button className="checkout__btn">
                Proceed to Checkout({basket.length} items)
              </button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const ProductsSliderProduct = ({ imgUrl }) => {
  return (
    <a href="#">
      <img src={imgUrl} />
    </a>
  );
};

export default Homepage;
