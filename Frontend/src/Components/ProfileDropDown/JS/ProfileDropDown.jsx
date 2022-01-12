import React from "react";
import classes from "../CSS/ProfileDropDown.module.css";
import example from "../../../sources/Example.jpg";
import { Link, useHistory } from "react-router-dom";
const ProfileDropDown = () => {
  const history = useHistory();
  const LogoutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    history.push("/login");
  };
  return (
    <div className={classes.profileDD}>
      <ul className={classes.optionsContainer}>
        <Link className={classes.option_Elements}>
          <div className={classes.Profile_ImgContainer}>
            <img src={example} alt="profile img" />
          </div>
          <p>Profile</p>
        </Link>
        <button onClick={LogoutHandler} className={classes.logout}>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
