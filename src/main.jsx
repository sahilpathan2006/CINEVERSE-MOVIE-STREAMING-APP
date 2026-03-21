import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Error from './components/Error.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Movies from './components/Movies';
import AllMovies from './components/AllMovies';
import MovieDisplay from './components/MovieDisplay';
import SearchResults from './components/SearchResults';
import { LanguageContextProvider } from './contexts/LanguageContext';
import { SearchProvider } from './contexts/SearchContext';

const appRouter = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <Error /> },
  { path: '/movies/:movieCategory', element: <Movies /> },
  { path: '/movies', element: <AllMovies /> },
  { path: '/movie/:movieId', element: <MovieDisplay /> },
  { path: '/search', element: <SearchResults /> },
]);

const Root = () => {
  return (
    <LanguageContextProvider>
      <SearchProvider>
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </LanguageContextProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
