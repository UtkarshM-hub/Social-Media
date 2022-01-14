import React, { useEffect, useState } from "react";
import classes from "../CSS/LikesContainer.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as BorderHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LikesContainer = (props) => {
  const token = localStorage.getItem("Token");
  const [isClicked, setIsClicked] = useState(false);
  const [likes, setisLikes] = useState(0);
  const { isLiked } = props;
  useEffect(() => {
    setIsClicked(isLiked);
  }, [isLiked]);
  const AddLikeHandler = async () => {
    console.log(isClicked);
    await axios
      .post(
        "http://localhost/post/addLike",
        JSON.stringify({ postId: props.postId, status: !isClicked }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${classes.LiksContainer} ${props.className}`}>
      <FontAwesomeIcon
        onClick={() => {
          setIsClicked((prev) => !prev);
          setisLikes((prev) => {
            if (!isClicked) {
              return likes + 1;
            } else {
              return likes - 1;
            }
          });
          AddLikeHandler();
        }}
        className={`${isClicked ? classes.likedIcon : classes.Unlikded}`}
        icon={isClicked ? faHeart : BorderHeart}
      />
      <p>{props.likes + likes}</p>
    </div>
  );
};

export default LikesContainer;
