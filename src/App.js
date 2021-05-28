import { useState, useEffect, Fragment } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

export default function App() {
  const [hackerNews, setHackerNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://hn.algolia.com/api/v1/search?query=foo&tags=story')
      .then((response) => {
        console.log(response.data.hits);
        setHackerNews(response.data.hits);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hacker News</h1>
      {isError && <h3>An enormous error has occured</h3>}
      {!hackerNews ? (
        <BeatLoader color="black" loading={isLoading} size={30} />
      ) : (
        hackerNews.map((hit) => {
          return <p>{hit.title}</p>;
        })
      )}
    </div>
  );
}
