import React, { Fragment, useRef, useState } from "react";
import classes from "../CSS/LoginFormContainer.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../../../UI/JS/Message";
import { useHistory } from "react-router-dom";

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const LoginFormContainer = () => {
  const history = useHistory();

  const emailRef = useRef();
  const [emailBlur, setEmailBlur] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const passwordRef = useRef();
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [createMessage, setCreateMessage] = useState({
    type: undefined,
    message: undefined,
  });
  const emailValidator = (e) => {
    const value = e.target.value;
    let status = emailRegx.test(value);
    if (status) {
      setEmailIsValid(true);
      setEmailBlur(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const passwordValidator = (e) => {
    const value = e.target.value;
    if (value !== "" && value.length >= 7) {
      setPasswordIsValid(true);
      setPasswordBlur(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    await axios
      .post("http://localhost/auth/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        const remainingMiliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMiliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        return setMessageHandler("success", "Successfully Logged In");
      })
      .catch((err) => {
        return setMessageHandler("error", "Error Logging In");
      });
  };

  const setMessageHandler = async (type, message) => {
    console.log("creating message");
    setCreateMessage({
      type: type,
      message: message,
    });
    const timer = setTimeout(async () => {
      setCreateMessage({ type: undefined, message: undefined });
      clearTimeout(timer);
      history.push("/");
    }, 2000);
  };

  return (
    <Fragment>
      <Message message={createMessage.message} type={createMessage.type} />
      <div className={classes.LoginFormContainer}>
        <div className={classes.MainContainer}>
          <h2>LOGIN</h2>
          <form onSubmit={formSubmitHandler}>
            <input
              ref={emailRef}
              onBlur={() => {
                setEmailBlur(true);
              }}
              onChange={emailValidator}
              className={
                !emailBlur
                  ? `${classes.form_Elements}`
                  : emailBlur && !emailIsValid
                  ? `${classes.form_Elements} ${classes.invalid}`
                  : `${classes.form_Elements} ${classes.valid}`
              }
              type="email"
              placeholder="E-mail"
            />
            <input
              ref={passwordRef}
              onBlur={() => {
                setPasswordBlur(true);
              }}
              onChange={passwordValidator}
              className={
                !passwordBlur
                  ? `${classes.form_Elements}`
                  : passwordBlur && !passwordIsValid
                  ? `${classes.form_Elements} ${classes.invalid}`
                  : `${classes.form_Elements} ${classes.valid}`
              }
              type="password"
              placeholder="Password"
            />
            <button className={`${classes.form_Elements}`}>LOGIN</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        <div className={classes.skewed}></div>
      </div>
    </Fragment>
  );
};

export default LoginFormContainer;
