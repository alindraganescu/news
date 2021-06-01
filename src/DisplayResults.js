import React from 'react';
import Article from './Article';

export default function DisplayResults({ hackerNews, searchQuery }) {
  const displayContent = () => {
    console.log('rendered');
    if (hackerNews && hackerNews.length) {
      return (
        <ol>
          {hackerNews.map((article) => {
            return <Article {...article} />;
          })}
        </ol>
      );
    }
  };

  if (searchQuery && !hackerNews.length) {
    console.log('no results');
  }

  return <>{displayContent()}</>;
}
