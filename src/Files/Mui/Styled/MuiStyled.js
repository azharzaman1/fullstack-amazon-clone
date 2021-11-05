import React from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.up("xs")]: {
      padding: `0 8px`,
    },
    [theme.breakpoints.up("lg")]: {
      padding: `0 24px`,
    },
  },
}));

export const MainContainer = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Container
      className={`main-container ${classes.container} ${className}`}
      {...rest}
    >
      {children}
    </Container>
  );
};
