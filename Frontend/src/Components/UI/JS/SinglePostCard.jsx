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

  const DeletePostHandler = async () => {
    await axios
      .post(
        "http://localhost/post/DeletePost",
        JSON.stringify({ postId: postId, image: postData.image }),
        {
          headers: { "Content-Type": "application/json" },
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

  return (
    <Fragment>
      <Message message={createMessage.message} type={createMessage.type} />
      <div className={classes.singlePostCard} style={{ margin: "1em 8rem" }}>
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
          <LikesContainer />
        </div>
      </div>
    </Fragment>
  );
};

export default SinglePostCard;
