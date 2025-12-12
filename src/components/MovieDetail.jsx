import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/MovieDetail.css';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const IMG_URL = "https://image.tmdb.org/t/p/original";
    const POSTER_URL = "https://image.tmdb.org/t/p/w500";
    const DETAIL_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(DETAIL_URL);
                setMovie(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching detail:", error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
        window.scrollTo(0, 0);
    }, [id, DETAIL_URL]);

    if (loading) return <div className="loading-text">Loading Details...</div>;
    if (!movie) return <div className="loading-text">Movie Not Found</div>;

    return (
        <div className="detail-container">
            <div
                className="backdrop"
                style={{ backgroundImage: `url(${IMG_URL}${movie.backdrop_path})` }}
            >
                <div className="backdrop-overlay"></div>
            </div>

            <div className="detail-content">
                <Link to="/" className="back-btn">← Back to Home</Link>

                <div className="detail-flex">
                    <img
                        src={movie.poster_path ? POSTER_URL + movie.poster_path : "https://via.placeholder.com/500x750?text=No+Image"}
                        alt={movie.title}
                        className="detail-poster"
                    />

                    <div className="detail-info">
                        <h1 className="detail-title">{movie.title} <span className="release-year">({movie.release_date?.split('-')[0]})</span></h1>
                        <p className="detail-tagline">{movie.tagline}</p>

                        <div className="detail-meta">
                            <span className={`tag ${movie.vote_average >= 6 ? "green" : "red"}`}>
                                {movie.vote_average.toFixed(1)} / 10
                            </span>
                            <span className="runtime">{movie.runtime} min</span>
                            <span className="status">{movie.status}</span>
                        </div>

                        <div className="detail-genres">
                            {movie.genres.map(g => (
                                <span key={g.id} className="genre-pill">{g.name}</span>
                            ))}
                        </div>

                        <h3>Overview</h3>
                        <p className="detail-overview">{movie.overview}</p>

                        <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="imdb-btn"
                        >
                            View on IMDB
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;


