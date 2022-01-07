import React from "react";
import { useHistory } from "react-router-dom";
import classes from "../CSS/Card.module.css";

const Card = (props) => {
  const history = useHistory();
  let image;
  if (props.image !== undefined) {
    image = props.image.replace("public", "");
  }
  return (
    <div
      className={classes.Card}
      onClick={() => {
        history.push(`/post/viewPost/postId:${props.id}`);
      }}
    >
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
