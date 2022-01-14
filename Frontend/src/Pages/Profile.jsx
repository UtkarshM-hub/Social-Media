import React from "react";
import DeleteAccount from "../Components/DeleteAccount/JS/DeleteAccount";
import ProfileContainer from "../Components/Profile/ProfileContainer/JS/ProfileContainer";

const Profile = () => {
  return (
    <div style={{ padding: "1em 8rem" }}>
      <ProfileContainer />
      <DeleteAccount />
    </div>
  );
};

export default Profile;
