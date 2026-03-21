import { useState, useContext } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import { movies } from './hooks/data';
import { Link } from 'react-router-dom';
import LanguageContext from './contexts/LanguageContext';
import { SearchContext } from './contexts/SearchContext';

const App = () => {
  const { language } = useContext(LanguageContext);
  const { searchTerm } = useContext(SearchContext);

  const displayMovies = movies.filter((movie) => {
    const titleToSearch = movie.title[language] || '';
    return titleToSearch.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="page">
        <Header />
        <div className="hero-content">
          <h1>
            {language === 'Hindi'
              ? 'अनलिमिटेड फिल्में और शो'
              : 'Unlimited Movies, TV Shows & More'}
          </h1>
          <p>
            {language === 'Hindi'
              ? 'कहीं भी देखें। कभी भी रद्द करें।'
              : 'Watch anywhere. Cancel anytime.'}
          </p>
          <Link to={`/movies`} className="primarybtn">
            {language === 'Hindi' ? 'अभी देखें' : 'Explore Now'}
          </Link>
        </div>
      </div>

      <div className="movies-section">
        {displayMovies.length > 0 ? (
          displayMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title[language]}
              image={movie.image}
              category={movie.category}
            />
          ))
        ) : (
          <p
            className="no-results-text"
            style={{
              color: 'white',
              textAlign: 'center',
              width: '100%',
              padding: '20px',
            }}
          >
            {language === 'Hindi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
