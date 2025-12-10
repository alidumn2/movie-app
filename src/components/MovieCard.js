import React from 'react';
import '../style/MovieCard.css';

// Functional component using destructuring to unpack props directly for cleaner syntax.
// Receives movie data and the state handler callback from the parent component.
const MovieCard = ({ movie, handleFavoriteClick, isFavorite }) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      <img 
        // Conditional rendering: Checks if a poster path exists.
        // If true, constructs the full API URL; otherwise, renders a placeholder image.
        src={movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"} 
        alt={movie.title} 
      />
      
      <div 
        className="overlay"
        // Event Handler: Invokes the callback function passed via props to update the state in the parent (App.js).
        // This pattern allows the child component to communicate changes back up the tree.
        onClick={() => handleFavoriteClick(movie)}
      >
        <span className="fav-btn">
            {/* Dynamically renders the button label based on the 'isFavorite' boolean prop */}
            {isFavorite ? "Remove 💔" : "Add to Favorites ❤️"}
        </span>
        
        <p className="movie-overview">
          {movie.overview ? movie.overview : "No description available."}
        </p>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        
        {/* Dynamic Styling: Uses template literals to append a CSS class based on the rating. */}
        {/* Applies 'green' for high ratings (>= 6) and 'red' for lower ratings. */}
        <span className={`tag ${movie.vote_average >= 6 ? "green" : "red"}`}>
          {/* Formats the vote average to 1 decimal place if available */}
          {movie.vote_average ? movie.vote_average.toFixed(1) : "-"}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;