import React, { useState } from "react";
import classes from "../CSS/LikesContainer.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as BorderHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LikesContainer = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className={`${classes.LiksContainer} ${props.className}`}>
      <FontAwesomeIcon
        onClick={() => {
          setIsClicked((prev) => !prev);
        }}
        className={`${isClicked ? classes.likedIcon : classes.Unlikded}`}
        icon={isClicked ? faHeart : BorderHeart}
      />
      <p>2</p>
    </div>
  );
};

export default LikesContainer;
