import React, { useState } from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { ReadOutlined, SearchOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import Search from "../Search/search.jsx";
import ReadingList from "../ReadingList/readingList.jsx";
import styles from "./app.css";

const { Header, Sider, Content } = Layout;

const VIEWS = Object.freeze({
  SEARCH: 0,
  READING_LIST: 1,
});

const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [view, setView] = useState(VIEWS.SEARCH);

  return (
    <Layout className={styles.appLayout}>
      <Header className={styles.header}>
        <h1>PubMed Browser</h1>
      </Header>
      <Layout>
        <Sider collapsible collapsed={isTabletOrMobile}>
          <Menu theme="dark" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              icon={<SearchOutlined />}
              onClick={() => setView(VIEWS.SEARCH)}
            >
              Search
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ReadOutlined />}
              onClick={() => setView(VIEWS.READING_LIST)}
            >
              Reading List
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.content}>
          {view === VIEWS.SEARCH && (
            <Search isTabletOrMobile={isTabletOrMobile} />
          )}
          {view === VIEWS.READING_LIST && (
            <ReadingList isTabletOrMobile={isTabletOrMobile} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

App.displayName = "App";

export default App;
