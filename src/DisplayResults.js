import React from "react";
import Article from "./Article";
import NoMatch from "./NoMatch";

export default function DisplayResults({
  hackerNews,
  searchQuery,
  isError,
  page,
  setPage,
}) {
  const goToPrevious = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  const goToNext = () => {
    setPage((page) => page + 1);
  };

  const listNumberStart = () => {
    if (page === 0) {
      return page + 1;
    } else {
      return page * 20 + 1;
    }
  };

  const displayContent = () => {
    if (!isError && hackerNews && hackerNews.length) {
      return (
        <>
          <ol start={listNumberStart()}>
            {hackerNews.map((article) => {
              return <Article {...article} />;
            })}
          </ol>
          <button className="btn btn-outline-info" onClick={goToPrevious}>
            Prev
          </button>
          <button className="btn btn-outline-warning" onClick={goToNext}>
            Next
          </button>
        </>
      );
    }
  };

  if (!isError && searchQuery && !hackerNews.length) {
    return <NoMatch />;
  }

  return <>{displayContent()}</>;
}
