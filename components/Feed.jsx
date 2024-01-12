"use client";
import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import { api, requestConfig } from "@/utils/config";

const DocumentCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((doc) => (
        <DocumentCard key={doc._id} doc={doc} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  // States
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [documents, setAllDocuments] = useState([]);

  // Fetch searched documents
  const fetchSearchedDocuments = async () => {
    const config = requestConfig("GET", null);

    try {
      const response = await fetch(
        api + `searchsynonyms?index=kempetro&body=${searchText}`,
        config
      );
      console.log("passou", searchText);

      if (!response.ok) {
        throw new Error(
          `___|___Failed to fetch documents. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setSearchedResults(data);
    } catch (error) {
      console.error(error);
      return new Response("____Failed to fetch documents", { status: 500 });
    }
  };

  // Effect to fetch searched documents when searchText changes
  useEffect(() => {
    if (searchText) {
      fetchSearchedDocuments();
    } else {
      setSearchedResults([]);
    }
  }, [searchText]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* Documents List */}
      <DocumentCardList
        data={searchText ? searchedResults : documents}
        handleTagClick={(tagName) => setSearchText(tagName)}
      />
    </section>
  );
};

export default Feed;
