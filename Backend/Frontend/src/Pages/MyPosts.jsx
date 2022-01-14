import axios from "axios";
import React, { useEffect, useState } from "react";
import loader from "../sources/Spinner.gif";
import Card from "../Components/UI/JS/Card";

const MyPosts = () => {
  const Token = localStorage.getItem("Token");
  const [myPosts, setMyPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userName: undefined,
    profilePic: undefined,
  });
  const [isReloaded, setIsReloaded] = useState(false);
  useEffect(() => {
    const getMyPostsHandler = async () => {
      setIsReloaded(true);
      await axios
        .get("/post/getMyPosts", {
          headers: { Authorization: "Bearer " + Token },
        })
        .then((res) => {
          setMyPosts(res.data.posts);
          setUserInfo({
            userName: res.data.userName,
            profilePic: res.data.profilePic,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setIsReloaded(false);
    };
    getMyPostsHandler();
  }, []);
  return (
    <div style={{ padding: "1em 8rem" }}>
      {isReloaded === true && (
        <div
          style={{
            width: "100%",
            height: "10em",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "15%", height: "100%" }}
            src={loader}
            alt="spinner"
          />
        </div>
      )}
      {myPosts[0] &&
        userInfo.userName !== undefined &&
        myPosts.map((post) => (
          <Card
            key={post._id}
            id={post._id}
            image={post.image}
            text={post.text}
            username={userInfo.userName}
            profilePic={userInfo.profilePic}
          />
        ))}
      {!myPosts[0] && isReloaded === false && (
        <h1 style={{ textAlign: "center" }}>Nothing to Show</h1>
      )}
    </div>
  );
};

export default MyPosts;
