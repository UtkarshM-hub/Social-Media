import React, { Fragment, useEffect, useState } from "react";
import classes from "../CSS/SinglePostCard.module.css";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import LikesContainer from "./LikesContainer";
import Message from "./Message";

const SinglePostCard = (props) => {
  const token = localStorage.getItem("Token");
  const userID = localStorage.getItem("userId");
  const params = useParams();
  const history = useHistory();
  const { postId } = params;
  const [postData, setPostData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [createMessage, setCreateMessage] = useState({
    type: undefined,
    message: undefined,
  });
  let newImage;

  const setMessageHandler = async (type, message) => {
    console.log("creating message");
    setCreateMessage({
      type: type,
      message: message,
    });
    const timer = setTimeout(async () => {
      setCreateMessage({ type: undefined, message: undefined });
      clearTimeout(timer);
    }, 2000);
  };

  useEffect(() => {
    const getPostData = async () => {
      await axios
        .post("/post/getSinglePost", JSON.stringify({ postId: postId }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === null) {
            history.push("/");
          }
          newImage = res.data.post.image.toString().replace("public", "");
          setPostData({
            image: newImage,
            text: res.data.post.text,
            id: res.data.post._id.toString(),
            profilePic: res.data.post.creator.profilePic,
            userName: res.data.post.creator.userName,
            creatorId: res.data.post.creator._id,
            likes: res.data.post.likes,
            isLiked: res.data.post.likedBy.some((item) => item === userID),
          });
          console.log(res);
        })
        .catch((err) => console.log(err));
    };
    getPostData();
  }, []);

  const DeletePostHandler = async () => {
    await axios
      .post(
        "/post/DeletePost",
        JSON.stringify({ postId: postId, image: postData.image }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        setMessageHandler("success", "Post Deleted Successfully");
        const timer = setTimeout(async () => {
          history.push("/");
          clearTimeout(timer);
        }, 2000);
      })
      .catch((err) => {
        setMessageHandler("error", "Error Deleting the Post");
        const timer = setTimeout(async () => {
          clearTimeout(timer);
        }, 2000);
        console.log(err);
      });
  };
  console.log(postData);
  return (
    <Fragment>
      <Message message={createMessage.message} type={createMessage.type} />
      <div className={classes.singlePostCard} style={{ margin: "1em 8rem" }}>
        <div className={classes.Card_ImageContainer}>
          <img src={`${postData.image}`} alt="pic" />
        </div>
        <div className={classes.Card_TextContainer}>
          <div className={classes.Card_Info}>
            <div className={classes.Card_InfoContainer}>
              <div className={classes.Card_Profile}>
                <img src={`${postData.profilePic}`} alt="Profile" />
              </div>
              <p>{postData.userName}</p>
            </div>
            {postData.creatorId === userID && (
              <FontAwesomeIcon
                onClick={(e) => {
                  setIsOpen((previous) => !previous);
                }}
                className={classes.dotMenu}
                icon={faEllipsisV}
              />
            )}
          </div>
          {isOpen && (
            <div className={classes.DropDown}>
              <ul>
                <li
                  onClick={() => {
                    history.push(`/post/editPost/${postId}`);
                  }}
                  className={`${classes.DropDown_ListItems} ${classes.DropDown_Simple}`}
                >
                  Edit
                  <FontAwesomeIcon
                    className={`${classes.menu_Icon}`}
                    icon={faEdit}
                  />
                </li>
                <li
                  onClick={DeletePostHandler}
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
          <LikesContainer
            isLiked={postData.isLiked}
            likes={postData.likes}
            postId={postId}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SinglePostCard;
