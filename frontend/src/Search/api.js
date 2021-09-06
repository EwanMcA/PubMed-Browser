import axios from "axios";

import STATUS from "./status.js";

const URL_BASE = "https://eutils.ncbi.nlm.nih.gov";
const SEARCH_URL = `${URL_BASE}/entrez/eutils/esearch.fcgi`;
const SUMMARY_URL = `${URL_BASE}/entrez/eutils/esummary.fcgi`;

export const usePubMedApi = (rows, term, setResults, setStatus) => {
  setStatus(STATUS.LOADING);
  axios
    .get(`${SEARCH_URL}`, {
      params: {
        db: "pubmed",
        retmode: "json",
        retmax: rows,
        term: term,
      },
    })
    .then((response) => {
      if (
        !response.data ||
        !response.data["esearchresult"] ||
        !response.data["esearchresult"]["idlist"]
      ) {
        throw `Request to ${SEARCH_URL} was missing result fields`;
      }
      const searchResult = response.data["esearchresult"];

      axios
        .get(SUMMARY_URL, {
          params: {
            db: "pubmed",
            retmode: "json",
            id: searchResult["idlist"].join(","),
          },
        })
        .then((innerResponse) => {
          const result = innerResponse.data["result"] || {};
          if ("uids" in result) {
            delete result["uids"];
          }

          setResults({ articles: result, count: searchResult["count"] });
          setStatus(STATUS.DEFAULT);
        })
        .catch((error) => {
          console.log(error);
          setStatus(STATUS.ERROR);
        });
    })
    .catch((error) => {
      console.log(error);
      setStatus(STATUS.ERROR);
    });
};

export const useReadingListApi = () => {
  const postReading = (id, title, lastauthor, journal, pubdate, link) => {
    axios
      .post("/api/reading-list", {
        id,
        title,
        lastauthor,
        journal,
        pubdate,
        link,
      })
      .catch((error) => console.log(error));
  };

  const fetchReadingList = (setReadingList) => {
    axios
      .get("/api/reading-list")
      .then((response) => setReadingList(response.data))
      .catch((error) => console.log(error));
  };

  return { postReading, fetchReadingList };
};
