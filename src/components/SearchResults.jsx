import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';
import Header from './Header';

const SearchResults = () => {
  const { searchResults, searchTerm } = useContext(SearchContext);

  return (
    <div className="search-page-wrapper">
      <Header />
      <div className="movies-page">
        <h2 className="results-heading">
          {searchTerm
            ? `Results for: "${searchTerm}"`
            : 'Search for a movie...'}
        </h2>

        <div className="movies-container">
          {searchResults.length > 0
            ? searchResults.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`} className="search-card-link">
                    <div className="image-wrapper">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Poster'
                        }
                        alt={movie.title}
                      />
                    </div>
                    <div className="movie-details">
                      <h4 className="movie-title">{movie.title}</h4>
                      <div className="movie-meta">
                        <span className="rating">
                          ⭐ {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="year">
                          {movie.release_date?.split('-')[0] || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : searchTerm && (
                <p className="no-results">
                  No movies found matching "{searchTerm}"
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
