import React from "react";

const Search = () => (
  <>
    <label>Search PubMed!</label>
    <input
      type="text"
      id="search-bar"
      name="search-bar"
      maxLength="255"
      size="10"
    />
  </>
);

Search.displayName = "Search";
export default Search;
