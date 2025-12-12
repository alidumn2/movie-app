import React from 'react';
import { Link } from 'react-router-dom';
import '../style/MovieCard.css';

const MovieCard = ({ movie, handleFavoriteClick, isFavorite }) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      <img
        src={movie.poster_path ? IMG_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
        alt={movie.title}
        className="card-poster"
      />

      <div className="overlay">
        <div className="hover-content">
          <h3 className="hover-title">{movie.title}</h3>

          <div className="hover-meta">
            <span className={`tag ${movie.vote_average >= 6 ? "green" : "red"}`}>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "-"}
            </span>
            <span className="release-date">{movie.release_date?.split('-')[0]}</span>
          </div>

          <Link to={`/movie/${movie.id}`} className="detail-btn">
            View Details
          </Link>

          <button
            className={`fav-btn-secondary ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFavoriteClick(movie);
            }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className={`tag ${movie.vote_average >= 6 ? "green" : "red"}`}>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "-"}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;