import React from "react";

const Home = () => {
  return (
    <section className="w-full  flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="" />
        <span className="orange_gradient text-center">
          Powered Search Projects
        </span>
      </h1>
      <p className="desc text-center">
        SearchK is a tool for searching projects by keywords made in Next JS
        that uses a non-relational database - Elasticsearch
      </p>
    </section>
  );
};

export default Home;
