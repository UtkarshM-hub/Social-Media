import React from "react";

import classes from "../CSS/Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Card_Info}>
        <div className={classes.Card_Profile}>
          <img src={props.img} alt="Profile" />
        </div>
        <p>utkarshmandape</p>
      </div>
      <div className={classes.Card_PostImg}>
        <img src={props.img} alt="post" />
      </div>
    </div>
  );
};

export default Card;
