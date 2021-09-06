import React, { useEffect, useState } from "react";

import { useReadingListApi } from "../Search/api.js";
import ArticleList from "../ArticleList/articleList.jsx";
import styles from "./readingList.css";

const ReadingList = ({ isTabletOrMobile }) => {
  const [readingList, setReadingList] = useState({});
  const { fetchReadingList } = useReadingListApi();

  useEffect(() => {
    fetchReadingList(setReadingList);
  }, []);

  return (
    <>
      <h2>Your Reading List</h2>
      <div
        className={
          isTabletOrMobile ? styles.mobilesListContainer : styles.listContainer
        }
      >
        <ArticleList
          isTabletOrMobile={isTabletOrMobile}
          status={0}
          articles={readingList}
        />
      </div>
    </>
  );
};

ReadingList.displayName = "Reading List";
export default ReadingList;
