

const NewsItem = ({ article }) => {
    const { title, description, author, url, publishedAt, source, urlToImage } = article;
  
    return (
      <div className="news-item">
        <img src={urlToImage} alt='' width={750} height={300}  />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Source: {source.name}</p>
        <p>Author: {author}</p>
        <p>Published at: {new Date(publishedAt).toLocaleString()}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    );
  };
  export default NewsItem;