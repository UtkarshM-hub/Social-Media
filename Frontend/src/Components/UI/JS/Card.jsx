import React from "react";

import classes from "../CSS/Card.module.css";

const Card = (props) => {
  console.log(props);
  let image;
  if (props.image !== undefined) {
    image = props.image.replace("public", "");
  }
  return (
    <div className={classes.Card}>
      <div className={classes.Card_Info}>
        <div className={classes.Card_Profile}>
          <img src={`http://localhost${image}`} alt="Profile" />
        </div>
        <p>utkarshmandape</p>
      </div>
      <div className={classes.Card_PostImg}>
        <img src={`http://localhost${image}`} alt="post" />
      </div>
      <div className={classes.Card_Text}>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Card;
