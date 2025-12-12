import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import './App.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const POPULAR_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const GENRE_LIST_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const DISCOVER_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc`;

function AppContent() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const getMovies = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      setMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const getGenres = useCallback(async () => {
    try {
      const res = await axios.get(GENRE_LIST_API);
      setGenres(res.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  useEffect(() => {
    getMovies(POPULAR_API);
    getGenres();

    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, [getMovies, getGenres]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre(null);
    if (term) {
      getMovies(SEARCH_API + term);
    } else {
      getMovies(POPULAR_API);
    }
  };

  const handleGenreClick = (genreId) => {
    const newGenreId = genreId === selectedGenre ? null : genreId;
    setSelectedGenre(newGenreId);
    setSearchTerm("");
    setIsSidebarOpen(false);

    if (newGenreId) {
      getMovies(`${DISCOVER_API}&with_genres=${newGenreId}`);
    } else {
      getMovies(POPULAR_API);
    }
  };

  const handleFavoriteAction = (movie) => {
    const isAlreadyFav = favorites.some(fav => fav.id === movie.id);
    let newFavoritesList;
    if (isAlreadyFav) {
      newFavoritesList = favorites.filter(fav => fav.id !== movie.id);
    } else {
      newFavoritesList = [...favorites, movie];
    }
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  const showSidebar = location.pathname === '/';

  return (
    <div className="root-container">
      <Navbar />

      <div className="main-layout">
        {showSidebar && (
          <>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
              <h3 className="sidebar-title">Categories</h3>
              <ul className="genre-list">
                <li
                  className={selectedGenre === null ? 'active' : ''}
                  onClick={() => handleGenreClick(null)}
                >
                  All Movies
                </li>
                {genres.map(genre => (
                  <li
                    key={genre.id}
                    className={selectedGenre === genre.id ? 'active' : ''}
                    onClick={() => handleGenreClick(genre.id)}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </aside>

            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? '✕' : '☰ Categories'}
            </button>
          </>
        )}

        <main className="content" style={{ paddingLeft: showSidebar ? '20px' : '0' }}>
          <Routes>
            <Route path="/" element={
              <>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button className="search-btn" onClick={() => handleSearch(searchTerm)}>
                    Search
                  </button>
                </div>

                <h2 className="section-title">
                  {searchTerm ? `Results for "${searchTerm}"` :
                    selectedGenre ? genres.find(g => g.id === selectedGenre)?.name : "Popular Movies"}
                </h2>

                <div className="movie-container">
                  {movies.length > 0 ? movies.map((movie) => {
                    const isFav = favorites.some(f => f.id === movie.id);
                    return (
                      <div key={movie.id} className="movie-wrapper">
                        <MovieCard
                          movie={movie}
                          isFavorite={isFav}
                          handleFavoriteClick={handleFavoriteAction}
                        />
                      </div>
                    );
                  }) : (
                    <h2 className="no-movies">No movies found.</h2>
                  )}
                </div>
              </>
            } />
            <Route path="/favorites" element={
              <>
                <h2 className="section-title" style={{ marginTop: '30px' }}>Favorite Movies</h2>
                <div className="movie-container">
                  {favorites.length > 0 ? (
                    favorites.map((movie) => (
                      <div key={movie.id} className="movie-wrapper">
                        <MovieCard
                          movie={movie}
                          isFavorite={true}
                          handleFavoriteClick={handleFavoriteAction}
                        />
                      </div>
                    ))
                  ) : (
                    <h2 style={{ color: 'white', textAlign: 'center', width: '100%' }}>
                      No favorites yet! Add some movies from Home page.
                    </h2>
                  )}
                </div>
              </>
            } />
            <Route path="/movie/:id" element={<MovieDetail />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;