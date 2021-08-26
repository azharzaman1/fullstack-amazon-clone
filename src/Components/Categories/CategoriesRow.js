import React from "react";
import { Grid } from "@material-ui/core";
import "./Categories.css";

const CategoriesRow = ({ children, className }) => {
  return (
    <div id="just-to-compensate-spacing-limitation" style={{ padding: "8px" }}>
      <Grid
        container
        className={`categories__row ${className}`}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        {children}
      </Grid>
    </div>
  );
};

export default CategoriesRow;
