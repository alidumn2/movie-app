import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import './App.css';

function App() {
  // Initialize state variables to manage application data (movies list, user favorites, and search input)
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Configuration for TMDB API (Base URL, API Key, and Endpoints)
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=1`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

  // useEffect hook triggers the initial API call and retrieves saved favorites from LocalStorage on mount
  useEffect(() => {
    getMovies(API_URL);
    
    // Retrieve persisted favorites from LocalStorage to maintain state across reloads
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, [API_URL]);

  // Helper function to persist the favorites list to the browser's LocalStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  // Asynchronous function to fetch movie data from the API using Axios
  const getMovies = async (url) => {
    try {
      const res = await axios.get(url);
      setMovies(res.data.results); // Update the local state with the fetched results
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handles real-time search input changes and determines which API endpoint to call
  const handleSearch = (term) => {
    setSearchTerm(term); // Update the controlled input state
    if (term) {
      getMovies(SEARCH_API + term); // Fetch specific movies based on the search query
    } else {
      getMovies(API_URL); // Revert to the default popular movies list if input is empty
    }
  };

  // Logic to toggle a movie's presence in the favorites list (Add/Remove)
  const handleFavoriteAction = (movie) => {
    // Check if the selected movie is already present in the favorites array
    const isAlreadyFav = favorites.some(fav => fav.id === movie.id);

    let newFavoritesList;
    if (isAlreadyFav) {
      // Remove operation: Filter out the movie matching the ID
      newFavoritesList = favorites.filter(fav => fav.id !== movie.id);
    } else {
      // Add operation: Spread existing favorites and append the new movie object
      newFavoritesList = [...favorites, movie];
    }

    setFavorites(newFavoritesList); // Update the React state
    saveToLocalStorage(newFavoritesList); // Synchronize with LocalStorage
  };

  return (
    // Wrap the application in Router to enable client-side navigation between views
    <Router>
      <div className="root-container">
        <Navbar />
        
        <Routes>
          {/* --- HOME ROUTE: Displays Search Bar and Movie Grid --- */}
          <Route path="/" element={
            <>
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search for a movie..." 
                  className="search-input"
                  // Controlled Component: Input value is bound to state
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)} 
                />
                <button className="search-btn" onClick={() => handleSearch(searchTerm)}>
                  Search
                </button>
              </div>

              <div className="movie-container">
                {/* Render the list of movies if data is available */}
                {movies.length > 0 && movies.map((movie) => {
                  // Boolean flag to determine if the current movie is in favorites
                  const isFav = favorites.some(f => f.id === movie.id);
                  
                  return (
                    // Pass movie data and handler functions as props to the child component
                    <MovieCard 
                      key={movie.id} // Unique key prop for efficient list rendering
                      movie={movie} 
                      isFavorite={isFav} 
                      handleFavoriteClick={handleFavoriteAction} 
                    />
                  );
                })}
              </div>
            </>
          } />

          {/* --- FAVORITES ROUTE: Displays User's Saved Movies --- */}
          <Route path="/favorites" element={
            <div className="movie-container">
              {/* Conditional Rendering: Show list if favorites exist, otherwise show fallback text */}
              {favorites.length > 0 ? (
                favorites.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    isFavorite={true} // Hardcoded true since this is the favorites view
                    handleFavoriteClick={handleFavoriteAction} 
                  />
                ))
              ) : (
                <h2 style={{color: 'white', textAlign: 'center', width: '100%'}}>
                  No favorites yet! Add some movies from Home page.
                </h2>
              )}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;