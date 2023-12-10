
import React, { useState, useEffect } from "react";
import NewsList from "./Component/Newslist";
import "./Component/Newsstyle.css"


const API_KEY = "46054c0d9a2445419904fc5e91d922c8";

const App = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
         ` https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm)
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredNews.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <h1>News Dashboard</h1>
      <input
        type="text"
        placeholder="Search for News"
        value={searchTerm}
        onChange={handleSearch}
      />
      {error && <p>Error: {error}</p>}
<NewsList news={currentArticles}/>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={filteredNews.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;