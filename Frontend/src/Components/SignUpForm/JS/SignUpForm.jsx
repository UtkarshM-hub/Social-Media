import React, { useRef, useState } from "react";
import classes from "../CSS/SignUpForm.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignUpForm = () => {
  const emailRef = useRef();
  const [emailBlur, setEmailBlur] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const passwordRef = useRef();
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const confPasswordRef = useRef();
  const [confPasswordBlur, setConfPasswordBlur] = useState(false);
  const [confPasswordIsValid, setConfPasswordIsValid] = useState(false);

  const userNameRef = useRef();
  const [userNameBlur, setUserNameBlur] = useState(false);
  const [userNameIsValid, setUserNameIsValid] = useState(false);

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      emailIsValid &&
      passwordIsValid &&
      confPasswordIsValid &&
      userNameIsValid
    ) {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: userNameRef.current.value,
      };
      console.log(data);
      await axios
        .post("http://localhost/auth/signup", JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("user have to correct something");
    }
  };

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

  const confPasswordValidator = (e) => {
    const value = e.target.value;
    if (value === passwordRef.current.value) {
      setConfPasswordIsValid(true);
      setConfPasswordBlur(true);
    } else {
      setConfPasswordIsValid(false);
    }
  };

  const userNameValidator = (e) => {
    const value = e.target.value;
    if (value.length >= 7) {
      setUserNameIsValid(true);
      setUserNameBlur(true);
    } else {
      setUserNameIsValid(false);
    }
  };

  console.log(
    !emailIsValid &&
      !passwordIsValid &&
      !confPasswordIsValid &&
      !userNameIsValid
  );

  return (
    <div className={classes.FormContainer}>
      <div className={classes.FormContainer_child}>
        <h2>Create Account</h2>
        <form onSubmit={FormSubmitHandler}>
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
            placeholder="elonmusk@gmail.com"
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
          <input
            onBlur={() => {
              setConfPasswordBlur(true);
            }}
            onChange={confPasswordValidator}
            className={
              !confPasswordBlur
                ? `${classes.form_Elements}`
                : confPasswordBlur && !confPasswordIsValid
                ? `${classes.form_Elements} ${classes.invalid}`
                : `${classes.form_Elements} ${classes.valid}`
            }
            type="password"
            placeholder="Confirm Password"
          />
          <input
            ref={userNameRef}
            onBlur={() => {
              setUserNameBlur(true);
            }}
            onChange={userNameValidator}
            className={
              !userNameBlur
                ? `${classes.form_Elements}`
                : userNameBlur && !userNameIsValid
                ? `${classes.form_Elements} ${classes.invalid}`
                : `${classes.form_Elements} ${classes.valid}`
            }
            type="text"
            placeholder="Username"
          />
          <button
            type="submit"
            className={`${classes.form_Elements} ${classes.submitBtn}`}
          >
            SIGN UP
          </button>
          <p>
            Already Have an Account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <div className={classes.Backgroundimage}>
        <img src="http://localhost/images/BgImage.png" alt="back" />
      </div>
    </div>
  );
};

export default SignUpForm;
