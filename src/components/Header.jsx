import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import { SearchContext } from '../contexts/SearchContext';
import { options } from '../hooks/data';

const Header = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { searchTerm, setSearchTerm, setSearchResults } =
    useContext(SearchContext);
  const navigate = useNavigate();

  const fetchSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      // Calls the actual TMDB Search Endpoint
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      navigate('/search'); // Redirects to results page as you type
      fetchSearch(value);
    } else {
      navigate('/'); // Returns home if you clear the search
    }
  };

  return (
    <header className="header">
      <h2
        className="logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        {language === 'Hindi' ? 'सिनिवर्स' : 'Cineverse'}
      </h2>
      <div className="search-container">
        <input
          type="text"
          placeholder={
            language === 'Hindi' ? 'फिल्में खोजें...' : 'Search movies...'
          }
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
        />
      </div>
      <nav className="nav">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Hindi">हिंदी</option>
        </select>
      </nav>
    </header>
  );
};

export default Header;
