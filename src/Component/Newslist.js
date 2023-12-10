
import React, { useState } from 'react'
import NewsItem from './Newsitem';

const NewsList = ({ news }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="news-list">
       {selectedArticle && <NewsItem article={selectedArticle} />}
      {news.map((article) => (
        <div key={article.title} onClick={() => handleArticleClick(article)}>
          <img src={article.urlToImage} alt='' width={250} height={130} style={{position:"relative", left:"350px"}} />
          <h4 style={{position:"relative", left:"15px"}}>{article.title}</h4>
        </div>
      ))}
      
    </div>
  );
};

export default NewsList;