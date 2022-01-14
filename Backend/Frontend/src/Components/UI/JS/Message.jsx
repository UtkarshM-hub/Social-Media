import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faInfoCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "../CSS/Message.module.css";

const Message = (props) => {
  const { message, type } = props;
  let bgColor = "";
  if (message !== undefined) {
    if (type === "success") {
      bgColor = "#1c9c3c";
    } else if (type === "info") {
      bgColor = "#003d99";
    } else if (type === "error") {
      bgColor = "#eb3737";
    } else {
      bgColor = "#c19416";
    }
  }
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`${classes.Message} ${
        message !== undefined ? classes.show : classes.hide
      }`}
    >
      {message !== undefined && type === "success" && (
        <FontAwesomeIcon className={classes.successIcon} icon={faCheck} />
      )}
      {message !== undefined && type === "error" && (
        <FontAwesomeIcon className={classes.errorIcon} icon={faExclamation} />
      )}
      {message !== undefined && type === "info" && (
        <FontAwesomeIcon className={classes.infoIcon} icon={faInfoCircle} />
      )}
      {message !== undefined && type === "warning" && (
        <FontAwesomeIcon
          className={classes.warningIcon}
          icon={faExclamationTriangle}
        />
      )}
      <p>{message}</p>
    </div>
  );
};
export default Message;
