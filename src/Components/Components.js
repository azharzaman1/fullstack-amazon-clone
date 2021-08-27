import React from "react";
import "./Components.css";

export const Heading = ({ type, children, className }) => {
  return (
    <div
      className={`heading ${type === 1 || !type ? "heading__type1" : ""} ${
        type === 2 && "heading__type2"
      } ${className}`}
    >
      {children}
    </div>
  );
};
