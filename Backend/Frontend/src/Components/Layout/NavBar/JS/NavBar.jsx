import React, { useState } from "react";
import Logo from "../../../../sources/Logo.png";
import classes from "../CSS/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDropDown from "../../../ProfileDropDown/JS/ProfileDropDown";

const NavBar = () => {
  const [DropDownState, setDropDownState] = useState(false);
  return (
    <nav>
      <div className={classes.Nav_Main}>
        <div className={classes.Nav_Image}>
          <img src={Logo} alt="Logo" />
        </div>
        <ul className={classes.Nav_Navigation}>
          <NavLink
            exact
            to="/"
            className={classes.Nav_Link}
            activeClassName={classes.active}
          >
            <FontAwesomeIcon className={classes.Nav_Icon} icon={faHome} />
          </NavLink>
          <NavLink
            to="/myposts"
            className={classes.Nav_Link}
            activeClassName={classes.active}
          >
            <FontAwesomeIcon className={classes.Nav_Icon} icon={faHashtag} />
          </NavLink>
          <div
            className={classes.Nav_Link}
            onClick={() => {
              setDropDownState((prev) => !prev);
            }}
          >
            <FontAwesomeIcon
              title="Profile"
              className={classes.Nav_Icon}
              icon={faUserCircle}
            />
          </div>
          {DropDownState && <ProfileDropDown setDDState={setDropDownState} />}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
