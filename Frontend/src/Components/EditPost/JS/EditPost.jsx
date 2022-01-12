import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../UI/JS/Button";
import Message from "../../UI/JS/Message";
import classes from "../CSS/EditPost.module.css";

const EditPost = () => {
  const token = localStorage.getItem("Token");
  const [formInfo, setFormInfo] = useState({
    message: undefined,
    image: undefined,
    url: undefined,
    imageIsChanged: false,
  });
  const [createMessage, setCreateMessage] = useState({
    type: undefined,
    message: undefined,
  });
  const param = useParams();
  const history = useHistory();
  const textRef = useRef("");
  const { editPostId } = param;

  useEffect(() => {
    const getPostInfo = async () => {
      await axios
        .post(
          "http://localhost/post/getSinglePost",
          JSON.stringify({ postId: editPostId }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setFormInfo({
            message: res.data.post.text,
            image: res.data.post.image.replace("public", ""),
            url: res.data.post.image,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPostInfo();
  }, []);

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

  const EditPostHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editPostId);
    formData.append("text", formInfo.message);
    formData.append("url", formInfo.url);
    formData.append("image", formInfo.image);

    await axios
      .post("http://localhost/post/editPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        console.log(res);
        setMessageHandler("success", "Post Edited Successfully");
        const timer = setTimeout(async () => {
          history.push(`/post/viewPost/${editPostId}`);
          clearTimeout(timer);
        }, 2000);
      })
      .catch((err) => {
        setMessageHandler("error", "Error Editing the Post");
        const timer = setTimeout(async () => {
          clearTimeout(timer);
        }, 2000);
        console.log(err);
      });
  };

  let imageURL;
  if (formInfo.imageIsChanged) {
    imageURL = URL.createObjectURL(formInfo.image);
  }

  return (
    <Fragment>
      <Message message={createMessage.message} type={createMessage.type} />
      <div className={classes.Container}>
        <h2>Edit Post</h2>
        <form className={classes.Form_Container}>
          <textarea
            className={classes.formElements}
            type="text"
            ref={textRef}
            onChange={(e) =>
              setFormInfo({
                message: e.target.value,
                image: formInfo.image,
                imageIsChanged: formInfo.imageIsChanged,
                url: formInfo.url,
              })
            }
            value={formInfo.message}
            placeholder="Post Message"
          />
          <input
            className={classes.formElements}
            onChange={(e) =>
              setFormInfo({
                image: e.target.files[0],
                imageIsChanged: true,
                message: formInfo.message,
                url: formInfo.url,
              })
            }
            type="file"
            placeholder="Select an image"
          />
          <img
            src={
              formInfo.imageIsChanged
                ? imageURL
                : `http://localhost${formInfo.image}`
            }
            alt="Selected"
          />
          <Button onClick={EditPostHandler} className={classes.formElements}>
            Submit
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditPost;
