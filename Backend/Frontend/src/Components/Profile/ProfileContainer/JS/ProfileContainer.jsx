import React, { Fragment, useEffect, useRef, useState } from "react";
import profilePic from "../../../../sources/Example.jpg";
import classes from "../CSS/ProfileContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../../../../sources/Spinner.gif";
import Message from "../../../UI/JS/Message";

const ProfileContainer = () => {
  let usernameCpy;
  const [usernameState, setUserNameState] = useState();
  const [userNameEdited, setUserNameEdited] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    profilePic: undefined,
    CoverImage: undefined,
    posts: undefined,
    _id: undefined,
  });
  const [createMessage, setCreateMessage] = useState({
    type: undefined,
    message: undefined,
  });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Token");
  const [CoverIsEdited, setCoverIsEdited] = useState(false);
  const [CoverImage, setCoverImage] = useState(undefined);

  const [ProfileIsEdited, setProfileIsEdited] = useState(false);
  const [ProfileImage, setProfileImage] = useState(undefined);

  useEffect(() => {
    getUSerDataHandler();
  }, []);

  const getUSerDataHandler = async () => {
    setIsLoading(true);
    await axios
      .post("/user/getUserData", JSON.stringify({ userId: userId }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        localStorage.setItem("ProfilePic", res.data.profilePic);
        usernameCpy = res.data.userName;
        setUserNameState(res.data.userName);
        setUserData({
          posts: res.data.posts,
          profilePic: res.data.profilePic,
          CoverImage: res.data.CoverImage,
          _id: res.data._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
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
    }, 2000);
  };

  const EditProfileHandler = async (e) => {
    e.preventDefault();
    setEditMode((prev) => !prev);
    if ((EditMode && CoverIsEdited) || ProfileIsEdited || userNameEdited) {
      let username = usernameState;
      if (username.length <= 6) {
        setMessageHandler("error", "Username must of more than 6 characters");
        setEditMode(true);
      }
      let userPic = ProfileImage;
      let coverImage = CoverImage;
      let userId = userData._id;
      if (!ProfileIsEdited) {
        userPic = userData.profilePic;
      }
      if (!CoverIsEdited) {
        coverImage = userData.CoverImage;
      }

      const data = new FormData();
      data.append("profilePic", userPic);
      data.append("CoverImage", coverImage);
      data.append("userId", userId);
      data.append("username", username);

      try {
        await axios
          .post("/user/updateUser", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {})
          .catch((err) => console.log(err));
      } catch (err) {}
      setCoverIsEdited(false);
      setProfileIsEdited(false);
      setUserNameEdited(false);
      getUSerDataHandler();
    }
  };

  //   Image change Handlers
  const selectCoverImageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style = { display: "none" };
    input.click();
    input.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length >= 0) {
        setCoverIsEdited(true);
        console.log(e.target.files[0]);
        setCoverImage(e.target.files[0]);
      }
      return;
    });
  };
  const selectProfileImageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style = { display: "none" };
    input.click();
    input.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length >= 0) {
        setProfileIsEdited(true);
        console.log(e.target.files[0]);
        setProfileImage(e.target.files[0]);
      }
      return;
    });
  };

  let newCoverImage;
  let newProfileImage;
  if (CoverIsEdited && CoverImage !== undefined) {
    newCoverImage = URL.createObjectURL(CoverImage);
  }
  if (ProfileIsEdited && ProfileImage !== undefined) {
    newProfileImage = URL.createObjectURL(ProfileImage);
  }

  return (
    <Fragment>
      <Message message={createMessage.message} type={createMessage.type} />
      {isLoading && (
        <div className={classes.spinner_Container}>
          <img className={classes.spinner} src={Loader} alt="spinner" />
        </div>
      )}
      {!isLoading && (
        <div className={classes.ProfileContainer}>
          <div className={classes.Profile_Cover}>
            {EditMode && (
              <div
                onClick={selectCoverImageHandler}
                className={`${classes.ProfileCover_ImageOverlay} ${classes.DefaultOverlay}`}
              >
                <p>
                  <FontAwesomeIcon
                    className={classes.ProfilePic_Icon}
                    icon={faPlus}
                  />
                  Change Cover
                </p>
              </div>
            )}
            <img
              src={CoverIsEdited ? newCoverImage : `${userData.CoverImage}`}
              alt="Profile Cover"
            />
          </div>
          <div className={classes.Profile_Info}>
            <div className={classes.profile_Picture}>
              {EditMode && (
                <div
                  onClick={selectProfileImageHandler}
                  className={`${classes.ProfilePic_ImageOverlay} ${classes.DefaultOverlay}`}
                >
                  <p>
                    <FontAwesomeIcon
                      className={classes.ProfilePic_Icon}
                      icon={faPlus}
                    />
                    Add Image
                  </p>
                </div>
              )}
              <img
                src={
                  ProfileIsEdited ? newProfileImage : `${userData.profilePic}`
                }
                alt="Profile pic"
              />
            </div>
            <div className={classes.Profile_InfoSection}>
              <div className={classes.divider}>
                {!EditMode && <h2>{usernameState}</h2>}
                {EditMode && (
                  <input
                    onChange={(e) => {
                      setUserNameEdited(true);
                      setUserNameState(e.target.value);
                    }}
                    value={usernameState}
                    className={classes.inputElement}
                    type="text"
                    placeholder="Enter an username"
                    required
                  />
                )}
                <button
                  onClick={EditProfileHandler}
                  className={`${
                    EditMode ? classes.editModeBtn : classes.editProfileBtn
                  }`}
                >
                  {!EditMode && (
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faPencilAlt}
                    />
                  )}
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProfileContainer;
