import classes from "./LoadingSpinner.module.css";
import React from "react";

const LoadingSpinner: React.FC = () => {
  return <div className={classes.spinner}></div>;
};

export default LoadingSpinner;
