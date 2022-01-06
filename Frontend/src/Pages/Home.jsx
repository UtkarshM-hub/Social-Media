import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CreatePost from "../Components/CreatePost/JS/CreatePost";
import Card from "../Components/UI/JS/Card";
import image from "../sources/Example.jpg";
import loader from "../sources/Spinner.gif";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isReloaded, setIsReloaded] = useState(false);

  useEffect(() => {
    setIsReloaded(true);
    getPostsHandler();
  }, []);
  const getPostsHandler = async () => {
    await axios
      .get("http://localhost/post/getPosts")
      .then((result) => {
        setPosts(result.data.reverse());
        console.log("working");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsReloaded(false);
  };
  console.log(!posts[0]);
  return (
    <div>
      <CreatePost getPosts={getPostsHandler} img={image} />
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
          <Card key={post._id} image={post.image} text={post.text} />
        ))}
      {!posts[0] && isReloaded === false && (
        <h1 style={{ textAlign: "center" }}>Nothing to Show</h1>
      )}
    </div>
  );
};

export default Home;
