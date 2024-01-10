"use client";
import React, { useEffect, useState } from "react";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [documents, setDocuments] = useState([]);
  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch("api/document");
      const data = await response.json();

      setDocuments(data);
    };

    fetchDocuments();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="What you're wish find?"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
    </section>
  );
};

export default Feed;
