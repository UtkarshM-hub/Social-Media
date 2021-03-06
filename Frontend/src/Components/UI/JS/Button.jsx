import React, { Fragment } from "react";
import classes from "../CSS/Button.module.css";

const Button = (props) => {
  return (
    <Fragment>
      <button
        className={`${classes.Button} ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </Fragment>
  );
};

export default Button;
