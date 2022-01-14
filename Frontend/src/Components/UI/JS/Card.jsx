import React from "react";
import { useHistory } from "react-router-dom";
import classes from "../CSS/Card.module.css";

import LikesContainer from "./LikesContainer";

const Card = (props) => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  let image;
  if (props.image !== undefined) {
    image = props.image.replace("public", "");
  }
  const openSingleCardHandler = () => {
    history.push(`/Post/viewPost/${props.id}`);
  };

  return (
    <div className={classes.Card}>
      <div className={classes.Card_Info} onClick={openSingleCardHandler}>
        <div className={classes.Card_Profile}>
          <img src={`http://localhost${props.profilePic}`} alt="Profile" />
        </div>
        <p>{props.username}</p>
      </div>
      <div className={classes.Card_PostImg} onClick={openSingleCardHandler}>
        <img src={`http://localhost${image}`} alt="post" />
      </div>
      <LikesContainer
        isLiked={props.isLiked}
        likes={props.likes}
        postId={props.id}
        className={classes.likesContainerClass}
      />
      <div className={classes.Card_Text} onClick={openSingleCardHandler}>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Card;
