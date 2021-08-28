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

export const PageLoadingSpinner = ({ show, position, color }) => {
  return (
    <>
      {show && (
        <div
          className={`loader--container ${
            !position || position === "abs-center"
              ? "loader--absolute--center"
              : ""
          }`}
        >
          <div className={`lds-ring`}>
            <div
              style={{
                borderColor: `${
                  color ? color : "#ccc"
                } transparent transparent transparent`,
              }}
            ></div>
            <div
              style={{
                borderColor: `${
                  color ? color : "#ccc"
                } transparent transparent transparent`,
              }}
            ></div>
            <div
              style={{
                borderColor: `${
                  color ? color : "#ccc"
                } transparent transparent transparent`,
              }}
            ></div>
            <div
              style={{
                borderColor: `${
                  color ? color : "#ccc"
                } transparent transparent transparent`,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
