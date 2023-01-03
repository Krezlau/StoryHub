import React, { MouseEventHandler, ReactNode } from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
}> = (props) => {
  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
