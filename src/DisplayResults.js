import React from 'react';
import Article from './Article';
import NoMatch from './NoMatch';

export default function DisplayResults({ hackerNews, searchQuery, isError }) {
  const displayContent = () => {
    if (!isError && hackerNews && hackerNews.length) {
      return (
        <ol>
          {hackerNews.map((article) => {
            return <Article {...article} />;
          })}
        </ol>
      );
    }
  };

  if (!isError && searchQuery && !hackerNews.length) {
    return <NoMatch />;
  }

  return <>{displayContent()}</>;
}
