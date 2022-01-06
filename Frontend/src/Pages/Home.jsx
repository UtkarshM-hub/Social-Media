import React from "react";
import CreatePost from "../Components/CreatePost/JS/CreatePost";
import Card from "../Components/UI/JS/Card";
import image from "../sources/Example.jpg";
import image2 from "../sources/NCC.jpg";
const Home = () => {
  return (
    <div>
      <CreatePost img={image} />
      <Card img={image} />
      <Card img={image2} />
    </div>
  );
};

export default Home;
