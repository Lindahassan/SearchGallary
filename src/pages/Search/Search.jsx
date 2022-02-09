import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

const { data } = axios.get(
  "https://api.unsplash.com/photos/?client_id=2680e3723c6c767b19a7369175e71cef135d6c7c220e416dd470481f9db84f81"
);
const Search = () => {
  // the value of the search field
  const [name, setName] = useState("");

  // the search result
  const [foundImages, setFoundIMages] = useState(data);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = data.filter((image) => {
        return image.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundIMages(results);
    } else {
      setFoundIMages(data);
      // If the text field is empty, show all images
    }

    setName(keyword);
  };
  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />

      <div className="image-list">
        {foundImages && foundImages.length > 0 ? (
          foundImages.map((image) => (
            <li key={image.id} className="image">
              <span className="image-id">{image.id}</span>
              <span className="image-name">{image.name}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
