import { useState, useEffect, Fragment } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

export default function App() {
  const [hackerNews, setHackerNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://hn.algolia.com/api/v1/search?query=foo&tags=story")
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
    <>
      <header className="container-lg bg-orange">
        <nav className="navbar navbar-light navbar-expand-lg container justify-content-between row">
          <a
            href="https://news.ycombinator.com/"
            className="navbar-brand text-white col-2"
          >
            HN Clone
          </a>

          <form class="d-flex col-10" onSubmit={handleSearchQuery}>
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
      <main
        className={`container-lg py-2 ${loading ? "bg-white" : "bg-beige"}`}
      >
        {/* Items go here */}
      </main>
    </>
    // <div className="App">
    //   <h1>Hacker News</h1>
    //   {isError && <h3>An enormous error has occured</h3>}
    //   {!hackerNews ? (
    //     <BeatLoader color="black" loading={isLoading} size={30} />
    //   ) : (
    //     hackerNews.map((hit) => {
    //       return <p>{hit.title}</p>;
    //     })
    //   )}
    // </div>
  );
}
