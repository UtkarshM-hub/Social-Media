import React from "react";
import classes from "../CSS/Confirm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const Confirm = (props) => {
  return (
    <div className={classes.Confirm}>
      <div className={classes.Confirm_Modal}>
        <div className={classes.Confirm_Title}>
          <FontAwesomeIcon icon={faQuestion} />
          <p>Confirm Deletion</p>
        </div>
        <div className={classes.Confirm_Body}>
          <p>Do you really want to delete your account?</p>
        </div>
        <div className={classes.Confirm_Btn}>
          <button
            onClick={() => {
              props.handler(false);
            }}
            className={`${classes.Confirm_BtnElement} ${classes.Confirm_No}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.handler(true);
            }}
            className={`${classes.Confirm_BtnElement} ${classes.Confirm_Yes}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
