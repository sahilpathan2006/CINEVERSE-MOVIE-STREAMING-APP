import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { options, url } from '../hooks/data';
import { Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import { SearchContext } from '../contexts/SearchContext';

const Movies = () => {
  const { movieCategory } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const { language } = useContext(LanguageContext);
  const { searchTerm } = useContext(SearchContext);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${url}${movieCategory}`, options);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      setError("⚠️ Oops! We couldn't load the movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieCategory) {
      fetchMovies();
    }
  }, [movieCategory]);

  const displayMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating = movie.vote_average >= rating;
    return matchesSearch && matchesRating;
  });

  return (
    <div>
      <div className="top-bar">
        <h2 className="logo" onClick={() => navigate('/')}>
          {language === 'Hindi' ? 'सिनिवर्स' : 'Cineverse'}
        </h2>

        <button className="back-btn" onClick={() => navigate('/')}>
          {language === 'Hindi' ? '← होम पर वापस जाएं' : '← Back To Home'}
        </button>
      </div>

      <div className="movies-page">
        <div className="filter-container">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="0">
              {language === 'Hindi' ? 'सभी रेटिंग' : 'All Ratings'}
            </option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </div>

        {loading && (
          <div className="movies-container">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="shimmer-card"></div>
            ))}
          </div>
        )}

        {error && <p className="error-text">{error}</p>}

        {!loading && displayMovies?.length > 0 && (
          <div className="movies-container">
            {displayMovies?.map((movie) => (
              <div key={movie?.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && displayMovies?.length === 0 && (
          <p className="no-results">
            {language === 'Hindi' ? 'कोई परिणाम नहीं मिला' : 'No Results Found'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Movies;
