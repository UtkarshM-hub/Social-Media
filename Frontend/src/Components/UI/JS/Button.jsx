import React, { Fragment } from "react";
import classes from "../CSS/Button.module.css";

const Button = (props) => {
  return (
    <Fragment>
      <button>{props.children}</button>
    </Fragment>
  );
};

export default Button;
