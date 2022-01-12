import React, { useState } from "react";
import classes from "../CSS/CreatePost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/JS/Button";
import axios from "axios";

const CreatePost = (props) => {
  const token = localStorage.getItem("Token");
  const [image, setImage] = useState(undefined);
  const [spanEle, setSpanEle] = useState(null);
  const [text, setText] = useState(null);

  const OpenFilePicker = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style = { display: "none" };
    input.click();
    input.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length >= 0) {
        setImage(e.target.files[0]);
      }
      return;
    });
  };

  console.log(image);
  const CreatePostHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("Text", text);
    form.append("image", image);
    await axios
      .post("http://localhost/post/createPost", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        spanEle.innerText = "";
        setImage(null);
        return props.message({
          type: "success",
          message: "Post Created Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        props.message({ type: "error", message: "Please choose an image" });
      });
  };

  return (
    <div className={classes.CreatePost}>
      <div className={classes.Card_Info}>
        <div className={classes.Card_Profile}>
          <img src={`http://localhost${props.profilePic}`} alt="Profile" />
        </div>
      </div>
      <div className={classes.CreatePost_Attachments}>
        <div className={classes.Attachment_TextArea}>
          {/* <textarea placeholder="What's happening?"></textarea> */}
          <p>
            <span
              onBlur={(e) => {
                setSpanEle(e.target);
                setText(e.target.innerText);
              }}
              className={classes.textarea}
              role="textbox"
              contentEditable
            ></span>
          </p>
          {image != undefined && (
            <div className={classes.image_Container}>
              <img
                className={classes.upload_IMG}
                src={URL.createObjectURL(image)}
              />
              <FontAwesomeIcon
                onClick={(e) => {
                  setImage(undefined);
                }}
                className={classes.CancelBtn}
                icon={faTimesCircle}
              />
            </div>
          )}
        </div>
        <div className={classes.CreatePost_LastContainer}>
          <div className={classes.CreatePost_Icons}>
            <FontAwesomeIcon
              className={classes.CancelBtn}
              icon={faImage}
              onClick={OpenFilePicker}
            />
          </div>
          <Button onClick={CreatePostHandler}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
