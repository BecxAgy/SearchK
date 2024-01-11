"use client";
import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";

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

  // Fetch all documents
  const fetchAllDocuments = async () => {
    try {
      const response = await fetch("/api/document");
      if (response.ok) {
        const data = await response.json();
        setAllDocuments(data);
      } else {
        console.error("Failed to fetch documents:", response.status);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Fetch searched documents
  const fetchSearchedDocuments = async () => {
    try {
      const response = await fetch(`/api/document/route?search=${searchText}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedResults(data);
      } else {
        console.error("Failed to fetch search results:", response.status);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Effect to fetch all documents on initial load
  useEffect(() => {
    fetchAllDocuments();
  }, []);

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
