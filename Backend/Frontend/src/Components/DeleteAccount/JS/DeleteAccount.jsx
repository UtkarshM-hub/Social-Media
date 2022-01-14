import axios from "axios";
import React, { useState } from "react";
import Confirm from "../../Confirm/JS/Confirm";
import classes from "../CSS/DeleteAccount.module.css";
import { useHistory } from "react-router-dom";
const DeleteAccount = () => {
  const [showModel, setShowModel] = useState(false);
  const token = localStorage.getItem("Token");
  const history = useHistory();

  const ModelHandler = async (state) => {
    console.log(state);
    if (state === false) {
      setShowModel(false);
    }
    if (state === true) {
      await axios
        .get("/user/DeleteUser", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem("expiryDate");
            localStorage.removeItem("ProfilePic");
            localStorage.removeItem("userId");
            localStorage.removeItem("Token");
            history.push("/signup");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={classes.DeleteAccount}>
      {showModel && <Confirm handler={ModelHandler} />}
      <button
        onClick={() => {
          setShowModel((prev) => !prev);
        }}
        className={classes.DeleteAccount_Btn}
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
