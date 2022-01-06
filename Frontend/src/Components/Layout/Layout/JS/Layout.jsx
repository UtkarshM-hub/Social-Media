import React from "react";
import NavBar from "../../NavBar/JS/NavBar";
import classes from "../CSS/Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <NavBar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
