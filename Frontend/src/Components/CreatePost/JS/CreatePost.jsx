import React from "react";
import classes from "../CSS/CreatePost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/JS/Button";

const CreatePost = (props) => {
  return (
    <div className={classes.CreatePost}>
      <div className={classes.Card_Info}>
        <div className={classes.Card_Profile}>
          <img src={props.img} alt="Profile" />
        </div>
      </div>
      <div className={classes.CreatePost_Attachments}>
        <div className={classes.Attachment_TextArea}>
          <span role="textbox" contentEditable>
            {/* <textarea type="text" placeholder="What's happening?" /> */}
          </span>
        </div>
        <div className={classes.CreatePost_LastContainer}>
          <div className={classes.CreatePost_Icons}>
            <FontAwesomeIcon
              className={classes.CreatePost_Icons}
              icon={faImage}
            />
          </div>
          <Button>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
