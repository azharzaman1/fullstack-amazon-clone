import React from "react";
import { Grid } from "@material-ui/core";
import "./Products.css";

const ProductsRow = ({ children, className }) => {
  return (
    <div id="just-to-compensate-spacing-limitation" style={{ padding: "8px" }}>
      <Grid
        container
        className={`products__row ${className}`}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        {children}
      </Grid>
    </div>
  );
};

export default ProductsRow;
