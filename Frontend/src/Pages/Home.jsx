import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../Components/CreatePost/JS/CreatePost";
import Card from "../Components/UI/JS/Card";
import Message from "../Components/UI/JS/Message";
import image from "../sources/Example.jpg";
import loader from "../sources/Spinner.gif";

const Home = () => {
  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [createMessage, setCreateMessage] = useState({
    type: undefined,
    message: undefined,
  });
  const [isReloaded, setIsReloaded] = useState(false);
  const [profilePic, setProfilePic] = useState();
  useEffect(() => {
    getPostsHandler();
    getUserInfoHandler();
  }, []);

  const getUserInfoHandler = async () => {
    await axios
      .post(
        "http://localhost/user/getUserData",
        JSON.stringify({ userId: userId }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setProfilePic(res.data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostsHandler = async () => {
    setIsReloaded(true);
    await axios
      .get("http://localhost/post/getPosts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setPosts(result.data.reverse());
        console.log("working");
      })
      .catch((err) => {
        if (err) {
          if (err.response.status === 403) {
          }
        }
      });
    setIsReloaded(false);
  };

  const setMessageHandler = async ({ type, message }) => {
    console.log("creating message");
    setCreateMessage({
      type: type,
      message: message,
    });
    const timer = setTimeout(async () => {
      setCreateMessage({ type: undefined, message: undefined });
      clearTimeout(timer);
      await getPostsHandler();
    }, 2000);
  };

  return (
    <div style={{ padding: "1em 8rem" }}>
      <Message message={createMessage.message} type={createMessage.type} />
      <CreatePost
        profilePic={profilePic}
        message={setMessageHandler}
        img={image}
      />
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
      {posts[0] &&
        posts.map((post) => (
          <Card
            key={post._id}
            id={post._id}
            image={post.image}
            text={post.text}
            username={post.creator.userName}
            profilePic={post.creator.profilePic}
          />
        ))}
      {!posts[0] && isReloaded === false && (
        <h1 style={{ textAlign: "center" }}>Nothing to Show</h1>
      )}
    </div>
  );
};

export default Home;
