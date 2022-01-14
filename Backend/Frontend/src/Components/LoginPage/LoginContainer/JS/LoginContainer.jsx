import React from "react";
import DesignContainer from "../../DesignContainer/JS/DesignContainer";
import LoginFormContainer from "../../LoginFormContainer/JS/LoginFormContainer";
import classes from "../CSS/LoginContainer.module.css";

const LoginContainer = () => {
  return (
    <div className={classes.LoginContainer}>
      <DesignContainer />
      <LoginFormContainer />
    </div>
  );
};

export default LoginContainer;
