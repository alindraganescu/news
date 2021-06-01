import { useState, useEffect, Fragment } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

import DisplayResults from './DisplayResults';
import DisplayError from './DisplayError';

export default function App() {
  const [hackerNews, setHackerNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // `https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=${pageHits}&restrictSearchableAttributes=title`;

  useEffect(() => {
    const refreshNews = (searchQuery) => {
      setIsLoading(true);
      axios
        .get(
          `https://hn.algolia.com/api/v1/search_by_date?${
            searchQuery && `query=${searchQuery}&`
          }tags=story&restrictSearchableAttributes=title`
        )
        .then((response) => {
          console.log(response.data.hits);
          setHackerNews(response.data.hits);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    };
    setIsLoading(true);
    setIsError(false);
    // Fetch news on inital loading
    refreshNews(searchQuery);

    // Fetch news every x seconds
    let autoRefresh = setInterval(() => {
      refreshNews(searchQuery);
    }, 1000 * 60 * 5);

    return () => clearInterval(autoRefresh);
  }, [searchQuery]);

  // Event listener: get user search query
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.currentTarget.searchQueryInput.value);
  };

  return (
    <>
      <header className="container-lg bg-orange">
        <nav className="navbar navbar-light navbar-expand-lg container justify-content-between row">
          <a
            href="https://news.ycombinator.com/"
            className="navbar-brand text-white col-2"
          >
            HN Clone
          </a>

          <form class="d-flex col-10" onSubmit={handleSearch}>
            <input
              class="form-control border-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="searchQueryInput"
            />
            <button class="btn" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
        </nav>
      </header>
      <main className="container-lg py-2 bg-white">
        {isError && <DisplayError />}
        <BeatLoader loading={isLoading} />
        {!isLoading && (
          <DisplayResults
            hackerNews={hackerNews}
            searchQuery={searchQuery}
            isError={isError}
          />
        )}
      </main>
    </>
  );
}
