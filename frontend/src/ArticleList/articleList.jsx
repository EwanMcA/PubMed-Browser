import React from "react";
import { Button, List } from "antd";
import { ReadOutlined } from "@ant-design/icons";

import STATUS from "../Search/status.js";
import styles from "./articleList.css";

const getPubMedLink = (article) => {
  const IDS = article["articleids"] || [];
  const ID = IDS.find((id) => id["idtype"] === "pubmed");
  return `https://pubmed.ncbi.nlm.nih.gov/${ID ? ID.value : ""}`;
};

const ArticleList = ({ isTabletOrMobile, status, articles, postReading }) => (
  <List
    loading={status === STATUS.LOADING}
    itemLayout="horizontal"
    dataSource={Object.values(articles)}
    renderItem={(item) => (
      <List.Item
        className={isTabletOrMobile ? styles.mobileArticle : styles.article}
        actions={[
          <>
            {postReading && (
              <Button
                shape="circle"
                icon={<ReadOutlined />}
                onClick={() =>
                  postReading(
                    item.uid,
                    item.title,
                    item.lastauthor,
                    item.fulljournalname,
                    item.epubdate,
                    getPubMedLink(item)
                  )
                }
              />
            )}
          </>,
          <a
            key="list-see-on-pubmed"
            href={"link" in item ? item.link : getPubMedLink(item)}
          >
            See on PubMed
          </a>,
        ]}
      >
        <List.Item.Meta
          className={styles.articleHeadline}
          title={item["title"]}
          description={item["fulljournalname"]}
        />

        {isTabletOrMobile ? (
          <>
            <div>
              <strong>{item["lastauthor"]}</strong>
            </div>
            <div>{item["epubdate"]}</div>
          </>
        ) : (
          <div className={styles.articleMeta}>
            <strong>{item["lastauthor"]}</strong>
            {item["epubdate"]}
          </div>
        )}
      </List.Item>
    )}
  />
);

ArticleList.displayName = "ArticleList";
export default ArticleList;
