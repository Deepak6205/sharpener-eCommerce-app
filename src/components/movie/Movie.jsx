import React, { useState, useCallback, useMemo } from "react";
import "../../styles/Movie.css";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchMovies = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  }, []);

  
  const movieList = useMemo(
    () =>
      movies.map((movie) => (
        <li className="movie-item" key={movie.episode_id}>
          <h3>{movie.title}</h3>
          <p>Release Date: {movie.release_date}</p>
        </li>
      )),
    [movies]
  );

  return (
    <div className="movie-container">
      
      <button className="fetch-btn" onClick={fetchMovies}>
        Fetch Movies
      </button>

      
      <div className="movie-content">
        {loading && <p className="loading">Loading...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && movies.length === 0 && (
          <p className="no-data">No movies yet. Click the button above!</p>
        )}
        {!loading && !error && movies.length > 0 && (
          <ul className="movie-list">{movieList}</ul>
        )}
      </div>
    </div>
  );
};

export default Movie;
