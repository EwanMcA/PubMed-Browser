import React, { useEffect, useState } from "react";
import { Result, Input } from "antd";

import { usePubMedApi, useReadingListApi } from "./api.js";
import ArticleList from "../ArticleList/articleList.jsx";
import STATUS from "./status.js";
import styles from "./search.css";

const DEFAULT_ROWS = 20;

const Search = ({ isTabletOrMobile }) => {
  const [searchResults, setSearchResults] = useState({ articles: {} });
  const [status, setStatus] = useState(STATUS.DEFAULT);
  const { postReading } = useReadingListApi();
  const onSearch = (searchTerm) => {
    if (searchTerm) {
      usePubMedApi(DEFAULT_ROWS, searchTerm, setSearchResults, setStatus);
    }
  };

  return (
    <>
      <div
        className={
          isTabletOrMobile ? styles.mobileSearchControls : styles.searchControls
        }
      >
        <Input.Search
          placeholder="input search"
          onSearch={onSearch}
          className={styles.searchBar}
        />
        {"count" in searchResults && (
          <p className={styles.count}>{searchResults["count"]} results</p>
        )}
      </div>
      <div
        className={
          isTabletOrMobile ? styles.mobileResultsPane : styles.resultsPane
        }
      >
        {status === STATUS.ERROR ? (
          <Result
            status="error"
            title="Search Failed"
            subTitle="Please contact the helpdesk if the problem persists."
          />
        ) : (
          <ArticleList
            isTabletOrMobile={isTabletOrMobile}
            status={status}
            articles={searchResults["articles"]}
            postReading={postReading}
          />
        )}
      </div>
    </>
  );
};

Search.displayName = "Search";
export default Search;
