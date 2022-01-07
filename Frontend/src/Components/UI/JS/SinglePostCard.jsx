import React, { useEffect, useState } from "react";
import classes from "../CSS/SinglePostCard.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as BorderHeart } from "@fortawesome/free-regular-svg-icons";
import LikesContainer from "./LikesContainer";

const SinglePostCard = () => {
  const params = useParams();
  const { postId } = params;
  const [postData, setPostData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let newImage;

  useEffect(() => {
    const getPostData = async () => {
      await axios
        .post(
          "http://localhost/post/getSinglePost",
          JSON.stringify({ postId: postId }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          newImage = res.data.post.image.toString().replace("public", "");
          setPostData({
            image: newImage,
            text: res.data.post.text,
            id: res.data.post._id,
          });
        })
        .catch((err) => console.log(err));
    };
    getPostData();
  }, []);
  return (
    <div className={classes.singlePostCard}>
      <div className={classes.Card_ImageContainer}>
        <img src={`http://localhost${postData.image}`} alt="pic" />
      </div>
      <div className={classes.Card_TextContainer}>
        <div className={classes.Card_Info}>
          <div className={classes.Card_InfoContainer}>
            <div className={classes.Card_Profile}>
              <img
                src={`http://localhost/Posts/IMG-20200512-WA0005.jpg`}
                alt="Profile"
              />
            </div>
            <p>utkarshmandape</p>
          </div>
          {/* <div></div> */}
          <FontAwesomeIcon
            onClick={(e) => {
              setIsOpen((previous) => !previous);
            }}
            className={classes.dotMenu}
            icon={faEllipsisV}
          />
        </div>
        {isOpen && (
          <div className={classes.DropDown}>
            <ul>
              <li
                className={`${classes.DropDown_ListItems} ${classes.DropDown_Simple}`}
              >
                Edit
                <FontAwesomeIcon
                  className={`${classes.menu_Icon}`}
                  icon={faEdit}
                />
              </li>
              <li
                className={`${classes.DropDown_ListItems}  ${classes.Delete_Option}`}
              >
                Delete
                <FontAwesomeIcon
                  className={`${classes.menu_Icon} ${classes.menu_DeleteIcon}`}
                  icon={faTrashAlt}
                />
              </li>
            </ul>
          </div>
        )}
        <p id={classes["Card_description"]}>{postData.text}</p>
        <LikesContainer />
      </div>
    </div>
  );
};

export default SinglePostCard;
